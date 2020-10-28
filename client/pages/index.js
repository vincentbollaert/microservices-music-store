import buildClient from "../api/build-client"

const Home = (props) => {
  console.log('props', props)
  return (
    <h1>homepage 33</h1>
  )
}
Home.getInitialProps = async ({ req }) => {
  // getInitialProps also runs when navigating between pages, so need to know if this is exeuted by browser or server
  // also, nginx looks at host to determine routing rules. for node need to set this manually as not part of url
  // so need to set host header, but also cookie header (usually handled by browser), so just set all from req object
  // if (typeof window === 'undefined') {
  //   const { data } = await axios.get(
  //     'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
  //     {
  //       headers: req.headers
  //     }
  //   )
  //   return data
  // } else {
    const { data } = await buildClient(req).get('api/users/currentuser') 
    return data
  // }
}
export default Home
