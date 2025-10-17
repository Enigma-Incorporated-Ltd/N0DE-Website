import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { NodeService } from '../../../services/Node';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
  metadata?: {
    isDefault?: string | boolean;
  };
  isDefault?: string | boolean;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  isProcessing: boolean;
  isDefault: boolean;
  selected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  paymentMethod,
  isProcessing,
  isDefault,
  selected,
  onSelect,
  onDelete,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);  // Add this line

const handleDeleteClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!paymentMethod?.id) {
    console.error('No payment method ID found');
    return;
  }
  setShowDeleteConfirm(true);
};

const confirmDelete = async () => {
  try {
    await NodeService.deletePaymentMethodById(paymentMethod.id);
    
    setShowDeleteConfirm(false);
    setShowSuccess(true);
    
    if (onDelete) onDelete();
    
  } catch (err) {
    console.error('Delete error:', err);
    alert('Failed to remove payment method');
  }
};

const cancelDelete = () => {
  setShowDeleteConfirm(false);
};
  const getCardIcon = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
      case 'mastercard':
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getBrandBgStyle = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return { background: 'linear-gradient(90deg, #1a2980 0%, #26d0ce 100%)' };
      case 'mastercard':
        return { background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)' };
      case 'amex':
        return { background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' };
      default:
        return { background: 'linear-gradient(90deg, #434343 0%,rgb(252, 2, 2) 100%)' };
    }
  };

  return (
    <>
{showSuccess && (
  <div 
    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onClick={(e) => {
      e.stopPropagation();
      setShowSuccess(false);
      window.location.reload();
    }}
  >
    <div 
      className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl"
      style={{
        position: 'relative',
        zIndex: 10000
      }}
      onClick={e => e.stopPropagation()}
    >
      <div className="text-center">
        <div className="mx-auto mb-4">
          <svg 
            className="h-16 w-16 text-green-500 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2">Success</h3>
        <p className="text-gray-300 mb-6">Your card has been deleted successfully</p>
        <div className="mt-4">
          <button
  onClick={(e) => {
    e.stopPropagation();
    setShowSuccess(false);
    window.location.reload();
  }}
  className="px-8 py-2 !bg-gradient-to-r !from-red-600 !to-red-700 text-white font-medium !rounded-full shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105"
  style={{ background: 'linear-gradient(to right, #dc2626, #b91c1c)' }}
>
  OK
</button>
        </div>
      </div>
    </div>
  </div>
)}
{/* Delete Confirmation Popup */}
{/* Delete Confirmation Popup */}
{showDeleteConfirm && (
  <div 
    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onClick={cancelDelete}
  >
    <div 
      className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl"
      style={{
        position: 'relative',
        zIndex: 10000
      }}
      onClick={e => e.stopPropagation()}
    >
      <div className="text-center">
        <div className="mx-auto mb-4">
          <svg 
            className="h-16 w-16 text-red-500 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">Confirm Deletion</h3>
        <p className="text-gray-300 mb-6">Are you sure you want to remove this payment method?</p>
        <div className="flex justify-center gap-4">
          <button
  onClick={cancelDelete}
  style={{
    padding: '0.5rem 1.5rem',
    backgroundColor: '#2563eb', // blue-600
    color: 'white',
    fontWeight: 500,
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    cursor: 'pointer'
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} // blue-700
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'} // blue-600
>
  Cancel
</button>
<button
  onClick={confirmDelete}
  style={{
    padding: '0.5rem 1.5rem',
    backgroundColor: '#dc2626', // red-600
    color: 'white',
    fontWeight: 500,
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    cursor: 'pointer'
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'} // red-700
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'} // red-600
>
  Remove
</button>
        </div>
      </div>
    </div>
  </div>
)}
      <div
        className={`card-gl-dark rounded-4 p-4 position-relative transition-all d-flex align-items-center ${selected ? 'border border-primary shadow' : isDefault ? 'border border-success' : 'border border-transparent'}`}
        data-cue="fadeIn"
        style={{ cursor: isProcessing ? 'wait' : 'pointer', minHeight: 80 }}
        onClick={() => !isProcessing && onSelect()}
      >
        <div className="form-check me-3">
          <input
            type="radio"
            className="form-check-input bg-dark border-light-50"
            name="defaultPaymentMethod"
            id={`pm-radio-${paymentMethod.id}`}
            checked={selected}
            onChange={onSelect}
            disabled={isProcessing}
            style={{ width: '1.2em', height: '1.2em' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center rounded-2" style={{ width: '48px', height: '32px', ...getBrandBgStyle(paymentMethod.brand) }}>
          <Icon name={getCardIcon(paymentMethod.brand)} size={20} className="text-white" />
        </div>
        <div className="flex-fill ms-3">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="text-light fw-medium">
              •••• •••• •••• {paymentMethod.last4}
            </span>
            <span className="badge text-uppercase fs-12" style={{
              color: '#fff',
              background: (() => {
                switch (paymentMethod.brand?.toLowerCase()) {
                  case 'visa':
                    return 'linear-gradient(90deg, #1a2980 0%, #26d0ce 100%)';
                  case 'mastercard':
                    return 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)';
                  case 'amex':
                    return 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)';
                  default:
                    return 'linear-gradient(90deg, #434343 0%, #262626 100%)';
                }
              })(),
              border: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              padding: '0.25em 0.75em',
              fontWeight: 600,
              letterSpacing: '1px',
            }}>
              {paymentMethod.brand}
            </span>
          </div>
          <div className="text-light-50 fs-14">
            Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
          </div>
        </div>
        <div className="ms-auto d-flex align-items-center gap-2">
          <button 
            className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center" 
            onClick={handleDeleteClick}
            disabled={isProcessing}
            style={{
              width: '32px', 
              height: '32px',
              padding: '0',
              opacity: isProcessing ? 0.5 : 1
            }}
          >
            <Icon name="Trash2" size={16} />
          </button>
          {isDefault && (
            <span className="badge bg-success text-light fs-14 px-3 py-2">Default</span>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentMethodCard;