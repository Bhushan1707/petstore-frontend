import React, { useEffect } from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllApplicationsRequest, approveRequest, rejectRequest } from '../../redux/adoptions/adoptionSlice';
import { selectAllApplications, selectAdoptionLoading, selectAdoptionError } from '../../redux/adoptions/adoptionSelectors';
import Loader from '../../components/common/Loader';

const statusVariant = { pending: 'warning', approved: 'success', rejected: 'danger' };

const AdminApplicationsPage = () => {
  const dispatch = useDispatch();
  const applications = useSelector(selectAllApplications);
  const loading = useSelector(selectAdoptionLoading);
  const error = useSelector(selectAdoptionError);

  useEffect(() => {
    dispatch(fetchAllApplicationsRequest());
  }, [dispatch]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Adoption Applications</h2>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Pet</th>
            <th>Applicant</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.pet?.name || '—'}</td>
              <td>
                <div>{app.user?.name}</div>
                <small className="text-muted">{app.user?.email}</small>
              </td>
              <td>
                <span className="text-muted fst-italic">{app.message || '—'}</span>
              </td>
              <td>
                <Badge
                  bg={statusVariant[app.status] || 'secondary'}
                  text={app.status === 'pending' ? 'dark' : undefined}
                >
                  {app.status}
                </Badge>
              </td>
              <td>
                {app.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={() => dispatch(approveRequest(app._id))}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => dispatch(rejectRequest(app._id))}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {app.status !== 'pending' && <span className="text-muted">—</span>}
              </td>
            </tr>
          ))}
          {!loading && applications.length === 0 && (
            <tr><td colSpan={5} className="text-center text-muted">No applications yet.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminApplicationsPage;
