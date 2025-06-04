import React, { useState } from "react";
import CryptoJS from "crypto-js";
import students from "../components/fake_student_records_blockchain_certificates.json";
import Select from "react-select"; // ✅ imported
import './css/studentdashboard.css';
import { HelpCircle, LogOut, HelpingHandIcon } from 'lucide-react';

const UniversityDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

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
      const record = {
        ...selectedStudent,
        hash,
        link: `https://yourapp.com/verify/${hash}`,
        date: new Date().toLocaleDateString()
      };
      setRecords([...records, record]);
      setTimeout(() => {
        setMessage("✅ Certificate uploaded & hash generated!");
      }, 1000);
    };
    reader.readAsBinaryString(file);
  };

  // 🔁 Prepare options for react-select
  const studentOptions = students.map((student) => ({
    value: student,
    label: `${student.Full_Name} (${student.Roll_Number})`
  }));

  return (
    <div className="parant">
      <div className="left">
        <h4>DASHBOARD</h4>
        <h4><span>Admin Information</span></h4>
        <div className="line"></div>

        <li className="sidebar-item"><HelpCircle size={30} /> Help & Queary</li>
        <li className="sidebar-item"><HelpingHandIcon size={30} /> FAQ</li>
        <li className="sidebar-item"><LogOut size={30} /> Logout</li>

        <div className="line2"></div>
      </div>

      <div className="right" style={{ padding: "30px", fontFamily: "Arial" }}>
        <div className="parant1">

          {/* ✅ Autocomplete Dropdown */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold" }}>Select Student (Search by name or roll no.): </label>
            <div style={{ width: "350px" }}>
              <Select
                options={studentOptions}
                onChange={(option) => setSelectedStudent(option?.value)}
                placeholder="Search or select student..."
              />
            </div>
          </div>

          {/* 📄 Upload Certificate */}
          <div style={{ marginBottom: "20px" }}>
            <label><strong>Upload Certificate: </strong></label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Upload</button>
          </div>

        </div>

        {message && <p style={{ color: "green" }}>{message}</p>}

        <h3 className="h3">📁 Uploaded Certificates</h3>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No.</th>
              <th>Degree</th>
              <th>College</th>
              <th>Link</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, i) => (
              <tr key={i}>
                <td>{rec.Full_Name}</td>
                <td>{rec.Roll_Number}</td>
                <td>{rec.Degree}</td>
                <td>{rec.College_Name}</td>
                <td>
                  <a href={rec.link} target="_blank" rel="noreferrer">Verify</a>
                </td>
                <td>{rec.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityDashboard;
