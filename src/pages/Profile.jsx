import { Fragment } from 'react'
import Header from '../Components/Header'
import styles from './Profile.module.css'

function Profile() {
  return (
    <Fragment>
      <Header />
      {/* <h1>PROFILE PAGE</h1> */}
      <div className={styles.background}></div>
      <div className={styles['user-img-info']}>
        <div className={styles['profile-img']}></div>
        <div className={styles['user-info']}>
          <h1 className={styles.name}>Claire</h1>
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
              claire_tw
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile
