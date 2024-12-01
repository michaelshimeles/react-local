import { useQuery } from "@tanstack/react-query";

export const useGetItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      // const res = await client.api.items.$get()

      const response = await fetch(
        `https://hono-backend-sync-production.up.railway.app/api/items`
      );

      const items = await response.json();
      return items;
    },
    // Add these options for better data handling
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 1000 * 30, // Consider data stale after 30 seconcds
  });
};
