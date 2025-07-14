import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  labelClassName?: string;
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
      labelClassName,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Handle checkbox
    if (type === "checkbox") {
      return (
        <div className="form-check">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className={`form-check-input ${error ? 'is-invalid' : ''} ${className || ''}`}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={`form-check-label ${error ? 'text-danger' : ''} ${labelClassName || ''}`}
            >
              {label}
              {required && <span className="text-danger ms-1">*</span>}
            </label>
          )}
        </div>
      );
    }

    // Handle radio
    if (type === "radio") {
      return (
        <div className="form-check">
          <input
            type="radio"
            id={inputId}
            ref={ref}
            className={`form-check-input ${error ? 'is-invalid' : ''} ${className || ''}`}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={`form-check-label ${error ? 'text-danger' : ''} ${labelClassName || ''}`}
            >
              {label}
              {required && <span className="text-danger ms-1">*</span>}
            </label>
          )}
        </div>
      );
    }

    // Handle text/password/email/... inputs
    return (
      <div className="mb-3">
        {label && (
          <label
            htmlFor={inputId}
            className={`form-label ${error ? 'text-danger' : ''} ${labelClassName || ''}`}
          >
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          type={type}
          className={`form-control ${error ? 'is-invalid' : ''} ${className || ''}`}
          required={required}
          {...props}
        />

        {description && !error && (
          <div className="form-text">{description}</div>
        )}

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
