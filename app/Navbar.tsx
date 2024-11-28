import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { GiSlippers } from "react-icons/gi";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Bagian kiri: Logo dan Navigasi */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="text-xl font-semibold text-gray-800 flex items-center font-serif">
           <GiSlippers/>
             SANDIT
          </div>

          {/* Navigasi */}
          <div className="flex items-center space-x-4">
            <Link href={'/'}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Home
            </Link>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Simpan
            </a>
            <a href="https://wa.me/628558032756" className="text-gray-700 hover:text-gray-900">
              Customer service
            </a>
            <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="text-gray-700 hover:text-gray-900 flex items-center"
      >
        Type
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 bg-white shadow-md rounded-md mt-2 w-48">
          <Link
            href="/type/Wanita"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Wanita
          </Link>
          <Link
            href="/type/Pria"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Pria
          </Link>
        </div>
      )}
    </div>

          </div>
        </div>

        {/* Bagian kanan: Cart */}
        <div className="flex items-center">
          <div className="flex items-center border rounded-md px-3 py-1">
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18l-2 13H5L3 3z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 17a4 4 0 11-8 0"
              ></path>
            </svg>
            <span className="ml-2 text-gray-800">Notification</span>
            <span className="ml-1 bg-gray-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}
