import buildClient from "../api/build-client"

const Home = (props) => {
  console.log('props', props)
  return (
    <h1>homepage 33</h1>
  )
}

// apprently it is convention to refer to the entire async params as context
Home.getInitialProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser') 
  return data
}
export default Home
