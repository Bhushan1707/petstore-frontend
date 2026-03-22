import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginRequest } from '../../redux/auth/authSlice';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../../redux/auth/authSelectors';
import { ROUTES } from '../../constants/routes';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME);
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(form));
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '420px' }} className="shadow p-4">
        <h3 className="mb-4 text-center">🔐 Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <p className="text-center mt-3 mb-0">
          Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
        </p>
      </Card>
    </Container>
  );
};

export default LoginPage;
