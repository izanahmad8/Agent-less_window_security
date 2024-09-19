import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="bg-[#1d1d1d] w-full"
      style={{ borderTop: "2px solid #ec4e00" }}
    >
      <div className="flex justify-center items-center mb-20 flex-col">
        <h1 className="font-serif text-6xl text-white font-extrabold mb-4 mt-16">
          DeadBoltt
        </h1>
        <p className="tracking-[10px] font-sans">
          GUARDIANS OF THE CYBER REALM
        </p>
      </div>
      <div className="flex justify-center items-center mb-20 flex-row">
        <Link
          className="tracking-[5px] hover:text-[#ec4e00] py-2 px-4 mx-4"
          to="/"
        >
          FAQ & CONTACT
        </Link>
        <Link
          className="tracking-[5px] hover:text-[#ec4e00] py-2 px-4 mx-4"
          to="/"
        >
          TERMS OF SERVICES
        </Link>
        <Link
          className="tracking-[5px] hover:text-[#ec4e00] py-2 px-4 mx-4"
          to="/"
        >
          PRIVACY POLICY
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <p className="tracking-[1px] font-sans mb-8">
          &copy;2024 Deadboltt Securities - All rights reserved
        </p>
      </div>
    </footer>
  );
}
