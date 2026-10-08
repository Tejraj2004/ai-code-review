import axios from "axios"


const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
})


export const registerUser = async (email, password) => {

  const response = await api.post(
    "/auth/register",
    {
      email,
      password,
    }
  )

  return response.data
}


export const loginUser = async (email, password) => {

  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  )

  return response.data
}


export const createReview = async (
  language,
  code,
  token
) => {

  const response = await api.post(
    "/reviews",
    {
      language,
      code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}


export const getReviews = async (token) => {

  const response = await api.get(
    "/reviews",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}