import { api } from "@/config/axios";
import { ApiError } from "@/types/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function tirarDuvidasGpt(jornadaId: string, pergunta: string) {
  return api
    .post<{ resposta: string }>(`/gpt-duvidas/${jornadaId}/duvida`, {
      pergunta,
    })
    .then((response) => response.data)
    .catch((error: AxiosError<ApiError>) => {
      console.error("Erro em enviar a duvida", error.response?.data);
      toast.error(error.response?.data?.message || "Erro ao enviar a duvida");
      throw error;
    });
}
