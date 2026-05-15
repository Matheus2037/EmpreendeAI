import MultipleSelector, {
  type Option,
} from "@/components/ui/multipleSelector";

type ObjetivosStepProps = {
  objetivos: Option[];
  setObjetivos: (objetivos: Option[]) => void;
};

export function ObjetivosStep({ objetivos, setObjetivos }: ObjetivosStepProps) {
  return (
    <div key="step-1" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Fale aonde você quer chegar com sua jornada de aprendizado
      </p>

      <MultipleSelector
        placeholder="Selecione ou adicione seus objetivos"
        hidePlaceholderWhenSelected
        creatable
        value={objetivos}
        onChange={setObjetivos}
        defaultOptions={[
          { value: "comecar do zero", label: "Começar do zero" },
          {
            value: "avançar nos fundamentos",
            label: "Avançar nos fundamentos",
          },
          {
            value: "desenvolver projetos praticos",
            label: "Desenvolver projetos práticos",
          },
          {
            value: "se praparar para o mercado de trabalho",
            label: "Preparar para mercado de trabalho",
          },
          {
            value: "se especializar em uma área especifica",
            label: "Especializar em uma área específica",
          },
          {
            value: "aprender frameworks populares",
            label: "Aprender frameworks populares",
          },
          {
            value: "resolver desafios de programação",
            label: "Resolver desafios de programação",
          },
        ]}
      />
    </div>
  );
}
