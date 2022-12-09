import PropTypes from 'prop-types'

export function YesNoPopup (props) {
  return (
    props.show
      ? <div className='absolute overflow-hidden w-full h-screen bg-gray-500 bg-opacity-75 '>
        <div className='fixed w-full h-full z-50 flex flex-col items-center justify-center'>
          <div className='border-2 border-black p-6 shadow-lg max-w-sm mx-auto flex flex-col items-center space-y-4 bg-white'>
            <div className='text-xl font-medium text-black'>{props.children}</div>
            <div className='grid grid-cols-6'>
              <div
                className={`px-3 py-1.5 border transition h-full align-bottom 
                  active:bg-gray-100 cursor-pointer col-start-1 col-end-3`}
                onClick={props.onYes}
              > Yes
              </div>
              <div
                className={`px-3 py-1.5 border transition h-full align-bottom 
                  active:bg-gray-100 cursor-pointer col-start-4 col-end-6`}
                onClick={props.onNo}
              > No
              </div>
            </div>
          </div>

        </div>
        </div>
      : <></>
  )
}

YesNoPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired
}
