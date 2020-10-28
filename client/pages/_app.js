import 'bootstrap/dist/css/bootstrap.css'
import Router from 'next/router'
import buildClient from "../api/build-client"
import { useRequest } from '../hooks/useRequest'

// nextjs stuff - a wrapper around the page component necessary for a global css include...
const App = ({ Component, pageProps, currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: () => Router.push('/')
  })
  return (
    <div>
      <header>
        {currentUser
          ? <button onClick={doRequest}>sign out</button>
          : <div><div><a href="/auth/signup">sign up</a></div><div><a href="/auth/signin">sign in</a></div></div>
        }
        <div>Signout errors: {errors.length}</div>
      </header>
      <Component { ...pageProps } currentUser={currentUser} />
    </div>
  )
}

App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser') 
  return data
}

export default App
