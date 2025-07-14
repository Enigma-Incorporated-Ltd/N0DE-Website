import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/10 bg-background/5 backdrop-blur supports-[backdrop-filter]:bg-background/5">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={20} className="text-white" />
            </div>
            <span className="text-xl font-semibold text-white">N0de</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white/70 hidden sm:inline">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-primary-light hover:text-primary-light/90 font-medium text-sm transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 px-4 lg:py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Marketing Content */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Take Control of Your Gaming Experience
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Join thousands of gamers who trust N0de to enhance their gaming journey, 
                  track achievements, and never miss a gaming opportunity.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={20} className="text-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Advanced Security</h3>
                    <p className="text-white/70">
                      Your gaming data is protected with industry-standard encryption
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent-light/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Bell" size={20} className="text-accent-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Smart Notifications</h3>
                    <p className="text-white/70">
                      Get timely alerts for game events and never miss important updates
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-warning/20 to-warning-light/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="BarChart3" size={20} className="text-warning-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Performance Analytics</h3>
                    <p className="text-white/70">
                      Track your gaming progress and optimize your performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card/5 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full border-2 border-background"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-full border-2 border-background"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-warning to-warning-light rounded-full border-2 border-background"></div>
                  </div>
                  <div className="text-sm font-medium text-white">
                    Join 50,000+ active gamers
                  </div>
                </div>
                <p className="text-sm text-white/70">
                  "N0de has completely transformed my gaming experience. The analytics and community features are game-changing!"
                </p>
                <div className="mt-2 text-xs text-white/50">
                  — Alex K., Pro Gamer
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
      <footer className="py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-white/50">
              <Link to="/terms" className="hover:text-white/70 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/support" className="hover:text-white/70 transition-colors">
                Support
              </Link>
            </div>
            <div className="text-xs text-white/30">
              © {new Date().getFullYear()} N0de. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;