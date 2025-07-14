// components/ui/Select.tsx
import React, { useState, ForwardedRef } from "react";
import { cn } from "../../utils/cn";
import Icon from "../AppIcon";

type Option = {
  label: string;
  value: string | number;
  description?: string;
  disabled?: boolean;
};

type SelectValue = string | number | Array<string | number>;

type SelectProps = {
  className?: string;
  options?: Option[];
  value?: SelectValue;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  id?: string;
  name?: string;
  onChange?: (value: SelectValue) => void;
  onOpenChange?: (open: boolean) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      options = [],
      value,
      placeholder = "Select an option",
      multiple = false,
      disabled = false,
      required = false,
      label,
      description,
      error,
      searchable = false,
      clearable = false,
      loading = false,
      id,
      name,
      onChange,
      onOpenChange,
      ...props
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const filteredOptions = searchable && searchTerm
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (option.value && option.value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : options;

    const getSelectedDisplay = () => {
      if (!value || (Array.isArray(value) && value.length === 0)) return placeholder;

      if (multiple) {
        const selectedOptions = options.filter((opt) => Array.isArray(value) && value.includes(opt.value));
        if (selectedOptions.length === 1) return selectedOptions[0].label;
        return `${selectedOptions.length} items selected`;
      }

      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    };

    const handleToggle = () => {
      if (!disabled) {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        onOpenChange?.(newIsOpen);
        if (!newIsOpen) setSearchTerm("");
      }
    };

    const handleOptionSelect = (option: Option) => {
      if (option.disabled) return;

      if (multiple) {
        const currentValue = Array.isArray(value) ? value : [];
        const updatedValue = currentValue.includes(option.value)
          ? currentValue.filter((v) => v !== option.value)
          : [...currentValue, option.value];
        onChange?.(updatedValue);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? [] : "");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const isSelected = (optionValue: string | number) => {
      if (multiple) return Array.isArray(value) && value.includes(optionValue);
      return value === optionValue;
    };

    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : value !== undefined && value !== "";

    return (
      <div className={cn("position-relative", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "form-label small fw-medium mb-2 d-block",
              error ? "text-danger" : "text-light"
            )}
          >
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
        )}

        <div className="position-relative">
          <button
            ref={ref}
            id={selectId}
            type="button"
            className={cn(
              "form-control d-flex align-items-center justify-content-between text-start bg-dark border-light border-opacity-10 text-light",
              "focus:outline-none focus:ring-0 focus:border-primary",
              error && "border-danger",
              !hasValue && "text-light text-opacity-50",
              disabled && "cursor-not-allowed opacity-50"
            )}
            style={{ height: 'auto', padding: '0.5rem 0.75rem' }}
            onClick={handleToggle}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            {...props}
          >
            <span className="text-truncate">{getSelectedDisplay()}</span>
            <div className="d-flex align-items-center gap-1 ms-2">
              {loading && (
                <div className="spinner-border spinner-border-sm text-light" role="status" style={{ width: '1rem', height: '1rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              {clearable && hasValue && !loading && (
                <button
                  type="button"
                  className="btn btn-sm p-0 text-light text-opacity-75 hover:text-light"
                  style={{ width: '1rem', height: '1rem' }}
                  onClick={handleClear}
                  tabIndex={-1}
                >
                  <Icon name="X" size={12} />
                </button>
              )}

              <Icon name="ChevronDown" size={16} className={cn("text-light text-opacity-75 transition-transform", isOpen && "rotate-180")} />
            </div>
          </button>

          <select
            name={name}
            value={
              multiple
                ? (Array.isArray(value) ? value.map(String) : [])
                : value !== undefined && value !== null
                  ? String(value)
                  : ""
            }
            className="visually-hidden"
            multiple={multiple}
            required={required}
            tabIndex={-1}
            aria-hidden="true"
          >
            {options.map((option) => (
              <option key={option.value} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>

          {isOpen && (
            <div className="position-absolute w-100 mt-1 bg-dark border border-light border-opacity-10 rounded shadow-lg" style={{ zIndex: 1050, maxHeight: '15rem', overflowY: 'auto' }}>
              {searchable && (
                <div className="p-2 border-bottom border-light border-opacity-10">
                  <div className="position-relative">
                    <Icon name="Search" size={16} className="position-absolute text-light text-opacity-50" style={{ left: '0.5rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="form-control form-control-sm bg-dark border-light border-opacity-10 text-light ps-5"
                      style={{ paddingLeft: '2rem' }}
                    />
                  </div>
                </div>
              )}

              <div className="py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 small text-light text-opacity-50">
                    {searchTerm ? "No options found" : "No options available"}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        "d-flex align-items-center px-3 py-2 small text-light cursor-pointer",
                        "hover:bg-light hover:bg-opacity-10",
                        isSelected(option.value) && "bg-primary bg-opacity-20 text-primary",
                        option.disabled && "pe-none opacity-50"
                      )}
                      onClick={() => handleOptionSelect(option)}
                      style={{ cursor: option.disabled ? 'not-allowed' : 'pointer' }}
                    >
                      <span className="flex-fill">{option.label}</span>
                      {multiple && isSelected(option.value) && (
                        <Icon name="Check" size={16} className="text-primary ms-2" />
                      )}
                      {option.description && (
                        <span className="small text-light text-opacity-50 ms-2">{option.description}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-danger small mt-1">{error}</div>
        )}

        {description && !error && (
          <div className="text-light text-opacity-75 small mt-1">{description}</div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
