import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import styles from './Post.module.css'

function Post(props) {
  const { post } = props

  return (
    <div className={styles.post}>
      <Link
        to={`/users/${post.author_id}`}
        className={`${styles['profile-link']} ${styles['nav-link']} `}
      >
        <div
          className={styles['nav-profile-img']}
          style={{
            background: `url(${
              post.author.image || 'default_user_img2.jpg'
            }) no-repeat center`,
            backgroundSize: 'cover',
          }}
        ></div>
        {post.author.firstName}
      </Link>
      <div className={styles['post-content']}>
        <p>{post.content}</p>
      </div>
      <div className={styles['post-actions']}>
        <div className={styles.likes}>
          <FontAwesomeIcon icon={faFireAlt} />
          <span>{post.likes.count}</span>
        </div>
        <div className={styles.comments}>
          {/* <FontAwesomeIcon icon={faComment} /> */}
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div>
    </div>
  )
}

export default Post
