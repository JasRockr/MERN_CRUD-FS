import { createContext, useContext, useState, useEffect } from "react";
import {
  createCandidatesRequest,
  getCandidatesRequest,
  deleteCandidateRequest,
  getCandidateRequest,
  updateCandidateRequest,
} from "../api/candidatos";

const CandidateContext = createContext();

export const useCandidates = () => {
  const context = useContext(CandidateContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export function CandidateProvider({ children }) {
  const [candidates, setCandidates] = useState([]);
  const [errors, setErrors] = useState([]);

  const getCandidates = async () => {
    try {
      const res = await getCandidatesRequest();
      setCandidates(res.data);
    } catch (error) {
      length.log(error);
    }
  };

  const createCandidate = async (candidate) => {
    const res = await createCandidatesRequest(candidate);
    console.log(res);
  };

  const deleteCandidate = async (id) => {
    try {
      const res = await deleteCandidateRequest(id);
      console.log(res);
      if (res.status === 204)
        setCandidates(candidates.filter((candidate) => candidate._id !== id));
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        alert(error.response.data);
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      alert([error.response.data.message]);
    }
  };

  const getCandidate = async (id) => {
    try {
      const res = await getCandidateRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCandidate = async (id, candidate) => {
    try {
      const res = await updateCandidateRequest(id, candidate);  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        createCandidate,
        getCandidates,
        deleteCandidate,
        getCandidate,
        updateCandidate,
        errors,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}
