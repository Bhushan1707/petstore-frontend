import React, { useState, useEffect, useRef } from 'react';
import { Container, Alert, Card, Button, Image, Row, Col, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPetByIdRequest, createPetRequest, updatePetRequest } from '../../redux/pets/petSlice';
import { selectPet, selectPetLoading, selectPetError } from '../../redux/pets/petSelectors';
import { fetchGalleryRequest, uploadImagesRequest, deleteImageRequest, clearGallery } from '../../redux/gallery/gallerySlice';
import { selectGalleryImages, selectGalleryUploading, selectGalleryError } from '../../redux/gallery/gallerySelectors';
import PetForm from '../../components/pets/PetForm';
import Loader from '../../components/common/Loader';
import { ROUTES } from '../../constants/routes';
import { CONFIG } from '../../config/config';
import { getImageUrl } from '../../utils/getImageUrl';

const initialValues = { name: '', species: '', breed: '', age: '', description: '', photoUrl: '', photoUrls: [''], status: 'available' };

const AdminPetFormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const fileInputRef = useRef(null);

  const pet = useSelector(selectPet);
  const loading = useSelector(selectPetLoading);
  const error = useSelector(selectPetError);
  const galleryImages = useSelector(selectGalleryImages);
  const uploading = useSelector(selectGalleryUploading);
  const galleryError = useSelector(selectGalleryError);

  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    dispatch(clearGallery());
    if (isEditing) {
      dispatch(fetchPetByIdRequest(id));
      dispatch(fetchGalleryRequest(id));
    }
  }, [dispatch, id, isEditing]);

  useEffect(() => {
    if (isEditing && pet) {
      setValues({
        name: pet.name || '',
        species: pet.species || '',
        breed: pet.breed || '',
        age: pet.age || '',
        description: pet.description || '',
        photoUrl: pet.photoUrl || '',
        photoUrls: pet.photoUrls?.length > 0 ? pet.photoUrls : (pet.photoUrl ? [pet.photoUrl] : ['']),
        status: pet.status || 'available',
      });
    }
  }, [pet, isEditing]);

  useEffect(() => {
    if (submitted && !loading && !error) {
      if (!isEditing) {
        navigate(ROUTES.ADMIN_PETS);
      }
    }
  }, [submitted, loading, error, navigate, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('species', values.species);
    formData.append('breed', values.breed);
    formData.append('age', Number(values.age));
    formData.append('description', values.description);
    formData.append('status', values.status);

    if (values.photoUrls && values.photoUrls.length > 0) {
      values.photoUrls.forEach((url) => {
        if (url.trim()) formData.append('photoUrls', url);
      });
    }

    if (selectedFiles && selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append('images', file));
    }

    if (isEditing) {
      dispatch(updatePetRequest({ id, formData }));
    } else {
      dispatch(createPetRequest({ formData }));
    }
    setSubmitted(true);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = () => {
    if (!selectedFiles.length || !id) return;
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('images', file));
    dispatch(uploadImagesRequest({ petId: id, formData }));
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteImage = (imageId) => {
    if (window.confirm('Delete this image?')) {
      dispatch(deleteImageRequest(imageId));
    }
  };

  if (loading && isEditing && !values.name) return <Loader />;

  return (
    <Container className="py-4" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">{isEditing ? 'Edit Pet' : 'Add New Pet'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <PetForm
            values={values}
            onChange={setValues}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </Card.Body>
      </Card>

      {/* Gallery section — only show if we are editing an existing pet */}
      {isEditing && (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>📸 Pet Gallery</Card.Title>
            {galleryError && <Alert variant="danger">{galleryError}</Alert>}

            {/* Upload control */}
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ maxWidth: '300px' }}
              />
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
              >
                {uploading ? (
                  <><Spinner size="sm" animation="border" className="me-1" /> Uploading...</>
                ) : (
                  `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}`
                )}
              </Button>
            </div>
            <small className="text-muted d-block mb-3">
              Accepted: JPEG, PNG, WebP, GIF — max 5 files, 5 MB each
            </small>

            {/* Gallery grid */}
            {galleryImages.length === 0 && !uploading && (
              <p className="text-muted">No images uploaded yet.</p>
            )}
            <Row xs={2} sm={3} md={4} className="g-2">
              {galleryImages.map((img) => (
                <Col key={img._id}>
                  <div className="position-relative">
                    <Image
                      src={getImageUrl(img.imagePath, values.name)}
                      className="w-100 rounded"
                      style={{ height: '120px', objectFit: 'cover' }}
                      alt={img.originalName}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-1 py-0 px-1"
                      onClick={() => handleDeleteImage(img._id)}
                      title="Delete image"
                    >
                      &times;
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {!isEditing && (
        <Alert variant="info" className="mt-3">
          💡 Save the pet first, then come back to edit it and upload gallery images.
        </Alert>
      )}
    </Container>
  );
};

export default AdminPetFormPage;
