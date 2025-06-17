import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  icon,
}) => {
  const baseClasses =
    "font-medium rounded-xl transition-all duration-200 flex items-center justify-center";

  const variantClasses = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",
    secondary: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
    outline:
      "bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50",
    text: "bg-transparent text-orange-500 hover:bg-orange-50 hover:underline",
  };

  const sizeClasses = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
