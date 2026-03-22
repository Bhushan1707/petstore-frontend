import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageUrl';

const statusVariant = {
  available: 'success',
  pending: 'warning',
  adopted: 'secondary',
};

const PetCard = ({ pet }) => {
  const imgSrc = getImageUrl(
    (pet.photoUrls && pet.photoUrls.length > 0 && pet.photoUrls[0]) || pet.photoUrl,
    pet.name
  );

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imgSrc}
        alt={pet.name}
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => { e.target.src = `https://placehold.co/300x200?text=${encodeURIComponent(pet.name)}`; }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <Card.Title className="mb-0">{pet.name}</Card.Title>
          <Badge bg={statusVariant[pet.status] || 'secondary'} text={pet.status === 'pending' ? 'dark' : undefined}>
            {pet.status}
          </Badge>
        </div>
        <Card.Subtitle className="text-muted mb-2">
          {pet.species} &bull; {pet.breed}
        </Card.Subtitle>
        <p className="text-muted mb-3">Age: {pet.age} {pet.age === 1 ? 'yr' : 'yrs'}</p>
        <Button as={Link} to={`/pets/${pet._id}`} variant="primary" className="mt-auto">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
