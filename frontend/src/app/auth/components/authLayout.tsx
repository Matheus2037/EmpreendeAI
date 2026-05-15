type AuthLayoutProps = {
  children: React.ReactNode;
  label: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function AuthLayout({ children, label, onSubmit }: AuthLayoutProps) {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="min-w-lg bg-card p-10 rounded-lg relative">
        <h1 className="text-3xl font-semibold">{label}</h1>

        <img
          src="/mascote.png"
          alt="owl-logo"
          className="size-40 absolute -top-30 left-1/2 transform -translate-x-1/2"
        />

        <form className="flex flex-col gap-5 mt-10" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </main>
  );
}
