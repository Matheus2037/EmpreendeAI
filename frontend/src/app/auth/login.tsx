import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./components/authLayout";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { translateFirebaseError } from "@/lib/firebaseErrorsPtBr";
import { useAuthContext } from "@/contexts/auth";

const MOCK_MODE = import.meta.env.VITE_MOCK_AUTH === "true";

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const { login } = useAuthContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (MOCK_MODE) {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      login();
      toast.success("Login realizado com sucesso!");
      navigate("/home");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login realizado com sucesso!");
        navigate("/home");
      })
      .catch((error: FirebaseError) => {
        toast.error(translateFirebaseError(error));
      });
    setIsLoading(false);
  }

  async function handleResetPassword() {
    if (MOCK_MODE) {
      toast.success("Link de redefinição enviado para seu e-mail!");
      return;
    }

    const email = emailRef.current?.value;
    if (!email) {
      toast.error("Digite seu e-mail para redefinir a senha");
      return;
    }

    await sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Link de redefinição enviado para seu e-mail!"))
      .catch((error: FirebaseError) => toast.error(translateFirebaseError(error)));
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login();
    toast.success("Login com Google realizado com sucesso!");
    navigate("/home");
    setIsLoading(false);
  }

  return (
    <AuthLayout label="Login" onSubmit={handleSubmit}>
      <Input
        ref={emailRef}
        placeholder="E-mail"
        type="email"
        name="email"
        required
      />
      <Input placeholder="Senha" type="password" name="password" required />

      <Button
        type="button"
        variant="link"
        className="w-fit px-0"
        onClick={handleResetPassword}
      >
        Esqueci minha senha
      </Button>

      <Button type="submit" size="lg" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
      </Button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={isLoading}
        onClick={handleGoogleLogin}
        className="gap-2"
      >
        <GoogleIcon />
        Entrar com Google
      </Button>

      <Link className={buttonVariants({ variant: "ghost" })} to="/registro">
        Não tem conta? <strong>Registrar-se</strong>
      </Link>
    </AuthLayout>
  );
}
