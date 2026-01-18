import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed tracking-wide font-serif";
  
  const variants = {
    // Replaced flat yellow with Champagne Gold Gradient
    primary: "bg-gold-metallic text-brand-dark font-bold hover:brightness-110 shadow-[0_0_20px_rgba(191,149,63,0.3)] hover:shadow-[0_0_30px_rgba(252,246,186,0.5)] border border-[#FCF6BA]/20",
    secondary: "bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#BF953F]/50",
    outline: "border border-[#BF953F] text-[#BF953F] hover:bg-[#BF953F] hover:text-black",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-10 py-4",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};