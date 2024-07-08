import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-5">
      <div className="mb-3">
        <p className="text-sm text-gray-400">Connect with us:</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.facebook.com"
            className="text-blue-600 hover:text-blue-800"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            className="text-blue-400 hover:text-blue-600"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            className="text-pink-600 hover:text-pink-800"
          >
            Instagram
          </a>
        </div>
      </div>
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      <div className="text-gray-400 text-xs mt-2">
        <a href="#" className="hover:text-white">
          Privacy Policy
        </a>{" "}
        |
        <a href="#" className="hover:text-white">
          Terms of Use
        </a>{" "}
        |
        <a href="#" className="hover:text-white">
          Legal Notice
        </a>
      </div>
    </footer>
  );
};

export default Footer;
