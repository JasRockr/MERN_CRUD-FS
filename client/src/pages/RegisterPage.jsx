import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/candidatos");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    // <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold my-2">Registro</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {errors.nombre && (
            <p className="text-red-500">El nombre es obligatorio</p>
          )}

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
            Registrarme
          </button>
        </form>

        <p className="flex gap-2 justify-between m-2">
          Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-sky-300">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
