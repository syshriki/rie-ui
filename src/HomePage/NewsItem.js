import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'

function formatDate (epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString()
}

export const NewsItem = React.forwardRef((props, ref) => {
  return (
    <div className='flex flex-row h-32' key={props.id} ref={ref} onClick={props.onNewsClick}>
      <div className='flex w-40 justify-center p-4'> {formatDate(props.createdAt)} </div>
      <div className='flex flex-col justify-between p-4'>
        <div className='mb-6'>
          <Link
            to={`${props.type}/${props.recipeSlug}`}
            className='visited:text-gray-400 font-bold text-xl cursor-pointer hover:underline decoration-dashed'
          >
            <div>{props.title}</div>
          </Link>
          <p className='text-gray-700 text-base'>{props.text} by {props.author}</p>
        </div>
      </div>
    </div>
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
