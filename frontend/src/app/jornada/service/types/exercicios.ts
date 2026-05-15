export type CreateExercicioDto = {
  jornada_id: string;
  modulo_id: number;
  topico_id: number;
};

export type CreateExercicioResponse = {
  status: string;
  linguagem: string;
  exercicio_id: string;
  exercicio_gerado: string;
  dica: string;
  reutilizado: boolean;
};

export type CorrigirExercicioDto = {
  exercicio_id?: string;
  jornada_id?: string;
  modulo_id?: number;
  topico_id?: number;
  resposta_usuario: string;
};

export type CorrigirExercicioResponse = {
  correcao: {
    avaliacao: string;
    melhorias: string[];
    cometario_final: string;
  };
};
