import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import { userActions } from '../store/user-slice'
import styles from './Login.module.css'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function loginHandler(e) {
    e.preventDefault()
    dispatch(userActions.login())
    navigate('/')
  }

  return (
    <Fragment>
      <Header />
      <div className={styles.body}>
        <div className={styles['left-side']}></div>
        <div className={styles['right-side']}>
          <div className={`${styles['form-container']} ${styles.modal}`}>
            <h1>Login to your account</h1>
            {/* <form action="/login" method="POST"> */}
            <form onSubmit={loginHandler}>
              <label>
                {/* User */}
                <input type='text' placeholder='Username' name='userName' />
              </label>
              <label>
                {/* Password */}
                <input type='password' placeholder='Password' name='password' />
              </label>
              <button className={`btn ${styles['login-btn']}`} type='submit'>
                Login
              </button>
            </form>

            <div className={styles['or-lines-div']}>
              <div className={styles.lines}>
                <p className={styles['or-login-with']}>Or</p>
              </div>
            </div>

            <div className={styles['login-with-div']}>
              <button
                type=''
                className={`btn ${styles['login-with-btn']} ${styles.google}`}
                href='https://www.google.com.ar/?hl=es'
              >
                <img
                  src='https://img.icons8.com/color/48/000000/google-logo.png'
                  alt='google sign-in icon'
                />
                Sign in with Google
              </button>
            </div>
            <p className={styles['no-account']}>
              No account? <button> Register</button>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
