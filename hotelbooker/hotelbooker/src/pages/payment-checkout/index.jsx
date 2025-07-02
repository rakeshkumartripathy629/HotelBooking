import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import BookingSummaryPanel from './components/BookingSummaryPanel';
import GuestInformationForm from './components/GuestInformationForm';
import PaymentMethodSection from './components/PaymentMethodSection';
import BookingPoliciesSection from './components/BookingPoliciesSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PaymentCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Form data states
  const [bookingData, setBookingData] = useState(null);
  const [guestData, setGuestData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  
  // Validation states
  const [formErrors, setFormErrors] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const languages = {
    en: {
      paymentCheckout: 'Payment & Checkout',
      completeBooking: 'Complete Booking',
      processing: 'Processing...',
      backToHotel: 'Back to Hotel',
      secureCheckout: 'Secure Checkout',
      step3of4: 'Step 3 of 4',
      bookingTotal: 'Booking Total',
      finalStep: 'Final Step',
      reviewAndPay: 'Review your booking details and complete payment',
      allFieldsRequired: 'Please fill in all required fields',
      acceptPolicies: 'Please accept all policies to continue',
      paymentRequired: 'Please select a payment method',
      bookingSuccess: 'Booking Confirmed!',
      bookingReference: 'Booking Reference',
      confirmationSent: 'Confirmation email sent to',
      viewBooking: 'View Booking',
      bookAnother: 'Book Another Hotel',
      error: 'Error',
      bookingFailed: 'Booking failed. Please try again.',
      tryAgain: 'Try Again'
    },
    es: {
      paymentCheckout: 'Pago y Finalización',
      completeBooking: 'Completar Reserva',
      processing: 'Procesando...',
      backToHotel: 'Volver al Hotel',
      secureCheckout: 'Pago Seguro',
      step3of4: 'Paso 3 de 4',
      bookingTotal: 'Total de Reserva',
      finalStep: 'Paso Final',
      reviewAndPay: 'Revisa los detalles de tu reserva y completa el pago',
      allFieldsRequired: 'Por favor completa todos los campos requeridos',
      acceptPolicies: 'Por favor acepta todas las políticas para continuar',
      paymentRequired: 'Por favor selecciona un método de pago',
      bookingSuccess: '¡Reserva Confirmada!',
      bookingReference: 'Referencia de Reserva',
      confirmationSent: 'Email de confirmación enviado a',
      viewBooking: 'Ver Reserva',
      bookAnother: 'Reservar Otro Hotel',
      error: 'Error',
      bookingFailed: 'La reserva falló. Por favor intenta de nuevo.',
      tryAgain: 'Intentar de Nuevo'
    },
    fr: {
      paymentCheckout: 'Paiement et Finalisation',
      completeBooking: 'Finaliser la Réservation',
      processing: 'Traitement...',
      backToHotel: 'Retour à l\'Hôtel',
      secureCheckout: 'Paiement Sécurisé',
      step3of4: 'Étape 3 sur 4',
      bookingTotal: 'Total de la Réservation',
      finalStep: 'Étape Finale',
      reviewAndPay: 'Vérifiez les détails de votre réservation et finalisez le paiement',
      allFieldsRequired: 'Veuillez remplir tous les champs requis',
      acceptPolicies: 'Veuillez accepter toutes les politiques pour continuer',
      paymentRequired: 'Veuillez sélectionner un mode de paiement',
      bookingSuccess: 'Réservation Confirmée!',
      bookingReference: 'Référence de Réservation',
      confirmationSent: 'Email de confirmation envoyé à',
      viewBooking: 'Voir la Réservation',
      bookAnother: 'Réserver un Autre Hôtel',
      error: 'Erreur',
      bookingFailed: 'La réservation a échoué. Veuillez réessayer.',
      tryAgain: 'Réessayer'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  // Mock booking data
  const mockBookingData = {
    hotel: {
      id: '1',
      name: 'Grand Plaza Hotel',
      location: 'Downtown, New York',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    },
    room: {
      type: 'Deluxe King Room',
      amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'City View']
    },
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    guests: {
      adults: 2,
      children: 0
    },
    rooms: 1,
    pricing: {
      roomRate: 450,
      taxes: 67.50,
      currency: 'USD'
    },
    currency: 'USD'
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    // Get booking data from location state or use mock data
    const bookingFromState = location.state?.bookingData;
    setBookingData(bookingFromState || mockBookingData);
  }, [location.state]);

  const validateForm = () => {
    const errors = {};

    // Validate guest information
    if (!guestData.primaryGuest?.firstName?.trim()) {
      errors.guestFirstName = t.allFieldsRequired;
    }
    if (!guestData.primaryGuest?.lastName?.trim()) {
      errors.guestLastName = t.allFieldsRequired;
    }
    if (!guestData.primaryGuest?.email?.trim()) {
      errors.guestEmail = t.allFieldsRequired;
    }
    if (!guestData.primaryGuest?.phone?.trim()) {
      errors.guestPhone = t.allFieldsRequired;
    }

    // Validate payment information
    if (!paymentData.method) {
      errors.payment = t.paymentRequired;
    } else if (paymentData.method === 'card' && !paymentData.isValid) {
      errors.payment = t.paymentRequired;
    }

    // Validate policies acceptance
    if (!policiesAccepted) {
      errors.policies = t.acceptPolicies;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteBooking = async () => {
    setShowValidationErrors(true);
    
    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate booking reference
      const bookingReference = 'HB' + Date.now().toString().slice(-8);

      // Navigate to booking confirmation
      navigate('/booking-management-dashboard', {
        state: {
          bookingConfirmed: true,
          bookingReference,
          bookingData: {
            ...bookingData,
            guestData,
            paymentData,
            bookingReference,
            status: 'confirmed',
            bookingDate: new Date().toISOString()
          }
        }
      });
    } catch (error) {
      console.error('Booking failed:', error);
      setFormErrors({ general: t.bookingFailed });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHotel = () => {
    navigate('/hotel-details-booking', {
      state: { hotelData: bookingData?.hotel }
    });
  };

  const handleEditBooking = () => {
    navigate('/hotel-details-booking', {
      state: { 
        hotelData: bookingData?.hotel,
        editMode: true 
      }
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      style: 'currency',
      currency: bookingData?.currency || 'USD'
    }).format(amount);
  };

  const totalAmount = (bookingData?.pricing?.roomRate || 0) + (bookingData?.pricing?.taxes || 0);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-warning mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">No Booking Data</h2>
            <p className="text-text-secondary mb-4">Please start a new booking process.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/hotel-search-results')}
            >
              Search Hotels
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingProgressIndicator 
        currentStep={3} 
        bookingData={bookingData}
        onBack={handleBackToHotel}
      />

      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{t.paymentCheckout}</h1>
                <p className="text-text-secondary mt-1">{t.reviewAndPay}</p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">{t.secureCheckout}</span>
              </div>
            </div>
          </div>

          {/* Error Messages */}
          {showValidationErrors && Object.keys(formErrors).length > 0 && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                <div>
                  <h3 className="font-medium text-error mb-2">Please fix the following errors:</h3>
                  <ul className="text-sm text-error space-y-1">
                    {Object.values(formErrors).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Guest Information */}
              <GuestInformationForm
                guestData={guestData}
                onGuestDataChange={setGuestData}
                isLoggedIn={isAuthenticated}
              />

              {/* Payment Method */}
              <PaymentMethodSection
                paymentData={paymentData}
                onPaymentDataChange={setPaymentData}
              />

              {/* Booking Policies */}
              <BookingPoliciesSection
                onPolicyAcceptance={setPoliciesAccepted}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <BookingSummaryPanel
                bookingData={bookingData}
                onEdit={handleEditBooking}
              />

              {/* Complete Booking Button */}
              <div className="sticky top-32">
                <div className="bg-surface rounded-lg border border-border shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-text-primary">{t.bookingTotal}</span>
                    <span className="text-xl font-bold text-primary">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    onClick={handleCompleteBooking}
                    disabled={isLoading}
                    loading={isLoading}
                    className="w-full"
                    iconName={isLoading ? undefined : "CreditCard"}
                    iconPosition="left"
                  >
                    {isLoading ? t.processing : t.completeBooking}
                  </Button>

                  <div className="flex items-center justify-center space-x-2 mt-3 text-xs text-text-secondary">
                    <Icon name="Lock" size={12} />
                    <span>SSL Encrypted • PCI Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentCheckout;