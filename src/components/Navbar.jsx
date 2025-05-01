"use client";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Logout from "./Logout";
import { useUser } from "../app/context/userContext";
import Image from "next/image";
const Navbar = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLinks = ({ closeHandler }) => (
    <>
      <Link href="/" className="hover:text-indigo-300" onClick={closeHandler}>Home</Link>
      {user && <Link href="/dashboard" className="hover:text-indigo-300" onClick={closeHandler}>Dashboard</Link>}
     {user&&<Link href="/notes/create" className="hover:text-indigo-300" onClick={closeHandler}>Create Notes</Link>} 
     {user&&<Link href="/notes/allnotes" className="hover:text-indigo-300" onClick={closeHandler}>My Notes</Link>} 
      {/* <Link href="/contact" className="hover:text-indigo-300" onClick={closeHandler}>Contact</Link> */}
      {!user && <Link href="/login" className="hover:text-indigo-300" onClick={closeHandler}>Login</Link>}
    </>
  );

  return (
    <header className="bg-indigo-600 text-white shadow md:px-10 sticky top-0 z-40">
      <nav className="flex items-center justify-between py-2 md:px-7 px-2">
        <Link href='/'>
        <div className="text-xl font-bold cursor-pointer">Logo</div>
        </Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <FaBars size={24} />
          </button>
        </div>

        <div className="hidden lg:flex space-x-6 items-center">
          <NavLinks closeHandler={() => {}} />
          {user && (
            <div className="relative cursor-pointer" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="object-cover cursor-pointer"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-indigo-700 rounded py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2" onClick={closeDropdown}>Profile</Link>
                  <Link href="/dashboard" className="block px-4 py-2" onClick={closeDropdown}>Dashboard</Link>
                  <div className="border-t my-1"></div>
                  <div className="px-4 py-2  cursor-pointer" onClick={closeDropdown}>
                    <Logout />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white text-indigo-700 z-50 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={closeMenu}>
              <FaTimes size={22} />
            </button>
          </div>
          <div className="flex flex-col px-4 py-4 space-y-4 font-medium">
            <NavLinks closeHandler={closeMenu} />
            {user && (
              <>
                <Link href="/profile" className="hover:text-indigo-500" onClick={closeMenu}>Profile</Link>
                <div onClick={closeMenu}>
                  <Logout />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
