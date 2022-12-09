import PropTypes from 'prop-types'
import RieLink from '../RieLink'
import React from 'react'
import { UserLink } from '../UserLink'

function formatDate (epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString()
}

export const NewsItem = React.forwardRef((props, ref) => {
  return (
    <div className='flex flex-row h-8' key={props.id} ref={ref} onClick={props.onNewsClick}>
      <div className='flex w-40 justify-center p-4'> {formatDate(props.createdAt)} </div>
      <div className='flex flex-col justify-between p-4'>
        <div className='mb-6'>
          <RieLink
            to={`${props.type}/${props.recipeSlug}`}
          >
            <p>{props.text}</p>
          </RieLink>
          <p>added by <UserLink username={props.author} /> </p>
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
