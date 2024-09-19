import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chart from "../assets/chart.png";
import knoxx from "../assets/knoxx.png";
import loading from "../assets/loading.gif";
import backgroundMusic from "../assets/backgroundMusic.mp4"; // Add your music file here
import { useSpring, animated } from "@react-spring/web";
import Deadboltt from "../assets/Deadboltt.gif";
import {
  faVolumeMute,
  faVolumeUp,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [isMuted, setIsMuted] = useState(false); // Initially unmuted
  const [isPlaying, setIsPlaying] = useState(false); // Initially music is not playing
  const audioRef = useRef(null);

  // Animation for the heading "DeadBoltt"
  // const headingAnimation = useSpring({
  //   from: { opacity: 0, transform: "translateY(-50px)" },
  //   to: { opacity: 1, transform: "translateY(0px)" },
  //   config: { tension: 220, friction: 120 },
  //   delay: 500,
  // });

  // Animation for the paragraph "GUARDIANS OF THE CYBER REALM"
  const paragraphAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 180, friction: 80 },
    delay: 1000,
  });

  // Autoplay music when the component loads (unmuted initially)
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Function to toggle mute/unmute
  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.muted = false;
    } else {
      audioRef.current.muted = true;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Background Music */}
      <audio ref={audioRef} src={backgroundMusic} loop />

      <section className="h-[70vh]">
        <div className="flex justify-center items-center mt-40 mb-20 flex-col">
          {/* Animated heading using @react-spring */}
          {/* <animated.h1 style={headingAnimation} className="text-9xl text-white font-extrabold mb-4">
          DeadBoltt
        </animated.h1> */}
          <img
            className="absolute top-[190px] left-[30%] w-[610px] h-[270px]"
            src={Deadboltt}
            alt=""
          />

          {/* Animated paragraph using @react-spring */}
          <animated.p
            style={paragraphAnimation}
            className="tracking-[20px] text-white font-bold absolute top-[440px]"
          >
            GUARDIANS OF THE CYBER REALM
          </animated.p>
        </div>

        <div className="flex justify-center text-xl">
          <Link
            className="absolute top-[500px] text-center bg-transparent hover:bg-[#ec4e00] text-white font-semibold hover:text-white py-4 px-2 border border-white hover:border-transparent rounded"
            to="/downloads"
            style={{ width: "120px" }}
          >
            Downloads
          </Link>
        </div>
      </section>

      {/* Music Control Button (Bottom Left) */}
      {!isPlaying ? (
        <div className="fixed bottom-4 left-4">
          <button
            onClick={startMusic}
            className="bg-transparent text-white text-4xl p-2"
          >
            {/* Icon to trigger play music */}
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
      ) : (
        <div className="fixed bottom-4 left-4">
          <button
            onClick={toggleMute}
            className="bg-transparent text-white text-4xl p-2"
          >
            {isMuted ? (
              <FontAwesomeIcon icon={faVolumeMute} />
            ) : (
              <FontAwesomeIcon icon={faVolumeUp} />
            )}
          </button>
        </div>
      )}
      <section className="h-[100vh] flex flex-row justify-between items-center">
        <div className="w-1/2 h-1/2 ml-4">
          <img src={chart} alt="chart" />
        </div>
        <div className="w-1/2 flex flex-col">
          <h1 className="text-3xl my-4">CERTITUDE THROUGH SCRIPTING</h1>
          <p className="text-xl">
            Deadboltt distinguishes itself through its advanced utilization of
            scripted tools and programming, setting a new standard in securing
            user data .With a wide range of robust security measures in place,
            We are dedicated in protecting your information 24*7 which ensures
            comprehensive protection from threats.
          </p>
          <Link
            className="text-center bg-transparent hover:bg-[#ec4e00] text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded my-8"
            to="/downloads"
            style={{ width: "120px" }}
          >
            Install
          </Link>
        </div>
      </section>

      <section className="h-[50vh]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl mb-8">Game Changer_</h1>
          <p className="text-3xl">Test with the smartest services</p>
        </div>
      </section>

      <section className="h-[100vh]">
        <div className="flex justify-between items-center">
          <div className="w-1/2 relative">
            <img
              className="absolute top-[-50px] left-[440px] w-[300px] h-[200px]"
              src={loading}
              alt="loading"
            />
            <img className="w-[700px]" src={knoxx} alt="knoxx" />
          </div>
          <div className="w-1/2 m-4">
            <h1 className="text-4xl mb-8">Top - Tier Technology</h1>
            <p className="text-xl">
              Deadboltt detects & proves vulnerabilities with little to no
              effort of the user. Just feed the target data it will give you all
              the details related to it without any delay with multiple scans
              and will take no time to scan user's data with all his concern and
              Data protection.
            </p>
          </div>
        </div>
      </section>

      <section className="h-[50vh] mt-[-200px]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl mb-8">FUTURE IS HERE _</h1>
          <p className="text-3xl">
            Join the next revolution in offensive securities
          </p>
        </div>
      </section>
    </>
  );
}
