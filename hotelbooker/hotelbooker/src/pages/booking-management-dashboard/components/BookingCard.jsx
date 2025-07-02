import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onViewDetails, onModify, onCancel, onDownloadReceipt, currentLanguage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const languages = {
    en: {
      bookingRef: 'Booking Reference',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      rooms: 'Rooms',
      totalAmount: 'Total Amount',
      status: 'Status',
      viewDetails: 'View Details',
      modify: 'Modify',
      cancel: 'Cancel',
      downloadReceipt: 'Download Receipt',
      nights: 'nights',
      night: 'night',
      adults: 'adults',
      adult: 'adult',
      children: 'children',
      child: 'child',
      room: 'room',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      completed: 'Completed',
      refunded: 'Refunded',
      bookedOn: 'Booked on',
      cancellationPolicy: 'Free cancellation until',
      nonRefundable: 'Non-refundable'
    },
    es: {
      bookingRef: 'Referencia de Reserva',
      checkIn: 'Entrada',
      checkOut: 'Salida',
      guests: 'Huéspedes',
      rooms: 'Habitaciones',
      totalAmount: 'Importe Total',
      status: 'Estado',
      viewDetails: 'Ver Detalles',
      modify: 'Modificar',
      cancel: 'Cancelar',
      downloadReceipt: 'Descargar Recibo',
      nights: 'noches',
      night: 'noche',
      adults: 'adultos',
      adult: 'adulto',
      children: 'niños',
      child: 'niño',
      room: 'habitación',
      confirmed: 'Confirmado',
      pending: 'Pendiente',
      cancelled: 'Cancelado',
      completed: 'Completado',
      refunded: 'Reembolsado',
      bookedOn: 'Reservado el',
      cancellationPolicy: 'Cancelación gratuita hasta',
      nonRefundable: 'No reembolsable'
    },
    fr: {
      bookingRef: 'Référence de Réservation',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Invités',
      rooms: 'Chambres',
      totalAmount: 'Montant Total',
      status: 'Statut',
      viewDetails: 'Voir Détails',
      modify: 'Modifier',
      cancel: 'Annuler',
      downloadReceipt: 'Télécharger Reçu',
      nights: 'nuits',
      night: 'nuit',
      adults: 'adultes',
      adult: 'adulte',
      children: 'enfants',
      child: 'enfant',
      room: 'chambre',
      confirmed: 'Confirmé',
      pending: 'En Attente',
      cancelled: 'Annulé',
      completed: 'Terminé',
      refunded: 'Remboursé',
      bookedOn: 'Réservé le',
      cancellationPolicy: 'Annulation gratuite jusqu\'au',
      nonRefundable: 'Non remboursable'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-success-100 text-success-700 border-success-200';
      case 'pending':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'cancelled':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'completed':
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
      case 'refunded':
        return 'bg-accent-100 text-accent-700 border-accent-200';
      default:
        return 'bg-surface-100 text-text-secondary border-border';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatGuestCount = () => {
    const { adults = 1, children = 0 } = booking.guests || {};
    
    if (children === 0) {
      return `${adults} ${adults === 1 ? t.adult : t.adults}`;
    }
    
    return `${adults} ${adults === 1 ? t.adult : t.adults}, ${children} ${children === 1 ? t.child : t.children}`;
  };

  const nights = calculateNights();
  const isUpcoming = new Date(booking.checkIn) > new Date();
  const canModify = booking.status.toLowerCase() === 'confirmed' && isUpcoming;
  const canCancel = booking.status.toLowerCase() === 'confirmed' && isUpcoming;

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Mobile Card Layout */}
      <div className="md:hidden">
        <div className="p-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <Image
                src={booking.hotel.image}
                alt={booking.hotel.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-text-primary truncate">
                    {booking.hotel.name}
                  </h3>
                  <p className="text-sm text-text-secondary truncate">
                    {booking.hotel.location}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                  {t[booking.status.toLowerCase()] || booking.status}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-text-primary">
                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                </p>
                <p className="text-sm text-text-secondary">
                  {nights} {nights === 1 ? t.night : t.nights} • {formatGuestCount()}
                </p>
                <p className="text-lg font-semibold text-primary">
                  ${booking.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
              <span>{t.bookingRef}: {booking.bookingReference}</span>
              <span>{t.bookedOn} {formatDate(booking.bookedDate)}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(booking)}
                iconName="Eye"
                iconPosition="left"
                className="flex-1"
              >
                {t.viewDetails}
              </Button>
              {canModify && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onModify(booking)}
                  iconName="Edit2"
                  className="text-primary"
                />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownloadReceipt(booking)}
                iconName="Download"
                className="text-text-secondary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Card Layout */}
      <div className="hidden md:block">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={booking.hotel.image}
                alt={booking.hotel.name}
                className="w-32 h-24 rounded-lg object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {booking.hotel.name}
                  </h3>
                  <p className="text-text-secondary mt-1">
                    {booking.hotel.location}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < booking.hotel.rating ? 'text-accent fill-current' : 'text-surface-300'}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-text-secondary">
                      {booking.hotel.rating} stars
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                    {t[booking.status.toLowerCase()] || booking.status}
                  </span>
                  <p className="text-2xl font-bold text-primary mt-2">
                    ${booking.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {t.checkIn}
                  </p>
                  <p className="text-sm font-medium text-text-primary mt-1">
                    {formatDate(booking.checkIn)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {t.checkOut}
                  </p>
                  <p className="text-sm font-medium text-text-primary mt-1">
                    {formatDate(booking.checkOut)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {t.guests}
                  </p>
                  <p className="text-sm font-medium text-text-primary mt-1">
                    {formatGuestCount()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {nights} {nights === 1 ? t.night : t.nights}
                  </p>
                  <p className="text-sm font-medium text-text-primary mt-1">
                    {booking.rooms} {booking.rooms === 1 ? t.room : t.rooms}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="text-sm text-text-secondary">
                  <span>{t.bookingRef}: </span>
                  <span className="font-data font-medium">{booking.bookingReference}</span>
                  <span className="mx-2">•</span>
                  <span>{t.bookedOn} {formatDate(booking.bookedDate)}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => onViewDetails(booking)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    {t.viewDetails}
                  </Button>
                  {canModify && (
                    <Button
                      variant="ghost"
                      onClick={() => onModify(booking)}
                      iconName="Edit2"
                      iconPosition="left"
                      className="text-primary"
                    >
                      {t.modify}
                    </Button>
                  )}
                  {canCancel && (
                    <Button
                      variant="ghost"
                      onClick={() => onCancel(booking)}
                      iconName="X"
                      iconPosition="left"
                      className="text-error"
                    >
                      {t.cancel}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => onDownloadReceipt(booking)}
                    iconName="Download"
                    className="text-text-secondary"
                  />
                </div>
              </div>

              {booking.cancellationPolicy && (
                <div className="mt-3 p-3 bg-surface-50 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="Info" size={16} className="text-primary" />
                    <p className="text-sm text-text-secondary">
                      {booking.cancellationPolicy.isFree 
                        ? `${t.cancellationPolicy} ${formatDate(booking.cancellationPolicy.deadline)}`
                        : t.nonRefundable
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;