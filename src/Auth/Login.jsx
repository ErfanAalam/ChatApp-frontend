import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

const Login = () => {

    const {handleLogin} = useContext(UserContext)

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 flex items-center justify-center">
    <div className="max-w-md w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl p-8 m-4">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Welcome Back</h2>
      <form onSubmit={(e)=>handleLogin(e,email,password)}>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <a href="/forgot-password" className="text-xs text-indigo-100 hover:text-white">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-800 text-white py-3 px-4 rounded-md hover:bg-indigo-900 transition duration-300 ease-in-out transform hover:-translate-y-1 font-medium text-lg"
        >
          Sign In
        </button>
        
        <div className="mt-6 text-center text-white">
          <span>New user? </span>
          <a href="/" className="text-indigo-200 hover:text-white font-medium underline">
            Create account
          </a>
        </div>
      </form>
    </div>
  </div>

  )
}

export default Login
