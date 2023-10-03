export default function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        Welcome to my Auth App!
      </h1>
      <p className="mb-4 text-slate-700">
        This is a full-stack web application built with Django and React. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users.
      </p>
      <p className="mb-4 text-slate-700">
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Django and
        Django rest framework, and uses Postgres as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
     
    </div>
  );
}