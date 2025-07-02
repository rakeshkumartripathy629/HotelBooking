import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySection = ({ userProfile, onProfileUpdate, currentLanguage }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const languages = {
    en: {
      security: 'Security & Privacy',
      changePassword: 'Change Password',
      save: 'Update Password',
      cancel: 'Cancel',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      twoFactorAuth: 'Two-Factor Authentication',
      enable2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
      loginHistory: 'Login History',
      viewHistory: 'View Login History',
      privacySettings: 'Privacy Settings',
      dataSharing: 'Data Sharing Preferences',
      required: 'This field is required',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordUpdated: 'Password updated successfully',
      twoFactorEnabled: 'Two-factor authentication is enabled',
      twoFactorDisabled: 'Two-factor authentication is disabled',
      lastLogin: 'Last login',
      deviceInfo: 'Device information',
      ipAddress: 'IP Address',
      location: 'Location',
      shareData: 'Share data with partners for personalized offers',
      analytics: 'Allow analytics to improve our services',
      marketing: 'Receive marketing communications'
    },
    es: {
      security: 'Seguridad y Privacidad',
      changePassword: 'Cambiar Contraseña',
      save: 'Actualizar Contraseña',
      cancel: 'Cancelar',
      currentPassword: 'Contraseña Actual',
      newPassword: 'Nueva Contraseña',
      confirmPassword: 'Confirmar Nueva Contraseña',
      twoFactorAuth: 'Autenticación de Dos Factores',
      enable2FA: 'Habilitar 2FA',
      disable2FA: 'Deshabilitar 2FA',
      loginHistory: 'Historial de Inicio de Sesión',
      viewHistory: 'Ver Historial de Inicio de Sesión',
      privacySettings: 'Configuración de Privacidad',
      dataSharing: 'Preferencias de Compartir Datos',
      required: 'Este campo es obligatorio',
      passwordMismatch: 'Las contraseñas no coinciden',
      passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
      passwordUpdated: 'Contraseña actualizada exitosamente',
      twoFactorEnabled: 'La autenticación de dos factores está habilitada',
      twoFactorDisabled: 'La autenticación de dos factores está deshabilitada',
      lastLogin: 'Último inicio de sesión',
      deviceInfo: 'Información del dispositivo',
      ipAddress: 'Dirección IP',
      location: 'Ubicación',
      shareData: 'Compartir datos con socios para ofertas personalizadas',
      analytics: 'Permitir análisis para mejorar nuestros servicios',
      marketing: 'Recibir comunicaciones de marketing'
    },
    fr: {
      security: 'Sécurité et Confidentialité',
      changePassword: 'Changer le Mot de Passe',
      save: 'Mettre à Jour le Mot de Passe',
      cancel: 'Annuler',
      currentPassword: 'Mot de Passe Actuel',
      newPassword: 'Nouveau Mot de Passe',
      confirmPassword: 'Confirmer le Nouveau Mot de Passe',
      twoFactorAuth: 'Authentification à Deux Facteurs',
      enable2FA: 'Activer 2FA',
      disable2FA: 'Désactiver 2FA',
      loginHistory: 'Historique de Connexion',
      viewHistory: 'Voir l\'Historique de Connexion',
      privacySettings: 'Paramètres de Confidentialité',
      dataSharing: 'Préférences de Partage de Données',
      required: 'Ce champ est obligatoire',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
      passwordUpdated: 'Mot de passe mis à jour avec succès',
      twoFactorEnabled: 'L\'authentification à deux facteurs est activée',
      twoFactorDisabled: 'L\'authentification à deux facteurs est désactivée',
      lastLogin: 'Dernière connexion',
      deviceInfo: 'Informations sur l\'appareil',
      ipAddress: 'Adresse IP',
      location: 'Emplacement',
      shareData: 'Partager les données avec les partenaires pour des offres personnalisées',
      analytics: 'Autoriser les analyses pour améliorer nos services',
      marketing: 'Recevoir des communications marketing'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const mockLoginHistory = [
    {
      id: '1',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      device: 'Chrome on Windows',
      ip: '192.168.1.1',
      location: 'New York, NY',
      success: true
    },
    {
      id: '2',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      device: 'Safari on iPhone',
      ip: '192.168.1.2',
      location: 'New York, NY',
      success: true
    },
    {
      id: '3',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      device: 'Chrome on Windows',
      ip: '192.168.1.1',
      location: 'New York, NY',
      success: true
    }
  ];

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm(prev => ({
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

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = t.required;
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = t.required;
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = t.passwordTooShort;
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = t.required;
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSave = () => {
    if (validatePasswordForm()) {
      // In real app, make API call to update password
      onProfileUpdate({
        ...userProfile,
        lastPasswordChange: new Date().toISOString()
      });
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
    }
  };

  const handlePasswordCancel = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsChangingPassword(false);
  };

  const toggle2FA = () => {
    onProfileUpdate({
      ...userProfile,
      twoFactorEnabled: !userProfile.twoFactorEnabled
    });
  };

  const handlePrivacyToggle = (setting) => {
    onProfileUpdate({
      ...userProfile,
      privacySettings: {
        ...userProfile.privacySettings,
        [setting]: !userProfile.privacySettings?.[setting]
      }
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span>{t.security}</span>
        </h2>
      </div>

      <div className="space-y-8">
        {/* Password Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">{t.changePassword}</h3>
            {!isChangingPassword && (
              <Button
                variant="outline"
                onClick={() => setIsChangingPassword(true)}
                iconName="Key"
                iconPosition="left"
                size="sm"
              >
                {t.changePassword}
              </Button>
            )}
          </div>

          {isChangingPassword && (
            <div className="space-y-4 p-4 bg-surface-50 rounded-lg border border-border">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t.currentPassword} *
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                    placeholder={t.currentPassword}
                    className={errors.currentPassword ? 'border-error pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon 
                      name={showPasswords.current ? 'EyeOff' : 'Eye'} 
                      size={16} 
                      className="text-text-secondary hover:text-text-primary" 
                    />
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-error text-xs mt-1">{errors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t.newPassword} *
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                    placeholder={t.newPassword}
                    className={errors.newPassword ? 'border-error pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon 
                      name={showPasswords.new ? 'EyeOff' : 'Eye'} 
                      size={16} 
                      className="text-text-secondary hover:text-text-primary" 
                    />
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-error text-xs mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t.confirmPassword} *
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                    placeholder={t.confirmPassword}
                    className={errors.confirmPassword ? 'border-error pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon 
                      name={showPasswords.confirm ? 'EyeOff' : 'Eye'} 
                      size={16} 
                      className="text-text-secondary hover:text-text-primary" 
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handlePasswordSave}
                  iconName="Save"
                  iconPosition="left"
                >
                  {t.save}
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePasswordCancel}
                  iconName="X"
                  iconPosition="left"
                >
                  {t.cancel}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between py-4 border-t border-border">
          <div>
            <h3 className="text-lg font-medium text-text-primary">{t.twoFactorAuth}</h3>
            <p className="text-sm text-text-secondary mt-1">
              {userProfile.twoFactorEnabled ? t.twoFactorEnabled : t.twoFactorDisabled}
            </p>
          </div>
          <Button
            variant={userProfile.twoFactorEnabled ? 'outline' : 'primary'}
            onClick={toggle2FA}
            iconName={userProfile.twoFactorEnabled ? 'ShieldOff' : 'Shield'}
            iconPosition="left"
          >
            {userProfile.twoFactorEnabled ? t.disable2FA : t.enable2FA}
          </Button>
        </div>

        {/* Login History */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">{t.loginHistory}</h3>
          </div>
          
          <div className="space-y-3">
            {mockLoginHistory.slice(0, 3).map((login) => (
              <div key={login.id} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{login.device}</p>
                    <p className="text-xs text-text-secondary">
                      {login.location} • {login.ip}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">
                    {login.date.toLocaleDateString(
                      currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR',
                      { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">{t.privacySettings}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-text-primary">{t.shareData}</p>
                <p className="text-xs text-text-secondary">Allow sharing data with trusted partners</p>
              </div>
              <button
                onClick={() => handlePrivacyToggle('shareData')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  userProfile.privacySettings?.shareData ? 'bg-primary' : 'bg-surface-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userProfile.privacySettings?.shareData ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-text-primary">{t.analytics}</p>
                <p className="text-xs text-text-secondary">Help us improve our services</p>
              </div>
              <button
                onClick={() => handlePrivacyToggle('analytics')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  userProfile.privacySettings?.analytics ? 'bg-primary' : 'bg-surface-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userProfile.privacySettings?.analytics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-text-primary">{t.marketing}</p>
                <p className="text-xs text-text-secondary">Receive promotional communications</p>
              </div>
              <button
                onClick={() => handlePrivacyToggle('marketing')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  userProfile.privacySettings?.marketing ? 'bg-primary' : 'bg-surface-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userProfile.privacySettings?.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;