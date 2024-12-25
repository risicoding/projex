import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { GetBoardItemsAction } from '../actions/GetBoardItemsAction';
import Board from './Board';

interface BoardContainerProps {
  projectId: number;
}

const BoardContainer = async ({ projectId }: BoardContainerProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['board', projectId],
    queryFn: async () => {
      const res = await GetBoardItemsAction(projectId);
      return res;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Board />
    </HydrationBoundary>
  );
};

export default BoardContainer;
