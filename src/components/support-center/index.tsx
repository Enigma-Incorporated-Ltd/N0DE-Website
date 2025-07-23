import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SupportTicketForm from './components/SupportTicketForm';
import FAQSection from './components/FAQSection';
import TicketHistory from './components/TicketHistory';
import ContactInfo from './components/ContactInfo';
import LiveChatWidget from './components/LiveChatWidget';
// import HeaderOne from '../../layouts/headers/HeaderOne';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';

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
    <>
      {/* Fixed header only for Support Center page */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        background: '#181A20'
      }}>
        <HeaderDashboard />
      </div>
      {/* Main content wrapper, no negative margin */}
      <div className="bg-dark min-vh-100 w-100" style={{ minHeight: '100vh', background: '#181A20', paddingTop: '80px' }}>
        {/* Breadcrumb visual adjustment: seamless background */}
        <div className="container">
          <nav
            className="d-inline-flex align-items-center rounded-pill px-0 py-1"
            style={{ background: 'transparent', color: '#fff', marginLeft: '0', marginBottom: '10px' }}
            aria-label="Breadcrumb"
          >
            <Link to="/user-dashboard" className="text-warning text-decoration-none d-flex align-items-center gap-2 px-0 py-1 rounded-pill transition-all">
              <Icon name="Home" size={14} />
              <span className="fw-medium" style={{ fontSize: '0.9rem' }}>Dashboard</span>
            </Link>
            <div className="d-flex align-items-center mx-2">
              <Icon name="ChevronRight" size={14} style={{ color: '#fff' }} />
            </div>
            <span className="fw-semibold d-flex align-items-center gap-2 px-2 py-1" style={{ color: '#00e0ff' }}>
              <Icon name="Headphones" size={14} style={{ color: '#00e0ff' }} />
              <span style={{ fontSize: '0.9rem' }}>Support Center</span>
            </span>
          </nav>
        </div>
        {/* --- End Breadcrumb move --- */}
        {/* --- Remove extra margin from main content for tighter layout --- */}
        <div className="container pb-2" style={{ background: 'transparent' }}>
          <div className="mb-2">
            <div className="d-inline-flex align-items-center flex-wrap row-gap-1 column-gap-3 mb-1">
              <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
              <span className="d-block fw-medium text-light" style={{ fontSize: '1.1rem' }}>Support Center</span>
            </div>
            <h1 className="text-light mb-1" style={{ fontSize: '1.8rem' }}>
              <span className="text-gradient-primary">Get Help & Support</span>
            </h1>
            <p className="text-light-50 mb-2" style={{ fontSize: '0.9rem' }}>
              Find answers, submit tickets, and contact our team.
            </p>
          </div>
          {showSuccessMessage && <SuccessMessage />}
          {/* Only Submit Ticket option is shown, so no tab navigation */}
          {/* Submit Ticket Form */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
          {/* All other sections removed as only Submit Ticket is needed */}
        </div>
      </div>
    </>
  );
};

export default SupportCenter;