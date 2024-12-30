import { useQuery } from '@tanstack/react-query';
import { GetProjectBoardColumns } from '../actions/GetBoardColumns';

export const useBoardColumnQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['columnQuery', projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error('Project ID is required');
      }

      const response = await GetProjectBoardColumns({ projectId });

      if (response.error) {
        throw new Error(response.error);
      }

      return response.data;
    },
    enabled: !!projectId, // Only run if projectId is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
