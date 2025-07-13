import React from 'react';
import Icon from '../../../components/AppIcon';

const EmailConfirmationNotice = ({ email }) => {
  return (
    <div className="bg-muted rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Icon name="Mail" size={16} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">Confirmation Email Sent</h3>
          <p className="text-sm text-muted-foreground mb-3">
            A detailed receipt and subscription confirmation has been sent to{' '}
            <span className="font-medium text-foreground">{email}</span>
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Icon name="Info" size={14} className="mr-1" />
            <span>
              Didn't receive the email? Check your spam folder or{' '}
              <button className="text-primary hover:underline">contact support</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationNotice;