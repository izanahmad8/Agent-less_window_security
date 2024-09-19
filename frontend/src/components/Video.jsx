import React from "react";
import bg from "../assets/bg.mp4";

export default function Video() {
  return (
    <video autoPlay muted loop id="bg-video">
      <source src={bg} type="video/mp4" />
    </video>
  );
}
