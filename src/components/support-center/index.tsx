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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleTicketSubmit = (ticketData) => {
    setSubmittedTicket(ticketData);
    setShowSuccessMessage(true);
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

  // Only show the submit ticket form
  const renderTabContent = () => <SupportTicketForm onSubmit={handleTicketSubmit} />;

  return (
    <div className="bg-dark min-vh-100 w-100" style={{ minHeight: '100vh', background: '#181A20' }}>
      <div className="container py-5" style={{ background: 'transparent' }}>
        {/* Breadcrumb and Header */}
        <nav className="d-inline-flex align-items-center bg-dark-light rounded-pill px-4 py-2 mb-4 mt-4" aria-label="Breadcrumb">
          <Link to="/user-dashboard" className="text-light text-decoration-none d-flex align-items-center gap-2 px-3 py-1 rounded-pill transition-all">
            <Icon name="Home" size={14} />
            <span className="fw-medium">Dashboard</span>
          </Link>
          <div className="d-flex align-items-center mx-2">
            <Icon name="ChevronRight" size={16} className="text-light-50" />
          </div>
          <span className="text-gradient-primary fw-semibold d-flex align-items-center gap-2 px-3 py-1">
            <Icon name="Headphones" size={14} />
            <span>Support Center</span>
          </span>
        </nav>
        <div className="mb-1">
          <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-1">
            <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
            <span className="d-block fw-medium text-light fs-20">Support Center</span>
          </div>
          <h1 className="text-light mb-0">
            <span className="text-gradient-primary">Get Help & Support</span>
          </h1>
          <p className="text-light-50 mb-0">
            Find answers, submit tickets, and contact our team.
          </p>
        </div>
      </div>
      <div className="container pb-5" style={{ background: 'transparent' }}>
        {showSuccessMessage && <SuccessMessage />}
        {/* Only Submit Ticket option is shown, so no tab navigation */}
        {/* Submit Ticket Form */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>
        {/* All other sections removed as only Submit Ticket is needed */}
      </div>
    </div>
  );
};

export default SupportCenter;