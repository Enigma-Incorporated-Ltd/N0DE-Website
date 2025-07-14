import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">N0de</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-primary hover:underline font-medium text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Marketing Content */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Take Control of Your Subscriptions
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join thousands of users who trust N0de to manage their recurring payments, 
                  track expenses, and never miss a billing cycle again.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Bank-Level Security</h3>
                    <p className="text-muted-foreground">
                      Your payment information is protected with industry-standard encryption
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Bell" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Smart Notifications</h3>
                    <p className="text-muted-foreground">
                      Get timely reminders before renewals and never face surprise charges
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="BarChart3" size={20} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Expense Analytics</h3>
                    <p className="text-muted-foreground">
                      Visualize your spending patterns and optimize your subscription portfolio
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full border-2 border-background"></div>
                    <div className="w-8 h-8 bg-accent rounded-full border-2 border-background"></div>
                    <div className="w-8 h-8 bg-warning rounded-full border-2 border-background"></div>
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Join 50,000+ happy users
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "N0de helped me save over $200 per month by identifying unused subscriptions 
                  and optimizing my recurring payments."
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  — Sarah M., Marketing Manager
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/support" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} N0de. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;