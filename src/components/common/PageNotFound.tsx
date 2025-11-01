import { Link } from "react-router";

function PageNotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-xl text-neutral-800 mb-6">Page not found</p>
      <Link
        to="/"
        className="text-blue-700 underline hover:text-blue-900 transition-colors"
      >
        Go back home
      </Link>
    </section>
  );
}

export default PageNotFound;
