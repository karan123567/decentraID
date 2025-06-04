import React, { useState, useEffect } from 'react';
import '../../studentdashboard.css';
import { HelpCircle, Home, FileText, UploadCloud, CheckCircle, Settings, LogOut, Link2, Clock, HelpingHandIcon } from 'lucide-react';
import fakedata from "../../fake_student_records_blockchain_certificates.json"
const StudentDashboard = () => {
  const student=fakedata[0];
  console.log(student)
  const welcomesms=`Welcome ${student.Full_Name} to our DecentraId app`


  // verify links

  // const[verifyLink,setVerifyLink]=useState(" ");

  // useEffect(() => {
  //   // 🔁 Replace with your actual API call or smart contract fetch
  //   const fetchStudentHash = async () => {
  //     const res = await fetch(`/api/student/${fakedata}/certificate-hash`);
  //     const data = await res.json();
  //     const hash = data.hash; // e.g. "a3b7f8..."
  //     setVerifyLink(`https://yourdapp.com/verify/${hash}`);
  //   };

  //   fetchStudentHash();
  // }, [fakedata]);

  // const handleCopy = async () => {
  //   if (verifyLink) {
  //     await navigator.clipboard.writeText(verifyLink);
  //     alert("✅ Link copied to clipboard!");
  //   }
  // };


  return (
    <div>
     <div className="parant">
       <div className="left">
        <h4>DASHBOARD</h4>
        <h4><span>Student Information</span></h4>
        <div className="line"></div>

        <li className="sidebar-item"><HelpCircle size={30} /> Help & Queary</li>
        <li className="sidebar-item"><HelpingHandIcon size={30} />FAQ</li>
        <li className="sidebar-item"><LogOut size={30} />Logout</li>

        <div className="line2"></div>
        <h3 className='headding'>Our DECENTRAID</h3>
        <p className='D-info'>This decentralized application (DApp) allows students to securely store, manage, and share their academic certificate on the blockchain.</p>

      </div>
      <div className="container">
        <div className="welcome_sms">
          <h2>{welcomesms}</h2>
        </div>
        <div className="data">
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
     </div>
     {/* <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Certificate Verification Link</h2>

      {verifyLink ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-sm mb-2 break-all">
            🔗 <a href={verifyLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {verifyLink}
            </a>
          </p>

          <button
            onClick={handleCopy}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
          >
            📋 Copy Link
          </button>

          <a
            href={`https://wa.me/?text=Here%20is%20my%20certificate%20verification%20link:%20${encodeURIComponent(verifyLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            📤 Send via WhatsApp
          </a>
        </div>
      ) : (
        <p>Loading your certificate...</p>
      )}
    </div> */}
    </div>
    // students data


    
  );
};

export default StudentDashboard;
