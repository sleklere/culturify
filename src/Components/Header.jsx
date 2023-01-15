import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userActions } from '../store/user-slice'
import styles from './Header.module.css'

const Header = props => {
  // Use Redux for app-wide state 'userLoggedIn'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.user.loggedIn)

  console.log('user logged state: ', userLogged)

  function logoutHandler() {
    dispatch(userActions.logout())
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles['nav-link']}>
        App Name
      </Link>
      <nav>
        {!userLogged && <Link className='btn'>Register</Link>}
        {!userLogged && (
          <Link to={'/login'} className='btn'>
            Login
          </Link>
        )}
        {userLogged && (
          <Link
            to={'#'}
            className={`${styles['profile-link']} ${styles['nav-link']}`}
          >
            <div className={styles['nav-profile-img']}></div>
            Profile
          </Link>
        )}
        {userLogged && (
          <button className='btn' onClick={logoutHandler}>
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
