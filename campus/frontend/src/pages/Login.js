import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import API from '../api/api';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', email);

      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      const role = payload.role;

      if (role === 'STUDENT') navigate('/student');
      else if (role === 'MENTOR') navigate('/mentor');
      else if (role === 'HOD') navigate('/hod');
      else if (role === 'WATCHMAN') navigate('/watchman');
      else if (role === 'ADMIN') navigate('/admin'); 
      else navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎓</div>
          <h1 className="text-3xl font-bold text-gray-800">Smart Campus</h1>
          <p className="text-gray-500 mt-1">Leave & Exit Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="you@college.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>

          <p className="text-center mt-4 text-gray-600">
  Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold">Register</Link>
</p>
<p className="text-center mt-3">
  <Link to="/" className="text-gray-500 text-sm hover:text-indigo-600">← Back to Home</Link>
</p>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;