import { useEffect, useState } from 'react';
import API from '../api/api';

function MentorDashboard() {
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState('pending');

  const fetchPending = async () => {
    const res = await API.get('/mentor/pending');
    setPending(res.data);
  };

  const fetchHistory = async () => {
    const res = await API.get('/mentor/history');
    setHistory(res.data);
  };

  useEffect(() => {
    fetchPending();
    fetchHistory();
  }, []);

  const approve = async (id) => {
    await API.put(`/mentor/approve/${id}`);
    fetchPending();
    fetchHistory();
  };

  const reject = async (id) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    await API.put(`/mentor/reject/${id}`, { reason });
    fetchPending();
    fetchHistory();
  };

  const logout = () => { localStorage.clear(); window.location.href = '/'; };

  const getStatusBadge = (status) => {
    const map = {
      APPROVED: 'bg-green-100 text-green-700',
      MENTOR_APPROVED: 'bg-blue-100 text-blue-700',
      REJECTED: 'bg-red-100 text-red-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <h1 className="text-xl font-bold text-gray-800">Smart Campus Leave</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Mentor Portal</span>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('pending')} className={`px-5 py-2 rounded-lg font-medium transition ${tab === 'pending' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>
            Pending ({pending.length})
          </button>
          <button onClick={() => setTab('history')} className={`px-5 py-2 rounded-lg font-medium transition ${tab === 'history' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>
            History ({history.length})
          </button>
        </div>

        {/* Pending */}
        {tab === 'pending' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">📥 Pending Leave Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-gray-600 text-sm">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">From</th>
                    <th className="py-3 px-4">To</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-8 text-gray-400">No pending requests</td></tr>
                  ) : (
                    pending.map((l) => (
                      <tr key={l.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{l.id}</td>
                        <td className="py-3 px-4 font-medium">{l.student?.name}</td>
                        <td className="py-3 px-4">{l.reason}</td>
                        <td className="py-3 px-4 text-sm">{l.fromDate}</td>
                        <td className="py-3 px-4 text-sm">{l.toDate}</td>
                        <td className="py-3 px-4 flex gap-2">
                          <button onClick={() => approve(l.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">✓ Approve</button>
                          <button onClick={() => reject(l.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">✕ Reject</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* History */}
        {tab === 'history' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">📜 Approval History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-gray-600 text-sm">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Dates</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-8 text-gray-400">No history yet</td></tr>
                  ) : (
                    history.map((l) => (
                      <tr key={l.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{l.id}</td>
                        <td className="py-3 px-4 font-medium">{l.student?.name}</td>
                        <td className="py-3 px-4">{l.reason}</td>
                        <td className="py-3 px-4 text-sm">{l.fromDate} → {l.toDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(l.status)}`}>
                            {l.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MentorDashboard;