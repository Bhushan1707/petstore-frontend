import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerRequest } from '../../redux/auth/authSlice';
import { selectAuthLoading, selectAuthError } from '../../redux/auth/authSelectors';
import { ROUTES } from '../../constants/routes';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(form));
    setSuccess(true);
  };

  useEffect(() => {
    if (success && !loading && !error) {
      setTimeout(() => navigate(ROUTES.LOGIN), 1500);
    }
  }, [success, loading, error, navigate]);

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '420px' }} className="shadow p-4">
        <h3 className="mb-4 text-center">🐾 Create Account</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && !loading && !error && (
          <Alert variant="success">Registered successfully! Redirecting to login...</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              required
              minLength={6}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Form>
        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </p>
      </Card>
    </Container>
  );
};

export default RegisterPage;
