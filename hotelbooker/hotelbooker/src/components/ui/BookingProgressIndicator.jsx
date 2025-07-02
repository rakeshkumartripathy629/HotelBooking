import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BookingProgressIndicator = ({ currentStep = 1, bookingData, onStepClick, onBack }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      step: 'Step',
      of: 'of',
      back: 'Back',
      steps: {
        1: 'Hotel Details',
        2: 'Guest Information',
        3: 'Payment',
        4: 'Confirmation'
      },
      stepDescriptions: {
        1: 'Review hotel and room details',
        2: 'Enter guest information',
        3: 'Complete payment',
        4: 'Booking confirmed'
      }
    },
    es: {
      step: 'Paso',
      of: 'de',
      back: 'Atrás',
      steps: {
        1: 'Detalles del Hotel',
        2: 'Información del Huésped',
        3: 'Pago',
        4: 'Confirmación'
      },
      stepDescriptions: {
        1: 'Revisar detalles del hotel y habitación',
        2: 'Ingresar información del huésped',
        3: 'Completar pago',
        4: 'Reserva confirmada'
      }
    },
    fr: {
      step: 'Étape',
      of: 'sur',
      back: 'Retour',
      steps: {
        1: 'Détails de l\'Hôtel',
        2: 'Informations Client',
        3: 'Paiement',
        4: 'Confirmation'
      },
      stepDescriptions: {
        1: 'Vérifier les détails de l\'hôtel et de la chambre',
        2: 'Saisir les informations du client',
        3: 'Finaliser le paiement',
        4: 'Réservation confirmée'
      }
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const steps = [
    {
      number: 1,
      title: t.steps[1],
      description: t.stepDescriptions[1],
      icon: 'Building2',
      path: '/hotel-details-booking'
    },
    {
      number: 2,
      title: t.steps[2],
      description: t.stepDescriptions[2],
      icon: 'User',
      path: '/hotel-details-booking'
    },
    {
      number: 3,
      title: t.steps[3],
      description: t.stepDescriptions[3],
      icon: 'CreditCard',
      path: '/payment-checkout'
    },
    {
      number: 4,
      title: t.steps[4],
      description: t.stepDescriptions[4],
      icon: 'CheckCircle',
      path: '/booking-management-dashboard'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep && onStepClick) {
      onStepClick(stepNumber);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentStep > 1) {
      const previousStep = steps[currentStep - 2];
      navigate(previousStep.path);
    } else {
      navigate('/hotel-search-results');
    }
  };

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-surface text-text-secondary border-border';
      default:
        return 'bg-surface text-text-secondary border-border';
    }
  };

  const getConnectorClasses = (stepNumber) => {
    return stepNumber < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-surface border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Progress Bar */}
        <div className="md:hidden py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
              size="sm"
            >
              {t.back}
            </Button>
            <div className="text-sm font-medium text-text-secondary">
              {t.step} {currentStep} {t.of} {steps.length}
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="w-full bg-surface-100 rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>

          {/* Current Step Info */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-text-primary">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>

        {/* Desktop Step Indicator */}
        <div className="hidden md:block py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              {t.back}
            </Button>
            
            {bookingData?.hotel && (
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {bookingData.hotel.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {bookingData.hotel.location}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const status = getStepStatus(step.number);
                const isClickable = step.number <= currentStep;

                return (
                  <div key={step.number} className="flex flex-col items-center relative">
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-6 left-1/2 w-full h-0.5 transform translate-x-1/2 ${getConnectorClasses(
                          step.number
                        )} transition-colors duration-300`}
                        style={{ width: 'calc(100vw / 4)' }}
                      />
                    )}

                    {/* Step Circle */}
                    <button
                      onClick={() => handleStepClick(step.number)}
                      disabled={!isClickable}
                      className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(
                        status
                      )} ${
                        isClickable
                          ? 'hover:scale-105 cursor-pointer' :'cursor-not-allowed opacity-60'
                      }`}
                    >
                      {status === 'completed' ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <Icon name={step.icon} size={20} />
                      )}
                    </button>

                    {/* Step Info */}
                    <div className="mt-3 text-center max-w-32">
                      <p
                        className={`text-sm font-medium ${
                          status === 'current' ?'text-primary'
                            : status === 'completed' ?'text-success' :'text-text-secondary'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-text-secondary mt-1 leading-tight">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;