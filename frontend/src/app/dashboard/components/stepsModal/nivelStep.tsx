import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NivelStepProps = {
  nivel: string;
  setNivel: (nivel: string) => void;
};

export function NivelStep({ nivel, setNivel }: NivelStepProps) {
  return (
    <div key="step-2" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual seu nível geral de programação?
      </p>

      <Select value={nivel} onValueChange={setNivel}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione seu nível" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nenhuma">Nenhuma experiência</SelectItem>
          <SelectItem value="iniciante">Iniciante</SelectItem>
          <SelectItem value="intermediario">Intermediário</SelectItem>
          <SelectItem value="avancado">Avançado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
