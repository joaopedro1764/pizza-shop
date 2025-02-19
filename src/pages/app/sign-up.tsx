import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signUpForm>;
export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  async function handleSignUp(data: SignInForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Enviamos um link de autenticação para seu e-mail!");
  }
  return (
    <>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis!
            </h1>
            <p>Seja um parceiro e comece suas vendas!</p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Seu restaurante</Label>
              <Input {...register("restaurantName")} id="restaurantName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input {...register("managerName")} id="managerName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" {...register("email")} id="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input {...register("phone")} id="phone" />
            </div>

            <Button disabled={isSubmitting} className="w-full">
              Finalizar cadastro
            </Button>
            <p>
              {" "}
              Ao continuar, você concorda com nossos{" "}
              <a className="underline underline-offset-4" href="">
                termos de serviço
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4">
                politicas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
