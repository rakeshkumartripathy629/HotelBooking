import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HotelCard = ({ hotel, searchContext, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isFavorite, setIsFavorite] = useState(false);

  const languages = {
    en: {
      perNight: 'per night',
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      includes: 'Includes',
      taxes: 'taxes & fees',
      from: 'from',
      reviews: 'reviews',
      excellent: 'Excellent',
      veryGood: 'Very Good',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      freeWifi: 'Free WiFi',
      freeParking: 'Free Parking',
      pool: 'Pool',
      gym: 'Gym',
      spa: 'Spa',
      restaurant: 'Restaurant',
      breakfast: 'Breakfast',
      petFriendly: 'Pet Friendly',
      airConditioning: 'AC',
      bar: 'Bar'
    },
    es: {
      perNight: 'por noche',
      viewDetails: 'Ver Detalles',
      bookNow: 'Reservar Ahora',
      includes: 'Incluye',
      taxes: 'impuestos y tasas',
      from: 'desde',
      reviews: 'reseñas',
      excellent: 'Excelente',
      veryGood: 'Muy Bueno',
      good: 'Bueno',
      fair: 'Regular',
      poor: 'Malo',
      freeWifi: 'WiFi Gratis',
      freeParking: 'Estacionamiento Gratis',
      pool: 'Piscina',
      gym: 'Gimnasio',
      spa: 'Spa',
      restaurant: 'Restaurante',
      breakfast: 'Desayuno',
      petFriendly: 'Acepta Mascotas',
      airConditioning: 'AC',
      bar: 'Bar'
    },
    fr: {
      perNight: 'par nuit',
      viewDetails: 'Voir Détails',
      bookNow: 'Réserver Maintenant',
      includes: 'Comprend',
      taxes: 'taxes et frais',
      from: 'à partir de',
      reviews: 'avis',
      excellent: 'Excellent',
      veryGood: 'Très Bien',
      good: 'Bien',
      fair: 'Correct',
      poor: 'Médiocre',
      freeWifi: 'WiFi Gratuit',
      freeParking: 'Parking Gratuit',
      pool: 'Piscine',
      gym: 'Salle de Sport',
      spa: 'Spa',
      restaurant: 'Restaurant',
      breakfast: 'Petit-déjeuner',
      petFriendly: 'Animaux Acceptés',
      airConditioning: 'Climatisation',
      bar: 'Bar'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const amenityIcons = {
    wifi: 'Wifi',
    parking: 'Car',
    pool: 'Waves',
    gym: 'Dumbbell',
    spa: 'Flower',
    restaurant: 'UtensilsCrossed',
    breakfast: 'Coffee',
    petFriendly: 'Heart',
    airConditioning: 'Snowflake',
    bar: 'Wine'
  };

  const amenityLabels = {
    wifi: t.freeWifi,
    parking: t.freeParking,
    pool: t.pool,
    gym: t.gym,
    spa: t.spa,
    restaurant: t.restaurant,
    breakfast: t.breakfast,
    petFriendly: t.petFriendly,
    airConditioning: t.airConditioning,
    bar: t.bar
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Check if hotel is in favorites
    const favorites = JSON.parse(localStorage.getItem('hotelFavorites') || '[]');
    setIsFavorite(favorites.includes(hotel.id));
  }, [hotel.id]);

  const handleViewDetails = () => {
    // Store hotel and search context for booking flow
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));
    localStorage.setItem('searchContext', JSON.stringify(searchContext));
    navigate('/hotel-details-booking');
  };

  const handleBookNow = () => {
    // Store hotel and search context for booking flow
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));
    localStorage.setItem('searchContext', JSON.stringify(searchContext));
    navigate('/hotel-details-booking');
  };

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('hotelFavorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== hotel.id);
    } else {
      newFavorites = [...favorites, hotel.id];
    }
    
    localStorage.setItem('hotelFavorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    if (onFavoriteToggle) {
      onFavoriteToggle(hotel.id, !isFavorite);
    }
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return t.excellent;
    if (rating >= 4.0) return t.veryGood;
    if (rating >= 3.5) return t.good;
    if (rating >= 3.0) return t.fair;
    return t.poor;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-primary';
    if (rating >= 3.5) return 'text-accent';
    if (rating >= 3.0) return 'text-warning';
    return 'text-error';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const displayAmenities = hotel.amenities.slice(0, 4);
  const hasMoreAmenities = hotel.amenities.length > 4;

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm hover:shadow-elevation transition-all duration-300 overflow-hidden group">
      {/* Hotel Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-surface bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isFavorite ? 'text-error fill-current' : 'text-text-secondary hover:text-error'} 
          />
        </button>

        {/* Hotel Type Badge */}
        {hotel.type && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            {hotel.type}
          </div>
        )}

        {/* Special Offer Badge */}
        {hotel.specialOffer && (
          <div className="absolute bottom-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
            {hotel.specialOffer}
          </div>
        )}
      </div>

      {/* Hotel Content */}
      <div className="p-4">
        {/* Hotel Name and Rating */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary truncate group-hover:text-primary transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < hotel.starRating ? 'text-accent fill-current' : 'text-border'}
                />
              ))}
              <span className="text-sm text-text-secondary ml-1">{hotel.starRating} Star</span>
            </div>
          </div>
          
          {/* Guest Rating */}
          {hotel.guestRating && (
            <div className="text-right ml-3">
              <div className={`text-sm font-semibold ${getRatingColor(hotel.guestRating)}`}>
                {hotel.guestRating.toFixed(1)}
              </div>
              <div className="text-xs text-text-secondary">
                {getRatingText(hotel.guestRating)}
              </div>
              <div className="text-xs text-text-secondary">
                ({hotel.reviewCount} {t.reviews})
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 mb-3">
          <Icon name="MapPin" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-secondary truncate">{hotel.location}</span>
          {hotel.distanceFromCenter && (
            <span className="text-xs text-text-secondary">
              • {hotel.distanceFromCenter}
            </span>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayAmenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-surface-50 px-2 py-1 rounded text-xs"
              title={amenityLabels[amenity] || amenity}
            >
              <Icon 
                name={amenityIcons[amenity] || 'Check'} 
                size={12} 
                className="text-text-secondary" 
              />
              <span className="text-text-secondary hidden sm:inline">
                {amenityLabels[amenity] || amenity}
              </span>
            </div>
          ))}
          {hasMoreAmenities && (
            <div className="flex items-center space-x-1 bg-surface-50 px-2 py-1 rounded text-xs">
              <span className="text-text-secondary">
                +{hotel.amenities.length - 4} more
              </span>
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xs text-text-secondary">{t.from}</span>
              <span className="text-2xl font-bold text-text-primary">
                {formatPrice(hotel.pricePerNight)}
              </span>
            </div>
            <div className="text-xs text-text-secondary">
              {t.perNight} • {t.includes} {t.taxes}
            </div>
          </div>

          <div className="flex flex-col space-y-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
              className="whitespace-nowrap"
            >
              {t.viewDetails}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleBookNow}
              className="whitespace-nowrap"
            >
              {t.bookNow}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;