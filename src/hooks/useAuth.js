import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated, selectRole } from '../redux/auth/authSelectors';

const useAuth = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  return { user, isAuthenticated, role };
};

export default useAuth;
