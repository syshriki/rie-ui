import WithSideBar from '../WithSideBar'
import Header from './Header'

import { Loading } from '../Loading'

export default function Page (props) {
  return (
    <WithSideBar sideSelected={props.selected}>
      <Loading show={props.isLoading}>
        <div className='overflow-auto h-full'>
          {props.noHeader ? <></> : <Header value={props.header} />}
          {props.children}
        </div>
      </Loading>
    </WithSideBar>
  )
}
