import { Link } from 'react-router-dom'
import { useState } from 'react'
import { clsx } from 'clsx'
import { MdAdd, MdSearch, MdHome, MdMeetingRoom, MdPerson, MdMenu } from 'react-icons/md'
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
  const [showMenu, setShowMenu] = useState(true)
  const menuStyle = clsx(
    'flex',
    'text-2xl',
    'grid',
    'grid-cols-1',
    'content-around',
    'bg-black',
    'text-white',
    'md:block',
    { hidden: showMenu }
  )

  return (
    <div className='h-screen flex'>
      <div className='md:static md:flex fixed'>
        <div className='md:hidden'>
          <div className='p-4 flex items-center'>
            <div className='text-2xl font-bold'>
              <MdMenu size='1.5em' onClick={() => setShowMenu(!showMenu)} />
            </div>
          </div>
        </div>
        <aside className={menuStyle}>
          <Link to='/news'>
            <DynamicBackground selected={props.selected} link='news'>
              <div className='p-4 flex items-center'>
                <div><MdHome /></div>
                <div>News</div>
              </div>
            </DynamicBackground>
          </Link>
          <Link to='/search'>
            <DynamicBackground selected={props.selected} link='search'>
              <div className='p-4 flex items-center'>
                <div><MdSearch /></div>
                <div>Search</div>
              </div>
            </DynamicBackground>
          </Link>
          <Link to={`/profile/${window.localStorage.getItem('username')}`}>
            <DynamicBackground selected={props.selected} link='profile'>
              <div className='p-4 flex items-center'>
                <div><MdPerson /></div>
                <div>Profile</div>
              </div>
            </DynamicBackground>
          </Link>
          <Link to='/create'>
            <DynamicBackground selected={props.selected} link='create'>
              <div className='p-4 flex items-center'>
                <div><MdAdd /></div>
                <div>Recipe</div>
              </div>
            </DynamicBackground>
          </Link>
          <Link to='/logout'>
            <DynamicBackground selected={props.selected} link='logout'>
              <div className='p-4 flex items-center'>
                <div><MdMeetingRoom /></div>
                <div>Logout</div>
              </div>
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
