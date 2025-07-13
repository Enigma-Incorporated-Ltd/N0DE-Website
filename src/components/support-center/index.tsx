import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SupportTicketForm from './components/SupportTicketForm';
import FAQSection from './components/FAQSection';
import TicketHistory from './components/TicketHistory';
import ContactInfo from './components/ContactInfo';
import LiveChatWidget from './components/LiveChatWidget';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('submit-ticket');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const tabs = [
    { id: 'submit-ticket', label: 'Submit Ticket', icon: 'Plus' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
    { id: 'history', label: 'Ticket History', icon: 'Clock' },
    { id: 'contact', label: 'Contact Info', icon: 'Phone' }
  ];

  const handleTicketSubmit = (ticketData) => {
    setSubmittedTicket(ticketData);
    setShowSuccessMessage(true);
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const SuccessMessage = () => (
    <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon name="Check" size={16} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-success mb-1">Ticket Submitted Successfully!</h3>
          <p className="text-sm text-success/80 mb-2">
            Your support ticket has been created with ID: <strong>{submittedTicket?.id}</strong>
          </p>
          <p className="text-sm text-success/80 mb-3">
            Expected response time: <strong>{submittedTicket?.estimatedResponse}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('history')}
              className="border-success/20 text-success hover:bg-success/10"
            >
              View Ticket History
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuccessMessage(false)}
              className="text-success hover:bg-success/10"
            >
              Dismiss
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSuccessMessage(false)}
          className="text-success hover:bg-success/10"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </div>
  );

  const Breadcrumb = () => (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link to="/user-dashboard" className="hover:text-foreground transition-colors">
        Dashboard
      </Link>
      <Icon name="ChevronRight" size={16} />
      <span className="text-foreground">Support Center</span>
    </div>
  );

  const TabNavigation = () => (
    <div className="border-b border-border mb-6">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const MobileTabNavigation = () => (
    <div className="lg:hidden mb-6">
      <div className="grid grid-cols-2 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'submit-ticket':
        return <SupportTicketForm onSubmit={handleTicketSubmit} />;
      case 'faq':
        return <FAQSection />;
      case 'history':
        return <TicketHistory />;
      case 'contact':
        return <ContactInfo />;
      default:
        return <SupportTicketForm onSubmit={handleTicketSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Headphones" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Support Center</h1>
                <p className="text-muted-foreground mt-1">
                  Get help with your account, billing, and technical issues
                </p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Need immediate help?</p>
                <p className="text-xs text-muted-foreground">Our team is here to assist you</p>
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccessMessage && <SuccessMessage />}
        
        {/* Desktop Tab Navigation */}
        <div className="hidden lg:block">
          <TabNavigation />
        </div>
        
        {/* Mobile Tab Navigation */}
        <MobileTabNavigation />
        
        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>

        {/* Support Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={24} className="text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">4 hours</h3>
            <p className="text-sm text-muted-foreground">Average response time</p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Star" size={24} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">98%</h3>
            <p className="text-sm text-muted-foreground">Customer satisfaction</p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={24} className="text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">99.2%</h3>
            <p className="text-sm text-muted-foreground">Issues resolved</p>
          </div>
        </div>

        {/* Emergency Support Banner */}
        <div className="mt-8 bg-gradient-to-r from-destructive/10 to-warning/10 border border-destructive/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Critical Issue?</h3>
                <p className="text-sm text-muted-foreground">
                  For urgent matters affecting your service, contact our emergency support
                </p>
              </div>
            </div>
            <Button variant="destructive" className="hidden sm:block">
              Emergency Contact
            </Button>
          </div>
          <Button variant="destructive" fullWidth className="sm:hidden mt-4">
            Emergency Contact
          </Button>
        </div>
      </div>

      {/* Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
};

export default SupportCenter;