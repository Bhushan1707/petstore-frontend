import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, InputGroup } from 'react-bootstrap';
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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME);
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fillDemo = (email, password) => {
    setForm({ email, password });
  };

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
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                {showPassword ? '👁️' : '🙈'}
              </Button>
            </InputGroup>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <p className="text-center mt-3 mb-3">
          Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
        </p>
        
        <hr />
        
        <div className="mt-2">
          <p className="small text-muted mb-2 text-center">Demo Credentials (Click to fill):</p>
          <div className="d-grid gap-2">
            <Button 
              size="sm" 
              variant="outline-info" 
              onClick={() => fillDemo('admin@petstore.com', 'Admin@123')}
            >
              Admin: admin@petstore.com / Admin@123
            </Button>
            <Button 
              size="sm" 
              variant="outline-info" 
              onClick={() => fillDemo('johndoe@gmail.com', 'John@gmail.com')}
            >
              User: johndoe@gmail.com / John@gmail.com
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default LoginPage;
