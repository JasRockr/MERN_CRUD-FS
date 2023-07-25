import { useEffect } from "react";
import { useCandidates } from "../context/CandidateContext";
import CandidateCard from "../components/CandidateCard";

function CandidatosPage() {
  const { getCandidates, candidates } = useCandidates();

  useEffect(() => {
    getCandidates();
  }, []);

  if (candidates.length === 0) return <h1>No hay candidadtos para mostrar</h1>;
  // console.log(candidate)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {candidates.map((candidate) => (
        <CandidateCard candidate={candidate} key={candidate._id} />
      ))}
    </div>
  );
}

export default CandidatosPage;
