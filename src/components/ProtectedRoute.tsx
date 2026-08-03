import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuthenticated) {
    // #region agent log
    fetch('http://127.0.0.1:7281/ingest/7a98156b-5309-46e3-8abf-a9b9da1a22a7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7b5918'},body:JSON.stringify({sessionId:'7b5918',hypothesisId:'B',location:'ProtectedRoute.tsx:redirect-login',message:'ProtectedRoute redirecting to /login',data:{pathname:location.pathname,loading},timestamp:Date.now(),runId:'dashboard-kickout'})}).catch(()=>{});
    // #endregion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 