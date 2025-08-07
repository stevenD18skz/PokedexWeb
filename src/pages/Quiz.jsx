import NavBar from "../components/ui/NavBar";

const Quiz = () => {
  return (
    <div>
      <NavBar />

      <div className="container mx-auto mt-32 max-w-3xl rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Pokédex Quiz (coming soon)
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to the Pokédex Quiz! More features coming soon.
        </p>
      </div>
    </div>
  );
};

export default Quiz;
