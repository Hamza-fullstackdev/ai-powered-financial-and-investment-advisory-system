import { Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#090A1D]">
      <div className="mx-4 sm:mx-16 py-15">
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-8">
          <div>
            <div>
              <Image src="/logo.png" alt="logo" width={150} height={100} />
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">
                Copyright © 2025 Finovate. All rights reserved.
              </p>
            </div>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white">Stay Informed With Our Newsletter</h5>
            <form className="mt-4 flex items-center gap-x-3">
              <input
                type="text"
                placeholder="Your email address"
                className="py-2 px-4 rounded-sm bg-[#18192C] text-white placeholder:text-gray-400 placeholder:text-sm border-none outline-none"
              />
              <div>
                <button className="bg-green-500 cursor-pointer py-2 px-4 rounded-sm text-white font-semibold text-sm">
                  <Send size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
