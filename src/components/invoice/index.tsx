import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import BillingHistoryTable from './components/BillingHistoryTable';


const Invoice = () => {
  const [loading, setLoading] = useState(true);
  

  const [invoices, setInvoices] = useState([
    {
      id: 'inv_001',
      number: 'INV-2025-001',
      date: 'Jul 11, 2025',
      time: '2:23 PM',
      period: 'Jul 11 - Aug 11, 2025',
      plan: 'PRO Plan',
      amount: '29.99',
      status: 'paid'
    },
    {
      id: 'inv_002',
      number: 'INV-2025-002',
      date: 'Jun 11, 2025',
      time: '2:23 PM',
      period: 'Jun 11 - Jul 11, 2025',
      plan: 'PRO Plan',
      amount: '29.99',
      status: 'paid'
    },
    {
      id: 'inv_003',
      number: 'INV-2025-003',
      date: 'May 11, 2025',
      time: '2:23 PM',
      period: 'May 11 - Jun 11, 2025',
      plan: 'LITE Plan',
      amount: '9.99',
      status: 'failed'
    }
  ]);
  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Download invoice:', invoiceId);
    // In real app, this would download the PDF
  };


  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error loading billing data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);


  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark">
          <HeaderDashboard />
          <div className="section-space-md-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center">
                    <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                    <p className="text-light">Loading invoice history...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderDashboard />
        
        {/* Header Section */}
        <div className="section-space-md-top" style={{ paddingBottom: '1rem' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="d-inline-flex align-items-center bg-dark-light rounded-pill px-4 py-2 mb-4 mt-4" data-cue="fadeIn" aria-label="Breadcrumb">
                  <Link 
                    to="/user-dashboard" 
                    className="text-light text-decoration-none d-flex align-items-center gap-2 px-3 py-1 rounded-pill transition-all"
                    style={{ 
                      transition: 'all 0.3s ease',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Icon name="Home" size={14} />
                    <span className="fw-medium">Dashboard</span>
                  </Link>
                  <div className="d-flex align-items-center mx-2">
                    <Icon name="ChevronRight" size={16} className="text-light-50" />
                  </div>
                  <span className="text-gradient-primary fw-semibold d-flex align-items-center gap-2 px-3 py-1">
                    <Icon name="CreditCard" size={14} />
                    <span>Invoices</span>
                  </span>
                </nav>
                
                <div className="mb-1">
                  <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-1" data-cue="fadeIn">
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">Invoices</span>
                  </div>
                  <h1 className="text-light mb-0" data-cue="fadeIn">
                    <span className="text-gradient-primary">Invoice history</span>
                  </h1>
                  <p className="text-light mb-0" data-cue="fadeIn">
                    Download your invoices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Tab Content */}
        <div style={{ paddingTop: '0.5rem', paddingBottom: '2rem' }}>
          <div className="container">
           {/* History Tab */}
           <div className="tab-content">
                <div className="row">
                  <div className="col-12">
                    <BillingHistoryTable
                      invoices={invoices}
                      onDownload={handleDownloadInvoice}
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Invoice;