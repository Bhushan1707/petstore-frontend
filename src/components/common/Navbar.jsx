import React from 'react';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { logout } from '../../redux/auth/authSlice';
import { removeToken } from '../../utils/tokenStorage';
import { ROUTES } from '../../constants/routes';

const AppNavbar = () => {
  const { isAuthenticated, user, role } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <BsNavbar.Brand as={Link} to={ROUTES.HOME}>🐾 PetAdopt</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.HOME}>Browse Pets</Nav.Link>
            {isAuthenticated && role !== 'admin' && (
              <Nav.Link as={Link} to={ROUTES.MY_APPLICATIONS}>My Applications</Nav.Link>
            )}
            {isAuthenticated && role === 'admin' && (
              <>
                <Nav.Link as={Link} to={ROUTES.ADMIN_PETS}>Manage Pets</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.ADMIN_APPLICATIONS}>Applications</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to={ROUTES.LOGIN}>Login</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.REGISTER}>Register</Nav.Link>
              </>
            ) : (
              <>
                <BsNavbar.Text className="me-3">
                  👤 {user?.name}
                </BsNavbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default AppNavbar;
