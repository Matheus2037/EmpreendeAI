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
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual é o seu nível de experiência nessa área?
      </p>

      <Select value={nivel} onValueChange={setNivel}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione seu nível" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nenhuma">Nunca estudei o assunto</SelectItem>
          <SelectItem value="iniciante">Conheço o básico</SelectItem>
          <SelectItem value="intermediario">Tenho alguma prática</SelectItem>
          <SelectItem value="avancado">Já apliquei no dia a dia</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
