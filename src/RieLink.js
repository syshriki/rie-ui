import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function RieLink ({ to, children }) {
  return (
    <Link
      to={to}
      className='text-gray-900 font-bold text-xl cursor-pointer hover:underline decoration-dashed'
    >
      {children}
    </Link>
  )
}

RieLink.propTypes = {
  to: PropTypes.string.isRequired
}
