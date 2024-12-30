import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BoardItem } from '@prisma/client';
import { UpdateBoardItemAction } from '../actions/UpdateBoardItemAction';

export interface BoardItemMutationProps {
  itemId: string;
  sourceBoardColumnId: string;
  destBoardColumnId: string;
  position: number;
}

export const useUpdateBoardItem = () => {
  const queryClient = useQueryClient();

  // Function that performs the mutation and handles all logic
  const updateItem = async ({
    itemId,
    sourceBoardColumnId,
    destBoardColumnId,
    position,
  }: BoardItemMutationProps) => {
    // Get current data for source and destination columns
    const sourceList =
      (queryClient.getQueryData(['itemQuery', sourceBoardColumnId]) as BoardItem[] | undefined) ||
      [];
    const destList =
      (queryClient.getQueryData(['itemQuery', destBoardColumnId]) as BoardItem[] | undefined) || [];

    // Copy lists for optimistic update
    const sourceListPre = [...sourceList];
    const destListPre = [...destList];

    // Find the moving item from source
    const movingItemIndex = sourceList.findIndex((item) => item.id === itemId);
    if (movingItemIndex === -1) return; // If item not found, exit early

    // Move the item from source to destination
    const [movingItem] = sourceList.splice(movingItemIndex, 1);
    destList.splice(position, 0, movingItem);

    // Update the positions of both source and destination lists

    const updatedSourceList = sourceList.map((item, idx) => ({ ...item, position: idx }));

    const updatedDestList = destList.map((item, idx) => ({
      ...item,
      position: idx,
      boardColumnId: destBoardColumnId,
    }));

    // Optimistically update the query data
    queryClient.setQueryData(['itemQuery', sourceBoardColumnId], updatedSourceList);
    queryClient.setQueryData(['itemQuery', destBoardColumnId], updatedDestList);

    // Perform the mutation
    try {
      const [res1, res2] = await Promise.all([
        UpdateBoardItemAction({ items: updatedSourceList }),
        UpdateBoardItemAction({ items: updatedDestList }),
      ]);

      return [res1, res2]; // Return the result
    } catch (error) {
      // Revert to previous state on error
      queryClient.setQueryData(['itemQuery', sourceBoardColumnId], sourceListPre);
      queryClient.setQueryData(['itemQuery', destBoardColumnId], destListPre);
      throw error; // Re-throw error for handling
    } finally {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['itemQuery', sourceBoardColumnId] });
      queryClient.invalidateQueries({ queryKey: ['itemQuery', destBoardColumnId] });
    }
  };

  // Return the update function to be used in the component
  return { updateItem };
};
