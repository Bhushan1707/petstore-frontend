import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppNavbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import { getMeRequest } from './redux/auth/authSlice';
import { selectIsAuthenticated } from './redux/auth/authSelectors';

// Pages
import HomePage from './pages/public/HomePage';
import PetDetailPage from './pages/public/PetDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MyApplicationsPage from './pages/user/MyApplicationsPage';
import AdminPetsPage from './pages/admin/AdminPetsPage';
import AdminPetFormPage from './pages/admin/AdminPetFormPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMeRequest());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter basename="/petstore-frontend">
      <AppNavbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected user routes */}
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin/pets"
          element={
            <ProtectedRoute adminOnly>
              <AdminPetsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pets/new"
          element={
            <ProtectedRoute adminOnly>
              <AdminPetFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pets/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <AdminPetFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute adminOnly>
              <AdminApplicationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
