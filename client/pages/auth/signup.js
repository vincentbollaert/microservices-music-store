import { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState([])

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/users/signup', formValues)
      setErrors([])
      console.log(response)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data.errors)
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>bleh</h1>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className="form-comtrol"
          value={formValues.email}
          onChange={e => setFormValues({ ...formValues, email: e.target.value })} />
        <span>{(errors.find(x => x.field === 'email') || {}).message}</span>
      </div>

      <div className="form-group">
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          className="form-comtrol"
          value={formValues.password}
          onChange={e => setFormValues({ ...formValues, password: e.target.value })} />
        <span>{(errors.find(x => x.field === 'password') || {}).message}</span>
      </div>
      <button className="btn btn-primary">Sign up</button>
    </form>
  )
}

export default Signup
