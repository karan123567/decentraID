import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  LogOut,
  HelpingHandIcon,
  Sun,
  Moon
} from 'lucide-react';
import fakedata from '../../fake_student_records_blockchain_certificates.json';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const student = fakedata[0];
  const welcomesms = `Welcome ${student.Full_Name} to our DecentraId app`;
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('studentName', student.Full_Name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentName');
    navigate('/');
  };

  return (
    <div className={`flex h-screen m-0 p-0 font-sans ${darkMode ? 'bg-[#0F0F0F] text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Sidebar */}
      <aside className={`w-72 h-screen p-6 flex flex-col justify-between ${darkMode ? 'bg-[#1C1C1C]' : 'bg-gray-100'}`}>
        <div>
          {/* Theme Toggle */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Student Info */}
          <div className="flex items-center space-x-3 mb-10">
            <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">
              {student.Full_Name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm">{student.Full_Name}</p>
              <p className="text-xs text-gray-400">Student</p>
            </div>
          </div>

          {/* Menu */}
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
              <HelpCircle size={18} /> <span>Help & Query</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
              <HelpingHandIcon size={18} /> <span>FAQ</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-red-400 cursor-pointer" onClick={handleLogout}>
              <LogOut size={18} /> <span>Logout</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 mt-6">
          <h3 className="text-sm font-semibold mb-1 text-white">About DecentraID</h3>
          DecentraID is a decentralized app to manage and share academic certificates using blockchain.
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-auto p-10 bg-[#F9FAFB] dark:bg-[#121212]">
        <div className="bg-white dark:bg-[#1C1C1C] shadow rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{welcomesms}</h2>
        </div>

        <div className="bg-white dark:bg-[#1C1C1C] shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-500">🎓 Student Details</h3>
          <div className="space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-200">
            <p><strong>Name:</strong> {student.Full_Name}</p>
            <p><strong>Roll Number:</strong> {student.Roll_Number}</p>
            <p><strong>University Name:</strong> {student.University_Name}</p>
            <p><strong>College Name:</strong> {student.College_Name}</p>
            <p><strong>Degree:</strong> {student.Degree}</p>
            <p><strong>Branch or Specialization:</strong> {student.Branch_or_Specialization}</p>
            <p><strong>Year of Passing:</strong> {student.Year_of_Passing}</p>
            <p><strong>Certificate Name:</strong> {student.Certificate_Name}</p>
            <p><strong>Issue Date:</strong> {student.Issue_Date}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
