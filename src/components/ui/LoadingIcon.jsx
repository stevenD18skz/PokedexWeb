export default function LoadingIcon() {
  return (
    // Display loading indicator while data is fetching
    <div className="flex min-h-screen items-center justify-center">
      <div
        className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
        role="status"
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}
