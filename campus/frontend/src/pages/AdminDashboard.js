import { useEffect, useState } from 'react';
import API from '../api/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('overview');

  const fetchData = async () => {
    try {
      const [s, l, u] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/leaves'),
        API.get('/admin/users'),
      ]);
      setStats(s.data);
      setLeaves(l.data);
      setUsers(u.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const logout = () => { localStorage.clear(); window.location.href = '/'; };

  const getStatusBadge = (status) => {
    const map = {
      APPROVED: 'bg-green-100 text-green-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      MENTOR_APPROVED: 'bg-blue-100 text-blue-700',
      REJECTED: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏛️</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Console</h1>
            <p className="text-xs text-gray-500">Institution-wide audit & governance</p>
          </div>
        </div>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['overview', 'leaves', 'users'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg font-medium capitalize transition ${
                tab === t ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="Total Leaves" value={stats.totalLeaves} color="indigo" />
            <StatCard label="Pending" value={stats.pending} color="yellow" />
            <StatCard label="Approved" value={stats.approved} color="green" />
            <StatCard label="Rejected" value={stats.rejected} color="red" />
            <StatCard label="Exited" value={stats.exited} color="purple" />
            <StatCard label="Total Students" value={stats.totalStudents} color="blue" />
          </div>
        )}

        {/* Leaves Table */}
        {tab === 'leaves' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">All Leave Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-gray-600 text-sm">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">From</th>
                    <th className="py-3 px-4">To</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Exit Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map(l => (
                    <tr key={l.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{l.id}</td>
                      <td className="py-3 px-4">{l.student?.name}</td>
                      <td className="py-3 px-4">{l.reason}</td>
                      <td className="py-3 px-4 text-sm">{l.fromDate}</td>
                      <td className="py-3 px-4 text-sm">{l.toDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(l.status)}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {l.exitTime ? l.exitTime.replace('T', ' ').slice(0, 16) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Table */}
        {tab === 'users' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-gray-600 text-sm">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{u.id}</td>
                      <td className="py-3 px-4 font-medium">{u.name}</td>
                      <td className="py-3 px-4 text-sm">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    indigo: 'text-indigo-700',
    yellow: 'text-yellow-700',
    green: 'text-green-700',
    red: 'text-red-700',
    purple: 'text-purple-700',
    blue: 'text-blue-700',
  };
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
      <p className={`text-4xl font-bold mt-2 ${colors[color]}`}>{value}</p>
    </div>
  );
}

export default AdminDashboard;