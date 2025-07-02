import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import SocialAuthButtons from './components/SocialAuthButtons';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('signin');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      welcomeBack: 'Welcome back',
      signInSubtitle: 'Sign in to your account to access your bookings and preferences',
      createAccount: 'Create your account',
      signUpSubtitle: 'Join thousands of travelers and start booking amazing hotels',
      alreadyHaveAccount: 'Already have an account?',
      signInHere: 'Sign in here',
      dontHaveAccount: 'Don\'t have an account?',
      signUpHere: 'Sign up here'
    },
    es: {
      welcomeBack: 'Bienvenido de vuelta',
      signInSubtitle: 'Inicia sesión en tu cuenta para acceder a tus reservas y preferencias',
      createAccount: 'Crea tu cuenta',
      signUpSubtitle: 'Únete a miles de viajeros y comienza a reservar hoteles increíbles',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signInHere: 'Inicia sesión aquí',
      dontHaveAccount: '¿No tienes una cuenta?',
      signUpHere: 'Regístrate aquí'
    },
    fr: {
      welcomeBack: 'Bon retour',
      signInSubtitle: 'Connectez-vous à votre compte pour accéder à vos réservations et préférences',
      createAccount: 'Créez votre compte',
      signUpSubtitle: 'Rejoignez des milliers de voyageurs et commencez à réserver des hôtels incroyables',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      signInHere: 'Connectez-vous ici',
      dontHaveAccount: 'Vous n\'avez pas de compte?',
      signUpHere: 'Inscrivez-vous ici'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/hotel-search-results');
    }

    // Set initial tab based on URL params or state
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get('mode');
    if (mode === 'signup') {
      setActiveTab('signup');
    }
  }, [navigate, location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without causing navigation
    const url = new URL(window.location);
    url.searchParams.set('mode', tab);
    window.history.replaceState({}, '', url);
  };

  const handleAuthSuccess = () => {
    // Get the intended destination from location state or default to search results
    const from = location.state?.from?.pathname || '/hotel-search-results';
    navigate(from, { replace: true });
  };

  const handleSocialAuth = (provider) => {
    // Mock social authentication
    console.log(`Authenticating with ${provider}`);
    
    // Simulate successful social auth
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userProfile', JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        provider: provider
      }));
      handleAuthSuccess();
    }, 1000);
  };

  const handleForgotPassword = () => {
    // In a real app, this would open a forgot password modal or navigate to a reset page
    alert('Forgot password functionality would be implemented here');
  };

  const handleGuestCheckout = () => {
    navigate('/hotel-search-results');
  };

  const handleSwitchToSignUp = () => {
    setActiveTab('signup');
  };

  const handleSwitchToSignIn = () => {
    setActiveTab('signin');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-text-primary">
              {activeTab === 'signin' ? t.welcomeBack : t.createAccount}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {activeTab === 'signin' ? t.signInSubtitle : t.signUpSubtitle}
            </p>
          </div>

          {/* Auth Form Container */}
          <div className="bg-surface rounded-xl shadow-elevation p-8">
            <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
            
            <SocialAuthButtons onSocialAuth={handleSocialAuth} />

            {activeTab === 'signin' ? (
              <SignInForm
                onSuccess={handleAuthSuccess}
                onForgotPassword={handleForgotPassword}
                onGuestCheckout={handleGuestCheckout}
              />
            ) : (
              <SignUpForm onSuccess={handleAuthSuccess} />
            )}

            {/* Switch Auth Mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                {activeTab === 'signin' ? t.dontHaveAccount : t.alreadyHaveAccount}{' '}
                <button
                  onClick={activeTab === 'signin' ? handleSwitchToSignUp : handleSwitchToSignIn}
                  className="font-medium text-primary hover:text-primary-700 transition-micro"
                >
                  {activeTab === 'signin' ? t.signUpHere : t.signInHere}
                </button>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs text-text-secondary">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAuthentication;