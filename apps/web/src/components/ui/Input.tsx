type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`border border-white focus:outline-none focus:ring-3 focus:ring-blue-500 rounded-4xl placeholder-white  text-white p-4 transition-all duration-300 ${className && className}`}
    />
  );
}
