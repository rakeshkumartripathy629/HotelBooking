import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ hotel }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const languages = {
    en: {
      location: 'Location',
      nearbyAttractions: 'Nearby Attractions',
      walkingDistance: 'Walking Distance',
      drivingDistance: 'Driving Distance',
      publicTransport: 'Public Transport',
      minutes: 'min',
      km: 'km',
      miles: 'mi',
      viewOnGoogleMaps: 'View on Google Maps',
      getDirections: 'Get Directions',
      airport: 'Airport',
      restaurant: 'Restaurant',
      attraction: 'Attraction',
      shopping: 'Shopping',
      hospital: 'Hospital',
      transportation: 'Transportation'
    },
    es: {
      location: 'Ubicación',
      nearbyAttractions: 'Atracciones Cercanas',
      walkingDistance: 'Distancia Caminando',
      drivingDistance: 'Distancia en Auto',
      publicTransport: 'Transporte Público',
      minutes: 'min',
      km: 'km',
      miles: 'mi',
      viewOnGoogleMaps: 'Ver en Google Maps',
      getDirections: 'Obtener Direcciones',
      airport: 'Aeropuerto',
      restaurant: 'Restaurante',
      attraction: 'Atracción',
      shopping: 'Compras',
      hospital: 'Hospital',
      transportation: 'Transporte'
    },
    fr: {
      location: 'Emplacement',
      nearbyAttractions: 'Attractions à Proximité',
      walkingDistance: 'Distance à Pied',
      drivingDistance: 'Distance en Voiture',
      publicTransport: 'Transport Public',
      minutes: 'min',
      km: 'km',
      miles: 'mi',
      viewOnGoogleMaps: 'Voir sur Google Maps',
      getDirections: 'Obtenir Directions',
      airport: 'Aéroport',
      restaurant: 'Restaurant',
      attraction: 'Attraction',
      shopping: 'Shopping',
      hospital: 'Hôpital',
      transportation: 'Transport'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const getAttractionIcon = (type) => {
    const iconMap = {
      airport: 'Plane',
      restaurant: 'UtensilsCrossed',
      attraction: 'Camera',
      shopping: 'ShoppingBag',
      hospital: 'Cross',
      transportation: 'Bus',
      beach: 'Waves',
      museum: 'Building',
      park: 'Trees',
      theater: 'Theater'
    };
    return iconMap[type] || 'MapPin';
  };

  const getAttractionTypeLabel = (type) => {
    const labelMap = {
      airport: t.airport,
      restaurant: t.restaurant,
      attraction: t.attraction,
      shopping: t.shopping,
      hospital: t.hospital,
      transportation: t.transportation
    };
    return labelMap[type] || type;
  };

  const handleViewOnGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`;
    window.open(url, '_blank');
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotel.address)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="hotel-map">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        {t.location}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={hotel.name}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${hotel.coordinates.lat},${hotel.coordinates.lng}&z=14&output=embed`}
                className="w-full h-full"
              />
              
              {/* Map Overlay Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewOnGoogleMaps}
                  iconName="ExternalLink"
                  className="bg-white bg-opacity-90 hover:bg-opacity-100"
                >
                  {t.viewOnGoogleMaps}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleGetDirections}
                  iconName="Navigation"
                  className="bg-primary bg-opacity-90 hover:bg-opacity-100"
                >
                  {t.getDirections}
                </Button>
              </div>
            </div>

            {/* Hotel Address */}
            <div className="p-4 border-t border-border">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-text-primary">{hotel.name}</h3>
                  <p className="text-text-secondary">{hotel.address}</p>
                  <p className="text-sm text-text-secondary mt-1">{hotel.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              {t.nearbyAttractions}
            </h3>
            
            <div className="space-y-3">
              {hotel.nearbyAttractions.map((attraction, index) => (
                <div
                  key={index}
                  className={`p-4 border border-border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedAttraction === index
                      ? 'border-primary bg-primary-50' :'hover:border-primary-200 hover:bg-surface-50'
                  }`}
                  onClick={() => setSelectedAttraction(selectedAttraction === index ? null : index)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon
                        name={getAttractionIcon(attraction.type)}
                        size={16}
                        className="text-primary"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-text-primary">
                            {attraction.name}
                          </h4>
                          <p className="text-xs text-text-secondary">
                            {getAttractionTypeLabel(attraction.type)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-text-primary">
                            {attraction.distance} {t.km}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {attraction.walkingTime} {t.minutes}
                          </p>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedAttraction === index && (
                        <div className="mt-3 pt-3 border-t border-border space-y-2">
                          <div className="grid grid-cols-1 gap-2 text-xs">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Icon name="MapPin" size={12} className="text-text-secondary" />
                                <span className="text-text-secondary">{t.walkingDistance}</span>
                              </div>
                              <span className="font-medium text-text-primary">
                                {attraction.walkingTime} {t.minutes}
                              </span>
                            </div>
                            {attraction.drivingTime && (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <Icon name="Car" size={12} className="text-text-secondary" />
                                  <span className="text-text-secondary">{t.drivingDistance}</span>
                                </div>
                                <span className="font-medium text-text-primary">
                                  {attraction.drivingTime} {t.minutes}
                                </span>
                              </div>
                            )}
                            {attraction.publicTransport && (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <Icon name="Bus" size={12} className="text-text-secondary" />
                                  <span className="text-text-secondary">{t.publicTransport}</span>
                                </div>
                                <span className="font-medium text-text-primary">
                                  {attraction.publicTransport} {t.minutes}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {attraction.description && (
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {attraction.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation Info */}
          {hotel.transportation && (
            <div className="bg-surface-50 rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Bus" size={16} className="text-primary" />
                <span>{t.transportation}</span>
              </h4>
              <div className="space-y-2">
                {hotel.transportation.map((transport, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{transport.type}</span>
                    <span className="font-medium text-text-primary">
                      {transport.distance} {t.minutes}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationMap;