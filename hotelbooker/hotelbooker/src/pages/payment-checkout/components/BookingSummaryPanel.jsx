import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingSummaryPanel = ({ bookingData, onEdit }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);

  const languages = {
    en: {
      bookingSummary: 'Booking Summary',
      edit: 'Edit',
      hotel: 'Hotel',
      room: 'Room',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      nights: 'nights',
      night: 'night',
      adults: 'adults',
      adult: 'adult',
      children: 'children',
      child: 'child',
      priceBreakdown: 'Price Breakdown',
      roomRate: 'Room Rate',
      taxes: 'Taxes & Fees',
      total: 'Total',
      perNight: 'per night',
      includes: 'Includes',
      freeCancellation: 'Free Cancellation',
      freeWifi: 'Free WiFi',
      breakfast: 'Breakfast Included',
      parking: 'Free Parking',
      viewDetails: 'View Details',
      hideDetails: 'Hide Details'
    },
    es: {
      bookingSummary: 'Resumen de Reserva',
      edit: 'Editar',
      hotel: 'Hotel',
      room: 'Habitación',
      checkIn: 'Entrada',
      checkOut: 'Salida',
      guests: 'Huéspedes',
      nights: 'noches',
      night: 'noche',
      adults: 'adultos',
      adult: 'adulto',
      children: 'niños',
      child: 'niño',
      priceBreakdown: 'Desglose de Precios',
      roomRate: 'Tarifa de Habitación',
      taxes: 'Impuestos y Tasas',
      total: 'Total',
      perNight: 'por noche',
      includes: 'Incluye',
      freeCancellation: 'Cancelación Gratuita',
      freeWifi: 'WiFi Gratuito',
      breakfast: 'Desayuno Incluido',
      parking: 'Estacionamiento Gratuito',
      viewDetails: 'Ver Detalles',
      hideDetails: 'Ocultar Detalles'
    },
    fr: {
      bookingSummary: 'Résumé de Réservation',
      edit: 'Modifier',
      hotel: 'Hôtel',
      room: 'Chambre',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Invités',
      nights: 'nuits',
      night: 'nuit',
      adults: 'adultes',
      adult: 'adulte',
      children: 'enfants',
      child: 'enfant',
      priceBreakdown: 'Détail des Prix',
      roomRate: 'Tarif Chambre',
      taxes: 'Taxes et Frais',
      total: 'Total',
      perNight: 'par nuit',
      includes: 'Inclut',
      freeCancellation: 'Annulation Gratuite',
      freeWifi: 'WiFi Gratuit',
      breakfast: 'Petit-déjeuner Inclus',
      parking: 'Parking Gratuit',
      viewDetails: 'Voir Détails',
      hideDetails: 'Masquer Détails'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      style: 'currency',
      currency: bookingData?.currency || 'USD'
    }).format(amount);
  };

  const calculateNights = () => {
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatGuestCount = () => {
    const { adults = 1, children = 0 } = bookingData.guests || {};
    
    if (children === 0) {
      return `${adults} ${adults === 1 ? t.adult : t.adults}`;
    }
    
    return `${adults} ${adults === 1 ? t.adult : t.adults}, ${children} ${children === 1 ? t.child : t.children}`;
  };

  const nights = calculateNights();
  const roomRate = bookingData?.pricing?.roomRate || 0;
  const taxes = bookingData?.pricing?.taxes || 0;
  const totalAmount = roomRate + taxes;

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{t.bookingSummary}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          iconName="Edit2"
          iconPosition="left"
          className="text-primary"
        >
          {t.edit}
        </Button>
      </div>

      {/* Hotel Information */}
      <div className="p-4 space-y-4">
        <div className="flex space-x-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={bookingData?.hotel?.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"}
              alt={bookingData?.hotel?.name || "Hotel"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-text-primary truncate">
              {bookingData?.hotel?.name || "Grand Plaza Hotel"}
            </h4>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(bookingData?.hotel?.rating || 4)].map((_, i) => (
                <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
              ))}
              <span className="text-xs text-text-secondary ml-1">
                {bookingData?.hotel?.rating || 4} Star
              </span>
            </div>
            <p className="text-sm text-text-secondary mt-1 truncate">
              {bookingData?.hotel?.location || "Downtown, New York"}
            </p>
          </div>
        </div>

        {/* Room Details */}
        <div className="bg-surface-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Bed" size={16} className="text-primary" />
            <span className="font-medium text-text-primary">
              {bookingData?.room?.type || "Deluxe King Room"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-text-secondary">{t.checkIn}</p>
              <p className="font-medium text-text-primary">
                {formatDate(bookingData?.checkIn || new Date())}
              </p>
            </div>
            <div>
              <p className="text-text-secondary">{t.checkOut}</p>
              <p className="font-medium text-text-primary">
                {formatDate(bookingData?.checkOut || new Date(Date.now() + 86400000))}
              </p>
            </div>
            <div>
              <p className="text-text-secondary">{t.guests}</p>
              <p className="font-medium text-text-primary">{formatGuestCount()}</p>
            </div>
            <div>
              <p className="text-text-secondary">Duration</p>
              <p className="font-medium text-text-primary">
                {nights} {nights === 1 ? t.night : t.nights}
              </p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-primary">{t.includes}</p>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'freeCancellation', icon: 'Shield', label: t.freeCancellation },
              { key: 'freeWifi', icon: 'Wifi', label: t.freeWifi },
              { key: 'breakfast', icon: 'Coffee', label: t.breakfast },
              { key: 'parking', icon: 'Car', label: t.parking }
            ].map((amenity) => (
              <div key={amenity.key} className="flex items-center space-x-1 text-xs text-success bg-success-50 px-2 py-1 rounded-full">
                <Icon name={amenity.icon} size={12} />
                <span>{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-border pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-text-primary">{t.priceBreakdown}</span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary" 
            />
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {t.roomRate} ({nights} {nights === 1 ? t.night : t.nights})
                </span>
                <span className="text-text-primary">{formatCurrency(roomRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t.taxes}</span>
                <span className="text-text-primary">{formatCurrency(taxes)}</span>
              </div>
              <hr className="border-border" />
            </div>
          )}

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
            <span className="text-lg font-semibold text-text-primary">{t.total}</span>
            <div className="text-right">
              <span className="text-xl font-bold text-primary">{formatCurrency(totalAmount)}</span>
              <p className="text-xs text-text-secondary">
                {formatCurrency(totalAmount / nights)} {t.perNight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPanel;