import { Link } from 'react-router-dom'
import { MdAdd, MdSearch, MdHome, MdMeetingRoom, MdPerson, MdDinnerDining } from 'react-icons/md'
import PropTypes from 'prop-types'

function DynamicBackground (props) {
  if (props.link === props.selected) {
    return (
      <div className='cursor-pointer flex justify-evenly bg-white hover:fill-current text-black py-4'>
        {props.children}
      </div>
    )
  } else {
    return (
      <div className='cursor-pointer flex justify-evenly hover:bg-white hover:fill-current hover:text-black py-4'>
        {props.children}
      </div>
    )
  }
}

export default function WithSideBar (props) {
  return (
    <div className='flex h-screen'>
      <div className='flex'>
        <aside className='flex w-12 text-2xl grid grid-cols-1 content-around bg-black text-white'>
          <Link to='/'>
            <DynamicBackground selected={props.selected} link='home'>
              <MdHome />
            </DynamicBackground>
          </Link>
          <Link to='/search'>
            <DynamicBackground selected={props.selected} link='search'>
              <MdSearch />
            </DynamicBackground>
          </Link>
          <Link to={`/profile/${window.localStorage.getItem('username')}`}>
            <DynamicBackground selected={props.selected} link='profile'>
              <MdPerson />
            </DynamicBackground>
          </Link>
          <Link to='/mealplan'>
            <DynamicBackground selected={props.selected} link='mealplan'>
              <MdDinnerDining />
            </DynamicBackground>
          </Link>
          <Link to='/create'>
            <DynamicBackground selected={props.selected} link='create'>
              <MdAdd />
            </DynamicBackground>
          </Link>
          <Link to='/logout'>
            <DynamicBackground selected={props.selected} link='logout'>
              <MdMeetingRoom />
            </DynamicBackground>
          </Link>
        </aside>
      </div>
      <div className='flex flex-col w-full overflow-hidden'>
        {props.children}
      </div>
    </div>
  )
}

DynamicBackground.propTypes = {
  selected: PropTypes.string,
  link: PropTypes.string.isRequired
}

WithSideBar.propTypes = {
  selected: PropTypes.string
}
