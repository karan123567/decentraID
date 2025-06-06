import React, { useState } from "react";
import CryptoJS from "crypto-js";
import students from "../../fake_student_records_blockchain_certificates.json";
import Select from "react-select";
import { HelpCircle, LogOut, HelpingHandIcon, Sun, Moon } from "lucide-react";

const UniversityDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedStudent || !file) {
      alert("Please select a student and upload a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const hash = CryptoJS.SHA256(fileContent).toString();

      const alreadyExists = records.some(
        (r) => r.Roll_Number === selectedStudent.Roll_Number && r.hash === hash
      );
      if (alreadyExists) {
        setMessage("⚠️ Duplicate certificate entry. Upload aborted.");
        return;
      }

      const record = {
        ...selectedStudent,
        hash,
        link: `https://yourapp.com/verify/${hash}`,
        date: new Date().toLocaleDateString(),
      };

      setRecords([...records, record]);
      setMessage("✅ Certificate uploaded & hash generated!");
    };
    reader.readAsBinaryString(file);
  };

  const studentOptions = students.map((student) => ({
    value: student,
    label: `${student.Full_Name} (${student.Roll_Number})`,
  }));

  return (
    <div className={`flex min-h-screen transition-colors ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <aside className={`w-64 ${darkMode ? "bg-gray-800" : "bg-blue-900 text-white"} p-6 flex flex-col justify-between`}>
        <div>
          <h4 className="text-2xl font-bold mb-4">DASHBOARD</h4>
          <h4 className="text-sm uppercase tracking-wide mb-2">Admin Information</h4>
          <div className="border-b border-white mb-4"></div>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2"><HelpCircle size={20} /> <span>Help & Query</span></li>
            <li className="flex items-center space-x-2"><HelpingHandIcon size={20} /> <span>FAQ</span></li>
            <li className="flex items-center space-x-2"><LogOut size={20} /> <span>Logout</span></li>
          </ul>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />} {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">University Certificate Upload Portal</h2>

        <div className="mb-6">
          <label className="font-semibold block mb-2">🎓 Select Student</label>
          <div className="w-full max-w-md">
            <Select
              options={studentOptions}
              onChange={(option) => setSelectedStudent(option?.value)}
              placeholder="Search or select student..."
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({ ...base, backgroundColor: darkMode ? '#1f2937' : '#fff', color: darkMode ? 'white' : 'black' }),
                menu: (base) => ({ ...base, backgroundColor: darkMode ? '#374151' : '#fff' }),
                singleValue: (base) => ({ ...base, color: darkMode ? 'white' : 'black' })
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="font-semibold block mb-2">📄 Upload Certificate</label>
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button
            onClick={handleUpload}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>

        {message && (
          <div className={`mb-4 font-medium ${message.includes('Duplicate') ? 'text-yellow-400' : 'text-green-400'}`}>
            {message}
          </div>
        )}

        <div className={`shadow-md rounded-lg p-6 mt-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h3 className="text-lg font-bold mb-4">📁 Uploaded Certificates</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Roll No.</th>
                  <th className="p-2 border">Degree</th>
                  <th className="p-2 border">College</th>
                  <th className="p-2 border">Verify Link</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, i) => (
                  <tr key={i} className="text-center">
                    <td className="p-2 border">{rec.Full_Name}</td>
                    <td className="p-2 border">{rec.Roll_Number}</td>
                    <td className="p-2 border">{rec.Degree}</td>
                    <td className="p-2 border">{rec.College_Name}</td>
                    <td className="p-2 border text-blue-400 underline">
                      <a href={rec.link} target="_blank" rel="noreferrer">Verify</a>
                    </td>
                    <td className="p-2 border">{rec.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UniversityDashboard;
