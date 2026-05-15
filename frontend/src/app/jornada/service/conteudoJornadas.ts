import { api } from "@/config/axios";
import { toast } from "sonner";
import type { ConteudoJornadaResponse } from "./types/conteudoJornadaResponse";
import { AxiosError } from "axios";
import { ApiError } from "@/types/axios";
import type { AtualizaNodesResponse } from "./types/atualizaNodesResponse";

export async function getConteudoJornadasById(idJornada: string) {
  return await api
    .get<ConteudoJornadaResponse>(`conteudoJornada/${idJornada}`)
    .then((res) => res.data)
    .catch((err: AxiosError<ApiError>) => {
      console.error("Erro ao buscar o conteudo das jornadas", err);
      toast.error(
        err.response?.data?.message || "Erro ao buscar o conteudo das jornadas"
      );
    });
}

export async function atualizaModuloCompleto(
  jornada_id: string,
  modulo_id: number
) {
  return await api
    .patch<AtualizaNodesResponse>("jornadas/modulo", {
      jornada_id,
      modulo_id,
    })
    .then((res) => res.data)
    .catch((err: AxiosError<ApiError>) => {
      console.error("Erro ao atualizar o módulo completo", err);
      toast.error(
        err.response?.data?.message || "Erro ao atualizar o módulo completo"
      );
    });
}

export async function atualizaTopicoCompleto(
  jornada_id: string,
  modulo_id: number,
  topico_id: string
) {
  return await api
    .patch<AtualizaNodesResponse>("jornadas/topico", {
      jornada_id,
      modulo_id,
      topico_id,
    })
    .then((res) => res.data)
    .catch((err: AxiosError<ApiError>) => {
      console.error("Erro ao atualizar o tópico completo", err);
      toast.error(
        err.response?.data?.message || "Erro ao atualizar o tópico completo"
      );
    });
}
