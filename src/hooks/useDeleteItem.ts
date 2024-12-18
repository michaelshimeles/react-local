import db from "@/local/db";
import { deleteFromDB } from "@/local/sync";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Item {
  id: string;
  name: string;
  syncStatus: "pending" | "synced" | "error";
  version: number;
  lastModified: number;
  deletedAt?: number;
  serverId?: number;
}

interface DeletedItem {
  id: string;
  deletedAt: number;
  syncStatus: "pending";
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: async (id: string) => {
      try {
        // Get the item before deletion to store its info
        const item = await db.items.get(id);
        deleteFromDB(id);
        if (!item) throw new Error("Item not found");

        // Store deletion info in a separate table for syncing
        const deletedItem: DeletedItem = {
          id: item.id,
          deletedAt: Date.now(),
          syncStatus: "pending",
        };

        // Delete from items table
        await db.items.delete(id);
        // Store in deletions table
        await db.deletions.add(deletedItem);

        await fetch(
          `https://hono-backend-sync-production.up.railway.app/api/items/delete`,
          {
            method: "POST",
            body: JSON.stringify(id),
          }
        );

        // Refresh local items
        const items = (await db.items.toArray()) as Item[];
        queryClient.setQueryData(["localItems"], items);

        return { success: true };
      } catch (error) {
        console.error("Delete mutation error:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
  });
};
