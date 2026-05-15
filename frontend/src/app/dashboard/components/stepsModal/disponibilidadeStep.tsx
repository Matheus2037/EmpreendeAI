import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DisponibilidadeStepProps = {
  disponibilidade: string;
  setDisponibilidade: (disponibilidade: string) => void;
};

export function DisponibilidadeStep({
  disponibilidade,
  setDisponibilidade,
}: DisponibilidadeStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual sua disponibilidade semanal para estudos?
      </p>

      <Select value={disponibilidade} onValueChange={setDisponibilidade}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione sua disponibilidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="menos que 3 horas">{"< 3 h"}</SelectItem>
          <SelectItem value="de 3 a 5 horas">3–5 h</SelectItem>
          <SelectItem value="de 5 a 10 horas">5–10 h</SelectItem>
          <SelectItem value="mais de 10 horas">{"> 10 h"}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
