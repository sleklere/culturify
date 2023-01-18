import { Fragment } from 'react'
import styles from './Profile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { json, useLoaderData } from 'react-router-dom'

function Profile() {
  const user = useLoaderData()

  return (
    <Fragment>
      {/* <h1>PROFILE PAGE</h1> */}
      <div className={styles.background}></div>
      <div className={styles['user-img-info']}>
        <div
          className={styles['profile-img']}
          style={{ backgroundImage: `url(${user.image})` }}
        ></div>
        <div className={styles['user-info']}>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum,
            unde praesentium? Necessitatibus molestias illum similique
            repellendus dolorum provident quibusdam neque. Pariatur quaerat
            delectus blanditiis sequi soluta, libero nobis dicta quam!
          </p>
          <div className={styles['media-links-div']}>
            {user.socialMediaLinks.twitter && (
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noreferrer'
                className={styles['media-link']}
              >
                <FontAwesomeIcon icon={faTwitter} />
                {user.socialMediaLinks.twitter}
              </a>
            )}
            {user.socialMediaLinks.instagram && (
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noreferrer'
                className={styles['media-link']}
              >
                <FontAwesomeIcon icon={faInstagram} />
                {user.socialMediaLinks.instagram}
              </a>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export async function loader({ request, params }) {
  const response = await fetch(
    `http://localhost:5000/test-users/${params.userId}`
  )

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
