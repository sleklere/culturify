import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modals.module.css'
import { Backdrop } from './LoginModal'

function ModalOverlay(props) {
  return (
    <Fragment>
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
        <button className={styles.btn} type='submit'>
          Register
        </button>
        <p className={styles['no-account']}>
          Already have an account?{' '}
          <button onClick={props.onClickLogin}> Login</button>
        </p>
      </form>
    </Fragment>
  )
}

const portalElement = document.getElementById('overlays')

function RegisterModal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClickLogin={props.showLogin} />,
        portalElement
      )}
    </Fragment>
  )
}

export default RegisterModal
