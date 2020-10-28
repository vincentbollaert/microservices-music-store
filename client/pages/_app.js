import 'bootstrap/dist/css/bootstrap.css'

// nextjs stuff - a wrapper around the page component necessary for a global css include...
const App = ({ Component, pageProps }) => (
  <Component { ...pageProps } />
)

export default App
