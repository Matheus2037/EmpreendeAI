export function MensagemEnviada({ children }: React.PropsWithChildren) {
  return (
    <div className="flex gap-2 items-start justify-end">
      <div className="bg-muted rounded-lg p-4 max-w-[80%]">
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}
