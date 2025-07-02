import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import TravelPreferencesSection from './components/TravelPreferencesSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import NotificationSettingsSection from './components/NotificationSettingsSection';
import SecuritySection from './components/SecuritySection';
import PreferencesSection from './components/PreferencesSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('personal');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    avatar: null,
    memberSince: '2022-01-15',
    loyaltyPoints: 7500,
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    travelPreferences: {
      roomType: 'deluxe',
      bedType: 'king',
      smokingPreference: 'non-smoking',
      floorPreference: 'high',
      amenities: ['wifi', 'gym', 'pool', 'parking'],
      specialRequests: 'Please provide a room with a city view if available. I prefer rooms away from elevators for a quieter stay.',
      dietaryRestrictions: ['vegetarian'],
      accessibilityNeeds: []
    },
    paymentMethods: [
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
    ],
    notificationSettings: {
      email: {
        bookingConfirmation: true,
        bookingReminders: true,
        specialOffers: false,
        newsletter: true,
        accountUpdates: true
      },
      sms: {
        bookingConfirmation: false,
        bookingReminders: true,
        emergencyAlerts: true
      },
      push: {
        bookingUpdates: true,
        specialOffers: false,
        appUpdates: true
      }
    },
    twoFactorEnabled: false,
    privacySettings: {
      shareData: false,
      analytics: true,
      marketing: false
    },
    preferences: {
      language: 'en',
      currency: 'USD',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light'
    }
  });

  const languages = {
    en: {
      title: 'Profile & Settings',
      sections: {
        personal: 'Personal Info',
        travel: 'Travel Preferences',
        payment: 'Payment Methods',
        notifications: 'Notifications',
        security: 'Security',
        preferences: 'App Preferences'
      },
      backToBookings: 'Back to Bookings',
      saveAll: 'Save All Changes',
      unsavedChanges: 'You have unsaved changes'
    },
    es: {
      title: 'Perfil y Configuración',
      sections: {
        personal: 'Información Personal',
        travel: 'Preferencias de Viaje',
        payment: 'Métodos de Pago',
        notifications: 'Notificaciones',
        security: 'Seguridad',
        preferences: 'Preferencias de la App'
      },
      backToBookings: 'Volver a Reservas',
      saveAll: 'Guardar Todos los Cambios',
      unsavedChanges: 'Tienes cambios sin guardar'
    },
    fr: {
      title: 'Profil et Paramètres',
      sections: {
        personal: 'Informations Personnelles',
        travel: 'Préférences de Voyage',
        payment: 'Méthodes de Paiement',
        notifications: 'Notifications',
        security: 'Sécurité',
        preferences: 'Préférences de l\'App'
      },
      backToBookings: 'Retour aux Réservations',
      saveAll: 'Enregistrer Tous les Changements',
      unsavedChanges: 'Vous avez des modifications non enregistrées'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const sections = [
    { id: 'personal', label: t.sections.personal, icon: 'User' },
    { id: 'travel', label: t.sections.travel, icon: 'Settings' },
    { id: 'payment', label: t.sections.payment, icon: 'CreditCard' },
    { id: 'notifications', label: t.sections.notifications, icon: 'Bell' },
    { id: 'security', label: t.sections.security, icon: 'Shield' },
    { id: 'preferences', label: t.sections.preferences, icon: 'Settings2' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/user-authentication');
      return;
    }

    // Load saved profile data
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(prev => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, [navigate]);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoSection
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'travel':
        return (
          <TravelPreferencesSection
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'payment':
        return (
          <PaymentMethodsSection
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'notifications':
        return (
          <NotificationSettingsSection
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'security':
        return (
          <SecuritySection
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'preferences':
        return (
          <PreferencesSection
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">{t.title}</h1>
              <p className="text-text-secondary mt-2">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => navigate('/booking-management-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                {t.backToBookings}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Profile Header - Full Width */}
            <div className="lg:col-span-12">
              <ProfileHeader
                userProfile={userProfile}
                onProfileUpdate={handleProfileUpdate}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <div className="bg-surface rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                      }`}
                    >
                      <Icon name={section.icon} size={18} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="space-y-6">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;