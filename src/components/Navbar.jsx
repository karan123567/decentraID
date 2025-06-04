import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition">DecentraID</Link>
      <div className="space-x-6">
        <Link to="/student" className="hover:text-green-400 transition">Student</Link>
        <Link to="/employer" className="hover:text-red-400 transition">University Admin</Link>
      </div>
    </nav>
  );
}