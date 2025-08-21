import React from "react";
import Navbar from "../components/HomePageNavbar.jsx";
import Hero from "../components/HomePageHero.jsx";
import Features from "../components/HomePageFeatures.jsx";

import Aurora  from "../UI/Components/Aurora.jsx";
import Particles from "../UI/Components/Particles.jsx";


function HomePage() {
  return (
    <div className="relative w-screen min-h-screen max-h-fit flex items-center bg-black overflow-hidden flex-col h-[300vh]">
      {/* Aurora background layer */}
      {/* <div className="absolute inset-0 w-full h-full">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div> */}
      
      {/* Particles background layer */}


      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={2}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 text-white text-4xl font-bold p-5 w-full max-w-[1200px]"> 
        <Navbar/>
        <Hero/>
        <Features/>
      </div>
        <svg
          className="pt-15"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#1E3D47", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#3F3D4F", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#grad1)"
            fillOpacity="1"
            d="M0,32L21.8,32C43.6,32,87,32,131,64C174.5,96,218,160,262,170.7C305.5,181,349,139,393,128C436.4,117,480,139,524,160C567.3,181,611,203,655,202.7C698.2,203,742,181,785,170.7C829.1,160,873,160,916,149.3C960,139,1004,117,1047,96C1090.9,75,1135,53,1178,58.7C1221.8,64,1265,96,1309,96C1352.7,96,1396,64,1418,48L1440,32L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
          ></path>
        </svg>

    </div>
  );
}


export default HomePage;
