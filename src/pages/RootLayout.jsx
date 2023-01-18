import ReactDOM from 'react-dom'
import { Fragment, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import MobileMenu from '../Components/MobileMenu'

const overlays = document.getElementById('overlays')

function RootLayout() {
  const [mobileMenuVisble, setMobileMenuVisble] = useState(false)

  function showMobileMenu() {
    setMobileMenuVisble(true)
  }
  function closeMobileMenu() {
    setMobileMenuVisble(false)
  }

  return (
    <Fragment>
      {mobileMenuVisble &&
        ReactDOM.createPortal(
          <MobileMenu onMenuClose={closeMobileMenu} />,
          overlays
        )}
      <Header onMenuClick={showMobileMenu} />
      {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
      <Outlet />
    </Fragment>
  )
}

export default RootLayout
