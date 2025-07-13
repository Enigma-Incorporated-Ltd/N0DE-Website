import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BillingAddressCard = ({ address, onUpdate }) => {
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

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Billing Address</h3>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
            />
          </div>
          
          <Input
            label="Address Line 1"
            value={formData.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            required
          />
          
          <Input
            label="Address Line 2"
            value={formData.addressLine2}
            onChange={(e) => handleChange('addressLine2', e.target.value)}
            placeholder="Apartment, suite, etc. (optional)"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              required
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              required
            />
            <Input
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              required
            />
          </div>
          
          <Input
            label="Country"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            required
          />

          <div className="flex items-center space-x-3 pt-4">
            <Button
              variant="default"
              onClick={handleSave}
              loading={isUpdating}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-foreground font-medium">
                {address.firstName} {address.lastName}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
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