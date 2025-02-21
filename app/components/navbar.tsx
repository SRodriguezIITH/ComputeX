"use client"
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  

  return (
    <nav className="flex flex-wrap items-center justify-center text-black py-8" style={{backgroundColor:"transparent"}}>    
        <div>
            <Image src="/computeX.png" alt="computex logo " width={50} height={50} />
        </div>
        <h1 className={bebasNeue.className} style={{fontWeight:"bolder", fontFamily:"Ubuntu, sans-serif", fontSize:"3rem", color:"#750000", paddingRight:'25vw'}}>ComputeX</h1>

        <Link href="/">
            <span className="px-3" style={{fontSize:"1.5rem", fontWeight:"600", color:"white"}}>Home</span>
        </Link>

        <Link href="/solver">
            <span className="px-3" style={{fontSize:"1.5rem", color:"white"}}>Solve</span>
        </Link>

        <Link href="https://github.com/Aryan-Bodhe/Handwritten-Math-Equation-Solver">
            <span className="px-3" style={{fontSize:"1.5rem", color:"white"}}>Docs</span>
        </Link>

       


    </nav>
  );
}

export default Navbar;