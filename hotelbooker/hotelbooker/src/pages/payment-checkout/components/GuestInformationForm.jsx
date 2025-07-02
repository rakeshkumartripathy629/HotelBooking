import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const GuestInformationForm = ({ guestData, onGuestDataChange, isLoggedIn }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    primaryGuest: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      ...guestData?.primaryGuest
    },
    additionalGuests: guestData?.additionalGuests || []
  });
  const [errors, setErrors] = useState({});
  const [showAdditionalGuests, setShowAdditionalGuests] = useState(false);

  const languages = {
    en: {
      guestInformation: 'Guest Information',
      primaryGuest: 'Primary Guest',
      additionalGuests: 'Additional Guests',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      country: 'Country',
      addGuest: 'Add Guest',
      removeGuest: 'Remove Guest',
      autoFill: 'Auto-fill from profile',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      guest: 'Guest',
      specialRequests: 'Special Requests',
      specialRequestsPlaceholder: 'Any special requests or preferences (optional)',
      countries: {
        us: 'United States',
        uk: 'United Kingdom',
        ca: 'Canada',
        au: 'Australia',
        de: 'Germany',
        fr: 'France',
        es: 'Spain',
        it: 'Italy',
        jp: 'Japan',
        in: 'India'
      }
    },
    es: {
      guestInformation: 'Información del Huésped',
      primaryGuest: 'Huésped Principal',
      additionalGuests: 'Huéspedes Adicionales',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      country: 'País',
      addGuest: 'Agregar Huésped',
      removeGuest: 'Eliminar Huésped',
      autoFill: 'Completar automáticamente desde el perfil',
      required: 'Este campo es obligatorio',
      invalidEmail: 'Por favor ingrese un correo electrónico válido',
      invalidPhone: 'Por favor ingrese un número de teléfono válido',
      guest: 'Huésped',
      specialRequests: 'Solicitudes Especiales',
      specialRequestsPlaceholder: 'Cualquier solicitud especial o preferencia (opcional)',
      countries: {
        us: 'Estados Unidos',
        uk: 'Reino Unido',
        ca: 'Canadá',
        au: 'Australia',
        de: 'Alemania',
        fr: 'Francia',
        es: 'España',
        it: 'Italia',
        jp: 'Japón',
        in: 'India'
      }
    },
    fr: {
      guestInformation: 'Informations Client',
      primaryGuest: 'Client Principal',
      additionalGuests: 'Clients Supplémentaires',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      country: 'Pays',
      addGuest: 'Ajouter Client',
      removeGuest: 'Supprimer Client',
      autoFill: 'Remplir automatiquement depuis le profil',
      required: 'Ce champ est obligatoire',
      invalidEmail: 'Veuillez saisir une adresse email valide',
      invalidPhone: 'Veuillez saisir un numéro de téléphone valide',
      guest: 'Client',
      specialRequests: 'Demandes Spéciales',
      specialRequestsPlaceholder: 'Toute demande spéciale ou préférence (optionnel)',
      countries: {
        us: 'États-Unis',
        uk: 'Royaume-Uni',
        ca: 'Canada',
        au: 'Australie',
        de: 'Allemagne',
        fr: 'France',
        es: 'Espagne',
        it: 'Italie',
        jp: 'Japon',
        in: 'Inde'
      }
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (onGuestDataChange) {
      onGuestDataChange(formData);
    }
  }, [formData, onGuestDataChange]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (section === 'primaryGuest') {
        return {
          ...prev,
          primaryGuest: {
            ...prev.primaryGuest,
            [field]: value
          }
        };
      } else if (section === 'additionalGuests' && index !== null) {
        const updatedGuests = [...prev.additionalGuests];
        updatedGuests[index] = {
          ...updatedGuests[index],
          [field]: value
        };
        return {
          ...prev,
          additionalGuests: updatedGuests
        };
      }
      return prev;
    });

    // Clear error when user starts typing
    if (errors[`${section}.${field}`] || (index !== null && errors[`${section}.${index}.${field}`])) {
      const errorKey = index !== null ? `${section}.${index}.${field}` : `${section}.${field}`;
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate primary guest
    const primaryGuest = formData.primaryGuest;
    if (!primaryGuest.firstName.trim()) {
      newErrors['primaryGuest.firstName'] = t.required;
    }
    if (!primaryGuest.lastName.trim()) {
      newErrors['primaryGuest.lastName'] = t.required;
    }
    if (!primaryGuest.email.trim()) {
      newErrors['primaryGuest.email'] = t.required;
    } else if (!validateEmail(primaryGuest.email)) {
      newErrors['primaryGuest.email'] = t.invalidEmail;
    }
    if (!primaryGuest.phone.trim()) {
      newErrors['primaryGuest.phone'] = t.required;
    } else if (!validatePhone(primaryGuest.phone)) {
      newErrors['primaryGuest.phone'] = t.invalidPhone;
    }
    if (!primaryGuest.country) {
      newErrors['primaryGuest.country'] = t.required;
    }

    // Validate additional guests
    formData.additionalGuests.forEach((guest, index) => {
      if (!guest.firstName.trim()) {
        newErrors[`additionalGuests.${index}.firstName`] = t.required;
      }
      if (!guest.lastName.trim()) {
        newErrors[`additionalGuests.${index}.lastName`] = t.required;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutoFill = () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (userProfile.name) {
      const [firstName, ...lastNameParts] = userProfile.name.split(' ');
      setFormData(prev => ({
        ...prev,
        primaryGuest: {
          ...prev.primaryGuest,
          firstName: firstName || '',
          lastName: lastNameParts.join(' ') || '',
          email: userProfile.email || '',
          phone: userProfile.phone || '',
          country: userProfile.country || ''
        }
      }));
    }
  };

  const addAdditionalGuest = () => {
    setFormData(prev => ({
      ...prev,
      additionalGuests: [
        ...prev.additionalGuests,
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: ''
        }
      ]
    }));
    setShowAdditionalGuests(true);
  };

  const removeAdditionalGuest = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalGuests: prev.additionalGuests.filter((_, i) => i !== index)
    }));
  };

  const countryOptions = Object.entries(t.countries).map(([code, name]) => ({
    value: code,
    label: name
  }));

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">{t.guestInformation}</h3>
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAutoFill}
              iconName="User"
              iconPosition="left"
              className="text-primary"
            >
              {t.autoFill}
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Primary Guest */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="UserCheck" size={16} className="text-primary" />
            <span>{t.primaryGuest}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder={t.firstName}
                value={formData.primaryGuest.firstName}
                onChange={(e) => handleInputChange('primaryGuest', 'firstName', e.target.value)}
                className={errors['primaryGuest.firstName'] ? 'border-error' : ''}
              />
              {errors['primaryGuest.firstName'] && (
                <p className="text-error text-sm mt-1">{errors['primaryGuest.firstName']}</p>
              )}
            </div>

            <div>
              <Input
                type="text"
                placeholder={t.lastName}
                value={formData.primaryGuest.lastName}
                onChange={(e) => handleInputChange('primaryGuest', 'lastName', e.target.value)}
                className={errors['primaryGuest.lastName'] ? 'border-error' : ''}
              />
              {errors['primaryGuest.lastName'] && (
                <p className="text-error text-sm mt-1">{errors['primaryGuest.lastName']}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder={t.email}
                value={formData.primaryGuest.email}
                onChange={(e) => handleInputChange('primaryGuest', 'email', e.target.value)}
                className={errors['primaryGuest.email'] ? 'border-error' : ''}
              />
              {errors['primaryGuest.email'] && (
                <p className="text-error text-sm mt-1">{errors['primaryGuest.email']}</p>
              )}
            </div>

            <div>
              <Input
                type="tel"
                placeholder={t.phone}
                value={formData.primaryGuest.phone}
                onChange={(e) => handleInputChange('primaryGuest', 'phone', e.target.value)}
                className={errors['primaryGuest.phone'] ? 'border-error' : ''}
              />
              {errors['primaryGuest.phone'] && (
                <p className="text-error text-sm mt-1">{errors['primaryGuest.phone']}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <select
                value={formData.primaryGuest.country}
                onChange={(e) => handleInputChange('primaryGuest', 'country', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors['primaryGuest.country'] ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">{t.country}</option>
                {countryOptions.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors['primaryGuest.country'] && (
                <p className="text-error text-sm mt-1">{errors['primaryGuest.country']}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Guests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>{t.additionalGuests}</span>
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={addAdditionalGuest}
              iconName="Plus"
              iconPosition="left"
            >
              {t.addGuest}
            </Button>
          </div>

          {formData.additionalGuests.length > 0 && (
            <div className="space-y-4">
              {formData.additionalGuests.map((guest, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-text-primary">
                      {t.guest} {index + 2}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdditionalGuest(index)}
                      iconName="Trash2"
                      className="text-error hover:bg-error-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        placeholder={t.firstName}
                        value={guest.firstName}
                        onChange={(e) => handleInputChange('additionalGuests', 'firstName', e.target.value, index)}
                        className={errors[`additionalGuests.${index}.firstName`] ? 'border-error' : ''}
                      />
                      {errors[`additionalGuests.${index}.firstName`] && (
                        <p className="text-error text-sm mt-1">{errors[`additionalGuests.${index}.firstName`]}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="text"
                        placeholder={t.lastName}
                        value={guest.lastName}
                        onChange={(e) => handleInputChange('additionalGuests', 'lastName', e.target.value, index)}
                        className={errors[`additionalGuests.${index}.lastName`] ? 'border-error' : ''}
                      />
                      {errors[`additionalGuests.${index}.lastName`] && (
                        <p className="text-error text-sm mt-1">{errors[`additionalGuests.${index}.lastName`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <span>{t.specialRequests}</span>
          </h4>
          <textarea
            placeholder={t.specialRequestsPlaceholder}
            value={formData.specialRequests || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default GuestInformationForm;