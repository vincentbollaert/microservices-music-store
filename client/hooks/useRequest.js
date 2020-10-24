import { useState } from 'react'
import axios from 'axios'

export const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState([])

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body)
      setErrors([])
      return response.data
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return { doRequest, errors }
}
