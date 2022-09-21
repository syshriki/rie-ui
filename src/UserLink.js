import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const UserLink = ({ username }) => {
  return (
    <Link to={`/profile/${username}`}>
      <span className='text-blue-700'>{username}</span>
    </Link>
  )
}

UserLink.propTypes = {
  username: PropTypes.string
}
