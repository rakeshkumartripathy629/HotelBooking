import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ userProfile, onProfileUpdate, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    dateOfBirth: userProfile.dateOfBirth || '',
    address: {
      street: userProfile.address?.street || '',
      city: userProfile.address?.city || '',
      state: userProfile.address?.state || '',
      zipCode: userProfile.address?.zipCode || '',
      country: userProfile.address?.country || ''
    }
  });
  const [errors, setErrors] = useState({});

  const languages = {
    en: {
      personalInfo: 'Personal Information',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      address: 'Address',
      street: 'Street Address',
      city: 'City',
      state: 'State/Province',
      zipCode: 'ZIP/Postal Code',
      country: 'Country',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      updateSuccess: 'Profile updated successfully'
    },
    es: {
      personalInfo: 'Información Personal',
      edit: 'Editar',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      fullName: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      dateOfBirth: 'Fecha de Nacimiento',
      address: 'Dirección',
      street: 'Dirección de la Calle',
      city: 'Ciudad',
      state: 'Estado/Provincia',
      zipCode: 'Código Postal',
      country: 'País',
      required: 'Este campo es obligatorio',
      invalidEmail: 'Por favor ingrese un correo electrónico válido',
      invalidPhone: 'Por favor ingrese un número de teléfono válido',
      updateSuccess: 'Perfil actualizado exitosamente'
    },
    fr: {
      personalInfo: 'Informations Personnelles',
      edit: 'Modifier',
      save: 'Enregistrer les Modifications',
      cancel: 'Annuler',
      fullName: 'Nom Complet',
      email: 'Adresse E-mail',
      phone: 'Numéro de Téléphone',
      dateOfBirth: 'Date de Naissance',
      address: 'Adresse',
      street: 'Adresse de la Rue',
      city: 'Ville',
      state: 'État/Province',
      zipCode: 'Code Postal',
      country: 'Pays',
      required: 'Ce champ est obligatoire',
      invalidEmail: 'Veuillez saisir une adresse e-mail valide',
      invalidPhone: 'Veuillez saisir un numéro de téléphone valide',
      updateSuccess: 'Profil mis à jour avec succès'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = t.invalidPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onProfileUpdate({ ...userProfile, ...formData });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile.name || '',
      email: userProfile.email || '',
      phone: userProfile.phone || '',
      dateOfBirth: userProfile.dateOfBirth || '',
      address: {
        street: userProfile.address?.street || '',
        city: userProfile.address?.city || '',
        state: userProfile.address?.state || '',
        zipCode: userProfile.address?.zipCode || '',
        country: userProfile.address?.country || ''
      }
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <span>{t.personalInfo}</span>
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit2"
            iconPosition="left"
            size="sm"
          >
            {t.edit}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.fullName} *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={t.fullName}
                  className={errors.name ? 'border-error' : ''}
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary py-2">{userProfile.name || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.email} *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t.email}
                  className={errors.email ? 'border-error' : ''}
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary py-2">{userProfile.email || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.phone}
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={t.phone}
                  className={errors.phone ? 'border-error' : ''}
                />
                {errors.phone && (
                  <p className="text-error text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary py-2">{userProfile.phone || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.dateOfBirth}
            </label>
            {isEditing ? (
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            ) : (
              <p className="text-text-secondary py-2">
                {userProfile.dateOfBirth ? new Date(userProfile.dateOfBirth).toLocaleDateString(
                  currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR' ) :'-'}
              </p>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span>{t.address}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.street}
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  placeholder={t.street}
                />
              ) : (
                <p className="text-text-secondary py-2">{userProfile.address?.street || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.city}
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  placeholder={t.city}
                />
              ) : (
                <p className="text-text-secondary py-2">{userProfile.address?.city || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.state}
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                  placeholder={t.state}
                />
              ) : (
                <p className="text-text-secondary py-2">{userProfile.address?.state || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.zipCode}
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                  placeholder={t.zipCode}
                />
              ) : (
                <p className="text-text-secondary py-2">{userProfile.address?.zipCode || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.country}
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => handleInputChange('address.country', e.target.value)}
                  placeholder={t.country}
                />
              ) : (
                <p className="text-text-secondary py-2">{userProfile.address?.country || '-'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              {t.save}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
            >
              {t.cancel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;