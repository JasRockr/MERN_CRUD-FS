import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CandidateProvider } from "./context/CandidateContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CandidatosPage from "./pages/CandidatosPage";
import CandidatoFormPage from "./pages/CandidatoFormPage";
import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <CandidateProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/candidatos" element={<CandidatosPage />} />
                <Route
                  path="/nuevo-candidato"
                  element={<CandidatoFormPage />}
                />
                <Route path="/candidatos/:id" element={<CandidatoFormPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </CandidateProvider>
    </AuthProvider>
  );
}

export default App;
