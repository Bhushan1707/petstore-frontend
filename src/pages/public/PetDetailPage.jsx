import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Form, Alert, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetByIdRequest } from '../../redux/pets/petSlice';
import { selectPet, selectPetLoading, selectPetError } from '../../redux/pets/petSelectors';
import { applyForAdoptionRequest } from '../../redux/adoptions/adoptionSlice';
import { selectAdoptionLoading, selectAdoptionError } from '../../redux/adoptions/adoptionSelectors';
import { fetchGalleryRequest } from '../../redux/gallery/gallerySlice';
import { selectGalleryImages, selectGalleryLoading } from '../../redux/gallery/gallerySelectors';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/common/Loader';
import { getImageUrl } from '../../utils/getImageUrl';

const statusVariant = { available: 'success', pending: 'warning', adopted: 'secondary' };

const PetDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  const pet = useSelector(selectPet);
  const loading = useSelector(selectPetLoading);
  const error = useSelector(selectPetError);
  const adoptionLoading = useSelector(selectAdoptionLoading);
  const adoptionError = useSelector(selectAdoptionError);
  const galleryImages = useSelector(selectGalleryImages);
  const galleryLoading = useSelector(selectGalleryLoading);

  const [message, setMessage] = useState('');
  const [applied, setApplied] = useState(false);
  const [lightbox, setLightbox] = useState(null); // currently viewed image

  useEffect(() => {
    dispatch(fetchPetByIdRequest(id));
    dispatch(fetchGalleryRequest(id));
  }, [dispatch, id]);

  const handleApply = () => {
    dispatch(applyForAdoptionRequest({ petId: id, message }));
    setApplied(true);
  };

  if (loading) return <Loader />;
  if (error) return <Container className="py-4"><Alert variant="danger">{error}</Alert></Container>;
  if (!pet) return null;

  const primaryImage = getImageUrl(
    (pet.photoUrls && pet.photoUrls.length > 0 && pet.photoUrls[0]) || pet.photoUrl,
    pet.name
  );

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </Button>
      <Row>
        <Col md={5}>
          <img
            src={primaryImage}
            alt={pet.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', objectFit: 'cover', maxHeight: '350px', cursor: 'pointer' }}
            onClick={() => setLightbox(primaryImage)}
          />
        </Col>
        <Col md={7}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <h2 className="mb-0">{pet.name}</h2>
            <Badge bg={statusVariant[pet.status] || 'secondary'} text={pet.status === 'pending' ? 'dark' : undefined}>
              {pet.status}
            </Badge>
          </div>
          <p className="text-muted mb-1"><strong>Species:</strong> {pet.species}</p>
          <p className="text-muted mb-1"><strong>Breed:</strong> {pet.breed}</p>
          <p className="text-muted mb-3"><strong>Age:</strong> {pet.age} {pet.age === 1 ? 'year' : 'years'}</p>
          {pet.description && <p className="mb-4">{pet.description}</p>}
          
          <hr />

          {isAuthenticated && role !== 'admin' && pet.status === 'available' && !applied && (
            <div className="mt-3">
              <h6>Apply for Adoption</h6>
              {adoptionError && <Alert variant="danger">{adoptionError}</Alert>}
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Why do you want to adopt ${pet.name}?`}
                className="mb-2"
              />
              <Button variant="success" onClick={handleApply} disabled={adoptionLoading}>
                {adoptionLoading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          )}
          {applied && <Alert variant="success" className="mt-3">Your application has been submitted! 🎉</Alert>}
          {!isAuthenticated && pet.status === 'available' && (
            <Alert variant="info" className="mt-3">
              <Alert.Link href="/login">Login</Alert.Link> to apply for adoption.
            </Alert>
          )}
        </Col>
      </Row>

      {/* Gallery section */}
      {(galleryLoading || galleryImages.length > 0 || (pet.photoUrls && pet.photoUrls.length > 1)) && (
        <div className="mt-5">
          <h5 className="mb-3">📸 Photo Gallery</h5>
          {galleryLoading && <Loader />}
          <Row xs={2} sm={3} md={4} className="g-2">
            {pet.photoUrls && pet.photoUrls.map((url, idx) => (
              <Col key={`url-${idx}`}>
                <Image
                  src={getImageUrl(url, pet.name)}
                  className="w-100 rounded shadow-sm"
                  style={{ height: '130px', objectFit: 'cover', cursor: 'pointer' }}
                  alt={`${pet.name} ${idx + 1}`}
                  onClick={() => setLightbox(getImageUrl(url, pet.name))}
                />
              </Col>
            ))}
            {galleryImages.map((img) => {
              const imgUrl = getImageUrl(img.imagePath, pet.name);
              return (
                <Col key={img._id}>
                  <Image
                    src={imgUrl}
                    className="w-100 rounded shadow-sm"
                    style={{ height: '130px', objectFit: 'cover', cursor: 'pointer' }}
                    alt={img.originalName}
                    onClick={() => setLightbox(imgUrl)}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      )}

      {/* Simple lightbox overlay */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt="Gallery"
            style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '8px' }}
          />
        </div>
      )}
    </Container>
  );
};

export default PetDetailPage;
