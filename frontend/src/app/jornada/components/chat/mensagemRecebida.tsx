export function MensagemRecebida({ children }: React.PropsWithChildren) {
  return (
    <div className="flex gap-2 items-start">
      <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-[80%]">
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}
