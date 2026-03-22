import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetsRequest } from '../../redux/pets/petSlice';
import { selectPets, selectPetLoading, selectPetError, selectPagination } from '../../redux/pets/petSelectors';
import PetCard from '../../components/pets/PetCard';
import PetFilters from '../../components/pets/PetFilters';
import PaginationBar from '../../components/common/PaginationBar';
import Loader from '../../components/common/Loader';

const defaultFilters = { search: '', species: '', breed: '', age: '', page: 1 };

const HomePage = () => {
  const dispatch = useDispatch();
  const pets = useSelector(selectPets);
  const loading = useSelector(selectPetLoading);
  const error = useSelector(selectPetError);
  const { totalPages, currentPage } = useSelector(selectPagination);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    dispatch(fetchPetsRequest(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleReset = () => setFilters(defaultFilters);
  const handlePageChange = (page) => setFilters((f) => ({ ...f, page }));

  return (
    <Container className="py-4">
      <h1 className="page-title fade-in">🐾 Find Your Perfect Pet</h1>
      <PetFilters filters={filters} onChange={handleFilterChange} onReset={handleReset} />
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && pets.length === 0 && (
        <Alert variant="info">No pets found matching your criteria.</Alert>
      )}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {pets.map((pet) => (
          <Col key={pet._id}>
            <PetCard pet={pet} />
          </Col>
        ))}
      </Row>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default HomePage;
