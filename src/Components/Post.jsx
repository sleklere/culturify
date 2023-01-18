import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import styles from './Post.module.css'

function Post(props) {
  const { userInfo } = props

  return (
    <div className={styles.post}>
      <Link
        to={`/users/${userInfo.id}`}
        className={`${styles['profile-link']} ${styles['nav-link']} `}
      >
        <div
          className={styles['nav-profile-img']}
          style={{
            background: `url(${props.userInfo.image}) no-repeat center`,
            backgroundSize: 'cover',
          }}
        ></div>
        {userInfo.name}
      </Link>
      <div className={styles['post-content']}>
        <p>{props.userInfo.postContent}</p>
      </div>
      <div className={styles['post-actions']}>
        <FontAwesomeIcon icon={faFireAlt} />
        {/* <FontAwesomeIcon icon={faComment} /> */}
        <FontAwesomeIcon icon={faCommentDots} />
      </div>
    </div>
  )
}

export default Post
