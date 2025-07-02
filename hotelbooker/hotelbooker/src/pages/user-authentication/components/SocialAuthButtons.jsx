import React, { useState, useEffect } from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuthButtons = ({ onSocialAuth }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      continueWithGoogle: 'Continue with Google',
      continueWithFacebook: 'Continue with Facebook',
      continueWithApple: 'Continue with Apple',
      or: 'or'
    },
    es: {
      continueWithGoogle: 'Continuar con Google',
      continueWithFacebook: 'Continuar con Facebook',
      continueWithApple: 'Continuar con Apple',
      or: 'o'
    },
    fr: {
      continueWithGoogle: 'Continuer avec Google',
      continueWithFacebook: 'Continuer avec Facebook',
      continueWithApple: 'Continuer avec Apple',
      or: 'ou'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const socialProviders = [
    {
      name: 'google',
      label: t.continueWithGoogle,
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      name: 'facebook',
      label: t.continueWithFacebook,
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      name: 'apple',
      label: t.continueWithApple,
      icon: 'Apple',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  const handleSocialAuth = (provider) => {
    if (onSocialAuth) {
      onSocialAuth(provider);
    }
  };

  return (
    <div className="space-y-3 mb-6">
      {socialProviders.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleSocialAuth(provider.name)}
          className={`w-full flex items-center justify-center space-x-3 py-3 px-4 border rounded-lg font-medium transition-micro ${provider.bgColor} ${provider.textColor} ${provider.borderColor}`}
        >
          <Icon name={provider.icon} size={20} />
          <span>{provider.label}</span>
        </button>
      ))}
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">{t.or}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthButtons;