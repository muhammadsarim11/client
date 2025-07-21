import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const accessToken = getCookie('accessToken') || localStorage.getItem('accessToken');
  const isAuthenticated = accessToken && accessToken !== '';

  // Prevent back button navigation to login after authentication
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      window.history.replaceState(null, '', '/dashboard');
    }
  }, [isAuthenticated, location]);

  console.log('ProtectedRoute Debug:', { 
    allCookies: document.cookie,
    cookieToken: getCookie('accessToken'),
    localStorageToken: localStorage.getItem('accessToken'),
    accessToken, 
    isAuthenticated 
  });

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

