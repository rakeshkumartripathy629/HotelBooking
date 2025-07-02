import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSettingsSection = ({ userProfile, onProfileUpdate, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    email: {
      bookingConfirmation: userProfile.notificationSettings?.email?.bookingConfirmation ?? true,
      bookingReminders: userProfile.notificationSettings?.email?.bookingReminders ?? true,
      specialOffers: userProfile.notificationSettings?.email?.specialOffers ?? false,
      newsletter: userProfile.notificationSettings?.email?.newsletter ?? false,
      accountUpdates: userProfile.notificationSettings?.email?.accountUpdates ?? true
    },
    sms: {
      bookingConfirmation: userProfile.notificationSettings?.sms?.bookingConfirmation ?? false,
      bookingReminders: userProfile.notificationSettings?.sms?.bookingReminders ?? true,
      emergencyAlerts: userProfile.notificationSettings?.sms?.emergencyAlerts ?? true
    },
    push: {
      bookingUpdates: userProfile.notificationSettings?.push?.bookingUpdates ?? true,
      specialOffers: userProfile.notificationSettings?.push?.specialOffers ?? false,
      appUpdates: userProfile.notificationSettings?.push?.appUpdates ?? false
    }
  });

  const languages = {
    en: {
      notificationSettings: 'Notification Settings',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      pushNotifications: 'Push Notifications',
      notifications: {
        bookingConfirmation: 'Booking confirmations',
        bookingReminders: 'Booking reminders',
        specialOffers: 'Special offers and deals',
        newsletter: 'Newsletter and travel tips',
        accountUpdates: 'Account security updates',
        emergencyAlerts: 'Emergency alerts',
        bookingUpdates: 'Booking status updates',
        appUpdates: 'App updates and features'
      },
      descriptions: {
        bookingConfirmation: 'Receive confirmation when you make a booking',
        bookingReminders: 'Get reminders about upcoming trips',
        specialOffers: 'Be notified about exclusive deals and promotions',
        newsletter: 'Stay updated with travel tips and destination guides',
        accountUpdates: 'Important security and account notifications',
        emergencyAlerts: 'Critical alerts about your bookings',
        bookingUpdates: 'Real-time updates about your reservations',
        appUpdates: 'New features and app improvements'
      }
    },
    es: {
      notificationSettings: 'Configuración de Notificaciones',
      edit: 'Editar',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      emailNotifications: 'Notificaciones por Correo',
      smsNotifications: 'Notificaciones SMS',
      pushNotifications: 'Notificaciones Push',
      notifications: {
        bookingConfirmation: 'Confirmaciones de reserva',
        bookingReminders: 'Recordatorios de reserva',
        specialOffers: 'Ofertas especiales y promociones',
        newsletter: 'Boletín y consejos de viaje',
        accountUpdates: 'Actualizaciones de seguridad de cuenta',
        emergencyAlerts: 'Alertas de emergencia',
        bookingUpdates: 'Actualizaciones de estado de reserva',
        appUpdates: 'Actualizaciones y funciones de la app'
      },
      descriptions: {
        bookingConfirmation: 'Recibir confirmación cuando hagas una reserva',
        bookingReminders: 'Obtener recordatorios sobre próximos viajes',
        specialOffers: 'Ser notificado sobre ofertas exclusivas y promociones',
        newsletter: 'Mantenerse actualizado con consejos de viaje y guías de destinos',
        accountUpdates: 'Notificaciones importantes de seguridad y cuenta',
        emergencyAlerts: 'Alertas críticas sobre tus reservas',
        bookingUpdates: 'Actualizaciones en tiempo real sobre tus reservaciones',
        appUpdates: 'Nuevas funciones y mejoras de la aplicación'
      }
    },
    fr: {
      notificationSettings: 'Paramètres de Notification',
      edit: 'Modifier',
      save: 'Enregistrer les Modifications',
      cancel: 'Annuler',
      emailNotifications: 'Notifications par E-mail',
      smsNotifications: 'Notifications SMS',
      pushNotifications: 'Notifications Push',
      notifications: {
        bookingConfirmation: 'Confirmations de réservation',
        bookingReminders: 'Rappels de réservation',
        specialOffers: 'Offres spéciales et promotions',
        newsletter: 'Newsletter et conseils de voyage',
        accountUpdates: 'Mises à jour de sécurité du compte',
        emergencyAlerts: 'Alertes d\'urgence',
        bookingUpdates: 'Mises à jour du statut de réservation',
        appUpdates: 'Mises à jour et fonctionnalités de l\'app'
      },
      descriptions: {
        bookingConfirmation: 'Recevoir une confirmation lors d\'une réservation',
        bookingReminders: 'Obtenir des rappels sur les voyages à venir',
        specialOffers: 'Être notifié des offres exclusives et promotions',
        newsletter: 'Rester informé avec des conseils de voyage et guides de destinations',
        accountUpdates: 'Notifications importantes de sécurité et de compte',
        emergencyAlerts: 'Alertes critiques concernant vos réservations',
        bookingUpdates: 'Mises à jour en temps réel sur vos réservations',
        appUpdates: 'Nouvelles fonctionnalités et améliorations de l\'application'
      }
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSave = () => {
    onProfileUpdate({
      ...userProfile,
      notificationSettings: settings
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSettings({
      email: {
        bookingConfirmation: userProfile.notificationSettings?.email?.bookingConfirmation ?? true,
        bookingReminders: userProfile.notificationSettings?.email?.bookingReminders ?? true,
        specialOffers: userProfile.notificationSettings?.email?.specialOffers ?? false,
        newsletter: userProfile.notificationSettings?.email?.newsletter ?? false,
        accountUpdates: userProfile.notificationSettings?.email?.accountUpdates ?? true
      },
      sms: {
        bookingConfirmation: userProfile.notificationSettings?.sms?.bookingConfirmation ?? false,
        bookingReminders: userProfile.notificationSettings?.sms?.bookingReminders ?? true,
        emergencyAlerts: userProfile.notificationSettings?.sms?.emergencyAlerts ?? true
      },
      push: {
        bookingUpdates: userProfile.notificationSettings?.push?.bookingUpdates ?? true,
        specialOffers: userProfile.notificationSettings?.push?.specialOffers ?? false,
        appUpdates: userProfile.notificationSettings?.push?.appUpdates ?? false
      }
    });
    setIsEditing(false);
  };

  const NotificationGroup = ({ title, icon, category, notifications }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
        <Icon name={icon} size={18} className="text-primary" />
        <span>{title}</span>
      </h3>
      <div className="space-y-3 pl-6">
        {Object.entries(notifications).map(([key, enabled]) => (
          <div key={key} className="flex items-start justify-between py-2">
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm font-medium text-text-primary">
                {t.notifications[key]}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {t.descriptions[key]}
              </p>
            </div>
            <div className="flex-shrink-0">
              {isEditing ? (
                <button
                  onClick={() => handleToggle(category, key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    enabled ? 'bg-primary' : 'bg-surface-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              ) : (
                <div className={`flex items-center space-x-2 ${enabled ? 'text-success' : 'text-text-secondary'}`}>
                  <Icon name={enabled ? 'Check' : 'X'} size={16} />
                  <span className="text-sm">{enabled ? 'On' : 'Off'}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <span>{t.notificationSettings}</span>
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

      <div className="space-y-8">
        <NotificationGroup
          title={t.emailNotifications}
          icon="Mail"
          category="email"
          notifications={settings.email}
        />

        <NotificationGroup
          title={t.smsNotifications}
          icon="MessageSquare"
          category="sms"
          notifications={settings.sms}
        />

        <NotificationGroup
          title={t.pushNotifications}
          icon="Smartphone"
          category="push"
          notifications={settings.push}
        />

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

export default NotificationSettingsSection;