import React, { useState } from "react";

interface AddressFormProps {
  onSubmit: (address: AddressData) => void;
  isLoading?: boolean;
  onCountryChange?: (country: string, address: Partial<AddressData>) => void;
}

export interface AddressData {
  country: string;
  postalCode: string;
  city: string;
  state: string;
  line1: string;
  line2?: string;
}

export default function AddressForm({ onSubmit, isLoading, onCountryChange }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({
    country: "",
    postalCode: "",
    city: "",
    state: "",
    line1: "",
    line2: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Clear error when user starts typing
    if (errors[name as keyof AddressData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Call onCountryChange when country is selected/changed
    if (name === 'country' && value && onCountryChange) {
      onCountryChange(value, {
        country: value,
        postalCode: newFormData.postalCode,
        city: newFormData.city,
        state: newFormData.state,
        line1: newFormData.line1
      });
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
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.state) {
      newErrors.state = "State/Province is required";
    }
    if (!formData.line1) {
      newErrors.line1 = "Address line 1 is required";
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

  // List of countries (common ones for tax calculation)
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
      <div className="mb-3">
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
            borderRadius: '8px'
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

      <div className="mb-3">
        <label htmlFor="line1" className="form-label text-light mb-2">
          Address Line 1 <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="line1"
          name="line1"
          value={formData.line1}
          onChange={handleChange}
          className={`form-control ${errors.line1 ? 'is-invalid' : ''}`}
          placeholder="Street address"
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px'
          }}
        />
        {errors.line1 && (
          <div className="invalid-feedback d-block text-danger small mt-1">
            {errors.line1}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="line2" className="form-label text-light mb-2">
          Address Line 2 <span className="text-muted">(Optional)</span>
        </label>
        <input
          type="text"
          id="line2"
          name="line2"
          value={formData.line2}
          onChange={handleChange}
          className="form-control"
          placeholder="Apartment, suite, etc."
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px'
          }}
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label text-light mb-2">
            City <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            placeholder="City"
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '8px'
            }}
          />
          {errors.city && (
            <div className="invalid-feedback d-block text-danger small mt-1">
              {errors.city}
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="state" className="form-label text-light mb-2">
            State/Province <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
            placeholder="State/Province"
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '8px'
            }}
          />
          {errors.state && (
            <div className="invalid-feedback d-block text-danger small mt-1">
              {errors.state}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="postalCode" className="form-label text-light mb-2">
          Postal Code <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
          placeholder="Postal code"
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

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-100 rounded-pill px-5 py-2 fw-semibold d-flex justify-content-center align-items-center"
        style={{
          background: 'linear-gradient(90deg, #7c5cff 0%, #6a5cff 100%)',
          border: 'none'
        }}
      >
        <span>
          {isLoading ? "Processing..." : "Continue to Payment"}
        </span>
      </button>
    </form>
  );
}

