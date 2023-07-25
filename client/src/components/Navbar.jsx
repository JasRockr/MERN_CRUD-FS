import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  // console.log(user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/candidatos" : "/"}>
        <h1 className="text-2xl font-bold">App Elecciones</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Bienvenido {user.user}</li>
            <li>
              <Link
                to="/nuevo-candidato"
                className="bg-red-500 px-4 py-1 rounded-sm"
              >
                Postular Candidatos
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-red-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link to="/registro" className="bg-red-500 px-4 py-1 rounded-sm">
                Registro
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
