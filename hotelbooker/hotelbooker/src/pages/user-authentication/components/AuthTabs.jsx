import React, { useState, useEffect } from 'react';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      signIn: 'Sign In',
      signUp: 'Sign Up'
    },
    es: {
      signIn: 'Iniciar Sesión',
      signUp: 'Registrarse'
    },
    fr: {
      signIn: 'Se Connecter',
      signUp: 'S\'inscrire'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="flex bg-surface-50 rounded-lg p-1 mb-8">
      <button
        onClick={() => onTabChange('signin')}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-micro ${
          activeTab === 'signin' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        {t.signIn}
      </button>
      <button
        onClick={() => onTabChange('signup')}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-micro ${
          activeTab === 'signup' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        {t.signUp}
      </button>
    </div>
  );
};

export default AuthTabs;