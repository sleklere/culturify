import { Fragment } from 'react'

// import styles from './Home.module.css'
import Post from '../Components/Post'

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Jon',
    lastName: 'Doe',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    postContent:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumendaeos dicta sequi a reprehenderit. Sunt at pariatur autem, natus, sequiexpedita, sapiente ea amet debitis doloribus odio sint similiqueperspiciatis.',
  },
  {
    id: 'u2',
    name: 'Jane',
    lastName: 'Doe',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    postContent: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
]

function Home() {
  return (
    <Fragment>
      {DUMMY_USERS.map(user => (
        <Post userInfo={user} key={user.id} />
      ))}
    </Fragment>
  )
}

export default Home
