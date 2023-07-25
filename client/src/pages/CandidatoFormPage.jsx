import { useForm } from "react-hook-form";
import { useCandidates } from "../context/CandidateContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function CandidatoFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createCandidate, getCandidate, updateCandidate } = useCandidates();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadCandidate() {
      if (params.id) {
        const candidate = await getCandidate(params.id);
        console.log(candidate);
        setValue("nombres", candidate.nombres);
        setValue("apellidos", candidate.apellidos);
        setValue("ciudad", candidate.ciudad);
        setValue("slogan", candidate.slogan);
      }
    }
    loadCandidate();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateCandidate(params.id, data);
    } else {
      createCandidate(data);
    }

    navigate("/candidatos");
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="nombres">Nombres</label>
          <input
            type="text"
            placeholder="Nombres"
            {...register("nombres")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            placeholder="Apellidos"
            {...register("apellidos")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            placeholder="Ciudad"
            {...register("ciudad")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <label htmlFor="slogan">Slogan</label>
          <textarea
            cols="50"
            rows="3"
            placeholder="Slogan"
            {...register("slogan")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>

          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md my-2">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CandidatoFormPage;
