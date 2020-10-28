import 'bootstrap/dist/css/bootstrap.css'
import Router from 'next/router'
import Link from 'next/link'
import buildClient from "../api/build-client"
import { useRequest } from '../hooks/useRequest'

// nextjs stuff - a wrapper around the page component necessary for a global css include...
const App = ({ Component, pageProps, data: { currentUser } }) => {
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
          : <div>
              <div>
                <Link href="/auth/signup">
                  <a>
                    sign up
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/auth/signin">
                  <a>
                    sign in
                  </a>
                </Link>
              </div>
            </div>
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

  // nextJS getInitialProps fn is overridden in child pages (like landing page)
  // so call it manually in app if child page has it defined
  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return {
    pageProps,
    data
  }
}

export default App
