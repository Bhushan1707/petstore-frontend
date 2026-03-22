import React from 'react';
import { Card, Button } from 'react-bootstrap';
import AdoptionStatusBadge from './AdoptionStatusBadge';

const AdoptionCard = ({ application, onApprove, onReject, isAdmin = false }) => {
  const pet = application.pet;
  const applicant = application.user;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1">
              {pet?.name || 'Unknown Pet'}
              {' '}
              <AdoptionStatusBadge status={application.status} />
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {pet?.species} &bull; {pet?.breed}
            </Card.Subtitle>
            {isAdmin && (
              <p className="mb-1">
                <strong>Applicant:</strong> {applicant?.name} ({applicant?.email})
              </p>
            )}
            {application.message && (
              <p className="mb-0 text-muted fst-italic">"{application.message}"</p>
            )}
          </div>
          {isAdmin && application.status === 'pending' && (
            <div className="d-flex gap-2">
              <Button size="sm" variant="success" onClick={() => onApprove(application._id)}>
                Approve
              </Button>
              <Button size="sm" variant="danger" onClick={() => onReject(application._id)}>
                Reject
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdoptionCard;
