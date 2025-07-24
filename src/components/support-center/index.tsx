import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import SupportTicketForm from './components/SupportTicketForm';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';

const SupportCenter = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<any>(null);

  const handleTicketSubmit = (ticketData: any) => {
    setSubmittedTicket(ticketData);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  // Simple success message
  const SuccessMessage = () => (
    <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg text-success">
      Ticket Submitted Successfully!
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
  const renderTabContent = () => <SupportTicketForm />;

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