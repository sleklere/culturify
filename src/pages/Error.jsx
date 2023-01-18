import ReactDOM from 'react-dom'
import { Fragment, useState } from 'react'
import Header from '../Components/Header'
import { useRouteError } from 'react-router-dom'
import styles from './Error.module.css'
import MobileMenu from '../Components/MobileMenu'

const overlays = document.getElementById('overlays')

function ErrorPage() {
  const error = useRouteError()

  let title = 'An error ocurred'
  let message = 'Something went wrong'

  if (error.status === 500) {
    // message = JSON.parse(error.data).message
    message = error.data.message
  }

  if (error.status === 404) {
    title = 'Not found'
    message = 'No page or resource was found'
  }

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
      <main className={styles['error-main']}>
        <h1 className={styles.status}>{error.status}</h1>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
      </main>
    </Fragment>
  )
}

export default ErrorPage
