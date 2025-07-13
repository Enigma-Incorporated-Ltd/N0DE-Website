import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "SubscriptionFlow has streamlined our billing process completely. The interface is intuitive and the support is exceptional.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, Digital Solutions",
      content: "Switching to SubscriptionFlow was the best decision for our SaaS business. Revenue tracking and customer management is now effortless.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Product Manager, CloudTech",
      content: "The analytics and reporting features have given us insights we never had before. Highly recommend for any subscription business.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  const trustBadges = [
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="mt-16 space-y-12">
      {/* Trust Badges */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-8">Why Choose SubscriptionFlow?</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <Icon name={badge.icon} size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-8">What Our Customers Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-center mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-muted-foreground text-sm mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center justify-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div className="text-left">
                  <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-muted/30 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center space-x-6 flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-sm font-medium text-foreground">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={20} className="text-success" />
            <span className="text-sm font-medium text-foreground">GDPR Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={20} className="text-success" />
            <span className="text-sm font-medium text-foreground">PCI DSS Level 1</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={20} className="text-success" />
            <span className="text-sm font-medium text-foreground">ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;