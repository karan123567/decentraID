import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <LogOut className="inline-block mr-2" size={18} />
          Logout
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Roll No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">College</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Course</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student._id}>
                <td className="px-4 py-2 text-sm">{student.name}</td>
                <td className="px-4 py-2 text-sm">{student.rollNo}</td>
                <td className="px-4 py-2 text-sm">{student.college}</td>
                <td className="px-4 py-2 text-sm">{student.course}</td>
                <td className="px-4 py-2 text-sm">{student.email}</td>
                <td className="px-4 py-2 text-sm">{student.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
