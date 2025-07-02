import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultsCount }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = {
    en: {
      sortBy: 'Sort by',
      results: 'results',
      result: 'result',
      sortOptions: {
        recommended: 'Recommended',
        priceLowToHigh: 'Price: Low to High',
        priceHighToLow: 'Price: High to Low',
        rating: 'Guest Rating',
        starRating: 'Star Rating',
        distance: 'Distance from Center',
        newest: 'Newest First',
        popularity: 'Most Popular'
      }
    },
    es: {
      sortBy: 'Ordenar por',
      results: 'resultados',
      result: 'resultado',
      sortOptions: {
        recommended: 'Recomendado',
        priceLowToHigh: 'Precio: Menor a Mayor',
        priceHighToLow: 'Precio: Mayor a Menor',
        rating: 'Calificación de Huéspedes',
        starRating: 'Calificación de Estrellas',
        distance: 'Distancia del Centro',
        newest: 'Más Recientes Primero',
        popularity: 'Más Popular'
      }
    },
    fr: {
      sortBy: 'Trier par',
      results: 'résultats',
      result: 'résultat',
      sortOptions: {
        recommended: 'Recommandé',
        priceLowToHigh: 'Prix: Croissant',
        priceHighToLow: 'Prix: Décroissant',
        rating: 'Note des Clients',
        starRating: 'Note en Étoiles',
        distance: 'Distance du Centre',
        newest: 'Plus Récents d\'Abord',
        popularity: 'Plus Populaire'
      }
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const sortOptions = [
    { id: 'recommended', label: t.sortOptions.recommended, icon: 'Sparkles' },
    { id: 'priceLowToHigh', label: t.sortOptions.priceLowToHigh, icon: 'TrendingUp' },
    { id: 'priceHighToLow', label: t.sortOptions.priceHighToLow, icon: 'TrendingDown' },
    { id: 'rating', label: t.sortOptions.rating, icon: 'Star' },
    { id: 'starRating', label: t.sortOptions.starRating, icon: 'Award' },
    { id: 'distance', label: t.sortOptions.distance, icon: 'MapPin' },
    { id: 'popularity', label: t.sortOptions.popularity, icon: 'Heart' },
    { id: 'newest', label: t.sortOptions.newest, icon: 'Clock' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortId) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.id === currentSort);
    return currentOption ? currentOption.label : t.sortOptions.recommended;
  };

  const getCurrentSortIcon = () => {
    const currentOption = sortOptions.find(option => option.id === currentSort);
    return currentOption ? currentOption.icon : 'Sparkles';
  };

  const formatResultsCount = (count) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR').format(count);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Results Count */}
      <div className="text-sm text-text-secondary">
        {formatResultsCount(resultsCount)} {resultsCount === 1 ? t.result : t.results}
      </div>

      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          iconName={getCurrentSortIcon()}
          iconPosition="left"
          className="min-w-48"
        >
          <span className="flex-1 text-left">{t.sortBy}: {getCurrentSortLabel()}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2 text-text-secondary" 
          />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevation z-50 animate-fade-in">
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortSelect(option.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface-50 transition-micro ${
                    currentSort === option.id 
                      ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-primary'
                  }`}
                >
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    className={currentSort === option.id ? 'text-primary' : 'text-text-secondary'} 
                  />
                  <span className="flex-1 text-sm font-medium">{option.label}</span>
                  {currentSort === option.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;