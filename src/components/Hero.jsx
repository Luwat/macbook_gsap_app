import { useEffect } from "react";
import { useRef } from "react";

const Hero = () => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  });

  return (
    <section id="hero">
      <h1>MacBook Pro</h1>
      <img src={`${import.meta.env.BASE_URL}images/title.png`} alt="MacBook Pro title graphic" />

      <video ref={videoRef} src={`${import.meta.env.BASE_URL}videos/hero.mp4`} autoPlay muted playsInline />

      <button>Buy</button>

      <p>From $1599 to $133/mo for 12 months</p>
    </section>
  );
};

export default Hero;
