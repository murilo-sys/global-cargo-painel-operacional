import { LoginFormData, loginSchema } from "@/schemas/login/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "../login.action";

export function useLoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  // Rhf with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  //Server-action for login on submit
  async function onSubmit(data: LoginFormData) {
    //Remove server error
    setServerError(null);

    const result = await loginAction(data);

    //If has error, set to the state
    if (result?.error) {
      setServerError(result.error);
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    serverError
  };
}
