import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const accessToken = getCookie('accessToken') || localStorage.getItem('accessToken');
  const isAuthenticated = accessToken && accessToken !== '';

  console.log('ProtectedRoute Debug:', { 
    allCookies: document.cookie,
    cookieToken: getCookie('accessToken'),
    localStorageToken: localStorage.getItem('accessToken'),
    accessToken, 
    isAuthenticated 
  });

  return isAuthenticated ? children : <Navigate to="/login" />;
}

