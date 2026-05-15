import { Textarea } from "@/components/ui/textarea";

type MetaProjetoStepProps = {
  metaProjeto: string;
  setMetaProjeto: (metaProjeto: string) => void;
};

export function MetaProjetoStep({
  metaProjeto,
  setMetaProjeto,
}: MetaProjetoStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual sua meta de projeto/desafio pessoal?
      </p>
      <p className="text-xs text-muted-foreground">
        Ex: "Criar um CRUD completo em Java", "Desenvolver um mini-jogo
        orientado a objetos"
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
