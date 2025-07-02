import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PaymentMethodSection = ({ paymentData, onPaymentDataChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    ...paymentData?.cardData
  });
  const [errors, setErrors] = useState({});
  const [savedCards, setSavedCards] = useState([]);

  const languages = {
    en: {
      paymentMethod: 'Payment Method',
      creditDebitCard: 'Credit/Debit Card',
      paypal: 'PayPal',
      applePay: 'Apple Pay',
      googlePay: 'Google Pay',
      savedCards: 'Saved Cards',
      useNewCard: 'Use New Card',
      cardNumber: 'Card Number',
      expiryDate: 'MM/YY',
      cvv: 'CVV',
      cardholderName: 'Cardholder Name',
      securePayment: 'Secure Payment',
      sslEncrypted: 'SSL Encrypted',
      pciCompliant: 'PCI Compliant',
      saveCard: 'Save card for future bookings',
      required: 'This field is required',
      invalidCard: 'Please enter a valid card number',
      invalidExpiry: 'Please enter a valid expiry date',
      invalidCvv: 'Please enter a valid CVV',
      ending: 'ending in',
      expires: 'expires'
    },
    es: {
      paymentMethod: 'Método de Pago',
      creditDebitCard: 'Tarjeta de Crédito/Débito',
      paypal: 'PayPal',
      applePay: 'Apple Pay',
      googlePay: 'Google Pay',
      savedCards: 'Tarjetas Guardadas',
      useNewCard: 'Usar Nueva Tarjeta',
      cardNumber: 'Número de Tarjeta',
      expiryDate: 'MM/AA',
      cvv: 'CVV',
      cardholderName: 'Nombre del Titular',
      securePayment: 'Pago Seguro',
      sslEncrypted: 'Cifrado SSL',
      pciCompliant: 'Cumple PCI',
      saveCard: 'Guardar tarjeta para futuras reservas',
      required: 'Este campo es obligatorio',
      invalidCard: 'Por favor ingrese un número de tarjeta válido',
      invalidExpiry: 'Por favor ingrese una fecha de vencimiento válida',
      invalidCvv: 'Por favor ingrese un CVV válido',
      ending: 'terminada en',
      expires: 'vence'
    },
    fr: {
      paymentMethod: 'Méthode de Paiement',
      creditDebitCard: 'Carte de Crédit/Débit',
      paypal: 'PayPal',
      applePay: 'Apple Pay',
      googlePay: 'Google Pay',
      savedCards: 'Cartes Enregistrées',
      useNewCard: 'Utiliser Nouvelle Carte',
      cardNumber: 'Numéro de Carte',
      expiryDate: 'MM/AA',
      cvv: 'CVV',
      cardholderName: 'Nom du Titulaire',
      securePayment: 'Paiement Sécurisé',
      sslEncrypted: 'Chiffré SSL',
      pciCompliant: 'Conforme PCI',
      saveCard: 'Enregistrer la carte pour les futures réservations',
      required: 'Ce champ est obligatoire',
      invalidCard: 'Veuillez saisir un numéro de carte valide',
      invalidExpiry: 'Veuillez saisir une date d\'expiration valide',
      invalidCvv: 'Veuillez saisir un CVV valide',
      ending: 'se terminant par',
      expires: 'expire'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const paymentMethods = [
    {
      id: 'card',
      name: t.creditDebitCard,
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: t.paypal,
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple-pay',
      name: t.applePay,
      icon: 'Smartphone',
      description: 'Pay with Touch ID or Face ID'
    },
    {
      id: 'google-pay',
      name: t.googlePay,
      icon: 'Smartphone',
      description: 'Pay with Google Pay'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Load saved cards (mock data)
    const mockSavedCards = [
      {
        id: '1',
        type: 'visa',
        last4: '4242',
        expiryMonth: '12',
        expiryYear: '25',
        cardholderName: 'John Doe'
      },
      {
        id: '2',
        type: 'mastercard',
        last4: '5555',
        expiryMonth: '08',
        expiryYear: '26',
        cardholderName: 'John Doe'
      }
    ];
    setSavedCards(mockSavedCards);
  }, []);

  useEffect(() => {
    if (onPaymentDataChange) {
      onPaymentDataChange({
        method: selectedMethod,
        cardData: cardData,
        isValid: validatePaymentData()
      });
    }
  }, [selectedMethod, cardData, onPaymentDataChange]);

  const validatePaymentData = () => {
    if (selectedMethod !== 'card') return true;
    
    return (
      cardData.cardNumber.length >= 16 &&
      cardData.expiryDate.length === 5 &&
      cardData.cvv.length >= 3 &&
      cardData.cardholderName.trim().length > 0
    );
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSavedCardSelect = (card) => {
    setCardData({
      cardNumber: '**** **** **** ' + card.last4,
      expiryDate: card.expiryMonth + '/' + card.expiryYear,
      cvv: '',
      cardholderName: card.cardholderName,
      savedCardId: card.id
    });
  };

  const getCardIcon = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'CreditCard'; // Visa
    if (number.startsWith('5')) return 'CreditCard'; // Mastercard
    if (number.startsWith('3')) return 'CreditCard'; // Amex
    return 'CreditCard';
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">{t.paymentMethod}</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-success bg-success-50 px-2 py-1 rounded-full">
              <Icon name="Shield" size={12} />
              <span>{t.securePayment}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 border rounded-lg text-left transition-micro ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-border-dark'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={method.icon} 
                  size={20} 
                  className={selectedMethod === method.id ? 'text-primary' : 'text-text-secondary'} 
                />
                <div className="flex-1">
                  <p className={`font-medium ${
                    selectedMethod === method.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {method.name}
                  </p>
                  <p className="text-xs text-text-secondary">{method.description}</p>
                </div>
                {selectedMethod === method.id && (
                  <Icon name="CheckCircle" size={16} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Card Payment Form */}
        {selectedMethod === 'card' && (
          <div className="space-y-4">
            {/* Saved Cards */}
            {savedCards.length > 0 && (
              <div>
                <h4 className="font-medium text-text-primary mb-3">{t.savedCards}</h4>
                <div className="space-y-2">
                  {savedCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleSavedCardSelect(card)}
                      className="w-full p-3 border border-border rounded-lg text-left hover:border-border-dark transition-micro"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name="CreditCard" size={16} className="text-text-secondary" />
                          <div>
                            <p className="font-medium text-text-primary">
                              **** **** **** {card.last4}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {card.cardholderName} • {t.expires} {card.expiryMonth}/{card.expiryYear}
                            </p>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                      </div>
                    </button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCardData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' })}
                  className="mt-2 text-primary"
                >
                  {t.useNewCard}
                </Button>
              </div>
            )}

            {/* New Card Form */}
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={t.cardNumber}
                    value={cardData.cardNumber}
                    onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                    maxLength={19}
                    className={errors.cardNumber ? 'border-error pr-10' : 'pr-10'}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Icon name={getCardIcon(cardData.cardNumber)} size={16} className="text-text-secondary" />
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-error text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder={t.expiryDate}
                    value={cardData.expiryDate}
                    onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                    maxLength={5}
                    className={errors.expiryDate ? 'border-error' : ''}
                  />
                  {errors.expiryDate && (
                    <p className="text-error text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder={t.cvv}
                    value={cardData.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    maxLength={4}
                    className={errors.cvv ? 'border-error' : ''}
                  />
                  {errors.cvv && (
                    <p className="text-error text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder={t.cardholderName}
                  value={cardData.cardholderName}
                  onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                  className={errors.cardholderName ? 'border-error' : ''}
                />
                {errors.cardholderName && (
                  <p className="text-error text-sm mt-1">{errors.cardholderName}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="saveCard"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="saveCard" className="text-sm text-text-secondary">
                  {t.saveCard}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Alternative Payment Methods */}
        {selectedMethod !== 'card' && (
          <div className="text-center py-8">
            <Icon name="ExternalLink" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              You will be redirected to complete your payment with {paymentMethods.find(m => m.id === selectedMethod)?.name}
            </p>
          </div>
        )}

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <Icon name="Shield" size={12} />
            <span>{t.sslEncrypted}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <Icon name="Lock" size={12} />
            <span>{t.pciCompliant}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;