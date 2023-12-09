import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import { UserLink } from '../../Components/UserLink'

function formatDate (epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString()
}

export const NewsItem = React.forwardRef((props, ref) => {
  return (
    <React.Fragment key={props.id}>
      <div onClick={props.onNewsClick} className='ml-2 p-4 border-b text-center'> {formatDate(props.createdAt)} </div>
      <div onClick={props.onNewsClick} ref={ref} className='mr-2 md:col-span-7 col-span-2 p-4 border-b'>
        <Link
          to={`/${props.type}/${props.recipeSlug}`}
          className='font-bold text-xl cursor-pointer hover:underline decoration-dashed'
        >
          <p>{props.text}</p>
        </Link>
        <p className='md:block hidden'>added by <UserLink username={props.author} /> </p>
      </div>
    </React.Fragment>
  )
})

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string,
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onNewsClick: PropTypes.func.isRequired
}
