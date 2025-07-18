import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import HeaderDashboard from '../../../layouts/headers/HeaderDashboard';
import AdminNavigation from '../../../layouts/headers/AdminNavigation';
import Wrapper from '../../../common/Wrapper';
import Icon from '../../../components/AppIcon';

interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'subscription' | 'one-time' | 'refund';
  plan: string;
  date: string;
  paymentMethod: string;
  invoiceId: string;
}

const OrdersPayments = () => {
  // Pagination state (must be after filteredTransactions is defined)
  const [currentPage, setCurrentPage] = useState(1);
  // FIX: Show only 4 entries per page
  const pageSize = 4;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Mock transaction data
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      amount: 29.99,
      status: 'completed',
      type: 'subscription',
      plan: 'PRO',
      date: '2025-01-10',
      paymentMethod: 'Visa ****4242',
      invoiceId: 'INV-2025-001'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      amount: 9.99,
      status: 'completed',
      type: 'subscription',
      plan: 'LITE',
      date: '2025-01-09',
      paymentMethod: 'Mastercard ****5555',
      invoiceId: 'INV-2025-002'
    },
    {
      id: '3',
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      amount: 99.99,
      status: 'pending',
      type: 'one-time',
      plan: 'ENTERPRISE',
      date: '2025-01-08',
      paymentMethod: 'PayPal',
      invoiceId: 'INV-2025-003'
    },
    {
      id: '4',
      customerName: 'Alice Brown',
      customerEmail: 'alice@example.com',
      amount: 29.99,
      status: 'failed',
      type: 'subscription',
      plan: 'PRO',
      date: '2025-01-07',
      paymentMethod: 'Visa ****1234',
      invoiceId: 'INV-2025-004'
    },
    {
      id: '5',
      customerName: 'Charlie Wilson',
      customerEmail: 'charlie@example.com',
      amount: -29.99,
      status: 'refunded',
      type: 'refund',
      plan: 'PRO',
      date: '2025-01-06',
      paymentMethod: 'Visa ****4242',
      invoiceId: 'REF-2025-001'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);
  // Filtering
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || transaction.plan === filterPlan;
    const transactionDate = new Date(transaction.date);
    const matchesStartDate = !startDate || transactionDate >= startDate;
    const matchesEndDate = !endDate || transactionDate <= endDate;
    return matchesSearch && matchesStatus  && matchesPlan && matchesStartDate && matchesEndDate;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const pagedTransactions = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { class: 'bg-success', text: 'Completed' },
      pending: { class: 'bg-warning', text: 'Pending' },
      failed: { class: 'bg-danger', text: 'Failed' },
      refunded: { class: 'bg-secondary', text: 'Refunded' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`badge ${config.class} text-white`}>
        {config.text}
      </span>
    );
  };

  // const getTypeBadge = (type: string) => {
  //   const typeConfig = {
  //     subscription: { class: 'bg-primary', text: 'Subscription' },
  //     'one-time': { class: 'bg-info', text: 'One-time' },
  //     refund: { class: 'bg-secondary', text: 'Refund' }
  //   };
  //   const config = typeConfig[type as keyof typeof typeConfig];
  //   return (
  //     <span className={`badge ${config.class} text-white`}>
  //       {config.text}
  //     </span>
  //   );
  // };

  // const getTotalRevenue = () => {
  //   return transactions
  //     .filter(t => t.status === 'completed' && t.type !== 'refund')
  //     .reduce((sum, t) => sum + t.amount, 0);
  // };

  // const getPendingAmount = () => {
  //   return transactions
  //     .filter(t => t.status === 'pending')
  //     .reduce((sum, t) => sum + t.amount, 0);
  // };

  // const getRefundedAmount = () => {
  //   return Math.abs(transactions
  //     .filter(t => t.status === 'refunded')
  //     .reduce((sum, t) => sum + t.amount, 0));
  // };

  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark">
          {/* <HeaderDashboard /> */}
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
                    <p className="text-light">Loading transactions...</p>
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
                      Manage <span className="text-gradient-primary">Transactions</span>
                    </h1>
                    <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                      View and manage all orders, payments, and billing transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          {/* <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-success fw-bold fs-2 mb-2">${getTotalRevenue().toFixed(2)}</div>
                    <div className="text-light text-opacity-75">Total Revenue</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-warning fw-bold fs-2 mb-2">${getPendingAmount().toFixed(2)}</div>
                    <div className="text-light text-opacity-75">Pending Amount</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-danger fw-bold fs-2 mb-2">${getRefundedAmount().toFixed(2)}</div>
                    <div className="text-light text-opacity-75">Refunded Amount</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-light fw-bold fs-2 mb-2">{transactions.length}</div>
                    <div className="text-light text-opacity-75">Total Transactions</div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Search and Filters */}
          {/* <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-light border-opacity-25 text-light">
                      <Icon name="Search" size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-dark border-light border-opacity-25 text-light"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select bg-dark border-light border-opacity-25 text-light"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
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
                <div className="col-md-2">
                <input
                  type="date"
                  className="form-control bg-dark border-light border-opacity-25 text-light"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control bg-dark border-light border-opacity-25 text-light"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              </div>
            </div>
          </div> */}
          <div className="section-space-sm-y">
  <div className="container">
    <div className="row g-2 align-items-center">
      
      {/* Search Bar */}
      <div className="col-md-3">
        <div className="input-group">
          <span className="input-group-text bg-dark border-light border-opacity-25 text-light">
            <Icon name="Search" size={16} />
          </span>
          <input
            type="text"
            className="form-control bg-dark border-light border-opacity-25 text-light"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Status Filter (reduced width) */}
      <div className="col-md-2">
        <select
          className="form-select bg-dark border-light border-opacity-25 text-light"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

   

      {/* Plan Filter (reduced width) */}
      <div className="col-md-2">
        <select
          className="form-select bg-dark border-light border-opacity-25 text-light"
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
        >
          <option value="all">Plan</option>
          <option value="LITE">LITE</option>
          <option value="PRO">PRO</option>
          <option value="ENTERPRISE">ENT.</option>
        </select>
      </div>

      <div className="col-md-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="form-control bg-dark border-light border-opacity-25 text-light"
          placeholderText="Start date"
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>
      <div className="col-md-2">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="form-control bg-dark border-light border-opacity-25 text-light"
          placeholderText="End date"
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>

    </div>
  </div>
