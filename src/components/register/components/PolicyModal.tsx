import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import SoftwareLicenseAgreement from "../../Legal/documents/SoftwareLicenseAgreement";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy";
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    terms: {
      title: "Terms of Service",
      content: `Welcome to N0DE. By creating an account, you agree to the following terms:

1. Account Responsibility
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

2. Gaming Services
Our gaming services are provided on a recurring subscription basis. You authorize us to charge your payment method for the selected plan.

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

Last updated: January 2025`,
    },
    privacy: {
      title: "Privacy Policy",
      content: `At N0DE, we take your privacy seriously. This policy explains how we collect, use, and protect your information:

1. Information We Collect
- Account information (name, email, gaming preferences)
- Usage data and analytics
- Payment information (processed securely through Stripe)
- Support communications

2. How We Use Your Information
- To provide and improve our gaming services
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

Last updated: January 2025`,
    },
  };

  const currentContent = content[type] || content.terms;

  return (
    <div
      className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-80 backdrop-blur"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-dark bg-opacity-50 border border-light border-opacity-10 rounded-4 shadow w-100 mh-80 d-flex flex-column backdrop-blur"
        style={{ maxWidth: "56rem" }}
      >
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-light border-opacity-10">
          <h2 className="fs-4 fw-semibold text-light mb-0">
            {currentContent.title}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-link p-0 d-flex align-items-center justify-content-center"
            style={{
              width: "32px",
              height: "32px",
              minWidth: "32px",
              border: "none",
              background: "transparent",
              color: "#ffffff80",
            }}
            aria-label="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Modal content area: Make this scrollable if content overflows */}
        {/* <div
          className="flex-grow-1 overflow-auto p-4"
          style={{ maxHeight: "60vh", overflowY: "auto" }} // Added maxHeight and overflowY for scrollability
        >
          <div className="text-light-50">
            {currentContent.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-3 lh-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div> */}
        <div
          className="flex-grow-1 overflow-auto p-4"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          {" "}
          <SoftwareLicenseAgreement />
        </div>

        {/* Modal footer: Center the 'I Understand' button */}
        <div className="p-4 border-top border-light border-opacity-10 d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={onClose}
            className="btn btn-primary-gradient text-white border-0 rounded-pill px-5"
          >
            <span style={{ letterSpacing: "0.15em" }}>I</span>
            <span style={{ marginLeft: "0.5em" }}>understand</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
