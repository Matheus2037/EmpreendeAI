import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../app/auth/login";
import { RegisterPage } from "../app/auth/register";
import { AuthGuard } from "./guard";
import { DashboardPage } from "@/app/dashboard";
import { Redirect } from "@/app";
import { PrivateLayout } from "@/components/layout/privateLayout";
import { JornadaPage } from "@/app/jornada";
import { HomePage } from "@/app/home";
import { NoticiasPage } from "@/app/noticias";
import { ConteudosPage } from "@/app/conteudos";
import { PerfilPage } from "@/app/perfil";
import { ConfiguracoesPage } from "@/app/configuracoes";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Redirect />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />

        <Route element={<AuthGuard />}>
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/noticias" element={<NoticiasPage />} />
            <Route path="/conteudos" element={<ConteudosPage />} />
            <Route path="/trilha/:idJornada" element={<JornadaPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
