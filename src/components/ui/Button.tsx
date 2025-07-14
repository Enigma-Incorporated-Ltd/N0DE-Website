import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import Icon from '../AppIcon';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'success'
  | 'warning'
  | 'danger';

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'xs' | 'xl';
type IconPosition = 'left' | 'right';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  loading?: boolean;
  iconName?: string | null;
  iconPosition?: IconPosition;
  iconSize?: number | null;
  fullWidth?: boolean;
  className?: string;
}

const buttonVariants: {
  variant: Record<ButtonVariant, string>;
  size: Record<ButtonSize, string>;
} = {
  variant: {
    default: "btn-primary",
    destructive: "btn-danger",
    outline: "btn-outline-primary",
    secondary: "btn-secondary",
    ghost: "btn-light",
    link: "btn-link",
    success: "btn-success",
    warning: "btn-warning",
    danger: "btn-danger",
  },
  size: {
    default: "",
    sm: "btn-sm",
    lg: "btn-lg",
    icon: "btn-sm",
    xs: "btn-sm",
    xl: "btn-lg",
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  loading = false,
  iconName = null,
  iconPosition = 'left',
  iconSize = null,
  fullWidth = false,
  disabled = false,
  ...props
}, ref) => {
  const Component = asChild ? Slot : "button";

  const iconSizeMap: Record<ButtonSize, number> = {
    xs: 12,
    sm: 14,
    default: 16,
    lg: 18,
    xl: 20,
    icon: 16,
  };

  const calculatedIconSize = iconSize || iconSizeMap[size] || 16;

  const variantClasses = buttonVariants.variant[variant];
  const sizeClasses = buttonVariants.size[size];

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
  );

  const renderIcon = () => {
    if (!iconName) return null;
    return (
      <Icon
        name={iconName}
        size={calculatedIconSize}
        className={`${
          typeof children !== 'undefined' && iconPosition === 'left' ? "me-2" : ""
        } ${
          typeof children !== 'undefined' && iconPosition === 'right' ? "ms-2" : ""
        }`}
      />
    );
  };

  const buttonContent = (
    <>
      {loading && <LoadingSpinner />}
      {iconName && iconPosition === 'left' && renderIcon()}
      {children}
      {iconName && iconPosition === 'right' && renderIcon()}
    </>
  );

  const baseClasses = `btn ${variantClasses} ${sizeClasses} ${fullWidth ? 'w-100' : ''} ${className || ''}`;

  return (
    <Component
      className={baseClasses}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </Component>
  );
});

Button.displayName = "Button";

export default Button;
