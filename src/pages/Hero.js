import { Typewriter } from "typewriting-react";
import heroImage from "../images/bg.jpeg";

function Hero() {
  return (
    <div
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${heroImage}) center center / cover no-repeat`,
        height: "500px",
      }}
      className="rounded-2xl flex justify-center items-center"
    >
      <Typewriter
        className="text-5xl font-extrabold text-white"
        words={[
          "Best shpping at best value.",
          "Your best shopping experience.",
          "Quality guranted.",
        ]}
      />
    </div>
  );
}

export default Hero;
