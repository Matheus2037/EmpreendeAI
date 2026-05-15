import MultipleSelector, { type Option } from "@/components/ui/multipleSelector";

type ObjetivosStepProps = {
  objetivos: Option[];
  setObjetivos: (objetivos: Option[]) => void;
};

export function ObjetivosStep({ objetivos, setObjetivos }: ObjetivosStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        O que você quer alcançar com essa trilha?
      </p>

      <MultipleSelector
        placeholder="Selecione ou adicione seus objetivos"
        hidePlaceholderWhenSelected
        creatable
        value={objetivos}
        onChange={setObjetivos}
        defaultOptions={[
          { value: "abrir meu proprio negocio", label: "Abrir meu próprio negócio" },
          { value: "melhorar gestao da minha empresa", label: "Melhorar a gestão da minha empresa" },
          { value: "conseguir meu primeiro cliente", label: "Conquistar meu primeiro cliente" },
          { value: "aumentar minhas vendas", label: "Aumentar minhas vendas" },
          { value: "melhorar comunicacao no trabalho", label: "Melhorar minha comunicação no trabalho" },
          { value: "desenvolver lideranca", label: "Desenvolver habilidades de liderança" },
          { value: "entender financas do negocio", label: "Entender as finanças do negócio" },
          { value: "me preparar para o mercado de trabalho", label: "Me preparar para o mercado de trabalho" },
        ]}
      />
    </div>
  );
}
