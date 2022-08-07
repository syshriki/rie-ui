import Router from './Router'
import { QueryClient, QueryClientProvider } from 'react-query'
import ErrorBoundary from './ErrorBoundry'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
