import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import styles from '../../pages/User/LoginRegister.module.css'

function RegisterForm() {
  const data = useActionData()
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  return (
    <div className={`${styles['form-container']} ${styles.modal}`}>
      <h1>Create your account</h1>
      <Form
        method='post'
        className={`${styles['register-modal']} ${styles.modal}`}
      >
        {data && data.errors && (
          <ul className={styles.errors}>
            {Object.values(data.errors).map(err => (
              <li key={err} className={styles['errors-item']}>
                {err}
              </li>
            ))}
          </ul>
        )}
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
        <button
          className={`btn ${styles['register-btn']}`}
          type='submit'
          disabled={isSubmitting}
        >
          {/* {isSubmitting ? "Processing..." : "Register"} */}
          Register
        </button>
      </Form>

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

export async function action({ request, params }) {
  const data = await request.formData()

  const userData = {
    id: 'u3',
    name: data.get('userName'),
    postContent: 'Mock post',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    password: data.get('password'),
    passwordRepeated: data.get('passwordRepeated'),
  }

  console.log(userData)

  const response = await fetch('http://localhost:5000/register-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (response.status === 422) {
    return response
  }

  if (!response.ok) {
    throw json({ message: 'Could not register user' }, { status: 500 })
  }

  return redirect('/')
}
