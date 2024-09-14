import { apiUrl } from '@/const/api';
import { useQuery } from '@tanstack/react-query';

interface ResultUsers {
  results: Array<{
    id: string;
    email: string;
    roles: string[];
    username: string;
  }>;
}

export const useUserApi = () => {
  const { isPending, error, data } = useQuery<ResultUsers>({
    queryKey: ['users'],
    queryFn: () =>
      fetch(`${apiUrl}/api/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth:token')}`,
        },
      }).then((res) => res.json()),
  });

  return { isPending, error, data };
};
