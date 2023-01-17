import { Link } from 'react-router-dom'
import styles from '../../pages/Login-Register.module.css'

function RegisterForm() {
  return (
    <div className={`${styles['form-container']} ${styles.modal}`}>
      <h1>Create your account</h1>
      <form
        className={`${styles['register-modal']} ${styles.modal}`}
        action='/register'
        method='POST'
      >
        <label>
          User
          <input type='text' placeholder='Your username' name='userName' />
        </label>
        <label>
          Password
          <input type='password' placeholder='Your password' name='password' />
        </label>
        <label>
          Repeat password
          <input
            type='password'
            placeholder='Your password'
            name='passwordRepeated'
          />
        </label>
        <button className={`btn ${styles['register-btn']}`} type='submit'>
          Register
        </button>
      </form>

      <div className={styles['or-lines-div']}>
        <div className={styles.lines}>
          <p className={styles['or-login-with']}>Or</p>
        </div>
      </div>

      <div className={styles['login-with-div']}>
        <button
          // type=''
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
        Already have an account? <Link to={'/login'}> Login</Link>
      </p>
    </div>
  )
}

export default RegisterForm
