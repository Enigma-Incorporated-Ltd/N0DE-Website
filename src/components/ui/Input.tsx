import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      description,
      error,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputClasses =
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const checkboxRadioClasses =
      "h-4 w-4 border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Handle checkbox
    if (type === "checkbox") {
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className={cn("rounded", checkboxRadioClasses, className)}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "text-sm font-medium leading-none",
                error ? "text-destructive" : "text-foreground"
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
        </div>
      );
    }

    // Handle radio
    if (type === "radio") {
      return (
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={inputId}
            ref={ref}
            className={cn("rounded-full", checkboxRadioClasses, className)}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "text-sm font-medium leading-none",
                error ? "text-destructive" : "text-foreground"
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
        </div>
      );
    }

    // Handle text/password/email/... inputs
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none",
              error ? "text-destructive" : "text-foreground"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            baseInputClasses,
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          required={required}
          {...props}
        />

        {description && !error && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
