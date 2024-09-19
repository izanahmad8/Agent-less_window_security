import React from "react";
import service from "../assets/service.jpg";
import { Link } from "react-router-dom";

export default function Services() {
  const malware = () => {
    window.open("https://malware-analysis.netlify.app/");
  };
  return (
    <>
      <header
        className="w-full flex justify-center items-center"
        style={{
          backgroundImage: `url(${service})`,
          height: "400px",
          marginTop: "-150px",
        }}
      >
        <h1 className=" text-7xl mt-8 font-bold">Services</h1>
      </header>
      <section className="bg-[#1d1d1d] w-full h-full p-32 font-bold">
  <div className="flex justify-around flex-row w-full">
    <div
      className="w-96 h-96 p-10 rounded-xl mx-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
      }}
    >
      <i className="fa-brands fa-slack text-xl"></i>
      <h1 className="font-semibold text-lg mb-4">Vulnerability Assessment:</h1>
      <ul>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-2xl">.</span> Agent-less scans
        </li>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-2xl">.</span> Real-time detection
        </li>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-2xl">.</span> PowerShell scripts
        </li>
      </ul>
    </div>

    <div
      className="w-96 h-96 p-10 rounded-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        filter: blur("10px"),
      }}
    >
      <i className="fa-brands fa-nfc-directional text-xl"></i>
      <h1 className="font-semibold text-lg mb-4">Network Scanning</h1>
      <ul>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-3xl">.</span> Nmap integration
        </li>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-3xl">.</span> Threat analysis
        </li>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-3xl">.</span> Automated scans
        </li>
      </ul>
    </div>

    <div
      className="w-96 h-96 p-10 rounded-xl mx-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
      }}
    >
      <i className="fa-solid fa-bug text-xl"></i>
      <h1 className="font-semibold text-lg mb-4">Compliance Auditing</h1>
      <ul>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-3xl">.</span> Regulatory checks
        </li>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-3xl">.</span> Security reports
        </li>
        <li className="text-base font-normal hover:text-[#ec4e00]">
          <span className="text-3xl">.</span> Standards compliance
        </li>
      </ul>
    </div>

    
  </div>
</section>

    </>
  );
}
