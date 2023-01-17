import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

function RootLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  )
}

export default RootLayout
