import { Fragment } from 'react'
import Header from '../Components/Header'

function ErrorPage() {
  return (
    <Fragment>
      <Header />
      <main>
        <h1>An error ocurred!</h1>
        <p>Could not find this page!</p>
      </main>
    </Fragment>
  )
}

export default ErrorPage
