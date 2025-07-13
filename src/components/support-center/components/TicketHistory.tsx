import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TicketHistory = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const ticketHistory = [
    {
      id: 'TICK-1704985509123',
      subject: 'Unable to update payment method',
      category: 'Billing',
      priority: 'high',
      status: 'resolved',
      createdAt: '2025-01-08T14:30:00Z',
      updatedAt: '2025-01-09T10:15:00Z',
      responseTime: '4 hours',
      assignedTo: 'Sarah Johnson',
      messages: [
        {
          id: 1,
          sender: 'You',
          message: 'I am trying to update my credit card information but the page keeps showing an error. Can you help?',
          timestamp: '2025-01-08T14:30:00Z',
          attachments: []
        },
        {
          id: 2,
          sender: 'Sarah Johnson',
          message: 'Hi there! I can help you with that. It looks like there might be a temporary issue with our payment processor. Can you try using a different browser or clearing your cache?',
          timestamp: '2025-01-08T18:45:00Z',
          attachments: []
        },
        {
          id: 3,
          sender: 'You',
          message: 'I tried that but still getting the same error. Here is a screenshot of what I am seeing.',
          timestamp: '2025-01-09T08:20:00Z',
          attachments: ['error-screenshot.png']
        },
        {
          id: 4,
          sender: 'Sarah Johnson',
          message: 'Thank you for the screenshot! I can see the issue now. I have updated your payment method manually. You should be able to see the new card ending in 4567 in your billing section. Is there anything else I can help you with?',
          timestamp: '2025-01-09T10:15:00Z',
          attachments: []
        }
      ]
    },
    {
      id: 'TICK-1704899109456',
      subject: 'Question about plan features',
      category: 'General',
      priority: 'medium',
      status: 'closed',
      createdAt: '2025-01-06T10:15:00Z',
      updatedAt: '2025-01-06T15:30:00Z',
      responseTime: '2 hours',
      assignedTo: 'Mike Chen',
      messages: [
        {
          id: 1,
          sender: 'You',
          message: 'What is the difference between the PRO and MAX plans? I am currently on LITE but considering an upgrade.',
          timestamp: '2025-01-06T10:15:00Z',
          attachments: []
        },
        {
          id: 2,
          sender: 'Mike Chen',
          message: `Great question! Here are the key differences:\n\nPRO Plan:\n• Up to 10 projects\n• 100GB storage\n• Priority support\n• Advanced analytics\n\nMAX Plan:\n• Unlimited projects\n• 1TB storage\n• 24/7 phone support\n• Custom integrations\n• Dedicated account manager\n\nWould you like me to help you choose the best plan for your needs?`,
          timestamp: '2025-01-06T12:30:00Z',
          attachments: []
        },
        {
          id: 3,
          sender: 'You',
          message: 'That helps a lot! I think PRO plan would be perfect for me. How do I upgrade?',
          timestamp: '2025-01-06T14:45:00Z',
          attachments: []
        },
        {
          id: 4,
          sender: 'Mike Chen',
          message: 'Perfect! You can upgrade directly from your dashboard by going to Billing Management > Change Plan. The upgrade will take effect immediately and you will only be charged the prorated difference. Let me know if you need any help with the process!',
          timestamp: '2025-01-06T15:30:00Z',
          attachments: []
        }
      ]
    },
    {
      id: 'TICK-1704812709789',
      subject: 'Login issues after password reset',
      category: 'Technical',
      priority: 'urgent',
      status: 'in-progress',
      createdAt: '2025-01-05T16:20:00Z',
      updatedAt: '2025-01-11T09:00:00Z',
      responseTime: '1 hour',
      assignedTo: 'Alex Rodriguez',
      messages: [
        {
          id: 1,
          sender: 'You',
          message: 'I reset my password yesterday but now I cannot log in. I keep getting "Invalid credentials" error even though I am using the new password.',
          timestamp: '2025-01-05T16:20:00Z',
          attachments: []
        },
        {
          id: 2,
          sender: 'Alex Rodriguez',
          message: 'I apologize for the inconvenience. Let me check your account status. Can you confirm the email address you are using to log in?',
          timestamp: '2025-01-05T17:15:00Z',
          attachments: []
        },
        {
          id: 3,
          sender: 'You',
          message: 'Yes, it is john.doe@email.com - the same email I have been using for months.',
          timestamp: '2025-01-05T17:45:00Z',
          attachments: []
        },
        {
          id: 4,
          sender: 'Alex Rodriguez',
          message: 'I found the issue - there was a sync problem with our authentication system after the password reset. I have manually refreshed your account. Please try logging in again and let me know if you still have issues.',
          timestamp: '2025-01-11T09:00:00Z',
          attachments: []
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'in-progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'resolved':
        return 'bg-success/10 text-success border-success/20';
      case 'closed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'low':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const TicketDetail = ({ ticket }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedTicket(null)}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h3 className="font-semibold text-foreground">{ticket.subject}</h3>
            <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground">Created</p>
          <p className="text-sm font-medium">{formatDate(ticket.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Last Updated</p>
          <p className="text-sm font-medium">{formatDate(ticket.updatedAt)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Response Time</p>
          <p className="text-sm font-medium">{ticket.responseTime}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Assigned To</p>
          <p className="text-sm font-medium">{ticket.assignedTo}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Conversation</h4>
        {ticket.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {message.sender}
                </span>
                <span className="text-xs opacity-75">
                  {formatDate(message.timestamp)}
                </span>
              </div>
              <p className="text-sm whitespace-pre-line">{message.message}</p>
              {message.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs opacity-75">
                      <Icon name="Paperclip" size={12} />
                      <span>{attachment}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Clock" size={20} className="text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Support History</h2>
          <p className="text-sm text-muted-foreground">Your recent support tickets</p>
        </div>
      </div>

      {selectedTicket ? (
        <TicketDetail ticket={selectedTicket} />
      ) : (
        <div className="space-y-4">
          {ticketHistory.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Inbox" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No support tickets yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Submit your first ticket above to get started.
              </p>
            </div>
          ) : (
            ticketHistory.map((ticket) => (
              <div
                key={ticket.id}
                className="border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-foreground truncate">{ticket.subject}</h3>
                      <span className="text-xs text-muted-foreground">#{ticket.id}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center space-x-1">
                        <Icon name="Tag" size={14} />
                        <span>{ticket.category}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="User" size={14} />
                        <span>{ticket.assignedTo}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{formatDate(ticket.updatedAt)}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {ticket.messages[ticket.messages.length - 1]?.message}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TicketHistory;