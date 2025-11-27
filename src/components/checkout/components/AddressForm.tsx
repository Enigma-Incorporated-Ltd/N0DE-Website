import React, { useState, useEffect, useRef } from "react";

interface AddressFormProps {
  onSubmit: (address: AddressData) => void;
  isLoading?: boolean;
  onCountryChange?: (country: string, address: Partial<AddressData>, isCountryChange?: boolean) => void;
  hideSubmitButton?: boolean;
}

export interface AddressData {
  country: string;
  postalCode: string;
  city?: string;
  state?: string;
  line1?: string;
  line2?: string;
}

export default function AddressForm({ onSubmit, isLoading, onCountryChange, hideSubmitButton = false }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({
    country: "GB", // Default to United Kingdom
    postalCode: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({});
  const postalCodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Postal code validation patterns for each country
  const postalCodePatterns: Record<string, { pattern: RegExp; message: string; placeholder: string }> = {
    US: { pattern: /^\d{5}(-\d{4})?$/, message: "US ZIP code format: 12345 or 12345-6789", placeholder: "e.g., 12345" },
    GB: { pattern: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i, message: "UK postcode format: SW1A 1AA", placeholder: "e.g., SW1A 1AA" },
    IN: { pattern: /^\d{6}$/, message: "India PIN code must be 6 digits", placeholder: "e.g., 110001" },
    CA: { pattern: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, message: "Canada postal code format: K1A 0B1", placeholder: "e.g., K1A 0B1" },
    AU: { pattern: /^\d{4}$/, message: "Australia postcode must be 4 digits", placeholder: "e.g., 2000" },
    DE: { pattern: /^\d{5}$/, message: "Germany postal code must be 5 digits", placeholder: "e.g., 10115" },
    FR: { pattern: /^\d{5}$/, message: "France postal code must be 5 digits", placeholder: "e.g., 75001" },
    IT: { pattern: /^\d{5}$/, message: "Italy postal code must be 5 digits", placeholder: "e.g., 00118" },
    ES: { pattern: /^\d{5}$/, message: "Spain postal code must be 5 digits", placeholder: "e.g., 28001" },
    NL: { pattern: /^\d{4}\s?[A-Z]{2}$/i, message: "Netherlands postal code format: 1012 AB", placeholder: "e.g., 1012 AB" },
    BE: { pattern: /^\d{4}$/, message: "Belgium postal code must be 4 digits", placeholder: "e.g., 1000" },
    AT: { pattern: /^\d{4}$/, message: "Austria postal code must be 4 digits", placeholder: "e.g., 1010" },
    SE: { pattern: /^\d{3}\s?\d{2}$/, message: "Sweden postal code format: 123 45", placeholder: "e.g., 123 45" },
    NO: { pattern: /^\d{4}$/, message: "Norway postal code must be 4 digits", placeholder: "e.g., 0150" },
    DK: { pattern: /^\d{4}$/, message: "Denmark postal code must be 4 digits", placeholder: "e.g., 1000" },
    FI: { pattern: /^\d{5}$/, message: "Finland postal code must be 5 digits", placeholder: "e.g., 00100" },
    PL: { pattern: /^\d{2}-?\d{3}$/, message: "Poland postal code format: 00-001", placeholder: "e.g., 00-001" },
    IE: { pattern: /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i, message: "Ireland Eircode format: D02 AF30", placeholder: "e.g., D02 AF30" },
    PT: { pattern: /^\d{4}-?\d{3}$/, message: "Portugal postal code format: 1000-001", placeholder: "e.g., 1000-001" },
    GR: { pattern: /^\d{3}\s?\d{2}$/, message: "Greece postal code format: 123 45", placeholder: "e.g., 123 45" },
    CZ: { pattern: /^\d{3}\s?\d{2}$/, message: "Czech Republic postal code format: 100 00", placeholder: "e.g., 100 00" },
    HU: { pattern: /^\d{4}$/, message: "Hungary postal code must be 4 digits", placeholder: "e.g., 1011" },
    RO: { pattern: /^\d{6}$/, message: "Romania postal code must be 6 digits", placeholder: "e.g., 010011" },
    BG: { pattern: /^\d{4}$/, message: "Bulgaria postal code must be 4 digits", placeholder: "e.g., 1000" },
    HR: { pattern: /^\d{5}$/, message: "Croatia postal code must be 5 digits", placeholder: "e.g., 10000" },
    SK: { pattern: /^\d{3}\s?\d{2}$/, message: "Slovakia postal code format: 811 01", placeholder: "e.g., 811 01" },
    SI: { pattern: /^\d{4}$/, message: "Slovenia postal code must be 4 digits", placeholder: "e.g., 1000" },
    EE: { pattern: /^\d{5}$/, message: "Estonia postal code must be 5 digits", placeholder: "e.g., 10111" },
    LV: { pattern: /^LV-?\d{4}$/i, message: "Latvia postal code format: LV-1010", placeholder: "e.g., LV-1010" },
    LT: { pattern: /^LT-?\d{5}$/i, message: "Lithuania postal code format: LT-01001", placeholder: "e.g., LT-01001" },
    LU: { pattern: /^\d{4}$/, message: "Luxembourg postal code must be 4 digits", placeholder: "e.g., 1009" },
    MT: { pattern: /^[A-Z]{3}\s?\d{4}$/i, message: "Malta postal code format: VLT 1117", placeholder: "e.g., VLT 1117" },
    CY: { pattern: /^\d{4}$/, message: "Cyprus postal code must be 4 digits", placeholder: "e.g., 1010" },
    JP: { pattern: /^\d{3}-?\d{4}$/, message: "Japan postal code format: 100-0001", placeholder: "e.g., 100-0001" },
    KR: { pattern: /^\d{5}$/, message: "South Korea postal code must be 5 digits", placeholder: "e.g., 03001" },
    SG: { pattern: /^\d{6}$/, message: "Singapore postal code must be 6 digits", placeholder: "e.g., 018956" },
    HK: { pattern: /^[A-Z0-9]{6}$/i, message: "Hong Kong postal code must be 6 characters", placeholder: "e.g., 999077" },
    MY: { pattern: /^\d{5}$/, message: "Malaysia postal code must be 5 digits", placeholder: "e.g., 50000" },
    TH: { pattern: /^\d{5}$/, message: "Thailand postal code must be 5 digits", placeholder: "e.g., 10200" },
    ID: { pattern: /^\d{5}$/, message: "Indonesia postal code must be 5 digits", placeholder: "e.g., 10110" },
    PH: { pattern: /^\d{4}$/, message: "Philippines postal code must be 4 digits", placeholder: "e.g., 1000" },
    VN: { pattern: /^\d{6}$/, message: "Vietnam postal code must be 6 digits", placeholder: "e.g., 100000" },
    NZ: { pattern: /^\d{4}$/, message: "New Zealand postcode must be 4 digits", placeholder: "e.g., 1010" },
    BR: { pattern: /^\d{5}-?\d{3}$/, message: "Brazil CEP format: 01310-100", placeholder: "e.g., 01310-100" },
    MX: { pattern: /^\d{5}$/, message: "Mexico postal code must be 5 digits", placeholder: "e.g., 01000" },
    AR: { pattern: /^[A-Z]?\d{4}[A-Z]{3}$/i, message: "Argentina postal code format: C1426BMD", placeholder: "e.g., C1426BMD" },
    CL: { pattern: /^\d{7}$/, message: "Chile postal code must be 7 digits", placeholder: "e.g., 8320000" },
    CO: { pattern: /^\d{6}$/, message: "Colombia postal code must be 6 digits", placeholder: "e.g., 110111" },
    PE: { pattern: /^\d{5}$/, message: "Peru postal code must be 5 digits", placeholder: "e.g., 15001" },
    ZA: { pattern: /^\d{4}$/, message: "South Africa postal code must be 4 digits", placeholder: "e.g., 0001" },
    EG: { pattern: /^\d{5}$/, message: "Egypt postal code must be 5 digits", placeholder: "e.g., 11511" },
    AE: { pattern: /^\d{5}$/, message: "UAE postal code must be 5 digits", placeholder: "e.g., 00000" },
    SA: { pattern: /^\d{5}(-?\d{4})?$/, message: "Saudi Arabia postal code format: 12345", placeholder: "e.g., 11564" },
    IL: { pattern: /^\d{5,7}$/, message: "Israel postal code must be 5-7 digits", placeholder: "e.g., 6100001" },
    TR: { pattern: /^\d{5}$/, message: "Turkey postal code must be 5 digits", placeholder: "e.g., 34710" },
    RU: { pattern: /^\d{6}$/, message: "Russia postal code must be 6 digits", placeholder: "e.g., 101000" },
    CN: { pattern: /^\d{6}$/, message: "China postal code must be 6 digits", placeholder: "e.g., 100000" },
    BD: { pattern: /^\d{4}$/, message: "Bangladesh postal code must be 4 digits", placeholder: "e.g., 1000" }
  };

  // Validate postal code based on country
  const validatePostalCode = (country: string, postalCode: string): string | null => {
    if (!country || !postalCode) return null;

    const pattern = postalCodePatterns[country];
    if (!pattern) return null;

    // For UK, allow both with and without spaces
    const normalizedPostalCode = country === 'GB'
      ? postalCode.trim().toUpperCase()
      : postalCode.trim();

    if (!pattern.pattern.test(normalizedPostalCode)) {
      return pattern.message;
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Clear error when user starts typing
    if (errors[name as keyof AddressData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Call onCountryChange when country is selected/changed
    // Only trigger if postal code is valid for the new country
    if (name === 'country' && value && onCountryChange) {
      // Validate postal code for the new country if postal code exists
      if (newFormData.postalCode) {
        const postalCodeError = validatePostalCode(value, newFormData.postalCode);
        if (postalCodeError) {
          // Set error for postal code - don't trigger tax calculation
          setErrors(prev => ({ ...prev, postalCode: postalCodeError }));
          return; // Don't call onCountryChange until postal code is valid
        } else {
          // Clear any postal code errors
          setErrors(prev => ({ ...prev, postalCode: undefined }));
          // Postal code is valid, trigger tax calculation with country change flag
          onCountryChange(value, {
            country: value,
            postalCode: newFormData.postalCode
          }, true); // Pass true to indicate country change
        }
      }
      // If no postal code yet, don't trigger tax calculation
    }

    // Call onCountryChange when postal code is entered/changed (if country is already selected)
    // This is important for countries like India that need postal code for tax calculation
    // Use debounce to avoid excessive API calls while user is typing
    if (name === 'postalCode' && newFormData.country && value && onCountryChange) {
      // Clear existing timeout
      if (postalCodeTimeoutRef.current) {
        clearTimeout(postalCodeTimeoutRef.current);
      }

      // Set new timeout to call API after user stops typing (500ms delay)
      postalCodeTimeoutRef.current = setTimeout(() => {
        // Validate postal code before triggering tax calculation
        const postalCodeError = validatePostalCode(newFormData.country, value);
        if (postalCodeError) {
          // Set error - don't trigger tax calculation
          setErrors(prev => ({ ...prev, postalCode: postalCodeError }));
          return;
        } else {
          // Clear any postal code errors
          setErrors(prev => ({ ...prev, postalCode: undefined }));
          // Postal code is valid, trigger tax calculation
          onCountryChange(newFormData.country, {
            country: newFormData.country,
            postalCode: value
          }, false); // Pass false for postal code change
        }
      }, 500);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressData, string>> = {};

    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    if (!formData.postalCode) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Trigger validation and tax calculation when both country and postal code are present
  useEffect(() => {
    if (formData.country && formData.postalCode && onCountryChange) {
      const postalCodeError = validatePostalCode(formData.country, formData.postalCode);
      if (!postalCodeError) {
        // Both fields are valid, trigger tax calculation
        onCountryChange(formData.country, {
          country: formData.country,
          postalCode: formData.postalCode
        }, false);
      }
    }
  }, []); // Run only on mount

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (postalCodeTimeoutRef.current) {
        clearTimeout(postalCodeTimeoutRef.current);
      }
    };
  }, []);

  // List of countries
  const countries = [
    { code: "", name: "Select a country" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "IN", name: "India" },
    { code: "BD", name: "Bangladesh" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "NL", name: "Netherlands" },
    { code: "BE", name: "Belgium" },
    { code: "AT", name: "Austria" },
    { code: "SE", name: "Sweden" },
    { code: "NO", name: "Norway" },
    { code: "DK", name: "Denmark" },
    { code: "FI", name: "Finland" },
    { code: "PL", name: "Poland" },
    { code: "IE", name: "Ireland" },
    { code: "PT", name: "Portugal" },
    { code: "GR", name: "Greece" },
    { code: "CZ", name: "Czech Republic" },
    { code: "HU", name: "Hungary" },
    { code: "RO", name: "Romania" },
    { code: "BG", name: "Bulgaria" },
    { code: "HR", name: "Croatia" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "EE", name: "Estonia" },
    { code: "LV", name: "Latvia" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MT", name: "Malta" },
    { code: "CY", name: "Cyprus" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "SG", name: "Singapore" },
    { code: "HK", name: "Hong Kong" },
    { code: "MY", name: "Malaysia" },
    { code: "TH", name: "Thailand" },
    { code: "ID", name: "Indonesia" },
    { code: "PH", name: "Philippines" },
    { code: "VN", name: "Vietnam" },
    { code: "NZ", name: "New Zealand" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
    { code: "AR", name: "Argentina" },
    { code: "CL", name: "Chile" },
    { code: "CO", name: "Colombia" },
    { code: "PE", name: "Peru" },
    { code: "ZA", name: "South Africa" },
    { code: "EG", name: "Egypt" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "IL", name: "Israel" },
    { code: "TR", name: "Turkey" },
    { code: "RU", name: "Russia" },
    { code: "CN", name: "China" }
  ];

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="country" className="form-label text-light mb-2">
            Country <span className="text-danger">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '16px 12px',
              paddingRight: '40px',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            {countries.map(country => (
              <option key={country.code} value={country.code} style={{ backgroundColor: '#1a1a1a' }}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <div className="invalid-feedback d-block text-danger small mt-1">
              {errors.country}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="postalCode" className="form-label text-light mb-2">
            {formData.country === 'IN' ? 'PIN Code' : 'Postal Code'} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
            placeholder={
              formData.country && postalCodePatterns[formData.country]
                ? postalCodePatterns[formData.country].placeholder
                : "Postal code"
            }
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '8px'
            }}
          />
          {errors.postalCode && (
            <div className="invalid-feedback d-block text-danger small mt-1">
              {errors.postalCode}
            </div>
          )}
        </div>
      </div>

      {!hideSubmitButton && (
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-100 rounded-pill px-5 py-2 fw-semibold d-flex justify-content-center align-items-center mt-4"
          style={{
            background: 'linear-gradient(90deg, #7c5cff 0%, #6a5cff 100%)',
            border: 'none'
          }}
        >
          <span>
            {isLoading ? "Processing..." : "Continue to Payment"}
          </span>
        </button>
      )}
    </form>
  );
}

