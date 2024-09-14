import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useProtectedRoute = (token?: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      navigate('/');
    } else {
      setIsAuthenticated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { isAuthenticated, token };
};
