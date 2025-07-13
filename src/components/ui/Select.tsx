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
      <div className={cn("relative", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "text-sm font-medium leading-none mb-2 block",
              error ? "text-red-600" : "text-gray-900"
            )}
          >
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <button
            ref={ref}
            id={selectId}
            type="button"
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm",
              "ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2",
              "focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-300 focus:ring-red-500",
              !hasValue && "text-gray-500"
            )}
            onClick={handleToggle}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            {...props}
          >
            <span className="truncate">{getSelectedDisplay()}</span>
            <div className="flex items-center gap-1">
              {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}

              {clearable && hasValue && !loading && (
                <button
                  type="button"
                  className="h-4 w-4 hover:bg-gray-100 rounded"
                  onClick={handleClear}
                  tabIndex={-1}
                >
                  <Icon name="X" size={12} />
                </button>
              )}

              <Icon name="ChevronDown" size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
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
  className="sr-only"
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
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {searchable && (
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <Icon name="Search" size={16} className="absolute left-2 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {searchTerm ? "No options found" : "No options available"}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-gray-100",
                        isSelected(option.value) && "bg-blue-50 text-blue-900",
                        option.disabled && "pointer-events-none opacity-50"
                      )}
                      onClick={() => handleOptionSelect(option)}
                    >
                      <span className="flex-1">{option.label}</span>
                      {multiple && isSelected(option.value) && (
                        <Icon name="Check" size={16} className="text-blue-600" />
                      )}
                      {option.description && (
                        <span className="text-xs text-gray-500 ml-2">{option.description}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {description && !error && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
