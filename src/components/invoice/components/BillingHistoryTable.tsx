import React, { useState } from 'react';
import Icon from '../../AppIcon';
import Button from '../../ui/Button';

interface Invoice {
  id: string;
  number: string;
  date: string;
  time: string;
  period: string;
  plan: string;
  amount: string;
  status: string;
}

interface BillingHistoryTableProps {
  invoices: Invoice[];
  onDownload: (invoiceId: string) => void;
}

const BillingHistoryTable: React.FC<BillingHistoryTableProps> = ({ invoices, onDownload }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (invoiceId: string) => {
    setDownloadingId(invoiceId);
    // Simulate download
    setTimeout(() => {
      setDownloadingId(null);
      onDownload(invoiceId);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-success bg-success-subtle';
      case 'pending':
        return 'text-warning bg-warning-subtle';
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
      <div className="p-4 border-bottom border-secondary">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="text-light fw-semibold mb-0"></h3>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
              <Icon name="Filter" size={14} />
              <span>Filter</span>
            </button>
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
              <Icon name="Download" size={14} />
              <span>Export All</span>
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th className="text-light-50 fw-medium fs-14 p-3">Date</th>
              <th className="text-light-50 fw-medium fs-14 p-3">Invoice</th>
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
                  <div className="text-light-50 fs-12">{invoice.time}</div>
                </td>
                <td className="p-3">
                  <div className="text-light fw-medium fs-14">{invoice.number}</div>
                  <div className="text-light-50 fs-12">Period: {invoice.period}</div>
                </td>
                <td className="p-3">
                  <div className="text-light fs-14">{invoice.plan}</div>
                </td>
                <td className="p-3">
                  <div className="text-light fw-medium fs-14">${invoice.amount}</div>
                </td>
                <td className="p-3">
                  <div className={`d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill fs-12 fw-medium ${getStatusColor(invoice.status)}`}>
                    <Icon name={getStatusIcon(invoice.status)} size={12} />
                    <span className="text-capitalize">{invoice.status}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                      onClick={() => handleDownload(invoice.id)}
                      disabled={downloadingId === invoice.id}
                    >
                      {downloadingId === invoice.id ? (
                        <Icon name="Loader2" size={14} style={{ animation: 'spin 1s linear infinite' }} />
                      ) : (
                        <Icon name="Download" size={14} />
                      )}
                      <span>PDF</span>
                    </button>
                    {/* {invoice.status === 'failed' && (
                      <button className="btn btn-outline-warning btn-sm d-flex align-items-center gap-2">
                        <Icon name="RefreshCw" size={14} />
                        <span>Retry</span>
                      </button>
                    )} */}
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
    </div>
  );
};

export default BillingHistoryTable;