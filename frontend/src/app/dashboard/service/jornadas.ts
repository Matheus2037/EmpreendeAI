import { TRILHAS_CARDS } from "@/mocks/trilhas";
import type { JornadaResponse, NewJornadaDataDto } from "./types/jornada";
import { toast } from "sonner";

export async function getJornadasByUserId(): Promise<JornadaResponse[]> {
  await new Promise((r) => setTimeout(r, 600));
  return TRILHAS_CARDS;
}

export async function newJornada(data: NewJornadaDataDto) {
  await new Promise((r) => setTimeout(r, 2500));
  console.info("Mock: nova trilha solicitada", data);
  toast.success("Trilha criada com sucesso!");
}
