//Importacion de bibliotecas
import React from "react";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function DamageCalculator() {
  return (
    <div className="relative min-h-screen bg-yellow-400">
      <NavBar></NavBar>
      <SideBar />
      <div className="mt-4 flex justify-center rounded-lg bg-blue-500 p-2 hover:bg-blue-700">
        {/* Content */}
      </div>
    </div>
  );
}
