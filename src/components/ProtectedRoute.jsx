import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element }) {
  const patientId = sessionStorage.getItem('patientId');
  return patientId ? element : <Navigate to="/login" />;
}
