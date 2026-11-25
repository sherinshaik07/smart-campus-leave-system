import { Link } from 'react-router-dom';

function Landing() {
  const roles = [
    { name: 'Student', icon: '🎓', desc: 'Apply for leave & track status', color: 'from-indigo-500 to-blue-500' },
    { name: 'Mentor', icon: '👨‍🏫', desc: 'Review & approve student requests', color: 'from-purple-500 to-pink-500' },
    { name: 'HOD', icon: '🏛️', desc: 'Final approval & OTP generation', color: 'from-orange-500 to-red-500' },
    { name: 'Watchman', icon: '🛡️', desc: 'Verify OTP at campus gate', color: 'from-green-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">🎓</div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Smart Campus Leave</h1>
              <p className="text-xs text-gray-500">Digital Out-Pass System</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="px-5 py-2 text-gray-700 font-medium hover:text-indigo-600 transition">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            ✨ Digital Out-Pass & Multi-Level Approval Workflow
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Smart Leave Approval System
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Replace manual paper leave chits with a secure, multi-tier digital approval pipeline.
            From student request through Mentor and HOD, culminating in OTP verification at the college gate.
          </p>
          <Link to="/register" className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition shadow-lg">
            Get Started →
          </Link>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Built for Every Role</h2>
          <p className="text-center text-gray-500 mb-12">One system. Four dedicated portals.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                <div className={`w-14 h-14 bg-gradient-to-br ${r.color} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                  {r.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{r.name}</h3>
                <p className="text-sm text-gray-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
       
      {/* Demo Accounts Section */}
<section className="py-16 px-8 bg-indigo-50">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Try Demo Accounts</h2>
    <p className="text-center text-gray-500 mb-10">Use these credentials to test the full workflow instantly.</p>

    <div className="bg-white rounded-2xl shadow-md p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { role: '🎓 Student', email: 'student@cse.in', password: '123456' },
      { role: '👨‍🏫 Mentor', email: 'mentor@clg.in', password: 'mentor12' },
      { role: '🏛️ HOD', email: 'hod@clg.in', password: 'hod12' },
      { role: '🛡️ Watchman', email: 'watchman@clg.in', password: 'security12' },
      { role: '🏛️ Admin', email: 'admin@clg.in', password: 'admin12' },
    ].map((u) => (
      <div key={u.email} className="border border-gray-200 rounded-lg p-4">
        <p className="font-semibold text-gray-800 mb-2">{u.role}</p>
        <p className="text-xs text-gray-500">Email</p>
        <p className="font-mono text-sm text-gray-700 mb-2">{u.email}</p>
        <p className="text-xs text-gray-500">Password</p>
        <p className="font-mono text-sm text-gray-700">{u.password}</p>
      </div>
    ))}
  </div>
</div>
    <p className="text-center text-sm text-gray-500 mt-6">
      Or register with your own Gmail to receive the OTP by email.
    </p>
  </div>
</section>
      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature icon="🔐" title="JWT + BCrypt Auth" desc="Role-derived identities with stateless JWT tokens and BCrypt password hashing." />
            <Feature icon="🔢" title="Auto OTP Generation" desc="Once the HOD approves, a 6-digit OTP is generated with expiry & one-time-use." />
            <Feature icon="🛡️" title="Gate Verification" desc="Campus security verifies OTP at the gate. Once consumed, OTP is discarded." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-8 text-center text-sm">
        <p className="font-semibold text-white mb-2">Smart Campus Leave System</p>
        <p>Student → Mentor → HOD → OTP Generation → Gate Verification → Exit Recorded</p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="p-6 border border-gray-100 rounded-2xl hover:border-indigo-200 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

export default Landing;