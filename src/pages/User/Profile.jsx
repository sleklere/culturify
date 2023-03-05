import { Fragment } from 'react'
import styles from './Profile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { json, useLoaderData } from 'react-router-dom'

import defaultUserImg from './default_user_img2.jpg'

function Profile() {
  const user = useLoaderData()

  console.log(user)
  console.log(user.image)

  return (
    <Fragment>
      {/* <h1>PROFILE PAGE</h1> */}
      <div className={styles.background}></div>
      <div className={styles['user-img-info']}>
        <div
          className={styles['profile-img']}
          style={{
            backgroundImage: `url(${user.image || defaultUserImg})`,
          }}
        ></div>
        <div className={styles['user-info']}>
          <h1 className={styles.name}>{user.firstName}</h1>
          <p className={styles.description}>{user.description}</p>
          <div className={styles['media-links-div']}>
            {user.tw_user && (
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noreferrer'
                className={styles['media-link']}
              >
                <FontAwesomeIcon icon={faTwitter} />
                {user.tw_user}
              </a>
            )}
            {user.ig_user && (
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noreferrer'
                className={styles['media-link']}
              >
                <FontAwesomeIcon icon={faInstagram} />
                {user.ig_user}
              </a>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export async function loader({ request, params }) {
  const response = await fetch(`http://localhost:5000/users/${params.userId}`)

  if (!response.ok) {
    throw json({
      message: 'Could not fetch requested user information',
      status: 500,
    })
  } else {
    return response
  }
}

export default Profile
