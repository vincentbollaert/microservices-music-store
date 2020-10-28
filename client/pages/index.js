import axios from "axios"

const Home = ({ data }) => {
  console.log('data', data)
  return (
    <h1>homepage 33</h1>
  )
}
Home.getInitialProps = async () => {
  // getInitialProps also runs when navigating between pages, so need to know if this is exeuted by browser or server
  // also, nginx looks at host to determine routing rules. for node need to set this manually as not part of url
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          Host: 'microservices-music-store.dev'
        }
      }
    ) 
    return data
  }

  const { data } = await axios.get('/api/users/currentuser') 
  return data
}
export default Home
