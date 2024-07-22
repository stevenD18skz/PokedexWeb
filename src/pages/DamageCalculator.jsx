//Importacion de bibliotecas
import React from "react";


import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function DamageCalculator() {
  return (
    <div className="relative bg-yellow-400 min-h-screen">
     <NavBar></NavBar>
      <SideBar />
    </div>
  )
}
