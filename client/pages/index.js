const Home = ({ currentUser }) => {
  console.log('currentUser', currentUser)
  return (
    <div>
      <h1>{currentUser ? `welcome ${currentUser.email}` : 'you are signed out'}</h1>
    </div>
  )
}
export default Home
