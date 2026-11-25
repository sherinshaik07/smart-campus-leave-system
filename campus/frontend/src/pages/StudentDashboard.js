import { useEffect, useState } from 'react';
import API from '../api/api';

function StudentDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchLeaves = async () => {
    try {
      const res = await API.get('/student/leaves');
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchLeaves(); }, []);

  const submitLeave = async (e) => {
    e.preventDefault();
    try {
      await API.post('/student/leave', { reason, fromDate, toDate });
      setReason(''); setFromDate(''); setToDate('');
      fetchLeaves();
    } catch (err) {
      alert('Error submitting leave');
    }
  };

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


  const printPass = (leave) => {
  const printWindow = window.open('', '_blank');
  const studentName = localStorage.getItem('email') || 'Student';

  printWindow.document.write(`
    <html>
      <head>
        <title>Gate Clearance Slip</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; background: #f3f4f6; }
          .pass { background: white; max-width: 700px; margin: 0 auto; padding: 40px; border-radius: 16px; border: 4px solid #4f46e5; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px dashed #ddd; padding-bottom: 20px; }
          .logo { font-size: 32px; font-weight: bold; color: #4f46e5; }
          .stamp { font-size: 14px; font-weight: bold; color: #16a34a; border: 2px solid #16a34a; padding: 6px 12px; border-radius: 8px; transform: rotate(-5deg); }
          .section { margin-top: 30px; }
          .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: 600; color: #555; }
          .value { color: #111; font-weight: 500; }
          .otp-box { margin-top: 30px; text-align: center; background: #ecfdf5; border: 3px solid #10b981; padding: 20px; border-radius: 12px; }
          .otp { font-size: 48px; font-weight: bold; color: #047857; letter-spacing: 8px; }
          .footer { margin-top: 40px; text-align: center; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="pass">
          <div class="header">
            <div>
              <div class="logo">🎓 Smart Campus</div>
              <div style="color:#777;font-size:14px;">Digital Gate Clearance Slip</div>
            </div>
            <div class="stamp">VERIFIED ✓</div>
          </div>

          <div class="section">
            <div class="row"><span class="label">Student</span><span class="value">${studentName}</span></div>
            <div class="row"><span class="label">Leave ID</span><span class="value">#${leave.id}</span></div>
            <div class="row"><span class="label">Reason</span><span class="value">${leave.reason}</span></div>
            <div class="row"><span class="label">From Date</span><span class="value">${leave.fromDate}</span></div>
            <div class="row"><span class="label">To Date</span><span class="value">${leave.toDate}</span></div>
            <div class="row"><span class="label">Status</span><span class="value" style="color:#16a34a;">✓ APPROVED</span></div>
          </div>

          <div class="otp-box">
            <div style="font-size:14px;color:#047857;font-weight:600;margin-bottom:8px;">6-DIGIT EXIT OTP</div>
            <div class="otp">${leave.otp || '------'}</div>
            <div style="font-size:12px;color:#777;margin-top:8px;">Show this at the gate for exit</div>
          </div>

          <div class="footer">
            Smart Campus Leave System · Multi-Level Authority Clearance<br>
            Student → Mentor → HOD → OTP → Gate Verification → Exit
          </div>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 500);
};

  // Timeline steps
  const getSteps = (leave) => {
    const isMentorApproved = ['MENTOR_APPROVED', 'APPROVED'].includes(leave.status);
    const isHodApproved = leave.status === 'APPROVED';
    const isExited = leave.exitTime != null;

    return [
      { label: 'Applied', done: true },
      { label: 'Mentor', done: isMentorApproved },
      { label: 'HOD', done: isHodApproved },
      { label: 'Exit', done: isExited },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <h1 className="text-xl font-bold text-gray-800">Smart Campus Leave</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Student Portal</span>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        {/* Apply Leave */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 Apply for Leave</h2>
          <form onSubmit={submitLeave} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg">
              Submit Request
            </button>
          </form>
        </div>

        {/* Leave History with Timeline */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 My Leave Requests</h2>
        {leaves.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center text-gray-400">
            No leave requests yet
          </div>
        ) : (
          leaves.map((l) => (
            <div key={l.id} className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{l.reason}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {l.fromDate} → {l.toDate}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(l.status)}`}>
                  {l.status}
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="flex items-center justify-between mt-6">
                {getSteps(l).map((step, idx, arr) => (
                  <div key={idx} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <span className={`text-xs mt-2 font-medium ${step.done ? 'text-green-700' : 'text-gray-400'}`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 ${step.done ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    )}
                  </div>
                ))}
              </div>

             {l.status === 'REJECTED' && l.rejectionReason && (
  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
    ❌ Rejected: {l.rejectionReason}
  </div>
)}
             {l.status === 'APPROVED' && !l.exitTime && (
  <div className="mt-4 flex gap-2">
    <button
      onClick={() => printPass(l)}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
    >
      🖨️ Print Gate Pass
    </button>
  </div>
)}

{l.exitTime && (
  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
    ✅ Exit recorded at: {l.exitTime.replace('T', ' ').slice(0, 16)}
  </div>
)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;