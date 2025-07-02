import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingWidget = ({ hotel, selectedRoom, onRoomSelect, isSticky = false }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState({
    basePrice: 0,
    taxes: 0,
    fees: 0,
    total: 0
  });

  const languages = {
    en: {
      bookNow: 'Book Now',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      rooms: 'Rooms',
      adults: 'Adults',
      children: 'Children',
      selectRoom: 'Select Room',
      pricePerNight: 'per night',
      totalPrice: 'Total Price',
      basePrice: 'Base Price',
      taxesAndFees: 'Taxes & Fees',
      nights: 'nights',
      night: 'night',
      freeWifi: 'Free WiFi',
      freeCancellation: 'Free Cancellation',
      instantConfirmation: 'Instant Confirmation',
      viewDetails: 'View Details',
      hideDetails: 'Hide Details',
      selectDates: 'Select dates to see pricing',
      availableRooms: 'Available Rooms'
    },
    es: {
      bookNow: 'Reservar Ahora',
      checkIn: 'Entrada',
      checkOut: 'Salida',
      guests: 'Huéspedes',
      rooms: 'Habitaciones',
      adults: 'Adultos',
      children: 'Niños',
      selectRoom: 'Seleccionar Habitación',
      pricePerNight: 'por noche',
      totalPrice: 'Precio Total',
      basePrice: 'Precio Base',
      taxesAndFees: 'Impuestos y Tasas',
      nights: 'noches',
      night: 'noche',
      freeWifi: 'WiFi Gratis',
      freeCancellation: 'Cancelación Gratuita',
      instantConfirmation: 'Confirmación Instantánea',
      viewDetails: 'Ver Detalles',
      hideDetails: 'Ocultar Detalles',
      selectDates: 'Selecciona fechas para ver precios',
      availableRooms: 'Habitaciones Disponibles'
    },
    fr: {
      bookNow: 'Réserver Maintenant',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Invités',
      rooms: 'Chambres',
      adults: 'Adultes',
      children: 'Enfants',
      selectRoom: 'Sélectionner Chambre',
      pricePerNight: 'par nuit',
      totalPrice: 'Prix Total',
      basePrice: 'Prix de Base',
      taxesAndFees: 'Taxes et Frais',
      nights: 'nuits',
      night: 'nuit',
      freeWifi: 'WiFi Gratuit',
      freeCancellation: 'Annulation Gratuite',
      instantConfirmation: 'Confirmation Instantanée',
      viewDetails: 'Voir Détails',
      hideDetails: 'Masquer Détails',
      selectDates: 'Sélectionnez les dates pour voir les prix',
      availableRooms: 'Chambres Disponibles'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Load search context if available
    const searchContext = JSON.parse(localStorage.getItem('hotelSearchContext') || '{}');
    if (searchContext.checkIn) {
      setBookingData(prev => ({
        ...prev,
        checkIn: searchContext.checkIn,
        checkOut: searchContext.checkOut,
        adults: searchContext.guests?.adults || 2,
        children: searchContext.guests?.children || 0,
        rooms: searchContext.rooms || 1
      }));
    }
  }, []);

  useEffect(() => {
    calculatePricing();
  }, [bookingData, selectedRoom]);

  const calculatePricing = () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !selectedRoom) {
      setPriceBreakdown({ basePrice: 0, taxes: 0, fees: 0, total: 0 });
      return;
    }

    const nights = calculateNights();
    const basePrice = selectedRoom.price * nights * bookingData.rooms;
    const taxes = basePrice * 0.12; // 12% tax
    const fees = 25 * bookingData.rooms; // $25 service fee per room
    const total = basePrice + taxes + fees;

    setPriceBreakdown({
      basePrice,
      taxes,
      fees,
      total
    });
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookNow = () => {
    const bookingInfo = {
      hotel,
      room: selectedRoom,
      bookingData,
      priceBreakdown
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));
    navigate('/payment-checkout');
  };

  const nights = calculateNights();
  const canBook = bookingData.checkIn && bookingData.checkOut && selectedRoom;

  const widgetContent = (
    <div className="space-y-4">
      {/* Room Selection */}
      {selectedRoom && (
        <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-primary">{selectedRoom.name}</p>
              <p className="text-sm text-text-secondary">
                ${selectedRoom.price} {t.pricePerNight}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const roomsSection = document.getElementById('hotel-rooms');
                if (roomsSection) {
                  roomsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t.selectRoom}
            </Button>
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            {t.checkIn}
          </label>
          <Input
            type="date"
            value={bookingData.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            {t.checkOut}
          </label>
          <Input
            type="date"
            value={bookingData.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </div>
      </div>

      {/* Guest Selection */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              {t.adults}
            </label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('adults', Math.max(1, bookingData.adults - 1))}
                disabled={bookingData.adults <= 1}
                className="w-8 h-8 p-0"
              >
                <Icon name="Minus" size={14} />
              </Button>
              <span className="flex-1 text-center text-sm font-medium">
                {bookingData.adults}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('adults', Math.min(8, bookingData.adults + 1))}
                disabled={bookingData.adults >= 8}
                className="w-8 h-8 p-0"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              {t.children}
            </label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('children', Math.max(0, bookingData.children - 1))}
                disabled={bookingData.children <= 0}
                className="w-8 h-8 p-0"
              >
                <Icon name="Minus" size={14} />
              </Button>
              <span className="flex-1 text-center text-sm font-medium">
                {bookingData.children}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('children', Math.min(6, bookingData.children + 1))}
                disabled={bookingData.children >= 6}
                className="w-8 h-8 p-0"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            {t.rooms}
          </label>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleInputChange('rooms', Math.max(1, bookingData.rooms - 1))}
              disabled={bookingData.rooms <= 1}
              className="w-8 h-8 p-0"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className="flex-1 text-center text-sm font-medium">
              {bookingData.rooms}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleInputChange('rooms', Math.min(4, bookingData.rooms + 1))}
              disabled={bookingData.rooms >= 4}
              className="w-8 h-8 p-0"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      {canBook ? (
        <div className="border-t border-border pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">
                ${selectedRoom.price} × {nights} {nights === 1 ? t.night : t.nights} × {bookingData.rooms} room(s)
              </span>
              <span className="font-medium">${priceBreakdown.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{t.taxesAndFees}</span>
              <span className="font-medium">${(priceBreakdown.taxes + priceBreakdown.fees).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="font-semibold text-text-primary">{t.totalPrice}</span>
              <span className="text-xl font-bold text-primary">${priceBreakdown.total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleBookNow}
            className="w-full mt-4"
            size="lg"
          >
            {t.bookNow}
          </Button>

          {/* Features */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs text-success">
              <Icon name="Wifi" size={14} />
              <span>{t.freeWifi}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-success">
              <Icon name="Shield" size={14} />
              <span>{t.freeCancellation}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-primary">
              <Icon name="Zap" size={14} />
              <span>{t.instantConfirmation}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <Icon name="Calendar" size={32} className="text-text-secondary mx-auto mb-2" />
          <p className="text-sm text-text-secondary">{t.selectDates}</p>
        </div>
      )}
    </div>
  );

  if (isSticky) {
    return (
      <>
        {/* Desktop Sticky Widget */}
        <div className="hidden lg:block sticky top-32 bg-surface border border-border rounded-lg p-6 shadow-elevation">
          {widgetContent}
        </div>

        {/* Mobile Bottom Sheet */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
          <div className="p-4">
            {!isExpanded ? (
              <div className="flex items-center justify-between">
                <div>
                  {selectedRoom && canBook ? (
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        ${priceBreakdown.total.toFixed(2)} total
                      </p>
                      <p className="text-xs text-text-secondary">
                        {nights} {nights === 1 ? t.night : t.nights}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-text-secondary">{t.selectDates}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    iconName="ChevronUp"
                  >
                    {t.viewDetails}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={canBook ? handleBookNow : () => setIsExpanded(true)}
                    disabled={!canBook}
                  >
                    {t.bookNow}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-text-primary">Booking Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    iconName="ChevronDown"
                  >
                    {t.hideDetails}
                  </Button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {widgetContent}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      {widgetContent}
    </div>
  );
};

export default BookingWidget;