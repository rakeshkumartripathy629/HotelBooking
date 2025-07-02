import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingDetailsModal = ({ booking, isOpen, onClose, onModify, onCancel, onDownloadReceipt, currentLanguage }) => {
  const languages = {
    en: {
      bookingDetails: 'Booking Details',
      bookingReference: 'Booking Reference',
      hotelInformation: 'Hotel Information',
      guestInformation: 'Guest Information',
      bookingDates: 'Booking Dates',
      paymentInformation: 'Payment Information',
      cancellationPolicy: 'Cancellation Policy',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      rooms: 'Rooms',
      roomType: 'Room Type',
      totalAmount: 'Total Amount',
      paidAmount: 'Paid Amount',
      paymentMethod: 'Payment Method',
      paymentDate: 'Payment Date',
      primaryGuest: 'Primary Guest',
      email: 'Email',
      phone: 'Phone',
      specialRequests: 'Special Requests',
      amenities: 'Amenities',
      address: 'Address',
      contactHotel: 'Contact Hotel',
      modify: 'Modify Booking',
      cancel: 'Cancel Booking',
      downloadReceipt: 'Download Receipt',
      close: 'Close',
      nights: 'nights',
      night: 'night',
      adults: 'adults',
      adult: 'adult',
      children: 'children',
      child: 'child',
      room: 'room',
      freeCancellation: 'Free cancellation until',
      nonRefundable: 'Non-refundable booking',
      partialRefund: 'Partial refund available until',
      bookedOn: 'Booked on',
      confirmationSent: 'Confirmation sent to'
    },
    es: {
      bookingDetails: 'Detalles de la Reserva',
      bookingReference: 'Referencia de Reserva',
      hotelInformation: 'Información del Hotel',
      guestInformation: 'Información del Huésped',
      bookingDates: 'Fechas de Reserva',
      paymentInformation: 'Información de Pago',
      cancellationPolicy: 'Política de Cancelación',
      checkIn: 'Entrada',
      checkOut: 'Salida',
      guests: 'Huéspedes',
      rooms: 'Habitaciones',
      roomType: 'Tipo de Habitación',
      totalAmount: 'Importe Total',
      paidAmount: 'Importe Pagado',
      paymentMethod: 'Método de Pago',
      paymentDate: 'Fecha de Pago',
      primaryGuest: 'Huésped Principal',
      email: 'Correo',
      phone: 'Teléfono',
      specialRequests: 'Solicitudes Especiales',
      amenities: 'Servicios',
      address: 'Dirección',
      contactHotel: 'Contactar Hotel',
      modify: 'Modificar Reserva',
      cancel: 'Cancelar Reserva',
      downloadReceipt: 'Descargar Recibo',
      close: 'Cerrar',
      nights: 'noches',
      night: 'noche',
      adults: 'adultos',
      adult: 'adulto',
      children: 'niños',
      child: 'niño',
      room: 'habitación',
      freeCancellation: 'Cancelación gratuita hasta',
      nonRefundable: 'Reserva no reembolsable',
      partialRefund: 'Reembolso parcial disponible hasta',
      bookedOn: 'Reservado el',
      confirmationSent: 'Confirmación enviada a'
    },
    fr: {
      bookingDetails: 'Détails de la Réservation',
      bookingReference: 'Référence de Réservation',
      hotelInformation: 'Informations sur l\'Hôtel',
      guestInformation: 'Informations Client',
      bookingDates: 'Dates de Réservation',
      paymentInformation: 'Informations de Paiement',
      cancellationPolicy: 'Politique d\'Annulation',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Invités',
      rooms: 'Chambres',
      roomType: 'Type de Chambre',
      totalAmount: 'Montant Total',
      paidAmount: 'Montant Payé',
      paymentMethod: 'Méthode de Paiement',
      paymentDate: 'Date de Paiement',
      primaryGuest: 'Client Principal',
      email: 'Email',
      phone: 'Téléphone',
      specialRequests: 'Demandes Spéciales',
      amenities: 'Équipements',
      address: 'Adresse',
      contactHotel: 'Contacter l\'Hôtel',
      modify: 'Modifier Réservation',
      cancel: 'Annuler Réservation',
      downloadReceipt: 'Télécharger Reçu',
      close: 'Fermer',
      nights: 'nuits',
      night: 'nuit',
      adults: 'adultes',
      adult: 'adulte',
      children: 'enfants',
      child: 'enfant',
      room: 'chambre',
      freeCancellation: 'Annulation gratuite jusqu\'au',
      nonRefundable: 'Réservation non remboursable',
      partialRefund: 'Remboursement partiel disponible jusqu\'au',
      bookedOn: 'Réservé le',
      confirmationSent: 'Confirmation envoyée à'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !booking) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-text-primary">
            {t.bookingDetails}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-50 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Booking Reference */}
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary uppercase tracking-wide">
                    {t.bookingReference}
                  </p>
                  <p className="text-xl font-bold text-primary font-data mt-1">
                    {booking.bookingReference}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">
                    {t.bookedOn}
                  </p>
                  <p className="text-sm font-medium text-text-primary">
                    {formatDate(booking.bookedDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Hotel Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {t.hotelInformation}
              </h3>
              <div className="bg-surface-50 rounded-lg p-4">
                <div className="flex space-x-4">
                  <Image
                    src={booking.hotel.image}
                    alt={booking.hotel.name}
                    className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-text-primary">
                      {booking.hotel.name}
                    </h4>
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
                    <div className="mt-3 flex space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MapPin"
                        iconPosition="left"
                      >
                        {t.address}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Phone"
                        iconPosition="left"
                      >
                        {t.contactHotel}
                      </Button>
                    </div>
                  </div>
                </div>

                {booking.hotel.amenities && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium text-text-primary mb-2">
                      {t.amenities}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {booking.hotel.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface-100 text-text-secondary"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Dates & Room Info */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {t.bookingDates}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                        {t.checkIn}
                      </p>
                      <p className="text-lg font-semibold text-text-primary mt-1">
                        {formatDate(booking.checkIn)}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {formatTime(booking.checkIn)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                        {t.checkOut}
                      </p>
                      <p className="text-lg font-semibold text-text-primary mt-1">
                        {formatDate(booking.checkOut)}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {formatTime(booking.checkOut)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-text-secondary">
                      {nights} {nights === 1 ? t.night : t.nights} • {formatGuestCount()}
                    </p>
                  </div>
                </div>

                <div className="bg-surface-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                        {t.roomType}
                      </p>
                      <p className="text-lg font-semibold text-text-primary mt-1">
                        {booking.roomType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                        {t.rooms}
                      </p>
                      <p className="text-lg font-semibold text-text-primary mt-1">
                        {booking.rooms} {booking.rooms === 1 ? t.room : t.rooms}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {t.guestInformation}
              </h3>
              <div className="bg-surface-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.primaryGuest}
                    </p>
                    <p className="text-lg font-semibold text-text-primary mt-1">
                      {booking.guestInfo.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.email}
                    </p>
                    <p className="text-lg font-semibold text-text-primary mt-1">
                      {booking.guestInfo.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.phone}
                    </p>
                    <p className="text-lg font-semibold text-text-primary mt-1">
                      {booking.guestInfo.phone}
                    </p>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.specialRequests}
                    </p>
                    <p className="text-sm text-text-primary mt-1">
                      {booking.specialRequests}
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-text-secondary">
                    {t.confirmationSent} {booking.guestInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {t.paymentInformation}
              </h3>
              <div className="bg-surface-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.totalAmount}
                    </p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      ${booking.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.paymentMethod}
                    </p>
                    <p className="text-lg font-semibold text-text-primary mt-1">
                      {booking.paymentInfo.method}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.paidAmount}
                    </p>
                    <p className="text-lg font-semibold text-success mt-1">
                      ${booking.paymentInfo.paidAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
                      {t.paymentDate}
                    </p>
                    <p className="text-lg font-semibold text-text-primary mt-1">
                      {formatDate(booking.paymentInfo.paymentDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            {booking.cancellationPolicy && (
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  {t.cancellationPolicy}
                </h3>
                <div className="bg-surface-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={booking.cancellationPolicy.isFree ? "CheckCircle" : "AlertCircle"} 
                      size={20} 
                      className={booking.cancellationPolicy.isFree ? "text-success" : "text-warning"} 
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {booking.cancellationPolicy.isFree 
                          ? `${t.freeCancellation} ${formatDate(booking.cancellationPolicy.deadline)}`
                          : booking.cancellationPolicy.isPartial
                          ? `${t.partialRefund} ${formatDate(booking.cancellationPolicy.deadline)}`
                          : t.nonRefundable
                        }
                      </p>
                      {booking.cancellationPolicy.details && (
                        <p className="text-xs text-text-secondary mt-1">
                          {booking.cancellationPolicy.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface-50">
          <Button
            variant="outline"
            onClick={onClose}
            iconName="X"
            iconPosition="left"
          >
            {t.close}
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => onDownloadReceipt(booking)}
              iconName="Download"
              iconPosition="left"
              className="text-text-secondary"
            >
              {t.downloadReceipt}
            </Button>
            {canModify && (
              <Button
                variant="outline"
                onClick={() => onModify(booking)}
                iconName="Edit2"
                iconPosition="left"
                className="text-primary border-primary"
              >
                {t.modify}
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outline"
                onClick={() => onCancel(booking)}
                iconName="X"
                iconPosition="left"
                className="text-error border-error"
              >
                {t.cancel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;