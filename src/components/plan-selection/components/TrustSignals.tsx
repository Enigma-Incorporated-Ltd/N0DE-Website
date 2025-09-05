import React from 'react';
import Icon from '../../../components/AppIcon';

// Types
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

const TrustSignals: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "N0de has streamlined our billing process completely. The interface is intuitive and the support is exceptional.",
      rating: 5,
      avatar: "/assets/img/user-img-1.png"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, Digital Solutions",
      content: "Switching to N0de was the best decision for our SaaS business. Revenue tracking and customer management is now effortless.",
      rating: 5,
      avatar: "/assets/img/user-img-2.png"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Product Manager, CloudTech",
      content: "The analytics and reporting features have given us insights we never had before. Highly recommend for any subscription business.",
      rating: 5,
      avatar: "/assets/img/user-img-3.png"
    }
  ];

  const trustBadges: TrustBadge[] = [
    {
      icon: "Shield",
      title: "30-Day Money Back",
      description: "Full refund guarantee"
    },
    {
      icon: "Lock",
      title: "SSL Secured",
      description: "256-bit encryption"
    },
    {
      icon: "Award",
      title: "99.9% Uptime",
      description: "Reliable service"
    },
    {
      icon: "Users",
      title: "10,000+ Customers",
      description: "Trusted worldwide"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-warning" : "text-secondary"}
        style={{ fill: index < rating ? 'currentColor' : 'none' }}
      />
    ));
  };

  return (
    <div className="mt-5">
      {/* Trust Badges */}
      <div className="text-center mb-5">
        <h3 className="text-light fw-bold mb-4 h4">Why Choose N0DE?</h3>
        <div className="row g-4">
          {trustBadges.map((badge, index) => (
            <div key={index} className="col-6 col-lg-3">
              <div className="text-center">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{ width: '48px', height: '48px' }}>
                  <Icon name={badge.icon} size={24} className="text-primary" />
                </div>
                <h4 className="fw-medium text-light small mb-1">{badge.title}</h4>
                <p className="text-secondary small">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="text-center mb-5">
        <h3 className="text-light fw-bold mb-4 h4">What Our Customers Say</h3>
        <div className="row g-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-md-4">
              <div className="bg-dark border border-secondary rounded-3 p-4 h-100">
                <div className="d-flex justify-content-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-light small mb-3 fst-italic">
                  "{testimonial.content}"
                </p>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/img/user.jpg';
                    }}
                  />
                  <div className="text-start">
                    <div className="fw-medium text-light small">{testimonial.name}</div>
                    <div className="text-secondary small">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-secondary bg-opacity-25 rounded-3 p-4 text-center">
        <div className="d-flex align-items-center justify-content-center flex-wrap gap-4">
          <div className="d-flex align-items-center gap-2">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="small fw-medium text-light">SOC 2 Compliant</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Icon name="Lock" size={20} className="text-success" />
            <span className="small fw-medium text-light">GDPR Ready</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Icon name="Award" size={20} className="text-success" />
            <span className="small fw-medium text-light">PCI DSS Level 1</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Icon name="Zap" size={20} className="text-success" />
            <span className="small fw-medium text-light">ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
