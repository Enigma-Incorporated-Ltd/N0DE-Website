import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface BillingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface BillingAddressCardProps {
  address: BillingAddress;
  onUpdate: (newAddress: BillingAddress) => void;
}

const BillingAddressCard: React.FC<BillingAddressCardProps> = ({ address, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState(address);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(address);
  };

  const handleSave = async () => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setIsEditing(false);
      onUpdate(formData);
    }, 2000);
  };

  const handleChange = (field: keyof BillingAddress, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="card-gl-dark rounded-4 p-4" data-cue="fadeIn">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="text-light fw-semibold mb-0">Billing Address</h3>
        {!isEditing && (
          <button
            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
            onClick={handleEdit}
          >
            <Icon name="Edit" size={14} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="d-flex flex-column gap-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-light fw-medium">First Name</label>
              <input
                type="text"
                className="form-control bg-dark-light text-light border-secondary"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-light fw-medium">Last Name</label>
              <input
                type="text"
                className="form-control bg-dark-light text-light border-secondary"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="form-label text-light fw-medium">Address Line 1</label>
            <input
              type="text"
              className="form-control bg-dark-light text-light border-secondary"
              value={formData.addressLine1}
              onChange={(e) => handleChange('addressLine1', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="form-label text-light fw-medium">Address Line 2</label>
            <input
              type="text"
              className="form-control bg-dark-light text-light border-secondary"
              value={formData.addressLine2}
              onChange={(e) => handleChange('addressLine2', e.target.value)}
              placeholder="Apartment, suite, etc. (optional)"
            />
          </div>
          
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label text-light fw-medium">City</label>
              <input
                type="text"
                className="form-control bg-dark-light text-light border-secondary"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-light fw-medium">State</label>
              <input
                type="text"
                className="form-control bg-dark-light text-light border-secondary"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-light fw-medium">ZIP Code</label>
              <input
                type="text"
                className="form-control bg-dark-light text-light border-secondary"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="form-label text-light fw-medium">Country</label>
            <input
              type="text"
              className="form-control bg-dark-light text-light border-secondary"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              required
            />
          </div>

          <div className="d-flex align-items-center gap-3 pt-3">
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Icon name="Loader2" size={14} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Icon name="Save" size={14} />
              )}
              <span>Save Changes</span>
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-start gap-3">
            <Icon name="MapPin" size={20} className="text-light-50" style={{ marginTop: '2px' }} />
            <div className="flex-fill">
              <div className="text-light fw-medium">
                {address.firstName} {address.lastName}
              </div>
              <div className="text-light-50 fs-14 mt-1">
                {address.addressLine1}
                {address.addressLine2 && <><br />{address.addressLine2}</>}
                <br />
                {address.city}, {address.state} {address.zipCode}
                <br />
                {address.country}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingAddressCard;