import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const PetForm = ({ values, onChange, onFileChange, onSubmit, loading }) => {
  const handleChange = (e) => {
    onChange({ ...values, [e.target.name]: e.target.value });
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
