import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingHistoryTable = ({ invoices, onDownload }) => {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (invoiceId) => {
    setDownloadingId(invoiceId);
    // Simulate download
    setTimeout(() => {
      setDownloadingId(null);
      onDownload(invoiceId);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
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
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export All
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Invoice</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Plan</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="text-sm text-foreground">{invoice.date}</div>
                  <div className="text-xs text-muted-foreground">{invoice.time}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-foreground">{invoice.number}</div>
                  <div className="text-xs text-muted-foreground">Period: {invoice.period}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{invoice.plan}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-foreground">${invoice.amount}</div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    <Icon name={getStatusIcon(invoice.status)} size={12} />
                    <span className="capitalize">{invoice.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(invoice.id)}
                      loading={downloadingId === invoice.id}
                      iconName="Download"
                      iconPosition="left"
                    >
                      PDF
                    </Button>
                    {invoice.status === 'failed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="RefreshCw"
                        iconPosition="left"
                      >
                        Retry
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No billing history</h4>
          <p className="text-muted-foreground">Your billing history will appear here once you have transactions.</p>
        </div>
      )}
    </div>
  );
};

export default BillingHistoryTable;