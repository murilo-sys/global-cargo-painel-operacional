import Image from "next/image";
import LoginMenu from "./_components/LoginMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login"
};

export default function Login() {
  return (
    <div className="relative min-h-dvh flex justify-center p-5 lg:p-15">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image src="/login/background.webp" alt="Caminão de fundo" fill priority className="object-cover" />
      </div>

      {/* Body */}
      <div className="w-full flex lg:justify-end justify-center items-center">
        <LoginMenu />
      </div>
    </div>
  );
}
