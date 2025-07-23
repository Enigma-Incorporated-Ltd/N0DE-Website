import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import Icon from "../AppIcon";

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
    const [showPassword, setShowPassword] = useState(false);

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
              className={`form-check-label text-light ${error ? 'text-danger' : ''} ${labelClassName || ''}`}
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
              className={`form-check-label text-light ${error ? 'text-danger' : ''} ${labelClassName || ''}`}
            >
              {label}
              {required && <span className="text-danger ms-1">*</span>}
            </label>
          )}
        </div>
      );
    }

    // Handle text/password/email/... inputs
    const isPassword = type === "password";
    return (
      <div className="mb-3 position-relative" style={{ minHeight: 98 }}>
        {label && (
          <label
            htmlFor={inputId}
            className={`form-label small fw-medium text-light ${error ? 'text-danger' : ''} ${labelClassName || ''}`}
          >
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          type={isPassword && showPassword ? "text" : type}
          className={`form-control bg-dark border-light border-opacity-10 text-light ${error ? 'is-invalid border-danger' : ''} ${className || ''}`}
          style={props.style}
          required={required}
          {...props}
        />
        {isPassword && (
          <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', display: 'flex', alignItems: 'center', paddingRight: 12, zIndex: 2 }}>
            <button
              type="button"
              tabIndex={-1}
              className="btn btn-sm btn-link p-0"
              style={{ lineHeight: 1, boxShadow: 'none' }}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} className="text-light-50" />
            </button>
          </div>
        )}

        {description && !error && (
          <div className="form-text text-light text-opacity-75 small">{description}</div>
        )}

        {error && <div className="invalid-feedback text-danger small">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
