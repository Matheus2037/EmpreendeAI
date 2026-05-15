import { Textarea } from "@/components/ui/textarea";

type DificuldadeStepProps = {
  dificuldade: string;
  setDificuldade: (dificuldade: string) => void;
};

export function DificuldadeStep({
  dificuldade,
  setDificuldade,
}: DificuldadeStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual sua área de maior dificuldade?
      </p>
      <p className="text-xs text-muted-foreground">
        Ex: "Como estruturar classes em POO", "Escolher quando usar herança vs.
        composição"
      </p>

      <Textarea
        placeholder="Descreva sua dificuldade"
        value={dificuldade}
        onChange={(e) => setDificuldade(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
}
