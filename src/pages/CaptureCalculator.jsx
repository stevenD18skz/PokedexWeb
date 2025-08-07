import NavBar from "../components/ui/NavBar";

function CaptureCalculator() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-32 max-w-3xl rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Capture Calculator (coming soon)
        </h1>
        <p className="text-lg text-gray-600">
          Calculate the capture rate of your Pokémon with our upcoming Capture
          Calculator. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}

export default CaptureCalculator;
