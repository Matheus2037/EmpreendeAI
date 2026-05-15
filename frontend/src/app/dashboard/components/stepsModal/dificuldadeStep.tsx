import { Textarea } from "@/components/ui/textarea";

type DificuldadeStepProps = {
  dificuldade: string;
  setDificuldade: (dificuldade: string) => void;
};

export function DificuldadeStep({ dificuldade, setDificuldade }: DificuldadeStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual é o seu maior desafio ou dificuldade nessa área?
      </p>
      <p className="text-xs text-muted-foreground">
        Ex: "Não sei como precificar meu serviço", "Tenho dificuldade em falar em público"
      </p>

      <Textarea
        placeholder="Descreva seu desafio"
        value={dificuldade}
        onChange={(e) => setDificuldade(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
}
