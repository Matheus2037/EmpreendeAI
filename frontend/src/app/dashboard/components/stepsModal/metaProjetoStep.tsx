import { Textarea } from "@/components/ui/textarea";

type MetaProjetoStepProps = {
  metaProjeto: string;
  setMetaProjeto: (metaProjeto: string) => void;
};

export function MetaProjetoStep({ metaProjeto, setMetaProjeto }: MetaProjetoStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual é a sua meta concreta para os próximos 3 meses? (opcional)
      </p>
      <p className="text-xs text-muted-foreground">
        Ex: "Abrir meu MEI e conseguir os primeiros 5 clientes", "Liderar uma equipe com mais segurança"
      </p>

      <Textarea
        placeholder="Descreva sua meta"
        value={metaProjeto}
        onChange={(e) => setMetaProjeto(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
}
