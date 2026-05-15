import type { Linguagem } from "./types/linguagens";

const AREAS_MOCK: Linguagem[] = [
  { uid: "area-1", nome: "Minha Primeira Empresa", cor: "#f97316", url: "", sigla: "empresa" },
  { uid: "area-2", nome: "Comunicação & Liderança", cor: "#3b82f6", url: "", sigla: "softskills" },
  { uid: "area-3", nome: "Do MVP ao Primeiro Cliente", cor: "#8b5cf6", url: "", sigla: "mvp" },
  { uid: "area-4", nome: "Finanças para Empreendedores", cor: "#10b981", url: "", sigla: "financas" },
  { uid: "area-5", nome: "Vendas e Negociação", cor: "#ef4444", url: "", sigla: "vendas" },
  { uid: "area-6", nome: "Marketing Digital", cor: "#f59e0b", url: "", sigla: "marketing" },
];

export async function getLinguagens(): Promise<Linguagem[]> {
  await new Promise((r) => setTimeout(r, 300));
  return AREAS_MOCK;
}
