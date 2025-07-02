import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/hotel-search-results');
  };

  return (
    <header className="bg-surface border-b border-border">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 group transition-micro hover:opacity-80"
            aria-label="HotelBooker Home"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-text-primary">
              HotelBooker
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;