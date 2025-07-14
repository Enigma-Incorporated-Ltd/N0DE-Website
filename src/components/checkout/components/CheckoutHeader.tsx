import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CheckoutHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="CreditCard" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">N0de</span>
        </Link>

        {/* Security Indicators */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Lock" size={16} className="text-success" />
            <span>256-bit Encryption</span>
          </div>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link to="/plan-selection" className="flex items-center space-x-2">
            <Icon name="ArrowLeft" size={16} />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default CheckoutHeader;