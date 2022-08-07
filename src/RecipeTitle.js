import PropTypes from 'prop-types'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

export function RecipeTitle (props) {
  const classNames = props.onFavoriteClick ? 'cursor-pointer' : ''
  const notFavorite = props.onlyFavroite ? <AiOutlineHeart className={classNames} /> : <></>
  return (
    <div className='flex self-center'>
      <div className='pr-1'>
        <p>{props.name}</p>
      </div>
      <div
        className='self-center'
        onClick={() => props.onFavoriteClick?.()}
      >
        {props.isFavorite
          ? <AiFillHeart className={classNames} />
          : notFavorite}
      </div>
    </div>
  )
}

RecipeTitle.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onFavoriteClick: PropTypes.func,
  onlyFavroite: PropTypes.bool
}
