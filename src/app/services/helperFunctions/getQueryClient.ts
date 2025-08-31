import { isServer, QueryClient } from "@tanstack/react-query";
let browserQueryClient: QueryClient | undefined = undefined;
function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000*60,
      },
    },
  });
}
export function getQueryClient(): QueryClient {
  if (isServer) {
    return createQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = createQueryClient();
    }
    return browserQueryClient;
  }
}