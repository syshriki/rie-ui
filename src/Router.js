import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import HomePage from './HomePage'
import SearchPage from './SearchPage'
import CreateRecipePage from './CreateRecipePage'
import EditRecipePage from './EditRecipePage'
import LoginPage from './LoginPage'
import Logout from './Logout'
import SingleRecipePage from './SingleRecipePage'
import ErrorPage from './ErrorPage'
import Auth from './Auth'
import ErrorBoundary from './ErrorBoundry'

function requireAuth (elem) {
  return <ErrorBoundary><Auth>{elem}</Auth></ErrorBoundary>
}

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={requireAuth(<HomePage />)} />
        <Route path='/search' element={requireAuth(<SearchPage />)} />
        <Route path='/huh' element={requireAuth(<ErrorPage />)} />
        <Route path='/recipe/:slug' element={requireAuth(<SingleRecipePage />)} />
        <Route path='/create' element={requireAuth(<CreateRecipePage />)} />
        <Route path='/edit/:slug' element={requireAuth(<EditRecipePage />)} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={requireAuth(<ErrorPage />)} />
      </Routes>
    </BrowserRouter>
  )
}
