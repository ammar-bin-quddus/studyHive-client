import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1e293b] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">StudyHive</h3>
            <p className="text-gray-400">
              StudyHive is a collaborative group-study platform where users can create, submit, and evaluate assignments together to grow academically with peers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-white">Home</a>
              </li>
              <li>
                <a href="/assignments" className="hover:text-white">Assignments</a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <form>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#e56503] hover:bg-orange-700 text-white px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p className="text-center">&copy; {new Date().getFullYear()} StudyHive. All rights reserved.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaXTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
