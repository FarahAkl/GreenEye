import React, { type ReactNode } from 'react';

interface IProps {
  variant?: 'filled' | 'outline' | 'no-border';
  color?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  btnLabel: string;
  children?: ReactNode;
}

const COLORS = {
  primary: {
    bg: 'bg-primary',
    text: 'text-primary',
    border: 'border-primary',
    hover: 'hover:bg-primary/10',
    filledText: 'text-white',
  },
  secondary: {
    bg: 'bg-secondary',
    text: 'text-secondary',
    border: 'border-secondary',
    hover: 'hover:bg-secondary/10',
    filledText: 'text-white',
  },
  danger: {
    bg: 'bg-red-500',
    text: 'text-red-500',
    border: 'border-red-500',
    hover: 'hover:bg-red-500/10',
    filledText: 'text-white',
  },
};

const Button = ({
  variant = 'filled',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  btnLabel,
  type = 'button',
  className = '',
  children,
}: IProps) => {
  const palette = COLORS[color];

  const baseStyles =
    'px-4 h-12 cursor-pointer rounded-md text-sm font-medium transition-all duration-300 outline-none';

  const filledStyles = `
    ${palette.bg}
    ${palette.filledText}
    hover:brightness-110
  `;

  const outlineStyles = `
    ${palette.text}
    ${palette.border}
    border
    bg-white
    ${palette.hover}
  `;

  const noBorderStyles = `
    ${palette.text}
    border-none
    bg-white
  `;

  const variantStyles =
    variant === 'filled'
      ? filledStyles
      : variant === 'no-border'
        ? noBorderStyles
        : outlineStyles;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {btnLabel}
      {children}
    </button>
  );
};

export default Button;
