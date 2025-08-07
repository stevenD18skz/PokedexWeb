//Importaciones de bibliotecas

//Importaciones de componentes
import NavBar from "../components/ui/NavBar";

//importacion de hooks y contextos

export default function HomePage() {
  return (
    <div
      className="min-w-screen relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('../../backGround-home.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.7) 100%)",
          pointerEvents: "none", // Asegura que este div no interfiera con otros elementos
        }}
      />
      <NavBar></NavBar>
    </div>
  );
}
