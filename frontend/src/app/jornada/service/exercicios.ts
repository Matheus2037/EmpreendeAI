import { api } from "@/config/axios";
import {
  CorrigirExercicioDto,
  CorrigirExercicioResponse,
  CreateExercicioDto,
  CreateExercicioResponse,
} from "./types/exercicios";
import { AxiosError } from "axios";
import { ApiError } from "@/types/axios";
import { toast } from "sonner";

export async function gerarExercicio(data: CreateExercicioDto) {
  return api
    .post<CreateExercicioResponse>("/exercicio/gerar", data)
    .then((res) => res.data)
    .catch((err: AxiosError<ApiError>) => {
      console.error("Erro ao criar exercicio", err);
      toast.error(err.response?.data?.message || "Erro ao criar exercicio");
    });
}

export async function corrigirExercicio(data: CorrigirExercicioDto) {
  return api
    .post<CorrigirExercicioResponse>("/exercicio/corrigir", data)
    .then((res) => res.data)
    .catch((err: AxiosError<ApiError>) => {
      console.error("Erro ao corrigir exercicio", err);
      toast.error(err.response?.data?.message || "Erro ao corrigir exercicio");
    });
}
