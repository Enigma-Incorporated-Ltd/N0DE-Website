import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const faqData = [
    {
      id: 1,
      category: 'Billing',
      question: 'How do I update my payment method?',
      answer: `You can update your payment method by going to your Billing Management page. Click on "Payment Methods" and then "Add New Card" or "Edit" next to your existing payment method.\n\nWe accept all major credit cards including Visa, MasterCard, American Express, and Discover. Changes take effect immediately for future billing cycles.`
    },
    {
      id: 2,
      category: 'Billing',
      question: 'When will I be charged for my subscription?',
      answer: `Billing occurs on the same date each month as your initial subscription. For example, if you subscribed on the 15th, you'll be charged on the 15th of each month.\n\nYou'll receive an email notification 3 days before each billing cycle. You can view your next billing date in your dashboard.`
    },
    {
      id: 3,
      category: 'Account',
      question: 'How do I cancel my subscription?',
      answer: `To cancel your subscription:\n1. Go to your User Dashboard\n2. Click on "Manage Subscription"\n3. Select "Cancel Subscription"\n4. Follow the confirmation steps\n\nYour subscription will remain active until the end of your current billing period. You'll retain access to all features until then.`
    },
    {
      id: 4,
      category: 'Account',question: 'Can I change my subscription plan?',
      answer: `Yes! You can upgrade or downgrade your plan at any time:\n\n• Upgrades take effect immediately with prorated billing\n• Downgrades take effect at your next billing cycle\n• You can change plans from your Billing Management page\n\nContact support if you need help choosing the right plan for your needs.`
    },
    {
      id: 5,
      category: 'Technical',question: 'I forgot my password. How do I reset it?',
      answer: `To reset your password:\n1. Go to the login page\n2. Click "Forgot Password?"\n3. Enter your email address\n4. Check your email for reset instructions\n5. Follow the link to create a new password\n\nIf you don't receive the email within 5 minutes, check your spam folder or contact support.`
    },
    {
      id: 6,
      category: 'Technical',
      question: 'Why am I getting login errors?',
      answer: `Common login issues and solutions:\n\n• Check your email and password for typos\n• Ensure Caps Lock is off\n• Clear your browser cache and cookies\n• Try using an incognito/private browser window\n• Disable browser extensions temporarily\n\nIf problems persist, try resetting your password or contact our support team.`
    },
    {
      id: 7,
      category: 'General',
      question: 'How do I contact customer support?',
      answer: `You can reach our support team through:\n\n• Support ticket system (this page) - Response within 24 hours\n• Email: support@subscriptionflow.com\n• Live chat (available 9 AM - 6 PM EST)\n\nFor urgent billing issues, mark your ticket as "High Priority" for faster response.`
    },
    {
      id: 8,
      category: 'General',
      question: 'What are your business hours?',
      answer: `Our support team is available:\n\n• Monday - Friday: 9:00 AM - 6:00 PM EST\n• Saturday: 10:00 AM - 4:00 PM EST\n• Sunday: Closed\n\nTickets submitted outside business hours will be responded to on the next business day. Urgent issues are monitored 24/7.`
    }
  ];

  const categories = [...new Set(faqData.map(item => item.category))];

  const filteredFAQs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFAQs.map(item => item.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="HelpCircle" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground">Find quick answers to common questions</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={expandAll}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Expand All
          </button>
          <span className="text-xs text-muted-foreground">|</span>
          <button
            onClick={collapseAll}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map(category => {
          const count = filteredFAQs.filter(item => item.category === category).length;
          return (
            <span
              key={category}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
            >
              {category} ({count})
            </span>
          );
        })}
      </div>

      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No FAQs found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-primary hover:text-primary/80 text-sm mt-2 transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredFAQs.map(item => (
            <div
              key={item.id}
              className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-subtle"
            >
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                    {item.category}
                  </span>
                  <span className="font-medium text-foreground">{item.question}</span>
                </div>
                <Icon
                  name={expandedItems.has(item.id) ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  className="text-muted-foreground flex-shrink-0"
                />
              </button>
              
              {expandedItems.has(item.id) && (
                <div className="px-4 pb-4 border-t border-border bg-muted/20">
                  <div className="pt-3 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {filteredFAQs.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Didn't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Browse Knowledge Base
            </button>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQSection;