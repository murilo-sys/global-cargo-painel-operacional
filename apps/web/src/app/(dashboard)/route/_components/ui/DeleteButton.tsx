import { startTransition } from "react";

interface DeleteButtonProps {
  formAction: (paylod: string) => void;
  id: string;
  disabled: boolean;
}

export default function DeleteButton({ disabled, id, formAction }: DeleteButtonProps) {
  return (
    <button
      className="cursor-pointer bg-red-500 rounded-lg p-1"
      disabled={disabled}
      onClick={() => {
        startTransition(() => formAction(id));
      }}
    >
      🗑️
    </button>
  );
}
