import { getCorrecaoMock, getExercicioMock } from "@/mocks/exercicios";
import type {
  CorrigirExercicioDto,
  CorrigirExercicioResponse,
  CreateExercicioDto,
  CreateExercicioResponse,
} from "./types/exercicios";

export async function gerarExercicio(
  data: CreateExercicioDto
): Promise<CreateExercicioResponse> {
  await new Promise((r) => setTimeout(r, 800));
  return getExercicioMock(data);
}

export async function corrigirExercicio(
  _data: CorrigirExercicioDto
): Promise<CorrigirExercicioResponse> {
  await new Promise((r) => setTimeout(r, 1000));
  return getCorrecaoMock();
}
