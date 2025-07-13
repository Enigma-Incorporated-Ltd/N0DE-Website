import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('users');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Mock search functionality
    setTimeout(() => {
      console.log(`Searching for "${searchQuery}" in ${searchType}`);
      setIsSearching(false);
    }, 1000);
  };

  const quickSearches = [
    { label: 'Failed Payments', query: 'status:failed', type: 'transactions' },
    { label: 'New Users Today', query: 'created:today', type: 'users' },
    { label: 'MAX Plan Users', query: 'plan:MAX', type: 'users' },
    { label: 'Cancelled Subscriptions', query: 'status:cancelled', type: 'subscriptions' }
  ];

  const handleQuickSearch = (quickSearch) => {
    setSearchQuery(quickSearch.query);
    setSearchType(quickSearch.type);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Search</h3>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search users, transactions, or subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
          >
            <option value="users">Users</option>
            <option value="transactions">Transactions</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="support">Support Tickets</option>
          </select>
          
          <Button
            type="submit"
            variant="default"
            loading={isSearching}
            iconName="Search"
            iconPosition="left"
            disabled={!searchQuery.trim()}
          >
            Search
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-3">Quick Searches:</p>
        <div className="flex flex-wrap gap-2">
          {quickSearches.map((quickSearch, index) => (
            <button
              key={index}
              onClick={() => handleQuickSearch(quickSearch)}
              className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-smooth"
            >
              {quickSearch.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Advanced search with filters and date ranges</span>
          <Button variant="ghost" size="sm" iconName="Filter">
            Advanced
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;