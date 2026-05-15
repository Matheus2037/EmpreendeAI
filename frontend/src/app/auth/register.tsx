import { Input } from "@/components/ui/input";
import { AuthLayout } from "./components/authLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/contexts/auth";

const MOCK_MODE = import.meta.env.VITE_MOCK_AUTH === "true";

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return toast.error("As senhas não coincidem");
    }

    if (MOCK_MODE) {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      login();
      toast.success("Cadastro realizado com sucesso!");
      navigate("/home");
      setIsLoading(false);
      return;
    }

    const userName = formData.get("username") as string;
    const email = formData.get("email") as string;
    const profilePhotoLink = formData.get("profilePhotoLink") as string;

    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: userName,
          photoURL: profilePhotoLink,
        });
        toast.success("Cadastro realizado com sucesso!");
        navigate("/home");
      })
      .catch((error: FirebaseError) => {
        toast.error("Erro ao criar usuário: " + error.message);
      });
    setIsLoading(false);
  };

  return (
    <AuthLayout label="Registre-se" onSubmit={handleSubmit}>
      <div className="flex justify-center mb-5">
        <div className="size-32 rounded-full bg-background flex items-center justify-center p-2 cursor-pointer relative overflow-hidden border border-border">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="foto-de-perfil"
              className="absolute inset-0 size-full object-cover rounded-full"
            />
          ) : (
            <span className="text-center text-xs text-muted-foreground">
              O preview da sua foto aparecerá aqui
            </span>
          )}
        </div>
      </div>

      <Input
        placeholder="Link da foto de perfil"
        type="text"
        name="profilePhotoLink"
        onChange={(e) => setImageUrl(e.target.value || null)}
      />

      <Input placeholder="Nome de usuário" type="text" name="username" required />
      <Input placeholder="E-mail" type="email" name="email" required />
      <Input placeholder="Senha" type="password" name="password" required />
      <Input
        placeholder="Confirmar senha"
        type="password"
        name="confirmPassword"
        required
      />

      <Button type="submit" size="lg" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : "Registrar"}
      </Button>

      <Link className={buttonVariants({ variant: "ghost" })} to="/">
        Já tem conta? <strong>Fazer login</strong>
      </Link>
    </AuthLayout>
  );
}
