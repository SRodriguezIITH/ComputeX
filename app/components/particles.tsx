"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine"; 

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log("Particles engine loaded", engine);
    await loadSlim(engine); 
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 200, density: { enable: true, area: 800 } },
          shape: { type: "square" },
          opacity: { value: 0.8 },
          color: { value: "#750000" },
          size: { value: 6 },
          move: { enable: true, speed: 1, direction: "none", outModes: "bounce" },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
        },
      }}
    />
  );
}
