import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentInfo, setAgentInfo] = useState({
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'online',
    responseTime: '~2 min'
  });

  // Simulate online/offline status
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      // Business hours: 9 AM - 6 PM EST
      setIsOnline(hour >= 9 && hour < 18);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: 1,
          sender: 'agent',
          message: `Hi! I'm ${agentInfo.name} from SubscriptionFlow support. How can I help you today?`,
          timestamp: new Date().toISOString()
        }]);
      }, 1000);
    }
  }, [isOpen, messages.length, agentInfo.name]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse = {
        id: Date.now() + 1,
        sender: 'agent',
        message: getAutoResponse(newMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const getAutoResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('billing') || message.includes('payment')) {
      return "I can help you with billing questions! For payment method updates, you can go to your Billing Management page. Is there a specific billing issue you're experiencing?";
    } else if (message.includes('cancel') || message.includes('subscription')) {
      return "I understand you have questions about your subscription. You can manage your subscription from your dashboard, or I can help you with the process. What would you like to do?";
    } else if (message.includes('login') || message.includes('password')) {
      return "For login issues, try resetting your password using the 'Forgot Password' link on the login page. If that doesn't work, I can help troubleshoot further.";
    } else if (message.includes('plan') || message.includes('upgrade')) {
      return "I can help you understand our different plans! We have LITE, PRO, and MAX plans. What specific features are you interested in?";
    } else {
      return "Thanks for reaching out! I'm here to help. Can you provide more details about what you need assistance with?";
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickActions = [
    { text: 'Billing Question', icon: 'CreditCard' },
    { text: 'Technical Issue', icon: 'Settings' },
    { text: 'Account Help', icon: 'User' },
    { text: 'Plan Information', icon: 'Package' }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-elevated hover:shadow-lg transition-all duration-200"
          size="icon"
        >
          <div className="relative">
            <Icon name="MessageCircle" size={24} />
            {isOnline && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
            )}
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-card border border-border rounded-lg shadow-elevated flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={agentInfo.avatar}
              alt={agentInfo.name}
              className="w-8 h-8 rounded-full"
            />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? 'bg-success' : 'bg-muted-foreground'
            }`}></div>
          </div>
          <div>
            <h3 className="font-medium text-sm">{agentInfo.name}</h3>
            <p className="text-xs opacity-90">
              {isOnline ? `Typically replies in ${agentInfo.responseTime}` : 'Currently offline'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={32} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Start a conversation</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                message.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
              }`}
            >
              <p>{message.message}</p>
              <p className={`text-xs mt-1 opacity-75`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">Quick actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setNewMessage(action.text)}
                  className="flex items-center space-x-2 p-2 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Icon name={action.icon} size={12} />
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        {!isOnline && (
          <div className="mb-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
            <p className="text-xs text-warning">
              We're currently offline. Leave a message and we'll get back to you!
            </p>
          </div>
        )}
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="flex-shrink-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChatWidget;