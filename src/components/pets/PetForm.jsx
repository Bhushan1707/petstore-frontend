import React from 'react';
import { Form, Button, Row, Col, Image, Badge } from 'react-bootstrap';
import { getImageUrl } from '../../utils/getImageUrl';

const PetForm = ({ values, onChange, onFileChange, onSubmit, loading, previews, onRemoveSelectedFile }) => {
  const handleChange = (e) => {
    onChange({ ...values, [e.target.name]: e.target.value });
  };

  const removeExistingPhoto = (idxToRemove) => {
    const updated = values.photoUrls.filter((_, idx) => idx !== idxToRemove);
    onChange({ ...values, photoUrls: updated });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control name="name" value={values.name || ''} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Species *</Form.Label>
            <Form.Select name="species" value={values.species || ''} onChange={handleChange} required>
              <option value="">Select Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Breed</Form.Label>
            <Form.Control name="breed" value={values.breed || ''} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Age (years) *</Form.Label>
            <Form.Control type="number" name="age" value={values.age || ''} onChange={handleChange} required min={0} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={values.status || 'available'} onChange={handleChange}>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="adopted">Adopted</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={onFileChange} 
            />
            <small className="text-muted d-block mt-1">Select multiple images to upload directly (max 5 files).</small>
          </Form.Group>
          
          {/* Combined Image Previews (Existing + New) */}
          {(values.photoUrls?.length > 0 || previews?.length > 0) && (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {/* Existing Images */}
              {values.photoUrls?.map((url, idx) => (
                url && (
                  <div key={`existing-${idx}`} className="position-relative border rounded p-1 shadow-sm" style={{ width: '100px', height: '100px' }}>
                    <Image 
                      src={getImageUrl(url, values.name)} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      className="rounded"
                    />
                    <Badge bg="info" className="position-absolute top-0 start-0 m-1" style={{ fontSize: '10px' }}>Existed</Badge>
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-1 py-0 px-1"
                      onClick={() => removeExistingPhoto(idx)}
                      style={{ fontSize: '12px', lineHeight: '1' }}
                      title="Remove from pet photos"
                    >
                      &times;
                    </Button>
                  </div>
                )
              ))}
              {/* New Previews */}
              {previews?.map((url, idx) => (
                <div key={`new-${idx}`} className="position-relative border rounded p-1 shadow-sm" style={{ width: '100px', height: '100px', borderColor: '#0d6efd' }}>
                  <Image 
                    src={url} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="rounded"
                  />
                  <Badge bg="primary" className="position-absolute top-0 start-0 m-1" style={{ fontSize: '10px' }}>New</Badge>
                  <Button
                    variant="warning"
                    size="sm"
                    className="position-absolute top-0 end-0 m-1 py-0 px-1"
                    onClick={() => onRemoveSelectedFile(idx)}
                    style={{ fontSize: '12px', lineHeight: '1' }}
                    title="Deselect file"
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Col>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={values.description || ''} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Saving...' : 'Save Pet'}
      </Button>
    </Form>
  );
};

export default PetForm;
