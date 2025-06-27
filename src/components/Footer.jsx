import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2b0448] via-[#340558] to-[#3c0668] text-gray-300 py-6 mt-0">
      <div className="h-auto max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">About</h3>
          <p className="text-sm">
            Your trusted decentralized solution for secure and instant credential
            verification.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            {/* <li><Link to="/verify" className="hover:text-white">Verify Credentials</Link></li> */}
            <li><Link to="/about-us" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Resources</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/help-support" className="hover:text-white">Help & Support</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Contact</h3>
          <p className="text-sm">Email: support@credentialdapp.com</p>
          <p className="text-sm">Phone: +91-7460076794</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Credential DApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
