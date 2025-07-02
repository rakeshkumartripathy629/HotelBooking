import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({ filters, onFilterChange, onClearFilters, activeFiltersCount }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const languages = {
    en: {
      filters: 'Filters',
      price: 'Price',
      rating: 'Rating',
      amenities: 'Amenities',
      clearAll: 'Clear All',
      apply: 'Apply',
      priceRange: 'Price Range',
      starRating: 'Star Rating',
      hotelType: 'Hotel Type',
      facilities: 'Facilities',
      perNight: 'per night',
      starsAndUp: 'stars & up',
      anyPrice: 'Any Price',
      anyRating: 'Any Rating'
    },
    es: {
      filters: 'Filtros',
      price: 'Precio',
      rating: 'Calificación',
      amenities: 'Servicios',
      clearAll: 'Limpiar Todo',
      apply: 'Aplicar',
      priceRange: 'Rango de Precio',
      starRating: 'Calificación de Estrellas',
      hotelType: 'Tipo de Hotel',
      facilities: 'Instalaciones',
      perNight: 'por noche',
      starsAndUp: 'estrellas y más',
      anyPrice: 'Cualquier Precio',
      anyRating: 'Cualquier Calificación'
    },
    fr: {
      filters: 'Filtres',
      price: 'Prix',
      rating: 'Note',
      amenities: 'Équipements',
      clearAll: 'Tout Effacer',
      apply: 'Appliquer',
      priceRange: 'Gamme de Prix',
      starRating: 'Note en Étoiles',
      hotelType: 'Type d\'Hôtel',
      facilities: 'Installations',
      perNight: 'par nuit',
      starsAndUp: 'étoiles et plus',
      anyPrice: 'Tout Prix',
      anyRating: 'Toute Note'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const priceRanges = [
    { id: 'budget', label: '$0 - $100', min: 0, max: 100 },
    { id: 'mid', label: '$100 - $250', min: 100, max: 250 },
    { id: 'luxury', label: '$250 - $500', min: 250, max: 500 },
    { id: 'premium', label: '$500+', min: 500, max: null }
  ];

  const starRatings = [
    { id: '5', label: '5', value: 5 },
    { id: '4', label: '4', value: 4 },
    { id: '3', label: '3', value: 3 },
    { id: '2', label: '2', value: 2 },
    { id: '1', label: '1', value: 1 }
  ];

  const amenitiesList = [
    { id: 'wifi', label: 'Free WiFi', icon: 'Wifi' },
    { id: 'parking', label: 'Free Parking', icon: 'Car' },
    { id: 'pool', label: 'Swimming Pool', icon: 'Waves' },
    { id: 'gym', label: 'Fitness Center', icon: 'Dumbbell' },
    { id: 'spa', label: 'Spa', icon: 'Flower' },
    { id: 'restaurant', label: 'Restaurant', icon: 'UtensilsCrossed' },
    { id: 'bar', label: 'Bar', icon: 'Wine' },
    { id: 'breakfast', label: 'Breakfast', icon: 'Coffee' },
    { id: 'petFriendly', label: 'Pet Friendly', icon: 'Heart' },
    { id: 'airConditioning', label: 'Air Conditioning', icon: 'Snowflake' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const handleClearAll = () => {
    onClearFilters();
    setShowMobileFilters(false);
  };

  const getActiveFilterTags = () => {
    const tags = [];
    
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        tags.push({ type: 'priceRange', label: range.label, value: filters.priceRange });
      }
    }
    
    if (filters.starRating) {
      tags.push({ 
        type: 'starRating', 
        label: `${filters.starRating} ${t.starsAndUp}`, 
        value: filters.starRating 
      });
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      filters.amenities.forEach(amenityId => {
        const amenity = amenitiesList.find(a => a.id === amenityId);
        if (amenity) {
          tags.push({ type: 'amenities', label: amenity.label, value: amenityId });
        }
      });
    }
    
    return tags;
  };

  const removeFilter = (type, value) => {
    if (type === 'amenities') {
      const newAmenities = filters.amenities.filter(a => a !== value);
      handleFilterChange('amenities', newAmenities);
    } else {
      handleFilterChange(type, null);
    }
  };

  const activeFilterTags = getActiveFilterTags();

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden lg:block bg-surface border-b border-border sticky top-32 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Price Filter */}
              <div className="relative group">
                <Button
                  variant={filters.priceRange ? "primary" : "outline"}
                  size="sm"
                  iconName="DollarSign"
                  iconPosition="left"
                >
                  {t.price}
                  {filters.priceRange && (
                    <span className="ml-1 bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded text-xs">
                      1
                    </span>
                  )}
                </Button>
                
                <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevation opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <p className="text-sm font-medium text-text-primary mb-3">{t.priceRange}</p>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="priceRange"
                            checked={filters.priceRange === range.id}
                            onChange={() => handleFilterChange('priceRange', range.id)}
                            className="w-4 h-4 text-primary border-border focus:ring-primary"
                          />
                          <span className="text-sm text-text-primary">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="relative group">
                <Button
                  variant={filters.starRating ? "primary" : "outline"}
                  size="sm"
                  iconName="Star"
                  iconPosition="left"
                >
                  {t.rating}
                  {filters.starRating && (
                    <span className="ml-1 bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded text-xs">
                      1
                    </span>
                  )}
                </Button>
                
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <p className="text-sm font-medium text-text-primary mb-3">{t.starRating}</p>
                    <div className="space-y-2">
                      {starRatings.map(rating => (
                        <label key={rating.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="starRating"
                            checked={filters.starRating === rating.value}
                            onChange={() => handleFilterChange('starRating', rating.value)}
                            className="w-4 h-4 text-primary border-border focus:ring-primary"
                          />
                          <div className="flex items-center space-x-1">
                            {[...Array(rating.value)].map((_, i) => (
                              <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                            ))}
                            <span className="text-sm text-text-primary ml-1">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="relative group">
                <Button
                  variant={filters.amenities?.length > 0 ? "primary" : "outline"}
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                >
                  {t.amenities}
                  {filters.amenities?.length > 0 && (
                    <span className="ml-1 bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded text-xs">
                      {filters.amenities.length}
                    </span>
                  )}
                </Button>
                
                <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-elevation opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <p className="text-sm font-medium text-text-primary mb-3">{t.facilities}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {amenitiesList.map(amenity => (
                        <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-surface-50 rounded">
                          <input
                            type="checkbox"
                            checked={filters.amenities?.includes(amenity.id) || false}
                            onChange={(e) => {
                              const currentAmenities = filters.amenities || [];
                              const newAmenities = e.target.checked
                                ? [...currentAmenities, amenity.id]
                                : currentAmenities.filter(a => a !== amenity.id);
                              handleFilterChange('amenities', newAmenities);
                            }}
                            className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                          />
                          <Icon name={amenity.icon} size={14} className="text-text-secondary" />
                          <span className="text-sm text-text-primary">{amenity.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                iconName="X"
                iconPosition="left"
                className="text-text-secondary hover:text-error"
              >
                {t.clearAll}
              </Button>
            )}
          </div>

          {/* Active Filter Tags */}
          {activeFilterTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {activeFilterTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{tag.label}</span>
                  <button
                    onClick={() => removeFilter(tag.type, tag.value)}
                    className="hover:bg-primary-100 rounded-full p-0.5 transition-micro"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-32 bg-surface border-b border-border z-40">
        <div className="px-4 py-3">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            iconName="Filter"
            iconPosition="left"
            className="w-full"
          >
            {t.filters}
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-overlay lg:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">{t.filters}</h3>
              <Button
                variant="ghost"
                onClick={() => setShowMobileFilters(false)}
                iconName="X"
                size="sm"
              />
            </div>

            <div className="p-4 space-y-6">
              {/* Mobile Price Filter */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">{t.priceRange}</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.id} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-surface-50 rounded">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.id}
                        onChange={() => handleFilterChange('priceRange', range.id)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Rating Filter */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">{t.starRating}</h4>
                <div className="space-y-2">
                  {starRatings.map(rating => (
                    <label key={rating.id} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-surface-50 rounded">
                      <input
                        type="radio"
                        name="starRating"
                        checked={filters.starRating === rating.value}
                        onChange={() => handleFilterChange('starRating', rating.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(rating.value)].map((_, i) => (
                          <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                        ))}
                        <span className="text-sm text-text-primary ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Amenities Filter */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">{t.facilities}</h4>
                <div className="space-y-2">
                  {amenitiesList.map(amenity => (
                    <label key={amenity.id} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-surface-50 rounded">
                      <input
                        type="checkbox"
                        checked={filters.amenities?.includes(amenity.id) || false}
                        onChange={(e) => {
                          const currentAmenities = filters.amenities || [];
                          const newAmenities = e.target.checked
                            ? [...currentAmenities, amenity.id]
                            : currentAmenities.filter(a => a !== amenity.id);
                          handleFilterChange('amenities', newAmenities);
                        }}
                        className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                      />
                      <Icon name={amenity.icon} size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-surface border-t border-border p-4 flex space-x-3">
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="flex-1"
              >
                {t.clearAll}
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowMobileFilters(false)}
                className="flex-1"
              >
                {t.apply}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;