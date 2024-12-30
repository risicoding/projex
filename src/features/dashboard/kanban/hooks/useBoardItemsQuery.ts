import { useQuery } from '@tanstack/react-query';
import { GetBoardItemsAction } from '../actions/GetBoardItemsAction';
import { BoardItem } from '@prisma/client';

export const useBoardItemsQuery = (columnId: string) => {
  const query = useQuery({
    queryKey: ['itemQuery', columnId],
    queryFn: async () => {
      if (!columnId) {
        throw new Error('Columnt ID is required');
      }

      const response = await GetBoardItemsAction(columnId);

      return response as BoardItem[];
    },
    enabled: !!columnId,
  });
  return query;
};
