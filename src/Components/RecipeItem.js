import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import { RecipeTitle } from './RecipeTitle'

export const RecipeItem = React.forwardRef((props, ref) => {
  return (
    <div className='flex' onClick={props.onRecipeClick} ref={ref}>
      <div className='p-4 flex flex-col justify-between'>
        <div>
          <Link
            className='font-bold text-xl mb-2 cursor-pointer hover:underline decoration-dashed'
            to={`/recipe/${props.slug}`}
          >
            <RecipeTitle name={props.name} isFavorite={props.isFavorite} />
          </Link>
          <p className='text-gray-700 text-base'>{props.description}</p>
        </div>
      </div>
    </div>
  )
})

RecipeItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  isFavorite: PropTypes.bool.isRequired,
  onRecipeClick: PropTypes.func.isRequired
}
