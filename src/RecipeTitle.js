import PropTypes from 'prop-types'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const noop = function () {}
export function RecipeTitle (props) {
  const classNames = props.onFavoriteClick ? 'cursor-pointer' : ''
  const notFavorite = props.onlyFavorite
    ? <AiOutlineHeart className={classNames} />
    : <></>
  const notLoadingFavorite = props.isFavorite
    ? <AiFillHeart className={classNames} />
    : notFavorite
  const loadingFavorite = props.isLoading
    ? <AiFillHeart fill='gray' />
    : <></>

  const onClick = props.onFavoriteClick || noop

  return (
    <div className='flex self-center'>
      <div className='pr-1'>
        <p>{props.name}</p>
      </div>
      <div
        className='self-center'
        onClick={() => props.isLoading ? noop() : onClick()}
      >
        {props.isLoading ? loadingFavorite : notLoadingFavorite}
      </div>
    </div>
  )
}

RecipeTitle.propTypes = {
  isLoading: PropTypes.bool,
  isFavorite: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onFavoriteClick: PropTypes.func,
  onlyFavorite: PropTypes.bool
}
