import { json, useLoaderData } from 'react-router-dom'

import styles from './Home.module.css'
import Post from '../Components/Post'

function Home() {
  const data = useLoaderData()

  return (
    <main className={styles.main}>
      <div className={styles['posts-container']}>
        {data.map(user => (
          <Post userInfo={user} key={user.id} />
        ))}
        <p className={styles['feed-end']}>End of feed.</p>
      </div>
    </main>
  )
}

export async function loader() {
  const response = await fetch('http://localhost:5000/test-users')

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch users.' }), {
    //   status: 500,
    // })
    return json({ message: 'Could not fetch users.' }, { status: 500 })
  } else {
    return response
  }
}

export default Home
