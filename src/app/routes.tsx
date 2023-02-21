import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import MainLayout from "./components/layouts/MainLayout";
import DashboardDefaultContent from "./views/dashboard/DashboardDefaultContent";
import Settings from "./views/dashboard/Settings";
import AboutPage from "./views/pages/AboutPage";
import HomePage from "./views/pages/HomePage";
import NotFoundPage from "./views/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<DashboardDefaultContent />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
