import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import HeaderDashboard from '../../../layouts/headers/HeaderDashboard';
import AdminNavigation from '../../../layouts/headers/AdminNavigation';
import Wrapper from '../../../common/Wrapper';
import Icon from '../../../components/AppIcon';
import NodeService from '../../../services/Node';

interface Invoice {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  invoiceDate: string;
  invoiceNumber: string;
  planName: string;
  amount: number;
  invoiceStatus: string;
  invoicePdf?: string;
}

const OrdersPayments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await NodeService.getAllInvoices();
      if (result && Array.isArray(result.invoices)) {
        setInvoices(result.invoices.map((inv: any, idx: number) => ({
          id: inv.invoiceNumber || idx.toString(),
          firstName: inv.firstName || '',
          lastName: inv.lastName || '',
          email: inv.email || '',
          invoiceDate: inv.invoiceDate || '',
          invoiceNumber: inv.invoiceNumber || '',
          planName: inv.planName || '',
          amount: inv.amount || 0,
          invoiceStatus: inv.invoiceStatus || '',
          invoicePdf: inv.invoicePdf || '',
        })));
      } else {
        setInvoices([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inv.invoiceStatus.toLowerCase() === filterStatus.toLowerCase();
    const matchesPlan = filterPlan === 'all' || inv.planName.toLowerCase() === filterPlan.toLowerCase();
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / pageSize));
  const pagedInvoices = filteredInvoices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusBadge = (status: string) => {
    const statusConfig: any = {
      paid: { class: 'bg-success', text: 'Paid' },
      pending: { class: 'bg-warning', text: 'Pending' },
      failed: { class: 'bg-danger', text: 'Failed' },
      refunded: { class: 'bg-secondary', text: 'Refunded' }
    };
    const config = statusConfig[status?.toLowerCase()] || { class: 'bg-secondary', text: status };
    return (
      <span className={`badge ${config.class} text-white`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <Wrapper>
        {/*
        <div className="bg-dark">
          <br></br>
          <br></br>
          <br></br>
          <AdminNavigation />
          <div className="section-space-md-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center">
                    <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                    <p className="text-light">Loading orders & payments...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
        <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
            <p className="text-light">Loading orders and payments...</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      <Helmet>
        <title>Orders & Payments - Admin Dashboard - N0de</title>
        <meta name="description" content="Manage orders and payments in the admin dashboard" />
      </Helmet>

      <Wrapper>
        <div className="bg-dark">
          <HeaderDashboard />
          <br></br>
          <br></br>
          <br></br>
          <AdminNavigation />
          {/* Page Header */}
          <div className="section-space-md-top pb-2">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">Orders & Payments</span>
                    </div>
                    <h1 className="text-light mb-2" data-cue="fadeIn">
                      Manage <span className="text-gradient-primary">Orders & Payments</span>
                    </h1>
                    <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                      View and manage all orders and payment details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-2 align-items-center">
                {/* Search Bar */}
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-light border-opacity-25 text-light">
                      <Icon name="Search" size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-dark border-light border-opacity-25 text-light"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {/* Status Filter */}
                <div className="col-md-2">
                  <select
                    className="form-select bg-dark border-light border-opacity-25 text-light"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                {/* Plan Filter */}
                <div className="col-md-2">
                  <select
                    className="form-select bg-dark border-light border-opacity-25 text-light"
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                  >
                    <option value="all">All Plans</option>
                    <option value="LITE">LITE</option>
                    <option value="PRO">PRO</option>
                    <option value="ENTERPRISE">ENTERPRISE</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-4">
                    <div className="table-responsive">
                      <table className="table table-dark table-striped table-hover mb-0">
                        <thead>
                          <tr>
                            <th className="text-light fw-medium">Name</th>
                            <th className="text-light fw-medium">Invoice Date</th>
                            <th className="text-light fw-medium">Invoice Number</th>
                            <th className="text-light fw-medium">Plan</th>
                            <th className="text-light fw-medium">Amount</th>
                            <th className="text-light fw-medium">Status</th>
                            <th className="text-light fw-medium">PDF</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pagedInvoices.map((inv) => (
                            <tr key={inv.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <Icon name="User" size={16} className="text-primary" />
                                  </div>
                                  <div>
                                    <div className="text-light fw-medium">{inv.firstName} {inv.lastName}</div>
                                    <div className="text-light text-opacity-75 small">{inv.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{inv.invoiceDate ? inv.invoiceDate.split('\r\n')[0] : ''}<br /><span className="text-light-50 fs-12">{inv.invoiceDate ? inv.invoiceDate.split('\r\n')[1] : ''}</span></td>
                              <td>{inv.invoiceNumber}</td>
                              <td>{inv.planName}</td>
                              <td>${inv.amount.toFixed(2)}</td>
                              <td>{getStatusBadge(inv.invoiceStatus)}</td>
                              <td>
                                {inv.invoicePdf ? (
                                  <button
                                    className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                                    onClick={() => window.open(inv.invoicePdf, '_blank')}
                                  >
                                    <Icon name="Download" size={14} />
                                    <span>PDF</span>
                                  </button>
                                ) : (
                                  <span className="text-light-50">N/A</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination - always show at least page 1 */}
            <div className="d-flex justify-content-center align-items-center py-4" style={{ background: 'transparent' }}>
              <nav aria-label="Orders pagination">
                <ul className="pagination mb-0 justify-content-center" style={{ background: 'transparent', gap: '0.75rem', border: 'none' }}>
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
                            className={currentPage === page ? "fw-bold active-page-btn" : "page-btn"}
                            style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              border: currentPage === page ? '2px solid #A3D34B' : '2px solid #fff',
                              background: 'transparent',
                              color: currentPage === page ? '#A3D34B' : '#fff',
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
        <style>{`
          .prev-next-btn:hover {
            background: #A3D34B !important;
            color: #222 !important;
            border-color: #A3D34B !important;
          }
          .active-page-btn {
            border: 2px solid #A3D34B !important;
            color: #A3D34B !important;
            background: transparent !important;
          }
          .page-btn {
            border: 2px solid #fff !important;
            color: #fff !important;
            background: transparent !important;
          }
        `}</style>
      </Wrapper>
    </>
  );
};

export default OrdersPayments; 