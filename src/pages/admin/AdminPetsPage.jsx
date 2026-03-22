import React, { useEffect } from 'react';
import { Container, Table, Button, Alert, Badge, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPetsRequest, deletePetRequest } from '../../redux/pets/petSlice';
import { selectPets, selectPetLoading, selectPetError } from '../../redux/pets/petSelectors';
import Loader from '../../components/common/Loader';
import { ROUTES } from '../../constants/routes';
import { getImageUrl } from '../../utils/getImageUrl';

const statusVariant = { available: 'success', pending: 'warning', adopted: 'secondary' };

const AdminPetsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pets = useSelector(selectPets);
  const loading = useSelector(selectPetLoading);
  const error = useSelector(selectPetError);

  useEffect(() => {
    dispatch(fetchPetsRequest({}));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      dispatch(deletePetRequest(id));
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Pets</h2>
        <Button variant="success" onClick={() => navigate(ROUTES.ADMIN_PET_NEW)}>
          + Add New Pet
        </Button>
      </div>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>
                <Image
                  src={getImageUrl((pet.photoUrls && pet.photoUrls.length > 0 && pet.photoUrls[0]) || pet.photoUrl, pet.name)}
                  width={50}
                  height={50}
                  rounded
                  style={{ objectFit: 'cover' }}
                />
              </td>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.breed}</td>
              <td>{pet.age} yr{pet.age !== 1 ? 's' : ''}</td>
              <td>
                <Badge bg={statusVariant[pet.status] || 'secondary'} text={pet.status === 'pending' ? 'dark' : undefined}>
                  {pet.status}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => navigate(`/admin/pets/edit/${pet._id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(pet._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {!loading && pets.length === 0 && (
            <tr><td colSpan={7} className="text-center text-muted">No pets found.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPetsPage;
