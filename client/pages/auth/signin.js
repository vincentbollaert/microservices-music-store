import { useState } from 'react'
import Router from 'next/router'
import { useRequest } from '../../hooks/useRequest'

const Signin = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: formValues,
    onSuccess: () => Router.push('/')
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const body = await doRequest()
    
    console.log('TEST', body, errors)
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>sign in form</h1>
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
      <button className="btn btn-primary">Sign in</button>
    </form>
  )
}

export default Signin
