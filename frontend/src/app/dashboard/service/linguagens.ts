import { api } from "@/config/axios";
import { Linguagem } from "./types/linguagens";
import { toast } from "sonner";
import { ApiError } from "@/types/axios";
import { AxiosError } from "axios";

export async function getLinguagens() {
  return api
    .get<Linguagem[]>("linguagens")
    .then((response) => response.data)
    .catch((error: AxiosError<ApiError>) => {
      console.log("Erro em buscar linguagens", error);
      toast.error(error.response?.data?.message || "Erro em buscar linguagens");
    });
}
