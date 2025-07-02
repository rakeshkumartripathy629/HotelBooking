import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreferencesSection = ({ userProfile, onProfileUpdate, currentLanguage, onLanguageChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    language: currentLanguage,
    currency: userProfile.preferences?.currency || 'USD',
    timezone: userProfile.preferences?.timezone || 'America/New_York',
    dateFormat: userProfile.preferences?.dateFormat || 'MM/DD/YYYY',
    theme: userProfile.preferences?.theme || 'light'
  });

  const languages = {
    en: {
      preferences: 'App Preferences',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      language: 'Language',
      currency: 'Currency',
      timezone: 'Timezone',
      dateFormat: 'Date Format',
      theme: 'Theme',
      languageOptions: {
        en: 'English',
        es: 'Español',
        fr: 'Français'
      },
      currencyOptions: {
        USD: 'US Dollar (USD)',
        EUR: 'Euro (EUR)',
        GBP: 'British Pound (GBP)',
        CAD: 'Canadian Dollar (CAD)',
        AUD: 'Australian Dollar (AUD)',
        JPY: 'Japanese Yen (JPY)'
      },
      dateFormatOptions: {
        'MM/DD/YYYY': 'MM/DD/YYYY (US)',
        'DD/MM/YYYY': 'DD/MM/YYYY (EU)',
        'YYYY-MM-DD': 'YYYY-MM-DD (ISO)'
      },
      themeOptions: {
        light: 'Light',
        dark: 'Dark',
        auto: 'Auto (System)'
      }
    },
    es: {
      preferences: 'Preferencias de la App',
      edit: 'Editar',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      language: 'Idioma',
      currency: 'Moneda',
      timezone: 'Zona Horaria',
      dateFormat: 'Formato de Fecha',
      theme: 'Tema',
      languageOptions: {
        en: 'English',
        es: 'Español',
        fr: 'Français'
      },
      currencyOptions: {
        USD: 'Dólar Estadounidense (USD)',
        EUR: 'Euro (EUR)',
        GBP: 'Libra Esterlina (GBP)',
        CAD: 'Dólar Canadiense (CAD)',
        AUD: 'Dólar Australiano (AUD)',
        JPY: 'Yen Japonés (JPY)'
      },
      dateFormatOptions: {
        'MM/DD/YYYY': 'MM/DD/YYYY (US)',
        'DD/MM/YYYY': 'DD/MM/YYYY (EU)',
        'YYYY-MM-DD': 'YYYY-MM-DD (ISO)'
      },
      themeOptions: {
        light: 'Claro',
        dark: 'Oscuro',
        auto: 'Automático (Sistema)'
      }
    },
    fr: {
      preferences: 'Préférences de l\'App',
      edit: 'Modifier',
      save: 'Enregistrer les Modifications',
      cancel: 'Annuler',
      language: 'Langue',
      currency: 'Devise',
      timezone: 'Fuseau Horaire',
      dateFormat: 'Format de Date',
      theme: 'Thème',
      languageOptions: {
        en: 'English',
        es: 'Español',
        fr: 'Français'
      },
      currencyOptions: {
        USD: 'Dollar Américain (USD)',
        EUR: 'Euro (EUR)',
        GBP: 'Livre Sterling (GBP)',
        CAD: 'Dollar Canadien (CAD)',
        AUD: 'Dollar Australien (AUD)',
        JPY: 'Yen Japonais (JPY)'
      },
      dateFormatOptions: {
        'MM/DD/YYYY': 'MM/DD/YYYY (US)',
        'DD/MM/YYYY': 'DD/MM/YYYY (EU)',
        'YYYY-MM-DD': 'YYYY-MM-DD (ISO)'
      },
      themeOptions: {
        light: 'Clair',
        dark: 'Sombre',
        auto: 'Automatique (Système)'
      }
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const handleSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onProfileUpdate({
      ...userProfile,
      preferences: preferences
    });
    
    // Update language if changed
    if (preferences.language !== currentLanguage) {
      onLanguageChange(preferences.language);
    }
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreferences({
      language: currentLanguage,
      currency: userProfile.preferences?.currency || 'USD',
      timezone: userProfile.preferences?.timezone || 'America/New_York',
      dateFormat: userProfile.preferences?.dateFormat || 'MM/DD/YYYY',
      theme: userProfile.preferences?.theme || 'light'
    });
    setIsEditing(false);
  };

  const formatPreviewDate = () => {
    const now = new Date();
    switch (preferences.dateFormat) {
      case 'DD/MM/YYYY':
        return now.toLocaleDateString('en-GB');
      case 'YYYY-MM-DD':
        return now.toISOString().split('T')[0];
      default:
        return now.toLocaleDateString('en-US');
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Settings2" size={20} className="text-primary" />
          <span>{t.preferences}</span>
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
        {/* Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.language}
            </label>
            {isEditing ? (
              <select
                value={preferences.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(t.languageOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {t.languageOptions[userProfile.preferences?.language || currentLanguage]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.currency}
            </label>
            {isEditing ? (
              <select
                value={preferences.currency}
                onChange={(e) => handleSelectChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(t.currencyOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {t.currencyOptions[userProfile.preferences?.currency || 'USD']}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.timezone}
            </label>
            {isEditing ? (
              <select
                value={preferences.timezone}
                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {timezones.find(tz => tz.value === (userProfile.preferences?.timezone || 'America/New_York'))?.label}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.dateFormat}
            </label>
            {isEditing ? (
              <div>
                <select
                  value={preferences.dateFormat}
                  onChange={(e) => handleSelectChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {Object.entries(t.dateFormatOptions).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <p className="text-xs text-text-secondary mt-1">
                  Preview: {formatPreviewDate()}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-text-secondary py-2">
                  {t.dateFormatOptions[userProfile.preferences?.dateFormat || 'MM/DD/YYYY']}
                </p>
                <p className="text-xs text-text-secondary">
                  Preview: {formatPreviewDate()}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.theme}
            </label>
            {isEditing ? (
              <select
                value={preferences.theme}
                onChange={(e) => handleSelectChange('theme', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(t.themeOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {t.themeOptions[userProfile.preferences?.theme || 'light']}
              </p>
            )}
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

export default PreferencesSection;