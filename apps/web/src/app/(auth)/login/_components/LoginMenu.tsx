"use client";

import Button from "@/components/ui/Button";
import { useLoginForm } from "../_hooks/useLoginForm";
import Input from "@/components/ui/Input";

export default function LoginMenu() {
  const { register, handleSubmit, isSubmitting, serverError } = useLoginForm();

  return (
    // Background
    <div className="backdrop-blur-sm bg-blue-600/40 rounded-2xl inset-shadow-sm inset-shadow-gray-50/30 w-full max-w-lg py-20 lg:py-28 px-4 lg:px-20">
      {/* Content */}
      <div className="flex flex-col gap-8 justify-center items-center">
        {/* Header */}
        <h1 className="text-3xl font-semibold italic text-white text-center">FAÇA SEU LOGIN</h1>
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5">
          {/* Inputs */}
          <div className="w-full flex flex-col items-center gap-5">
            {/* Email */}
            <Input {...register("email")} type="email" placeholder="E-mail" className="w-full" />
            {/* Password */}
            <Input {...register("password")} type="password" placeholder="Senha" className="w-full" />
          </div>
          {/* Submit button */}
          <Button type="submit" disabled={isSubmitting} className={`w-full py-4 text-blue-950 text-xl`}>
            Entrar
          </Button>

          {/* Error message */}
          {serverError && (
            <p className="transition-all duration-300 text-red-400 italic font-bold">{serverError}</p>
          )}

          {/* Forgot password */}
          {/* <p className="w-full text-right italic underline underline-offset-2 cursor-pointer ">
                Esqueci minha senha
              </p> */}
        </form>
      </div>
    </div>
  );
}
