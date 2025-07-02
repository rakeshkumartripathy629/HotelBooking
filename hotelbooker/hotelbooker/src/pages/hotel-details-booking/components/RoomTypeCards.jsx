import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoomTypeCards = ({ rooms, onRoomSelect, selectedRoom }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      availableRooms: 'Available Rooms',
      selectRoom: 'Select Room',
      selected: 'Selected',
      perNight: 'per night',
      sleeps: 'Sleeps',
      guests: 'guests',
      guest: 'guest',
      features: 'Features',
      viewDetails: 'View Details',
      hideDetails: 'Hide Details',
      roomSize: 'Room Size',
      bedType: 'Bed Type',
      maxOccupancy: 'Max Occupancy',
      roomsLeft: 'rooms left',
      roomLeft: 'room left',
      lastRoom: 'Last room!',
      popularChoice: 'Popular Choice',
      bestValue: 'Best Value'
    },
    es: {
      availableRooms: 'Habitaciones Disponibles',
      selectRoom: 'Seleccionar Habitación',
      selected: 'Seleccionada',
      perNight: 'por noche',
      sleeps: 'Para',
      guests: 'huéspedes',
      guest: 'huésped',
      features: 'Características',
      viewDetails: 'Ver Detalles',
      hideDetails: 'Ocultar Detalles',
      roomSize: 'Tamaño de Habitación',
      bedType: 'Tipo de Cama',
      maxOccupancy: 'Ocupación Máxima',
      roomsLeft: 'habitaciones disponibles',
      roomLeft: 'habitación disponible',
      lastRoom: '¡Última habitación!',
      popularChoice: 'Opción Popular',
      bestValue: 'Mejor Valor'
    },
    fr: {
      availableRooms: 'Chambres Disponibles',
      selectRoom: 'Sélectionner Chambre',
      selected: 'Sélectionnée',
      perNight: 'par nuit',
      sleeps: 'Pour',
      guests: 'invités',
      guest: 'invité',
      features: 'Caractéristiques',
      viewDetails: 'Voir Détails',
      hideDetails: 'Masquer Détails',
      roomSize: 'Taille de Chambre',
      bedType: 'Type de Lit',
      maxOccupancy: 'Occupation Max',
      roomsLeft: 'chambres restantes',
      roomLeft: 'chambre restante',
      lastRoom: 'Dernière chambre!',
      popularChoice: 'Choix Populaire',
      bestValue: 'Meilleur Rapport'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const [expandedRooms, setExpandedRooms] = useState(new Set());

  const toggleRoomDetails = (roomId) => {
    const newExpanded = new Set(expandedRooms);
    if (newExpanded.has(roomId)) {
      newExpanded.delete(roomId);
    } else {
      newExpanded.add(roomId);
    }
    setExpandedRooms(newExpanded);
  };

  const getFeatureIcon = (feature) => {
    const iconMap = {
      'Free WiFi': 'Wifi',
      'Air Conditioning': 'Wind',
      'Minibar': 'Coffee',
      'Safe': 'Shield',
      'Balcony': 'Home',
      'Ocean View': 'Eye',
      'City View': 'Building',
      'Room Service': 'Bell',
      'Flat Screen TV': 'Tv',
      'Coffee Maker': 'Coffee',
      'Refrigerator': 'Refrigerator',
      'Bathtub': 'Bath',
      'Shower': 'Droplets',
      'Hair Dryer': 'Wind',
      'Iron': 'Shirt',
      'Desk': 'Laptop',
      'Sofa': 'Armchair'
    };
    return iconMap[feature] || 'Check';
  };

  const getBadgeInfo = (room) => {
    if (room.isPopular) {
      return { text: t.popularChoice, className: 'bg-primary text-primary-foreground' };
    }
    if (room.isBestValue) {
      return { text: t.bestValue, className: 'bg-success text-success-foreground' };
    }
    return null;
  };

  const getAvailabilityText = (available) => {
    if (available === 1) {
      return t.lastRoom;
    }
    if (available <= 3) {
      return `${available} ${available === 1 ? t.roomLeft : t.roomsLeft}`;
    }
    return null;
  };

  return (
    <section id="hotel-rooms">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        {t.availableRooms}
      </h2>
      
      <div className="space-y-6">
        {rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          const isExpanded = expandedRooms.has(room.id);
          const badge = getBadgeInfo(room);
          const availabilityText = getAvailabilityText(room.available);

          return (
            <div
              key={room.id}
              className={`bg-surface border rounded-lg overflow-hidden transition-all duration-300 ${
                isSelected ? 'border-primary shadow-elevation' : 'border-border hover:border-primary-200'
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Room Image */}
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="relative aspect-video lg:aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      {badge && (
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${badge.className}`}>
                          {badge.text}
                        </div>
                      )}
                      {availabilityText && (
                        <div className="absolute bottom-3 left-3 bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
                          {availabilityText}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col h-full">
                      {/* Room Header */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                          {room.name}
                        </h3>
                        
                        {/* Room Info */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Icon name="Maximize" size={14} />
                            <span>{room.size}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Bed" size={14} />
                            <span>{room.bedType}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={14} />
                            <span>
                              {t.sleeps} {room.maxOccupancy} {room.maxOccupancy === 1 ? t.guest : t.guests}
                            </span>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.features.slice(0, 4).map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-1 text-xs text-text-secondary bg-surface-50 px-2 py-1 rounded"
                            >
                              <Icon name={getFeatureIcon(feature)} size={12} />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {room.features.length > 4 && (
                            <button
                              onClick={() => toggleRoomDetails(room.id)}
                              className="text-xs text-primary hover:text-primary-700 bg-primary-50 px-2 py-1 rounded"
                            >
                              +{room.features.length - 4} more
                            </button>
                          )}
                        </div>

                        {/* Expanded Features */}
                        {isExpanded && (
                          <div className="mb-4 p-4 bg-surface-50 rounded-lg">
                            <h4 className="font-medium text-text-primary mb-3">{t.features}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {room.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 text-sm text-text-secondary"
                                >
                                  <Icon name={getFeatureIcon(feature)} size={14} className="text-primary" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Toggle Details Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRoomDetails(room.id)}
                          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                          iconPosition="right"
                          className="self-start mb-4"
                        >
                          {isExpanded ? t.hideDetails : t.viewDetails}
                        </Button>
                      </div>

                      {/* Price and Selection */}
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 border-t border-border">
                        <div>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-text-primary">
                              ${room.price}
                            </span>
                            <span className="text-sm text-text-secondary">
                              {t.perNight}
                            </span>
                          </div>
                          {room.originalPrice && room.originalPrice > room.price && (
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-text-secondary line-through">
                                ${room.originalPrice}
                              </span>
                              <span className="text-xs bg-success-50 text-success px-2 py-0.5 rounded">
                                Save ${room.originalPrice - room.price}
                              </span>
                            </div>
                          )}
                        </div>

                        <Button
                          variant={isSelected ? "success" : "primary"}
                          onClick={() => onRoomSelect(room)}
                          iconName={isSelected ? "Check" : undefined}
                          iconPosition="left"
                          className="sm:w-auto w-full"
                        >
                          {isSelected ? t.selected : t.selectRoom}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RoomTypeCards;