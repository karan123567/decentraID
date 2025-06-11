import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isStudentDashboard = location.pathname === '/student-dashboard';
  const isAdminDashboard = location.pathname === '/admin-dashboard';
  const isLoginPage = location.pathname === '/student' || location.pathname === '/employer';

  const studentName = localStorage.getItem('studentName');

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition">
        DecentraID
      </Link>

      {/* Hide buttons on login pages */}
      {!isLoginPage && (
        <div className="space-x-6">
          {!isAdminDashboard && (
            studentName && isStudentDashboard ? (
              <span className="text-green-400 font-semibold">{studentName}</span>
            ) : (
              <Link to="/student" className="hover:text-green-400 transition">Student</Link>
            )
          )}
          {!isStudentDashboard && (
            <Link to="/employer" className="hover:text-red-400 transition">University Admin</Link>
          )}
        </div>
      )}
    </nav>
  );
}
