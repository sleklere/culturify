import { Fragment } from 'react'
import styles from './Profile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useParams } from 'react-router-dom'

function Profile() {
  const params = useParams()

  // params.user

  return (
    <Fragment>
      {/* <h1>PROFILE PAGE</h1> */}
      <div className={styles.background}></div>
      <div className={styles['user-img-info']}>
        <div className={styles['profile-img']}></div>
        <div className={styles['user-info']}>
          <h1 className={styles.name}>{params.user}</h1>
          <p className={styles.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum,
            unde praesentium? Necessitatibus molestias illum similique
            repellendus dolorum provident quibusdam neque. Pariatur quaerat
            delectus blanditiis sequi soluta, libero nobis dicta quam!
          </p>
          <div className={styles['media-links-div']}>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noreferrer'
              className={styles['media-link']}
            >
              <FontAwesomeIcon icon={faTwitter} />
              claire_tw
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noreferrer'
              className={styles['media-link']}
            >
              <FontAwesomeIcon icon={faInstagram} />
              claire_ig
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile
