// AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import Analyze from "./pages/Analyze";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoutes";
import Compare from "./pages/Compare";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/interviewee"
        element={
          <PrivateRoute allowedRoles={["interviewee"]}>
            <Home />
          </PrivateRoute>
        }
      >
        <Route index element={<ResumeUploadPage />} />
        <Route path="analyze/:id" element={<Analyze />} />
      </Route>

      <Route
        path="/interviewer"
        element={
          <PrivateRoute allowedRoles={["interviewer"]}>
            <Home />
          </PrivateRoute>
        }
      >
        {/* Add interviewer-specific children if needed */}
        <Route index element={<ResumeUploadPage />} />
        <Route path="compare" element={<Compare />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
