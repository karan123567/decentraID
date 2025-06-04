import React, { useState, useEffect } from 'react';
import './css/studentdashboard.css';
import { HelpCircle, Home, FileText, UploadCloud, CheckCircle, Settings, LogOut, Link2, Clock, HelpingHandIcon } from 'lucide-react';
import fakedata from "../components/fake_student_records_blockchain_certificates.json"
// import Navbar from '../components/navbar';

const StudentDashboard = () => {
  const student=fakedata[0];
  console.log(student)
  const welcomesms=`Welcome ${student.Full_Name} to our DecentraId app`

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
    </div>
    // students data
  );
};

export default StudentDashboard;
