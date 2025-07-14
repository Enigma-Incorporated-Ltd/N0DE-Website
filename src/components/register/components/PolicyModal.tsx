import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PolicyModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    terms: {
      title: 'Terms of Service',
      content: `Welcome to N0de. By creating an account, you agree to the following terms:

1. Account Responsibility
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

2. Subscription Services
Our subscription services are provided on a recurring billing basis. You authorize us to charge your payment method for the selected plan.

3. Cancellation Policy
You may cancel your subscription at any time. Cancellations take effect at the end of your current billing period.

4. Payment Terms
All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days notice.

5. Prohibited Uses
You may not use our service for any illegal activities or in violation of these terms.

6. Data Protection
We are committed to protecting your personal information in accordance with our Privacy Policy.

7. Service Availability
We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service.

8. Limitation of Liability
Our liability is limited to the amount you paid for the service in the preceding 12 months.

9. Governing Law
These terms are governed by the laws of the United States.

10. Changes to Terms
We may update these terms from time to time. Continued use constitutes acceptance of new terms.

Last updated: January 2025`
    },
    privacy: {
      title: 'Privacy Policy',
      content: `At N0de, we take your privacy seriously. This policy explains how we collect, use, and protect your information:

1. Information We Collect
- Account information (name, email, billing details)
- Usage data and analytics
- Payment information (processed securely through Stripe)
- Support communications

2. How We Use Your Information
- To provide and improve our services
- To process payments and send billing notifications
- To communicate important updates
- To provide customer support

3. Information Sharing
We do not sell your personal information. We may share data with:
- Payment processors (Stripe) for billing
- Service providers who assist our operations
- Legal authorities when required by law

4. Data Security
We implement industry-standard security measures including:
- SSL encryption for all data transmission
- Secure data storage with encryption at rest
- Regular security audits and updates
- Limited access controls

5. Your Rights
You have the right to:
- Access your personal information
- Correct inaccurate data
- Delete your account and data
- Export your data

6. Cookies and Tracking
We use essential cookies for functionality and analytics cookies to improve our service.

7. Data Retention
We retain your data for as long as your account is active or as needed to provide services.

8. International Transfers
Your data may be processed in countries other than your own, with appropriate safeguards.

9. Children's Privacy
Our service is not intended for users under 13 years of age.

10. Contact Us
For privacy questions, contact us at privacy@n0de.gg

Last updated: January 2025`
    }
  };

  const currentContent = content[type] || content.terms;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {currentContent.title}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none text-foreground">
            {currentContent.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-border">
          <Button variant="default" onClick={onClose} fullWidth>
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;