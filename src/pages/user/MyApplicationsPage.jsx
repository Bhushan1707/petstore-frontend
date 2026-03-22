import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplicationsRequest } from '../../redux/adoptions/adoptionSlice';
import { selectMyApplications, selectAdoptionLoading, selectAdoptionError } from '../../redux/adoptions/adoptionSelectors';
import AdoptionCard from '../../components/adoptions/AdoptionCard';
import Loader from '../../components/common/Loader';

const MyApplicationsPage = () => {
  const dispatch = useDispatch();
  const applications = useSelector(selectMyApplications);
  const loading = useSelector(selectAdoptionLoading);
  const error = useSelector(selectAdoptionError);

  useEffect(() => {
    dispatch(fetchMyApplicationsRequest());
  }, [dispatch]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Adoption Applications</h2>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && applications.length === 0 && (
        <Alert variant="info">You haven't applied for any pets yet.</Alert>
      )}
      {applications.map((app) => (
        <AdoptionCard key={app._id} application={app} />
      ))}
    </Container>
  );
};

export default MyApplicationsPage;
