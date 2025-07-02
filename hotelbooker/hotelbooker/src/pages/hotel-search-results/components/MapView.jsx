import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ hotels, onHotelSelect, selectedHotel, searchContext }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC

  const languages = {
    en: {
      mapView: 'Map View',
      listView: 'List View',
      showList: 'Show List',
      perNight: 'per night',
      viewDetails: 'View Details',
      loading: 'Loading map...',
      noResults: 'No hotels found in this area'
    },
    es: {
      mapView: 'Vista de Mapa',
      listView: 'Vista de Lista',
      showList: 'Mostrar Lista',
      perNight: 'por noche',
      viewDetails: 'Ver Detalles',
      loading: 'Cargando mapa...',
      noResults: 'No se encontraron hoteles en esta área'
    },
    fr: {
      mapView: 'Vue Carte',
      listView: 'Vue Liste',
      showList: 'Afficher la Liste',
      perNight: 'par nuit',
      viewDetails: 'Voir Détails',
      loading: 'Chargement de la carte...',
      noResults: 'Aucun hôtel trouvé dans cette zone'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Set map center based on search destination or first hotel
    if (hotels.length > 0) {
      const firstHotel = hotels[0];
      setMapCenter({
        lat: firstHotel.coordinates?.lat || 40.7128,
        lng: firstHotel.coordinates?.lng || -74.0060
      });
    }
  }, [hotels]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleHotelMarkerClick = (hotel) => {
    if (onHotelSelect) {
      onHotelSelect(hotel);
    }
  };

  // Generate map URL with hotel markers
  const generateMapUrl = () => {
    const { lat, lng } = mapCenter;
    return `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`;
  };

  return (
    <div className="relative h-full min-h-[600px] bg-surface rounded-lg overflow-hidden border border-border">
      {/* Map Container */}
      <div className="relative w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Hotels Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={generateMapUrl()}
          className="w-full h-full"
        />

        {/* Hotel Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {hotels.map((hotel, index) => {
            const isSelected = selectedHotel?.id === hotel.id;
            
            // Calculate position based on hotel coordinates (mock positioning)
            const topPosition = 20 + (index % 5) * 15; // Distribute vertically
            const leftPosition = 20 + (index % 4) * 20; // Distribute horizontally
            
            return (
              <div
                key={hotel.id}
                className="absolute pointer-events-auto"
                style={{
                  top: `${topPosition}%`,
                  left: `${leftPosition}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <button
                  onClick={() => handleHotelMarkerClick(hotel)}
                  className={`relative bg-surface border-2 rounded-lg shadow-elevation px-3 py-2 transition-all duration-200 hover:scale-105 ${
                    isSelected 
                      ? 'border-primary bg-primary-50 shadow-lg' 
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="text-xs font-semibold text-text-primary">
                    {formatPrice(hotel.pricePerNight)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {t.perNight}
                  </div>
                  
                  {/* Pointer */}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                    isSelected ? 'border-t-primary' : 'border-t-border'
                  }`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Loading State */}
        {hotels.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface bg-opacity-90">
            <div className="text-center">
              <Icon name="MapPin" size={48} className="text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary">{t.loading}</p>
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            className="w-10 h-10 p-0 bg-surface shadow-elevation"
            title="Zoom In"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Minus"
            className="w-10 h-10 p-0 bg-surface shadow-elevation"
            title="Zoom Out"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            className="w-10 h-10 p-0 bg-surface shadow-elevation"
            title="Reset View"
          />
        </div>

        {/* Selected Hotel Info Card */}
        {selectedHotel && (
          <div className="absolute bottom-4 left-4 right-4 bg-surface border border-border rounded-lg shadow-elevation p-4 max-w-sm mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-16 h-16 bg-surface-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={selectedHotel.image}
                  alt={selectedHotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text-primary truncate">
                  {selectedHotel.name}
                </h4>
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < selectedHotel.starRating ? 'text-accent fill-current' : 'text-border'}
                    />
                  ))}
                  <span className="text-xs text-text-secondary ml-1">
                    {selectedHotel.guestRating?.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-baseline space-x-1 mt-2">
                  <span className="text-lg font-bold text-text-primary">
                    {formatPrice(selectedHotel.pricePerNight)}
                  </span>
                  <span className="text-xs text-text-secondary">{t.perNight}</span>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleHotelMarkerClick(selectedHotel)}
                className="flex-shrink-0"
              >
                {t.viewDetails}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;