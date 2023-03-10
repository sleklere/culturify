import { Fragment } from 'react'
import LoginForm from '../../Components/User/LoginForm'
import RegisterForm from '../../Components/User/RegisterForm'
import styles from './LoginRegister.module.css'

function UserFormsLayout(props) {
  return (
    <Fragment>
      <main className={styles['login-register-main']}>
        <div
          className={styles['left-side']}
          style={{
            backgroundImage: `${
              props.register
                ? "url('register-background.jpg')"
                : "url('login-background.jpg')"
            }`,
          }}
        ></div>
        <div className={styles['right-side']}>
          {props.register && <RegisterForm />}
          {props.login && <LoginForm />}
        </div>
      </main>
    </Fragment>
  )
}

export default UserFormsLayout
