import type { Linguagem } from "./linguagens";

export type JornadaResponse = {
  uid: string;
  linguagem: Linguagem;
  progresso_percent: number;
};

export type NewJornadaDataDto = {
  linguagem: string;
  dificuldades: string[];
  disponibilidade: string;
  estilos_aprendizagem: string[];
  experiencia_linguagem: string;
  conhecimento_logica: string[];
  meta_pessoal: string[];
  nivel_programacao: string;
  objetivo_final: string;
  complemento?: string;
};
