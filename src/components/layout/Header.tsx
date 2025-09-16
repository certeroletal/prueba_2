import React from 'react';
import Image from 'next/image';

const Header = ({ setIsSidebarOpen }: { setIsSidebarOpen: (isOpen: boolean) => void }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-3 sm:py-4 px-0 flex justify-between items-center">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center">
            <Image src="/logo_app.png" alt="PyroTrack Logo" width={50} height={50} />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              PyroTrack
            </h1>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-xs sm:text-sm text-gray-600 mr-2 sm:mr-4 hidden sm:block">Bienvenido, Usuario</p>
          <button className="p-2 rounded-full text-gray-400 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            <span className="sr-only">View notifications</span>
            <svg className="h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;