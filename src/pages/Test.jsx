//Importacion de bibliotecas
import React from "react";

import SideBar from "../components/SideBar";

export default function Test() {
  return (
    <div className="relative bg-yellow-400 min-h-screen">

      <SideBar />

      <div className="ml-32 bg-red-400 h-96">
      </div>

      <div className="ml-32 bg-blue-400 h-96">
      </div>

    </div>
  )
}
