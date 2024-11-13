import { Navigate } from 'react-router-dom';
import { useProfile } from './ProfileContext';

const AuthGuard = ({ children }) => {
  const { user } = useProfile();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
export default AuthGuard;