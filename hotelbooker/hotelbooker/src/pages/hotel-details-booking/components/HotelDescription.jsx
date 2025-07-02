import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HotelDescription = ({ hotel }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);

  const languages = {
    en: {
      aboutThisHotel: 'About This Hotel',
      readMore: 'Read More',
      readLess: 'Read Less',
      amenities: 'Amenities',
      popularAmenities: 'Popular Amenities',
      viewAllAmenities: 'View All Amenities',
      policies: 'Policies',
      checkInTime: 'Check-in Time',
      checkOutTime: 'Check-out Time',
      cancellationPolicy: 'Cancellation Policy',
      petPolicy: 'Pet Policy',
      smokingPolicy: 'Smoking Policy'
    },
    es: {
      aboutThisHotel: 'Acerca de Este Hotel',
      readMore: 'Leer Más',
      readLess: 'Leer Menos',
      amenities: 'Servicios',
      popularAmenities: 'Servicios Populares',
      viewAllAmenities: 'Ver Todos los Servicios',
      policies: 'Políticas',
      checkInTime: 'Hora de Entrada',
      checkOutTime: 'Hora de Salida',
      cancellationPolicy: 'Política de Cancelación',
      petPolicy: 'Política de Mascotas',
      smokingPolicy: 'Política de Fumar'
    },
    fr: {
      aboutThisHotel: 'À Propos de Cet Hôtel',
      readMore: 'Lire Plus',
      readLess: 'Lire Moins',
      amenities: 'Équipements',
      popularAmenities: 'Équipements Populaires',
      viewAllAmenities: 'Voir Tous les Équipements',
      policies: 'Politiques',
      checkInTime: 'Heure d\'Arrivée',
      checkOutTime: 'Heure de Départ',
      cancellationPolicy: 'Politique d\'Annulation',
      petPolicy: 'Politique Animaux',
      smokingPolicy: 'Politique Fumeur'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'Free WiFi': 'Wifi',
      'Swimming Pool': 'Waves',
      'Fitness Center': 'Dumbbell',
      'Restaurant': 'UtensilsCrossed',
      'Bar': 'Wine',
      'Spa': 'Flower2',
      'Parking': 'Car',
      'Pet Friendly': 'Heart',
      'Business Center': 'Briefcase',
      'Room Service': 'Bell',
      'Laundry Service': 'Shirt',
      'Concierge': 'Users',
      'Air Conditioning': 'Wind',
      'Elevator': 'ArrowUp',
      'Safe': 'Shield',
      'Minibar': 'Coffee',
      'Balcony': 'Home',
      'Ocean View': 'Eye',
      'Airport Shuttle': 'Plane',
      'Conference Room': 'Users'
    };
    return iconMap[amenity] || 'Check';
  };

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const shouldShowReadMore = hotel.description && hotel.description.length > 300;

  return (
    <div className="space-y-8">
      {/* Hotel Description */}
      <section>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          {t.aboutThisHotel}
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-text-secondary leading-relaxed">
            {isExpanded ? hotel.description : truncateText(hotel.description)}
          </p>
          {shouldShowReadMore && (
            <Button
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 p-0 h-auto text-primary hover:text-primary-700"
            >
              {isExpanded ? t.readLess : t.readMore}
            </Button>
          )}
        </div>
      </section>

      {/* Popular Amenities */}
      <section>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          {t.popularAmenities}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotel.amenities.slice(0, 8).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-surface-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon
                  name={getAmenityIcon(amenity)}
                  size={16}
                  className="text-primary"
                />
              </div>
              <span className="text-sm font-medium text-text-primary">
                {amenity}
              </span>
            </div>
          ))}
        </div>

        {hotel.amenities.length > 8 && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              const amenitiesSection = document.getElementById('all-amenities');
              if (amenitiesSection) {
                amenitiesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t.viewAllAmenities} ({hotel.amenities.length})
          </Button>
        )}
      </section>

      {/* All Amenities (Hidden by default) */}
      <section id="all-amenities" className="hidden">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          {t.amenities}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {hotel.amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-surface-50 rounded-lg transition-colors duration-200"
            >
              <Icon
                name={getAmenityIcon(amenity)}
                size={16}
                className="text-primary flex-shrink-0"
              />
              <span className="text-sm text-text-primary">{amenity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Policies */}
      <section>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          {t.policies}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary">{t.checkInTime}</h4>
                <p className="text-sm text-text-secondary">{hotel.policies.checkIn}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary">{t.checkOutTime}</h4>
                <p className="text-sm text-text-secondary">{hotel.policies.checkOut}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="X" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary">{t.cancellationPolicy}</h4>
                <p className="text-sm text-text-secondary">{hotel.policies.cancellation}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Heart" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary">{t.petPolicy}</h4>
                <p className="text-sm text-text-secondary">{hotel.policies.pets}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Cigarette" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary">{t.smokingPolicy}</h4>
                <p className="text-sm text-text-secondary">{hotel.policies.smoking}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDescription;