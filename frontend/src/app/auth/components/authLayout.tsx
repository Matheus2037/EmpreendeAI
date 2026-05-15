type AuthLayoutProps = {
  children: React.ReactNode;
  label: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function AuthLayout({ children, label, onSubmit }: AuthLayoutProps) {
  return (
    <main className="flex justify-center items-center h-screen bg-background">
      <div className="min-w-lg bg-card p-10 rounded-2xl shadow-lg relative border border-border">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl font-bold text-primary tracking-tight">
              Empreende
            </span>
            <span className="text-3xl font-bold text-foreground tracking-tight">
              AI
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Desenvolva as competências para empreender e crescer profissionalmente
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-1">{label}</h2>

        <form className="flex flex-col gap-5 mt-4" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </main>
  );
}
