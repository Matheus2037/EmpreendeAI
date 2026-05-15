import MultipleSelector, { Option } from "@/components/ui/multipleSelector";

type EstiloAprendizadoStepProps = {
  estilosAprendizado: Option[];
  setEstilosAprendizado: (estilosAprendizado: Option[]) => void;
};

export function EstiloAprendizadoStep({
  estilosAprendizado,
  setEstilosAprendizado,
}: EstiloAprendizadoStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual são seus estilos de aprendizagem preferidos?
      </p>

      <MultipleSelector
        placeholder="Selecione ou adicione estilos de aprendizagem"
        hidePlaceholderWhenSelected
        creatable
        value={estilosAprendizado}
        onChange={setEstilosAprendizado}
        defaultOptions={[
          {
            value: "video aulas passo a passo",
            label: "Vídeo-aulas passo a passo",
          },
          { value: "leituras e tutoriais", label: "Leituras e tutoriais" },
          { value: "projetos práticos", label: "Projetos práticos" },
          { value: "misturado", label: "Misturado" },
        ]}
      />
    </div>
  );
}
