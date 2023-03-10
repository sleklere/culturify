import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userActions } from '../store/user-slice'
import styles from './Header.module.css'

function Header(props) {
  // Use Redux for app-wide state 'userLoggedIn'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.user.loggedIn)

  // console.log('user logged state: ', userLogged)

  function logoutHandler() {
    dispatch(userActions.logout())
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <NavLink to={'/'} className={styles['nav-link']} end>
        Culturify
      </NavLink>
      <nav>
        {!userLogged && (
          <Link to={'/register'} className='btn'>
            Register
          </Link>
        )}
        {!userLogged && (
          <Link to={'/login'} className='btn'>
            Login
          </Link>
        )}
        {userLogged && (
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              `${styles['profile-link']} ${styles['nav-link']} ${
                isActive ? styles.active : undefined
              }`
            }
          >
            <div className={styles['nav-profile-img']}></div>
            Profile
          </NavLink>
        )}
        {userLogged && (
          <button className='btn' onClick={logoutHandler}>
            Logout
          </button>
        )}
      </nav>
      <button className={styles['burger-menu']} onClick={props.onMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  )
}

export default Header
