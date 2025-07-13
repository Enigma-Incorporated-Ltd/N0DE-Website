import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onDownloadReceipt }) => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-semibold text-foreground text-center mb-4">
        What's Next?
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          size="lg"
          iconName="LayoutDashboard"
          iconPosition="left"
          onClick={handleGoToDashboard}
          className="flex-1 sm:flex-none"
        >
          Access Dashboard
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          iconName="Download"
          iconPosition="left"
          onClick={onDownloadReceipt}
          className="flex-1 sm:flex-none"
        >
          Download Receipt
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;