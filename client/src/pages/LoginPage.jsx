import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/candidatos')
  }, [isAuthenticated])

  return (
    // <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold my-2">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500">El email es obligatorio</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">El password es obligatorio</p>
          )}

          <button type="submit"
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md my-2"
          >
            Login
          </button>
        </form>

        <p className="flex gap-2 justify-between m-2">
          No tienes una cuenta? <Link to="/registro" className="text-sky-300">Registrarme</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
