import 'bootstrap/dist/css/bootstrap.css'

// nextjs stuff - a wrapper around the page component necessary for a global css include...
export default ({ Component, pageProps }) => (
  <Component { ...pageProps } />
)
