import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchForm = ({ onSearch, initialSearchData, isLoading }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: { adults: 2, children: 0 },
    rooms: 1
  });
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const guestSelectorRef = useRef(null);
  const locationRef = useRef(null);

  const languages = {
    en: {
      destination: 'Where are you going?',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      rooms: 'Rooms',
      search: 'Search Hotels',
      adults: 'Adults',
      children: 'Children',
      done: 'Done',
      adult: 'adult',
      child: 'child',
      room: 'room',
      popularDestinations: 'Popular Destinations'
    },
    es: {
      destination: '¿A dónde vas?',
      checkIn: 'Entrada',
      checkOut: 'Salida',
      guests: 'Huéspedes',
      rooms: 'Habitaciones',
      search: 'Buscar Hoteles',
      adults: 'Adultos',
      children: 'Niños',
      done: 'Listo',
      adult: 'adulto',
      child: 'niño',
      room: 'habitación',
      popularDestinations: 'Destinos Populares'
    },
    fr: {
      destination: 'Où allez-vous?',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Invités',
      rooms: 'Chambres',
      search: 'Rechercher des Hôtels',
      adults: 'Adultes',
      children: 'Enfants',
      done: 'Terminé',
      adult: 'adulte',
      child: 'enfant',
      room: 'chambre',
      popularDestinations: 'Destinations Populaires'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const popularDestinations = [
    { name: "Paris, France", icon: "MapPin" },
    { name: "New York, USA", icon: "MapPin" },
    { name: "Tokyo, Japan", icon: "MapPin" },
    { name: "London, UK", icon: "MapPin" },
    { name: "Dubai, UAE", icon: "MapPin" },
    { name: "Barcelona, Spain", icon: "MapPin" }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    if (initialSearchData) {
      setSearchData(initialSearchData);
    }
  }, [initialSearchData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target)) {
        setShowGuestSelector(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGuestChange = (type, operation) => {
    setSearchData(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: operation === 'increment' 
          ? prev.guests[type] + 1 
          : Math.max(type === 'adults' ? 1 : 0, prev.guests[type] - 1)
      }
    }));
  };

  const handleRoomChange = (operation) => {
    setSearchData(prev => ({
      ...prev,
      rooms: operation === 'increment' 
        ? prev.rooms + 1 
        : Math.max(1, prev.rooms - 1)
    }));
  };

  const handleSearch = () => {
    if (searchData.destination && searchData.checkIn && searchData.checkOut) {
      onSearch(searchData);
      setShowGuestSelector(false);
      setShowLocationSuggestions(false);
    }
  };

  const handleDestinationSelect = (destination) => {
    handleInputChange('destination', destination);
    setShowLocationSuggestions(false);
  };

  const formatGuestText = () => {
    const { adults, children } = searchData.guests;
    const totalGuests = adults + children;
    
    if (totalGuests === 1) {
      return `1 ${t.adult}`;
    }
    
    if (children === 0) {
      return `${adults} ${adults === 1 ? t.adult : t.adults}`;
    }
    
    return `${adults} ${adults === 1 ? t.adult : t.adults}, ${children} ${children === 1 ? t.child : t.children}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getDayAfterTomorrowDate = () => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter.toISOString().split('T')[0];
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation border border-border p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Destination Input */}
        <div className="md:col-span-2 lg:col-span-2 relative" ref={locationRef}>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {t.destination}
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder={t.destination}
              value={searchData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              onFocus={() => setShowLocationSuggestions(true)}
              className="pl-10"
            />
            <Icon 
              name="MapPin" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
          </div>
          
          {showLocationSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation z-50 max-h-64 overflow-y-auto">
              <div className="p-3 border-b border-border">
                <p className="text-sm font-medium text-text-secondary">{t.popularDestinations}</p>
              </div>
              {popularDestinations.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => handleDestinationSelect(destination.name)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-surface-50 transition-micro text-left"
                >
                  <Icon name={destination.icon} size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{destination.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {t.checkIn}
          </label>
          <Input
            type="date"
            value={searchData.checkIn || getTomorrowDate()}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
            min={getTomorrowDate()}
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {t.checkOut}
          </label>
          <Input
            type="date"
            value={searchData.checkOut || getDayAfterTomorrowDate()}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
            min={searchData.checkIn || getDayAfterTomorrowDate()}
          />
        </div>

        {/* Guests & Rooms Selector */}
        <div className="relative" ref={guestSelectorRef}>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {t.guests} & {t.rooms}
          </label>
          <button
            onClick={() => setShowGuestSelector(!showGuestSelector)}
            className="w-full h-10 px-3 border border-border rounded-md bg-surface hover:bg-surface-50 transition-micro flex items-center justify-between text-left"
          >
            <span className="text-sm text-text-primary">
              {formatGuestText()}, {searchData.rooms} {searchData.rooms === 1 ? t.room : t.rooms}
            </span>
            <Icon 
              name={showGuestSelector ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary" 
            />
          </button>

          {showGuestSelector && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation z-50 p-4 min-w-64">
              {/* Adults */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.adults}</p>
                  <p className="text-xs text-text-secondary">Ages 13+</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGuestChange('adults', 'decrement')}
                    disabled={searchData.guests.adults <= 1}
                    className="w-8 h-8 p-0"
                  >
                    <Icon name="Minus" size={14} />
                  </Button>
                  <span className="text-sm font-medium text-text-primary w-8 text-center">
                    {searchData.guests.adults}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGuestChange('adults', 'increment')}
                    className="w-8 h-8 p-0"
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between py-3 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.children}</p>
                  <p className="text-xs text-text-secondary">Ages 0-12</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGuestChange('children', 'decrement')}
                    disabled={searchData.guests.children <= 0}
                    className="w-8 h-8 p-0"
                  >
                    <Icon name="Minus" size={14} />
                  </Button>
                  <span className="text-sm font-medium text-text-primary w-8 text-center">
                    {searchData.guests.children}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGuestChange('children', 'increment')}
                    className="w-8 h-8 p-0"
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex items-center justify-between py-3 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.rooms}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoomChange('decrement')}
                    disabled={searchData.rooms <= 1}
                    className="w-8 h-8 p-0"
                  >
                    <Icon name="Minus" size={14} />
                  </Button>
                  <span className="text-sm font-medium text-text-primary w-8 text-center">
                    {searchData.rooms}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoomChange('increment')}
                    className="w-8 h-8 p-0"
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowGuestSelector(false)}
                  className="w-full"
                >
                  {t.done}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="primary"
          onClick={handleSearch}
          loading={isLoading}
          iconName="Search"
          iconPosition="left"
          className="px-8"
        >
          {t.search}
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;