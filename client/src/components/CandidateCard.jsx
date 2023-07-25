import { useCandidates } from "../context/CandidateContext";
import { Link } from 'react-router-dom'

function CandidateCard({ candidate }) {
  const { deleteCandidate, errors: deleteErrors } = useCandidates();
  // console.log(deleteErrors);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">
          {candidate.nombres} {candidate.apellidos}
        </h1>
        <div className="flex gap-x-2 items-center">
          <button 
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              deleteCandidate(candidate._id);
            }}
          >
            eliminar
          </button>
        <Link to={`/candidatos/${candidate._id}`}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md"
        >editar</Link>
        </div>
      </header>
      <p className="text-slate-300">{candidate.ciudad}</p>
      <p className="text-slate-300">{candidate.slogan}</p>
      <p className="text-slate-300">
        {new Date(candidate.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default CandidateCard;
