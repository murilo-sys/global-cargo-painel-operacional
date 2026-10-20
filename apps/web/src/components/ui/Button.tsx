type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      className={`rounded-4xl transition-all duration-300 active:scale-95 ${disabled ? "bg-gray-400 cursor-not-allowed " : "bg-white hover:-translate-y-0.5 cursor-pointer"} ${className && className}`}
    >
      {children}
    </button>
  );
}
