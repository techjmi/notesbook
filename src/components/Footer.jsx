import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left Side */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">NoteCraft</h2>
          <p className="text-sm text-gray-300 mb-4">
            Customize your own notebook with premium quality covers, personalized pages,
            and your name engraved on top. Make every note feel like yours.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row gap-10 md:w-1/2 justify-end">
          <div>
            <h3 className="font-semibold mb-2">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-indigo-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400">About</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-400">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-indigo-400">FAQs</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">&copy; {new Date().getFullYear()} NoteCraft. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
