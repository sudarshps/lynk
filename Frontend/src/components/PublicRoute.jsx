import { Navigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext.jsx';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>;

  return !user ? children : <Navigate to="/" />;
};

export default PublicRoute;
