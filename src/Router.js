import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import NewsPage from './Pages/NewsPage'
import SearchPage from './Pages/SearchPage'
import CreateRecipePage from './Pages/CreateRecipePage'
import ProfilePage from './Pages/ProfilePage'
import EditRecipePage from './Pages/EditRecipePage'
import LoginPage from './Pages/LoginPage'
import Logout from './Components/Logout'
import SingleRecipePage from './Pages/SingleRecipePage'
import ErrorPage from './Pages/ErrorPage'
import Auth from './Auth'
import ErrorBoundary from './Components/ErrorBoundry'

function requireAuth (elem) {
  return <ErrorBoundary><Auth>{elem}</Auth></ErrorBoundary>
}

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={requireAuth(<SearchPage />)} />
        <Route path='/search' element={requireAuth(<SearchPage />)} />
        <Route path='/news' element={requireAuth(<NewsPage />)} />
        <Route path='/huh' element={requireAuth(<ErrorPage />)} />
        <Route path='/recipe/:slug' element={requireAuth(<SingleRecipePage />)} />
        <Route path='/create' element={requireAuth(<CreateRecipePage />)} />
        <Route path='/profile/:username' element={requireAuth(<ProfilePage />)} />
        <Route path='/edit/:slug' element={requireAuth(<EditRecipePage />)} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={requireAuth(<ErrorPage />)} />
      </Routes>
    </BrowserRouter>
  )
}