</div>

          {/* Transactions Table */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-4">
                    <div className="table-responsive">
                      <table className="table table-dark table-striped table-hover mb-0">
                        <thead>
                          <tr>
                            <th className="text-light fw-medium">Customer</th>
                            <th className="text-light fw-medium">Amount</th>
                            <th className="text-light fw-medium">Status</th>
                            {/* <th className="text-light fw-medium">Type</th> */}
                            <th className="text-light fw-medium">Plan</th>
                            <th className="text-light fw-medium">Date</th>
                            <th className="text-light fw-medium">Payment Method</th>
                            <th className="text-light fw-medium">Invoice</th>
                            {/* <th className="text-light fw-medium">Actions</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {/* FIX: Only one pagedTransactions.map block, no duplicate <tr> or stray closing braces. Pagination is below the table. Logic unchanged. */}
                          {pagedTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <Icon name="User" size={16} className="text-primary" />
                                  </div>
                                  <div>
                                    <div className="text-light fw-medium">{transaction.customerName}</div>
                                    <div className="text-light text-opacity-75 small">{transaction.customerEmail}</div>
                                  </div>
                                </div>
                              </td>
                              <td className={`fw-medium ${transaction.amount < 0 ? 'text-danger' : 'text-success'}`}>
                                ${Math.abs(transaction.amount).toFixed(2)}
                              </td>
                              <td>{getStatusBadge(transaction.status)}</td>
                              {/* <td>{getTypeBadge(transaction.type)}</td> */}
                              <td className="text-light text-opacity-75">{transaction.plan}</td>
                              <td className="text-light text-opacity-75">{transaction.date}</td>
                              <td className="text-light text-opacity-75">{transaction.paymentMethod}</td>
                              <td className="text-light text-opacity-75">{transaction.invoiceId}</td>
                              {/* <td>
                                <div className="d-flex align-items-center gap-2">
                                  <button 
                                    className="btn btn-sm btn-outline-light text-light text-opacity-75 hover:text-light"
                                    title="View Details"
                                  >
                                    <Icon name="Eye" size={14} />
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-outline-light text-light text-opacity-75 hover:text-light"
                                    title="Download Invoice"
                                  >
                                    <Icon name="Download" size={14} />
                                  </button>
                                  {transaction.status === 'completed' && transaction.type !== 'refund' && (
                                    <button 
                                      className="btn btn-sm btn-outline-warning text-warning hover:text-warning"
                                      title="Process Refund"
                                    >
                                      <Icon name="RotateCcw" size={14} />
                                    </button>
                                  )}
                                </div>
                              </td> */}
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
            <div className="d-flex justify-content-center align-items-center py-4">
              <nav aria-label="Transactions pagination">
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
        {/* Inline style for hover effect on PREV/NEXT buttons */}
        <style>{`
          .prev-next-btn:hover {
            background: #A3D34B !important;
            color: #222 !important;
            border-color: #A3D34B !important;
          }
        `}</style>
      </Wrapper>
    </>
  );
};

export default OrdersPayments; 