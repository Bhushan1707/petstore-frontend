import React from 'react';
import { Badge } from 'react-bootstrap';

const statusConfig = {
  available: { bg: 'success', text: 'Available' },
  pending: { bg: 'warning', text: 'dark', label: 'Pending' },
  adopted: { bg: 'secondary', text: 'Adopted' },
  approved: { bg: 'success', text: 'Approved' },
  rejected: { bg: 'danger', text: 'Rejected' },
};

const AdoptionStatusBadge = ({ status }) => {
  const config = statusConfig[status] || { bg: 'secondary', label: status };
  return (
    <Badge bg={config.bg} text={config.text === 'dark' ? 'dark' : undefined}>
      {config.label || config.text || status}
    </Badge>
  );
};

export default AdoptionStatusBadge;
