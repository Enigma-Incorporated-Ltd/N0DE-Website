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
  | 'danger'
  | 'primary';

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
    default: "btn btn-modern-primary",
    destructive: "btn btn-modern-danger",
    outline: "btn btn-modern-outline",
    secondary: "btn btn-modern-secondary",
    ghost: "btn btn-modern-ghost",
    link: "btn btn-link",
    success: "btn btn-modern-success",
    warning: "btn btn-modern-warning",
    danger: "btn btn-modern-danger",
    primary: "btn btn-modern-primary",
  },
  size: {
    default: "btn-modern-default",
    sm: "btn-modern-sm",
    lg: "btn-modern-lg",
    icon: "btn-modern-icon",
    xs: "btn-modern-xs",
    xl: "btn-modern-xl",
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
    <div className="d-flex align-items-center justify-content-center">
      {loading && <LoadingSpinner />}
      {iconName && iconPosition === 'left' && renderIcon()}
      {children}
      {iconName && iconPosition === 'right' && renderIcon()}
    </div>
  );

  const baseClasses = `${variantClasses} ${sizeClasses} ${fullWidth ? 'w-100' : ''} text-center ${className || ''}`;

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
