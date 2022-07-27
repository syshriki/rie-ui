import { Navigate } from 'react-router-dom'

export default function (props) {
  if (!window.localStorage.getItem('username')) {
    return <Navigate replace to='/login' />
  } else {
    return props.children
  }
}
