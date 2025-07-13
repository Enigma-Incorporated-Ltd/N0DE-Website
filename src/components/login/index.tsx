import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import HelpSection from './components/HelpSection';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - SubscriptionFlow</title>
        <meta name="description" content="Sign in to your SubscriptionFlow account to manage your subscriptions, billing, and account settings." />
        <meta name="keywords" content="login, sign in, subscription management, billing, account access" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section with Login Form */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Login Form */}
                <div className="order-2 lg:order-1">
                  <LoginForm />
                </div>

                {/* Right Column - Welcome Content */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <div className="max-w-lg mx-auto lg:mx-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                      Welcome Back to
                      <span className="text-primary block">SubscriptionFlow</span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                      Manage your subscriptions, track your billing, and access your dashboard with ease. Your subscription management made simple.
                    </p>
                    
                    {/* Feature Highlights */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-foreground">Real-time subscription tracking</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-foreground">Automated billing management</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-foreground">24/7 customer support</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">10K+</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">99.9%</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">24/7</div>
                        <div className="text-sm text-muted-foreground">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Help Section */}
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/20">
            <div className="max-w-7xl mx-auto">
              <HelpSection />
            </div>
          </section>

          {/* Security Badges */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <SecurityBadges />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
                <span className="text-foreground font-medium">SubscriptionFlow</span>
              </div>
              
              <div className="text-sm text-muted-foreground text-center md:text-right">
                <p>&copy; {new Date().getFullYear()} SubscriptionFlow. All rights reserved.</p>
                <div className="flex items-center justify-center md:justify-end space-x-4 mt-2">
                  <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
                  <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
                  <a href="#" className="hover:text-foreground transition-smooth">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;