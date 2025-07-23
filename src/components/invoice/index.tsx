import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import BillingHistoryTable from './components/BillingHistoryTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AccountService from '../../services/Account';


const Invoice = () => {
  // Pagination state for invoice table
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [error, setError] = useState<string | null>(null);

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
  const handleDownloadInvoice = (invoice: any) => {
    console.log('Download invoice:', invoice);
    // The actual download is now handled in the BillingHistoryTable component
    // This is just a fallback if needed
  };

  // Export all invoices as CSV
  function exportAllInvoices(invoices: any[]) {
    const csvRows = [
      ['Date', 'Invoice', 'Plan', 'Amount', 'Status'],
      ...invoices.map(inv => [
        inv.date, inv.number, inv.plan, inv.amount, inv.status
      ])
    ];
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    URL.revokeObjectURL(url);
  }


  const location = useLocation();
  // Always get userId from navigation state for invoice page
  const userId = location.state?.userId;
  console.log('Invoice page: userId from navigation state:', userId);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!userId) {
          setError('User not found. Please log in again.');
          setLoading(false);
          return;
        }
        // Call the userinvoicehistory/{userId} endpoint
        const response = await fetch(`/api/Node/userinvoicehistory/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'APIKey': 'your_api_key_here' // if required
          }
        });
        const rawText = await response.text();
        let result;
        try {
          result = JSON.parse(rawText);
        } catch {
          result = { message: rawText };
        }
        console.log('Invoice: API result:', result);
        if (!response.ok || !result.invoices || !Array.isArray(result.invoices)) {
          setError(result.message || result.msg || 'No invoice history found.');
          setInvoices([]);
        } else {
          setInvoices(result.invoices.map((inv: any) => ({
            id: inv.invoiceNumber || inv.id || Math.random().toString(),
            number: inv.invoiceNumber || '-',
            date: inv.invoiceDate ? inv.invoiceDate.split('\r\n')[0] : '-', // Extract date part only
            time: inv.invoiceDate ? inv.invoiceDate.split('\r\n')[1] : '', // Extract time part only
            plan: inv.planName || '-',
            amount: inv.amount ? inv.amount.toString() : '0.00',
            status: inv.invoiceStatus || '-',
            pdf: inv.invoicePdf,
            hostedUrl: inv.invoicePdf // Use invoicePdf as hostedUrl
          })));
        }
      } catch (err: any) {
        let apiMsg = '';
        if (err && err.message) {
          apiMsg = err.message;
        }
        setError(apiMsg || 'Failed to load invoice history.');
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [location.state]);

  // Filtering logic
  const filteredInvoices = invoices.filter(invoice => {
    // Search filter - search in invoice number, plan, and status
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      invoice.number.toLowerCase().includes(searchLower) ||
      invoice.plan.toLowerCase().includes(searchLower) ||
      invoice.status.toLowerCase().includes(searchLower);
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus.toLowerCase();
    
    // Plan filter
    const matchesPlan = filterPlan === 'all' || invoice.plan.toLowerCase() === filterPlan.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Pagination logic (must be after filteredInvoices)
  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / pageSize));
  const pagedInvoices = filteredInvoices.slice((currentPage - 1) * pageSize, currentPage * pageSize);


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

  if (error) {
    return (
      <Wrapper>
        <div className="bg-dark min-vh-100">
          <HeaderDashboard />
          <div className="section-space-md-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center">
                    <Icon name="AlertTriangle" size={48} className="text-danger mx-auto mb-4" />
                    <p className="text-danger">{error}</p>
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
      <div className="bg-dark min-vh-100">
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
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
                      invoices={pagedInvoices}
                      onDownload={handleDownloadInvoice}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      filterStatus={filterStatus}
                      setFilterStatus={setFilterStatus}
                      filterPlan={filterPlan}
                      setFilterPlan={setFilterPlan}
                      onExportAll={exportAllInvoices}
                    />
                  </div>
                </div>
                {/* Pagination - always show at least page 1, rounded, green, hoverable */}
                <div className="d-flex justify-content-center align-items-center py-4">
                  <nav aria-label="Invoices pagination">
                    <ul className="pagination mb-0" style={{ background: 'transparent', gap: '0.75rem' }}>
                      {/* PREV button, only show if not on first page */}
                      {currentPage > 1 && (
                        <li>
                          <button
                            className="fw-bold prev-next-btn"
                            style={{
                              minWidth: '3.2rem',
                              height: '2rem',
                              borderRadius: '1.2rem',
                              border: '2px solid #fff',
                              background: 'transparent',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '0.95rem',
                              outline: 'none',
                              cursor: 'pointer',
                              transition: 'background 0.2s, color 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                              textAlign: 'center',
                              letterSpacing: '-1px',
                            }}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            PREV
                          </button>
                        </li>
                      )}
                      {/* Page numbers with ellipsis logic */}
                      {(() => {
                        const pages = [];
                        if (totalPages <= 7) {
                          for (let i = 1; i <= totalPages; i++) {
                            pages.push(i);
                          }
                        } else {
                          if (currentPage <= 4) {
                            pages.push(1, 2, 3, 4, 5, '...', totalPages);
                          } else if (currentPage >= totalPages - 3) {
                            pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                          } else {
                            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                          }
                        }
                        return pages.map((page, idx) => {
                          if (page === '...') {
                            return (
                              <li key={"ellipsis-" + idx} style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: '#fff', fontSize: '1.1rem', padding: '0 0.3rem' }}>...</li>
                            );
                          }
                          return (
                            <li key={page}>
                              <button
                                className={
                                  currentPage === page
                                    ? "fw-bold"
                                    : ""
                                }
                                style={{
                                  width: '2rem',
                                  height: '2rem',
                                  borderRadius: '50%',
                                  border: '2px solid #fff',
                                  background: currentPage === page ? '#A3D34B' : 'transparent',
                                  color: currentPage === page ? '#222' : '#fff',
                                  fontWeight: currentPage === page ? 700 : 400,
                                  fontSize: '1rem',
                                  outline: 'none',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s, color 0.2s',
                                }}
                                onClick={() => setCurrentPage(page as number)}
                                disabled={currentPage === page}
                              >
                                {page}
                              </button>
                            </li>
                          );
                        });
                      })()}
                      {/* NEXT button, only show if not on last page */}
                      {currentPage < totalPages && (
                        <li>
                          <button
                            className="fw-bold prev-next-btn"
                            style={{
                              minWidth: '3.2rem',
                              height: '2rem',
                              borderRadius: '1.2rem',
                              border: '2px solid #fff',
                              background: 'transparent',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '0.95rem',
                              outline: 'none',
                              cursor: 'pointer',
                              transition: 'background 0.2s, color 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                              textAlign: 'center',
                              letterSpacing: '-1px',
                            }}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            NEXT
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
                </div>
              </div>
          </div>
        </div>
    </Wrapper>
  );
};

export default Invoice;