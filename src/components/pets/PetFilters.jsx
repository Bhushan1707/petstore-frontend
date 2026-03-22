import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const PetFilters = ({ filters, onChange, onReset }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  return (
    <Row className="g-2 mb-4 align-items-end">
      <Col md={4}>
        <Form.Control
          name="search"
          placeholder="Search by name..."
          value={filters.search || ''}
          onChange={handleChange}
        />
      </Col>
      <Col md={2}>
        <Form.Select name="species" value={filters.species || ''} onChange={handleChange}>
          <option value="">All Species</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
          <option value="other">Other</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Control
          name="breed"
          placeholder="Filter by breed..."
          value={filters.breed || ''}
          onChange={handleChange}
        />
      </Col>
      <Col md={2}>
        <Form.Control
          type="number"
          name="age"
          placeholder="Max age"
          value={filters.age || ''}
          onChange={handleChange}
          min={0}
        />
      </Col>
      <Col md={1}>
        <Button variant="outline-secondary" onClick={onReset} className="w-100">
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default PetFilters;
