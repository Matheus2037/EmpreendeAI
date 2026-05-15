import { api } from "@/config/axios";
import { JornadaResponse, NewJornadaDataDto } from "./types/jornada";
import { toast } from "sonner";
import { ApiError } from "@/types/axios";
import { AxiosError } from "axios";

export async function getJornadasByUserId() {
  return api
    .get<JornadaResponse[]>("jornadas")
    .then((response) => response.data)
    .catch((error: AxiosError<ApiError>) => {
      console.error("Erro em buscar jornadas", error.response?.data);
      toast.error(error.response?.data?.message || "Erro em buscar jornadas");
    });
}

export async function newJornada(data: NewJornadaDataDto) {
  return api
    .post("/jornadas/criarJornada", data)
    .then(() => toast.success("Jornada criada com sucesso!"))
    .catch((error: AxiosError<ApiError>) => {
      console.error("Erro ao adicionar uma nova jornada", error.response?.data);
      toast.error(
        error.response?.data?.message || "Erro ao adicionar uma nova jornada"
      );
    });
}
