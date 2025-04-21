import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const { handleRegister } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-800 to-indigo-700 flex items-center justify-center py-12 px-4">
    <div className="max-w-md w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Create Account</h2>
      <form  onSubmit={(e) =>
          handleRegister(e, username, email, password, selectedFile)
        }>
        <div className="mb-5">
          <label htmlFor="profileImage" className="block text-sm font-medium text-white mb-1">
            Profile Image
          </label>
          <div className="mt-1 flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-indigo-700 bg-opacity-30 text-white rounded-lg shadow-lg tracking-wide border border-indigo-400 cursor-pointer hover:bg-indigo-800 hover:bg-opacity-40 transition-all duration-300">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Select an image</span>
              <input 
                type="file" 
                id="profileImage" 
                name="profileImage"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </label>
          </div>
          {selectedFile && (
            <p className="mt-2 text-sm text-indigo-200 text-center">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="johndoe"
          />
        </div>

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
          <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
            Password
          </label>
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
          Create Account
        </button>
        
        <div className="mt-6 flex items-center justify-center text-white">
          <span>Already have an account? </span>
          <a href="/login" className="ml-2 text-indigo-200 hover:text-white font-medium underline">
            Sign in
          </a>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Register;
