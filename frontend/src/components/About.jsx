import React from "react";
import landing from "../assets/landing-slider.gif";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <header
        className="w-full flex justify-center items-center"
        style={{
          backgroundImage: `url(${landing})`,
          height: "400px",
          marginTop: "-150px",
        }}
      >
        <h1 className=" text-7xl mt-8 font-bold">ABOUT</h1>
      </header>
      <section className="h-[70vh] bg-[#1d1d1d] flex flex-row items-center">
        <div className="flex justify-between">
          <div className="w-1/2 m-8 mt-16">
            <h1 className="text-4xl font-extrabold mb-4">Sentinal X</h1>
            <h2 className="font-bold text-3xl mb-12">
              Leading the Way in Deep security with Innovative System Security
              Solutions
            </h2>
            <Link
              className="bg-transparent hover:bg-[#ec4e00] text-white font-semibold hover:text-white py-4 px-12 border border-white hover:border-transparent rounded my-8"
              to="/downloads"
            >
              Downloads
            </Link>
          </div>
          <div className="w-1/2 m-8 mt-28">
            <p className="text-lg">
              Our core offering, Software Security Solution, is designed to
              provide comprehensive testing tailored to the specific needs of
              your organization. At Sentinal X, we leverage cutting-edge
              automated tools to meticulously assess your digital
              infrastructure, identifying vulnerabilities and weaknesses across
              network security, application security, and more. With our
              innovative approach, Sentinal X ensures that your systems are
              fortified against potential threats, empowering your business to
              navigate the dynamic landscape of cybersecurity with confidence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
