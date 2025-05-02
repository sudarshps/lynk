import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import ResponsiveAppBar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axiosApi from '../api/axiosApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const {setUser} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 8 characters');
      return;
    }

    await axiosApi.post('/api/users/login', { email, password })
      .then((res) => {        
        if (res.data.valid) {
          Swal.fire({
            title: "Success!",
            text: res.data.message,
            icon: "success"
          });

          navigate('/')
          setUser(true)

        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.response.data.message,
          });
        }
      }).catch(err => {           
        if (!err.response.data.vaild) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        }

      })

  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to Lynk
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to={'/signup'} className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-sm"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  );
}