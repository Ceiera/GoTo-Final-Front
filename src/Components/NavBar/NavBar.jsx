import { Link, redirect } from "react-router-dom";
import { useState } from "react";
const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg rounded border-gray-200 dark:bg-gray-900 mb-5">
      <div className="max-w-screen-xl grid grid-cols-[20%_80%] items-center justify-between mx-auto p-4">
        <Link>
          <img
            src="https://images2.imgbox.com/99/67/IYp0UqqU_o.png"
            className="h-8 mr-3"
            alt="TotoPediaLogo"
          />
        </Link>
        <Link
          className="font-bold block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          to="/"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
