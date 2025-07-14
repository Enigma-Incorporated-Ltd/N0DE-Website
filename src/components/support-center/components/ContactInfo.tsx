import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = () => {
  const contactMethods = [
    {
      id: 1,
      title: 'Email Support',
      description: 'Get help via email',
      detail: 'support@n0de.gg',
      responseTime: 'Response within 24 hours',
      icon: 'Mail',
      color: 'primary',
      available: true
    },
    {
      id: 2,
      title: 'Live Chat',
      description: 'Chat with our support team',
      detail: 'Available during business hours',
      responseTime: 'Instant response',
      icon: 'MessageCircle',
      color: 'success',
      available: true
    },
    {
      id: 3,
      title: 'Phone Support',
      description: 'Call us directly',
      detail: '+1 (555) 123-4567',
      responseTime: 'Available for MAX plan users',
      icon: 'Phone',
      color: 'warning',
      available: false
    },
    {
      id: 4,
      title: 'Knowledge Base',
      description: 'Browse our help articles',
      detail: 'Self-service documentation',
      responseTime: 'Available 24/7',
      icon: 'Book',
      color: 'secondary',
      available: true
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const supportStats = [
    { label: 'Average Response Time', value: '4 hours', icon: 'Clock' },
    { label: 'Customer Satisfaction', value: '98%', icon: 'Star' },
    { label: 'Tickets Resolved', value: '99.2%', icon: 'CheckCircle' },
    { label: 'Support Languages', value: '12', icon: 'Globe' }
  ];

  const getColorClasses = (color, available) => {
    if (!available) {
      return 'bg-muted text-muted-foreground border-border';
    }
    
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Headphones" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Contact Support</h2>
            <p className="text-sm text-muted-foreground">Choose your preferred contact method</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                method.available 
                  ? 'hover:shadow-subtle cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              } ${getColorClasses(method.color, method.available)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  method.available ? getColorClasses(method.color, true) : 'bg-muted'
                }`}>
                  <Icon 
                    name={method.icon} 
                    size={16} 
                    className={method.available ? '' : 'text-muted-foreground'} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <p className="text-sm font-medium">{method.detail}</p>
                  <p className="text-xs text-muted-foreground mt-1">{method.responseTime}</p>
                </div>
                {method.available && (
                  <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={16} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
        </div>

        <div className="space-y-3">
          {businessHours.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-sm text-foreground">{schedule.day}</span>
              <span className="text-sm text-muted-foreground">{schedule.hours}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">Currently Online</span>
          </div>
          <p className="text-xs text-success/80 mt-1">
            Our support team is available to help you right now
          </p>
        </div>
      </div>

      {/* Support Statistics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={16} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Support Statistics</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {supportStats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name={stat.icon} size={16} className="text-primary" />
              </div>
              <div className="text-lg font-semibold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-destructive mb-1">Emergency Support</h4>
            <p className="text-sm text-destructive/80 mb-3">
              For critical issues affecting your service, mark your ticket as "Urgent" priority or contact us immediately.
            </p>
            <Button variant="destructive" size="sm">
              Report Critical Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;