import { apiUrl } from '@/const/api';
import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

interface ResultTasks {
  results: Array<{
    id: string;
    title: string;
    description: string;
    user_id: string;
    status: string;
    createdAt: string;
  }>;
}

type CreateTask = {
  title: string;
  description: string;
  status: string;
  user_id: string;
};

export const useTaskApi = (mode: 'query' | 'command' = 'query') => {
  const client = useQueryClient();

  const { isPending, error, data, refetch } = useQuery<ResultTasks>({
    enabled: mode === 'query',
    queryKey: ['tasks'],
    queryFn: () =>
      fetch(`${apiUrl}/api/tasks`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth:token')}`,
        },
      }).then((res) => res.json()),
  });

  const createTaskMutation = useMutation<unknown, DefaultError, CreateTask>({
    mutationFn: async (formData) => {
      const response = await fetch(`${apiUrl}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth:token')}`,
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation<unknown, DefaultError, string>({
    mutationFn: async (id) => {
      const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth:token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    isPending,
    error,
    data,
    refetch,
    createTaskMutation,
    deleteTaskMutation,
  };
};
