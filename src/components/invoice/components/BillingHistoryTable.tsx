import React, { useState } from 'react';
import Icon from '../../AppIcon';
import { currencyConfig } from '../../../services/Account';

interface Invoice {
  id: string;
  number: string;
  date: string;
  time: string;
  plan: string;
  amount: string;
  status: string;
  pdf?: string;
  hostedUrl?: string;
}
//fiters 
interface BillingHistoryTableProps {
  invoices: Invoice[];
  onDownload: (invoice: Invoice) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  filterPlan: string;
  setFilterPlan: (val: string) => void;
  onExportAll?: (invoices: Invoice[]) => void;
}


const BillingHistoryTable: React.FC<BillingHistoryTableProps> = ({
  invoices,
  onDownload,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPlan,
  setFilterPlan,
  onExportAll
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (invoice: Invoice) => {
    setDownloadingId(invoice.id);
    
    try {
      // If we have a PDF URL, open it in a new tab
      if (invoice.pdf || invoice.hostedUrl) {
        const pdfUrl = invoice.pdf || invoice.hostedUrl;
        window.open(pdfUrl, '_blank');
      } else {
        // Fallback to the original callback if no PDF URL
        onDownload(invoice);
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-success bg-success-subtle';
      case 'pending':
        return 'bg-warning text-dark'; // More visible yellow background with dark text
      case 'failed':
        return 'text-danger bg-danger-subtle';
      default:
        return 'text-light-50 bg-secondary-subtle';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="card-gl-dark rounded-4 overflow-hidden" data-cue="fadeIn">
      {/* Filter Bar above table */}
      <div className="p-4 border-bottom border-secondary">
        {/*
          Filter Bar Styles:
          - Width and height of controls increased for better UX.
          - Select dropdowns use text-light for consistency with other controls (was text-primary/blue before).
          - If you want to change the style, adjust minWidth, height, fontSize, and className below.
        */}
        <div className="d-flex align-items-center gap-3">
          {/* Search Bar */}
          <div className="input-group" style={{ minWidth: '300px', height: '40px' }}>
            <span className="input-group-text bg-dark border-light border-opacity-25 text-light" style={{ height: '40px' }}>
              <Icon name="Search" size={16} />
            </span>
            <input
              type="text"
              className="form-control bg-dark border-light border-opacity-25 text-light"
              style={{ height: '40px', fontSize: '1rem' }}
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Status Filter - color changed from blue to light for consistency */}
          <select
            className="form-select bg-dark border-light border-opacity-25 text-light"
            style={{ minWidth: '180px', height: '40px', borderColor: '#0d6efd', fontSize: '1rem' }}
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {/* Plan Filter - color changed from blue to light for consistency */}
          <select
            className="form-select bg-dark border-light border-opacity-25 text-light"
            style={{ minWidth: '180px', height: '40px', borderColor: '#0d6efd', fontSize: '1rem' }}
            value={filterPlan}
            onChange={e => setFilterPlan(e.target.value)}
          >
            <option value="all">All Plans</option>
            <option value="PRO">PRO</option>
            <option value="LITE">LITE</option>
            <option value="BASIC">BASIC</option>
            <option value="PREMIUM">PREMIUM</option>
          </select>
          {/* Export All Button (blue, right side) */}
          <button
            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 ms-auto"
            style={{ height: '40px', fontSize: '1rem' }}
            onClick={() => onExportAll && onExportAll(invoices)}
          >
            <Icon name="Download" size={14} />
            <span>Export All</span>
          </button>
          {/* Clear Filters Button */}
          <button 
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2" 
            style={{ height: '40px', fontSize: '1rem' }}
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterPlan('all');
            }}
          >
            <Icon name="X" size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Filter Summary */}
      {(searchTerm || filterStatus !== 'all' || filterPlan !== 'all') && (
        <div className="p-3 border-bottom border-secondary bg-dark-light">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <small className="text-light-50">Active filters:</small>
            {searchTerm && (
              <span className="badge bg-primary-subtle text-primary px-2 py-1 fs-12">
                Search: "{searchTerm}"
              </span>
            )}
            {filterStatus !== 'all' && (
              <span className="badge bg-success-subtle text-success px-2 py-1 fs-12">
                Status: {filterStatus}
              </span>
            )}
            {filterPlan !== 'all' && (
              <span className="badge bg-info-subtle text-info px-2 py-1 fs-12">
                Plan: {filterPlan}
              </span>
            )}
            <span className="text-dark-50 fs-12">
              ({invoices.length} result{invoices.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-dark table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th className="text-light-50 fw-medium fs-14 p-3">Date</th>
              <th className="text-light-50 fw-medium fs-14 p-3">Invoice Number</th>
              <th className="text-light-50 fw-medium fs-14 p-3">Plan</th>
              <th className="text-light-50 fw-medium fs-14 p-3">Amount</th>
              <th className="text-light-50 fw-medium fs-14 p-3">Status</th>
              <th className="text-light-50 fw-medium fs-14 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-bottom border-dark">
                <td className="p-3">
                  <div className="text-light fs-14">{invoice.date}</div>
                  {/* <div className="text-light-50 fs-12">{invoice.time}</div> */}
                </td>
                <td className="p-3">
                  <div className="text-light fw-medium fs-14">{invoice.status?.toUpperCase() === 'PENDING' ? 'N/A' : invoice.number}</div>
                </td>
                <td className="p-3">
                  <div className="text-light fs-14">{invoice.plan}</div>
                </td>
                <td className="p-3">
                  <div className="text-light fw-medium fs-14">{invoice.status?.toUpperCase() === 'PENDING' ? 'N/A' : currencyConfig.format(parseFloat(invoice.amount))}</div>
                </td>
                <td className="p-3">
                  {invoice.status === 'PENDING' ? (
                    <div
                      className="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill fs-12 fw-medium"
                      style={{
                        background: '#fd7e14', // Bright orange
                        color: '#000000',         // White text for icon
                        fontWeight: 700,
                      }}
                    >
                      <Icon name={getStatusIcon(invoice.status)} size={12} />
                      <span className="text-capitalize" style={{ color: '#000' }}>{invoice.status}</span>
                    </div>
                  ) : (
                  <div className={`d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill fs-12 fw-medium ${getStatusColor(invoice.status)}`}>
                    <Icon name={getStatusIcon(invoice.status)} size={12} />
                    <span className="text-capitalize">{invoice.status}</span>
                  </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                      onClick={() => handleDownload(invoice)}
                      disabled={downloadingId === invoice.id || invoice.status?.toUpperCase() === 'PENDING'}
                    >
                      {downloadingId === invoice.id ? (
                        <Icon name="Loader2" size={14} style={{ animation: 'spin 1s linear infinite' }} />
                      ) : (
                        <Icon name="Download" size={14} />
                      )}
                      <span>PDF</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 && (
        <div className="p-5 text-center">
          <div className="d-flex align-items-center justify-content-center bg-primary-gradient rounded-circle mx-auto mb-4" style={{ width: '96px', height: '96px' }}>
            <Icon name="FileText" size={48} className="text-white" />
          </div>
          <h4 className="text-light fw-medium mb-2">No billing history</h4>
          <p className="text-light-50">Your billing history will appear here once you have transactions.</p>
        </div>
      )}
    {/* Pagination - styled like screenshot, below table */}
    {/* Pagination removed as requested */}
    </div>
  );
};

export default BillingHistoryTable;