/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { apiUrl } from '../const/api';
import { FetchState } from './use-fetch';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

interface LoginData {
  token: string;
  payload: {
    id: string;
    email: string;
    roles: string[];
  };
}

export const useAuthentication = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<FetchState<LoginData>>({
    data: null,
    loading: false,
    error: null,
  });

  const closeSession = () => {
    localStorage.removeItem('auth:token');
    setState({
      data: null,
      loading: false,
      error: null,
    });
    navigate('/');
  };

  useEffect(() => {
    const token_ = localStorage.getItem('auth:token');
    if (token_) {
      const decoded = jwtDecode<{ email: string; id: string; roles: string[] }>(
        token_
      );
      setState({
        data: { token: token_, payload: { ...decoded } },
        loading: false,
        error: null,
      });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = (await response.json()) as LoginData;
      localStorage.setItem('auth:token', result.token);
      const decoded = jwtDecode<{ email: string; id: string; roles: string[] }>(
        result.token
      );

      setState({
        data: { ...result, payload: { ...decoded } },
        loading: false,
        error: null,
      });
      return { ok: true };
    } catch (error: any) {
      localStorage.removeItem('auth:token');
      setState({
        data: null,
        loading: false,
        error: (error as Error).message || 'Unknown error',
      });

      return { ok: false, message: error.message };
    }
  }, []);

  return { login, state, closeSession };
};
