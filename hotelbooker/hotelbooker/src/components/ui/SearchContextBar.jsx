import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SearchContextBar = ({ searchContext, onSearchEdit, onClearSearch }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);

  const languages = {
    en: {
      searchResults: 'Search Results',
      destination: 'Destination',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      rooms: 'Rooms',
      edit: 'Edit Search',
      clear: 'Clear',
      newSearch: 'New Search',
      filters: 'Filters',
      sort: 'Sort',
      adult: 'adult',
      adults: 'adults',
      child: 'child',
      children: 'children',
      room: 'room',
      night: 'night',
      nights: 'nights'
    },
    es: {
      searchResults: 'Resultados de Búsqueda',
      destination: 'Destino',
      checkIn: 'Entrada',
      checkOut: 'Salida',
      guests: 'Huéspedes',
      rooms: 'Habitaciones',
      edit: 'Editar Búsqueda',
      clear: 'Limpiar',
      newSearch: 'Nueva Búsqueda',
      filters: 'Filtros',
      sort: 'Ordenar',
      adult: 'adulto',
      adults: 'adultos',
      child: 'niño',
      children: 'niños',
      room: 'habitación',
      night: 'noche',
      nights: 'noches'
    },
    fr: {
      searchResults: 'Résultats de Recherche',
      destination: 'Destination',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Invités',
      rooms: 'Chambres',
      edit: 'Modifier la Recherche',
      clear: 'Effacer',
      newSearch: 'Nouvelle Recherche',
      filters: 'Filtres',
      sort: 'Trier',
      adult: 'adulte',
      adults: 'adultes',
      child: 'enfant',
      children: 'enfants',
      room: 'chambre',
      night: 'nuit',
      nights: 'nuits'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  if (!searchContext) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatGuestCount = () => {
    const { adults = 1, children = 0 } = searchContext.guests || {};
    const totalGuests = adults + children;
    
    if (totalGuests === 1) {
      return `1 ${t.adult}`;
    }
    
    if (children === 0) {
      return `${adults} ${adults === 1 ? t.adult : t.adults}`;
    }
    
    return `${adults} ${adults === 1 ? t.adult : t.adults}, ${children} ${children === 1 ? t.child : t.children}`;
  };

  const calculateNights = () => {
    if (!searchContext.checkIn || !searchContext.checkOut) return 0;
    const checkIn = new Date(searchContext.checkIn);
    const checkOut = new Date(searchContext.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const handleEditSearch = () => {
    if (onSearchEdit) {
      onSearchEdit();
    }
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="sticky top-16 bg-surface border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Compact View */}
        <div className="md:hidden py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <button
                onClick={toggleExpanded}
                className="flex items-center space-x-2 text-left w-full"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {searchContext.destination}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatDate(searchContext.checkIn)} - {formatDate(searchContext.checkOut)} • {formatGuestCount()}
                  </p>
                </div>
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary flex-shrink-0" 
                />
              </button>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditSearch}
                iconName="Edit2"
                className="text-primary"
              />
            </div>
          </div>

          {/* Expanded Mobile View */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-border space-y-3 animate-slide-down">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {t.destination}
                  </p>
                  <p className="text-sm text-text-primary mt-1">{searchContext.destination}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {nights} {nights === 1 ? t.night : t.nights}
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {formatDate(searchContext.checkIn)} - {formatDate(searchContext.checkOut)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {t.guests}
                  </p>
                  <p className="text-sm text-text-primary mt-1">{formatGuestCount()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {t.rooms}
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {searchContext.rooms || 1} {(searchContext.rooms || 1) === 1 ? t.room : t.rooms}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditSearch}
                  iconName="Edit2"
                  iconPosition="left"
                  className="flex-1"
                >
                  {t.edit}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  iconName="X"
                  iconPosition="left"
                  className="flex-1 text-text-secondary"
                >
                  {t.clear}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {t.destination}
                </p>
                <p className="text-sm font-medium text-text-primary">{searchContext.destination}</p>
              </div>
            </div>

            <div className="h-8 w-px bg-border" />

            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {nights} {nights === 1 ? t.night : t.nights}
                </p>
                <p className="text-sm font-medium text-text-primary font-data">
                  {formatDate(searchContext.checkIn)} - {formatDate(searchContext.checkOut)}
                </p>
              </div>
            </div>

            <div className="h-8 w-px bg-border" />

            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {t.guests}
                </p>
                <p className="text-sm font-medium text-text-primary">{formatGuestCount()}</p>
              </div>
            </div>

            <div className="h-8 w-px bg-border" />

            <div className="flex items-center space-x-2">
              <Icon name="Bed" size={16} className="text-primary" />
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {t.rooms}
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {searchContext.rooms || 1} {(searchContext.rooms || 1) === 1 ? t.room : t.rooms}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleEditSearch}
              iconName="Edit2"
              iconPosition="left"
            >
              {t.edit}
            </Button>
            <Button
              variant="ghost"
              onClick={handleClearSearch}
              iconName="X"
              className="text-text-secondary hover:text-error"
            >
              {t.newSearch}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContextBar;