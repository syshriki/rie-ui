import { MdError } from 'react-icons/md'
import WithSideBar from './WithSideBar'

export default function () {
  return (
    <WithSideBar selected='error_page'>
      <div className='flex-col grow'>
        <div className='flex items-center justify-center h-full'>
          <MdError size='15em' />
          Something went wrong.
        </div>
      </div>
    </WithSideBar>
  )
}
