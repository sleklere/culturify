import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userActions } from '../store/user-slice'
import styles from './MobileMenu.module.css'

function MobileMenu(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogged = useSelector(state => state.user.loggedIn)

  function logoutHandler() {
    dispatch(userActions.logout())
    navigate('/')
  }

  return (
    <div className={styles['menu-container']}>
      <FontAwesomeIcon
        icon={faClose}
        className={styles['close-menu']}
        onClick={props.onMenuClose}
      />
      <ul className={styles.nav}>
        {!userLogged && (
          <Link
            to={'/register'}
            onClick={props.onMenuClose}
            className={styles['link-item']}
          >
            Register
          </Link>
        )}
        {!userLogged && (
          <Link
            to={'/login'}
            onClick={props.onMenuClose}
            className={styles['link-item']}
          >
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
            onClick={props.onMenuClose}
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
      </ul>
    </div>
  )
}

export default MobileMenu
