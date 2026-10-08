import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "../api"


function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  const handleLogin = async (event) => {

  event.preventDefault()

  setError("")
  setLoading(true)

  try {

    const data = await loginUser(
      email,
      password
    )

    localStorage.setItem(
      "token",
      data.access_token
    )

    navigate("/dashboard")

  } catch (error) {

    if (error.response?.data?.detail) {
      setError(error.response.data.detail)
    } else {
      setError("Login failed. Please try again.")
    }

  } finally {

    setLoading(false)

  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-slate-900">
          AI Code Review
        </h1>

        <p className="mt-2 text-slate-500">
          Sign in to review your code with AI.
        </p>


        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          <div>

            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>


        <p className="mt-6 text-center text-sm text-slate-500">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  )
}


export default Login