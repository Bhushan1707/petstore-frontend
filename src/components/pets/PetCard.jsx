import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageUrl';

const PetCard = ({ pet }) => {
  const imgSrc = getImageUrl(
    (pet.photoUrls && pet.photoUrls.length > 0 && pet.photoUrls[0]) || pet.photoUrl,
    pet.name
  );

  return (
    <Card className="pet-card h-100 shadow-sm border-0">
      <div className="overflow-hidden">
        <Card.Img 
          variant="top" 
          src={imgSrc} 
          alt={pet.name} 
          className="card-img-top"
          onError={(e) => { e.target.src = `https://placehold.co/300x220?text=${encodeURIComponent(pet.name)}`; }}
        />
      </div>
      <Card.Body className="pet-card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="pet-card-title mb-0">{pet.name}</Card.Title>
          <Badge bg="light" text="dark" className="border">{pet.species}</Badge>
        </div>
        <Card.Text className="text-muted small mb-3 flex-grow-1">
          <span className="d-block mb-1"><strong>Breed:</strong> {pet.breed || 'Unknown'}</span>
          <span><strong>Age:</strong> {pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
        </Card.Text>
        <Button 
          as={Link} 
          to={`/pets/${pet._id}`} 
          variant="primary" 
          className="w-100 mt-auto shadow-sm"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
