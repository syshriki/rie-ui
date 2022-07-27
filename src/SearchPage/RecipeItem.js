import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'

function formatDate (epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString()
}

export const RecipeItem = React.forwardRef((props, ref) => {
  return (
    <div className='flex flex-row h-32' onClick={props.onRecipeClick} ref={ref}>
      <div className='flex w-12 justify-center p-4'> * </div>
      <div className='p-4 flex flex-col justify-between'>
        <div className='mb-6'>
          <Link
            className='visited:text-gray-400 font-bold text-xl mb-2 cursor-pointer hover:underline decoration-dashed'
            to={`/recipe/${props.slug}`}
          >
            {props.name}
          </Link>
          <p className='text-gray-700 text-base'>{props.description}</p>
        </div>
        <div className='flex items-center'>
          <div className='text-sm'>
            <p className='text-gray-900 leading-none italic'>Added by {props.author}</p>
            <p className='text-gray-600'>{formatDate(props.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
})

RecipeItem.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  recipe: PropTypes.string.isRequired,
  onRecipeClick: PropTypes.func.isRequired
}
