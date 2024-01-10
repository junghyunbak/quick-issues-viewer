// react
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      /**
       * - 이슈
       * - 레포지토리
       * - 라벨
       * - 사용자
       *
       * 이슈 리스트를 제외하고는 자주 변경되지 않는 값이기 때문에
       * default staleTime, cacheTime을 infinity로 설정
       */
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: true,
    },
  },
});

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
