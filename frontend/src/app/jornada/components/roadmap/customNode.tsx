import { Handle, Position, Node } from "@xyflow/react";
import { Checkbox } from "@/components/ui/checkbox";
import { DetalhesSubtopico } from "./detalhesSub";
import { Subtopico } from "../../service/types/conteudoJornadaResponse";

export interface CustomNodeData extends Node {
  label: string;
  sigla: string;
  connections?: boolean;
  checked?: boolean;
  isLoading?: boolean;
  onCheck?: (checked: boolean) => void;
  subNodeContent?: Subtopico;
  moduloId: number;
  subId: number;
}

export function CustomNode({ data }: { data: CustomNodeData }) {
  return (
    <div
      className={`flex items-center gap-4 bg-card relative cursor-pointer rounded-lg ${
        data.isLoading ? "opacity-50" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#555",
          opacity: data.connections ? 1 : 0,
          pointerEvents: data.connections ? "auto" : "none",
        }}
      />
      <Checkbox
        className="size-8 ml-5"
        checked={data.checked}
        disabled={data.isLoading}
        onCheckedChange={(checked) => {
          if (data.onCheck && typeof checked === "boolean") {
            data.onCheck(checked);
          }
        }}
      />
      {data?.subNodeContent ? (
        <DetalhesSubtopico
          subNodeContent={data.subNodeContent}
          sigla={data.sigla}
          moduloId={data.moduloId}
          subId={data.subId}
        >
          <div className="h-full p-5 pl-0">
            <span style={{ fontWeight: 600, whiteSpace: "pre-line" }}>
              {String(data.label)}
            </span>
          </div>
        </DetalhesSubtopico>
      ) : (
        <div className="h-full p-5 pl-0">
          <span style={{ fontWeight: 600, whiteSpace: "pre-line" }}>
            {String(data.label)}
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#555",
          opacity: data.connections ? 1 : 0,
          pointerEvents: data.connections ? "auto" : "none",
        }}
      />
    </div>
  );
}
