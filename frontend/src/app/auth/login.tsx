import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./components/authLayout";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { translateFirebaseError } from "@/lib/firebaseErrorsPtBr";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      })
      .catch((error: FirebaseError) => {
        console.error("Erro ao fazer login:", error);
        toast.error(translateFirebaseError(error));
      });

    setIsLoading(false);
  }

  async function handleResetPassword() {
    const email = emailRef.current?.value;

    if (!email) {
      toast.error("Digite seu e-mail para redefinir a senha");
      return;
    }

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Link de redefinição enviado para seu e-mail!");
      })
      .catch((error: FirebaseError) => {
        toast.error(translateFirebaseError(error));
      });
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
      <Link className={buttonVariants({ variant: "outline" })} to="/registro">
        Registrar-se
      </Link>
    </AuthLayout>
  );
}
