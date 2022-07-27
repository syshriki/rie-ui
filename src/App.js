import Router from './Router'
import { QueryClient, QueryClientProvider } from 'react-query'
import ErrorBoundary from './ErrorBoundry'

const queryClient = new QueryClient()

export function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </QueryClientProvider>
  )
}
