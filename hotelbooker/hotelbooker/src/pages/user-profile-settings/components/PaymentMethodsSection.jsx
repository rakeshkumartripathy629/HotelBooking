import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethodsSection = ({ userProfile, onProfileUpdate, currentLanguage }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const languages = {
    en: {
      paymentMethods: 'Payment Methods',
      addCard: 'Add New Card',
      save: 'Save Card',
      cancel: 'Cancel',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      cardholderName: 'Cardholder Name',
      setDefault: 'Set as default payment method',
      defaultCard: 'Default',
      removeCard: 'Remove Card',
      editCard: 'Edit Card',
      noCards: 'No payment methods added yet',
      addFirstCard: 'Add your first payment method to make booking easier',
      cardEnding: 'ending in',
      expires: 'Expires',
      required: 'This field is required',
      invalidCard: 'Please enter a valid card number',
      invalidExpiry: 'Please enter a valid expiry date',
      invalidCvv: 'Please enter a valid CVV'
    },
    es: {
      paymentMethods: 'Métodos de Pago',
      addCard: 'Agregar Nueva Tarjeta',
      save: 'Guardar Tarjeta',
      cancel: 'Cancelar',
      cardNumber: 'Número de Tarjeta',
      expiryDate: 'Fecha de Vencimiento',
      cvv: 'CVV',
      cardholderName: 'Nombre del Titular',
      setDefault: 'Establecer como método de pago predeterminado',
      defaultCard: 'Predeterminada',
      removeCard: 'Eliminar Tarjeta',
      editCard: 'Editar Tarjeta',
      noCards: 'No se han agregado métodos de pago aún',
      addFirstCard: 'Agrega tu primer método de pago para facilitar las reservas',
      cardEnding: 'terminada en',
      expires: 'Vence',
      required: 'Este campo es obligatorio',
      invalidCard: 'Por favor ingrese un número de tarjeta válido',
      invalidExpiry: 'Por favor ingrese una fecha de vencimiento válida',
      invalidCvv: 'Por favor ingrese un CVV válido'
    },
    fr: {
      paymentMethods: 'Méthodes de Paiement',
      addCard: 'Ajouter une Nouvelle Carte',
      save: 'Enregistrer la Carte',
      cancel: 'Annuler',
      cardNumber: 'Numéro de Carte',
      expiryDate: 'Date d\'Expiration',
      cvv: 'CVV',
      cardholderName: 'Nom du Titulaire',
      setDefault: 'Définir comme méthode de paiement par défaut',
      defaultCard: 'Par Défaut',
      removeCard: 'Supprimer la Carte',
      editCard: 'Modifier la Carte',
      noCards: 'Aucune méthode de paiement ajoutée pour le moment',
      addFirstCard: 'Ajoutez votre première méthode de paiement pour faciliter les réservations',
      cardEnding: 'se terminant par',
      expires: 'Expire',
      required: 'Ce champ est obligatoire',
      invalidCard: 'Veuillez saisir un numéro de carte valide',
      invalidExpiry: 'Veuillez saisir une date d\'expiration valide',
      invalidCvv: 'Veuillez saisir un CVV valide'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const mockPaymentMethods = userProfile.paymentMethods || [
    {
      id: '1',
      type: 'visa',
      lastFour: '4242',
      expiryDate: '12/25',
      cardholderName: 'John Doe',
      isDefault: true
    },
    {
      id: '2',
      type: 'mastercard',
      lastFour: '8888',
      expiryDate: '08/26',
      cardholderName: 'John Doe',
      isDefault: false
    }
  ];

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getCardColor = (type) => {
    switch (type) {
      case 'visa':
        return 'text-blue-600';
      case 'mastercard':
        return 'text-red-600';
      case 'amex':
        return 'text-green-600';
      default:
        return 'text-text-secondary';
    }
  };

  const handleInputChange = (field, value) => {
    setNewCard(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
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

  const validateForm = () => {
    const newErrors = {};

    if (!newCard.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = t.required;
    } else if (newCard.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = t.invalidCard;
    }

    if (!newCard.expiryDate) {
      newErrors.expiryDate = t.required;
    } else if (!/^\d{2}\/\d{2}$/.test(newCard.expiryDate)) {
      newErrors.expiryDate = t.invalidExpiry;
    }

    if (!newCard.cvv) {
      newErrors.cvv = t.required;
    } else if (newCard.cvv.length < 3) {
      newErrors.cvv = t.invalidCvv;
    }

    if (!newCard.cardholderName.trim()) {
      newErrors.cardholderName = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCard = () => {
    if (validateForm()) {
      const cardData = {
        id: Date.now().toString(),
        type: 'visa', // In real app, detect from card number
        lastFour: newCard.cardNumber.slice(-4),
        expiryDate: newCard.expiryDate,
        cardholderName: newCard.cardholderName,
        isDefault: newCard.isDefault || mockPaymentMethods.length === 0
      };

      const updatedMethods = newCard.isDefault
        ? [cardData, ...mockPaymentMethods.map(card => ({ ...card, isDefault: false }))]
        : [...mockPaymentMethods, cardData];

      onProfileUpdate({
        ...userProfile,
        paymentMethods: updatedMethods
      });

      setNewCard({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        isDefault: false
      });
      setIsAddingCard(false);
    }
  };

  const handleRemoveCard = (cardId) => {
    const updatedMethods = mockPaymentMethods.filter(card => card.id !== cardId);
    onProfileUpdate({
      ...userProfile,
      paymentMethods: updatedMethods
    });
  };

  const handleSetDefault = (cardId) => {
    const updatedMethods = mockPaymentMethods.map(card => ({
      ...card,
      isDefault: card.id === cardId
    }));
    onProfileUpdate({
      ...userProfile,
      paymentMethods: updatedMethods
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <span>{t.paymentMethods}</span>
        </h2>
        {!isAddingCard && (
          <Button
            variant="outline"
            onClick={() => setIsAddingCard(true)}
            iconName="Plus"
            iconPosition="left"
            size="sm"
          >
            {t.addCard}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Existing Cards */}
        {mockPaymentMethods.length > 0 ? (
          mockPaymentMethods.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary-200 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center ${getCardColor(card.type)}`}>
                  <Icon name={getCardIcon(card.type)} size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-text-primary">
                      •••• •••• •••• {card.lastFour}
                    </p>
                    {card.isDefault && (
                      <span className="px-2 py-1 bg-primary-50 text-primary text-xs font-medium rounded">
                        {t.defaultCard}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {card.cardholderName} • {t.expires} {card.expiryDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!card.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(card.id)}
                    className="text-primary"
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCard(card.id)}
                  iconName="Trash2"
                  className="text-error hover:bg-error-50"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CreditCard" size={24} className="text-text-secondary" />
            </div>
            <p className="text-text-primary font-medium mb-2">{t.noCards}</p>
            <p className="text-text-secondary text-sm mb-4">{t.addFirstCard}</p>
            <Button
              variant="primary"
              onClick={() => setIsAddingCard(true)}
              iconName="Plus"
              iconPosition="left"
            >
              {t.addCard}
            </Button>
          </div>
        )}

        {/* Add New Card Form */}
        {isAddingCard && (
          <div className="border border-border rounded-lg p-4 bg-surface-50">
            <h3 className="text-lg font-medium text-text-primary mb-4">{t.addCard}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t.cardNumber} *
                </label>
                <Input
                  type="text"
                  value={newCard.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={errors.cardNumber ? 'border-error' : ''}
                />
                {errors.cardNumber && (
                  <p className="text-error text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t.expiryDate} *
                </label>
                <Input
                  type="text"
                  value={newCard.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? 'border-error' : ''}
                />
                {errors.expiryDate && (
                  <p className="text-error text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t.cvv} *
                </label>
                <Input
                  type="text"
                  value={newCard.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength={4}
                  className={errors.cvv ? 'border-error' : ''}
                />
                {errors.cvv && (
                  <p className="text-error text-xs mt-1">{errors.cvv}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t.cardholderName} *
                </label>
                <Input
                  type="text"
                  value={newCard.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  className={errors.cardholderName ? 'border-error' : ''}
                />
                {errors.cardholderName && (
                  <p className="text-error text-xs mt-1">{errors.cardholderName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCard.isDefault}
                    onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">{t.setDefault}</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <Button
                variant="primary"
                onClick={handleSaveCard}
                iconName="Save"
                iconPosition="left"
              >
                {t.save}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingCard(false);
                  setNewCard({
                    cardNumber: '',
                    expiryDate: '',
                    cvv: '',
                    cardholderName: '',
                    isDefault: false
                  });
                  setErrors({});
                }}
                iconName="X"
                iconPosition="left"
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsSection;