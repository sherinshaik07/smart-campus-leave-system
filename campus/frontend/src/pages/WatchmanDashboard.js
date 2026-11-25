import { useState } from 'react';
import API from '../api/api';

function WatchmanDashboard() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const verify = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/watchman/scan', { token: otp });
      setMessage(res.data);
      setOtp('');
    } catch (err) {
      setMessage('Invalid or Already Used OTP');
    }
  };

  const logout = () => { localStorage.clear(); window.location.href = '/'; };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <h1 className="text-xl font-bold text-gray-800">Security Gate Terminal</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Watchman Portal</span>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🔐 Verify Exit OTP</h2>
          <p className="text-sm text-gray-500 mb-6">Ask student for their 6-digit OTP and enter it below.</p>

          <form onSubmit={verify}>
            <input
              type="text"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              required
              className="w-full px-4 py-6 border-2 border-gray-300 rounded-xl text-center text-3xl font-bold tracking-widest focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl text-lg"
            >
              Verify & Record Exit
            </button>
          </form>
        </div>

        {message && (
          <div className={`mt-6 p-6 rounded-2xl text-center font-semibold text-lg ${message.includes('Successfully') ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchmanDashboard;