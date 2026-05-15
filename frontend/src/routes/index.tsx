import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../app/auth/login";
import { RegisterPage } from "../app/auth/register";
import { AuthGuard } from "./guard";
import { DashboardPage } from "@/app/dashboard";
import { Redirect } from "@/app";
import { PrivateLayout } from "@/components/layout/privateLayout";
import { JornadaPage } from "@/app/jornada";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Redirect />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />

        {/* Private routes */}
        <Route element={<AuthGuard />}>
          <Route element={<PrivateLayout />}>
            <Route element={<DashboardPage />} path="/dashboard" />
            <Route element={<JornadaPage />} path="/jornada/:idJornada" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
