"use client"
import React from "react";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import {TypeAnimation} from "react-type-animation"
import ParticlesBackground from "@/app/components/particles";

const Guide = () => {
    return (
        <div className="flex flex-wrap items-center justify-center text-black py-12 px-5" style={{background:"linear-gradient(0deg, rgba(255,76,76,0.896796218487395) 0%, rgba(103,0,0,1) 100%)", height:"37vh", overflow:"hidden"}}>
        </div>
    );
}

const HomePage = () => {
  return (
    <>
        <div style={{width:"100%", height:"auto", background:"linear-gradient(0deg, rgba(29,29,29,1) 0%, rgba(38,38,38,1) 29%, rgba(0,0,0,0.908000700280112) 100%)"}}>
        <Navbar />
            <div className="flex flex-wrap items-center justify-center text-black py-12 px-5" style={{backgroundColor:"transparent", paddingTop:"20vh"}}>
                <div className="px-3" style={{fontWeight:"bolder", fontFamily:"Ubuntu, sans-serif", fontSize:"3rem", color:"#ffffff", paddingRight:'15vw', backgroundColor:"transparent", textShadow:"2px 2px 4px #000000"}}>
                Computing The Future!
                <br></br>
                
                <TypeAnimation style={{color:"#750000", fontWeight:"600", fontSize:"2rem"}}
                                sequence={[
                                    "Step 1: Write Your Equation",
                                    200,
                                    "Step 2: Our Model Computes",
                                    200,
                                    "Step 3: Get The Results",
                                ]}
                                repeat={Infinity}
                            />
                </div>
                <div>
                    <Image
                        src="/calcanim.gif"
                        alt="Chessboard Animation"
                        width={400}
                        height={400}
                        priority
                        style={{opacity:"0.8", paddingLeft:"10vw"}}
                    />

                </div>
            </div>
            <ParticlesBackground />
        </div>
        <Guide />
    </>
  );
}

export default HomePage;