import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SignInForm = ({ onSuccess, onForgotPassword, onGuestCheckout }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const languages = {
    en: {
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      signIn: 'Sign In',
      forgotPassword: 'Forgot your password?',
      guestCheckout: 'Continue as Guest',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      invalidCredentials: 'Invalid email or password. Use: john@example.com / password123',
      signingIn: 'Signing in...',
      emailPlaceholder: 'Enter your email address',
      passwordPlaceholder: 'Enter your password'
    },
    es: {
      email: 'Dirección de Correo',
      password: 'Contraseña',
      rememberMe: 'Recordarme',
      signIn: 'Iniciar Sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      guestCheckout: 'Continuar como Invitado',
      emailRequired: 'El correo es requerido',
      passwordRequired: 'La contraseña es requerida',
      invalidCredentials: 'Correo o contraseña inválidos. Usa: john@example.com / password123',
      signingIn: 'Iniciando sesión...',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      passwordPlaceholder: 'Ingresa tu contraseña'
    },
    fr: {
      email: 'Adresse E-mail',
      password: 'Mot de Passe',
      rememberMe: 'Se souvenir de moi',
      signIn: 'Se Connecter',
      forgotPassword: 'Mot de passe oublié?',
      guestCheckout: 'Continuer en tant qu\'Invité',
      emailRequired: 'L\'e-mail est requis',
      passwordRequired: 'Le mot de passe est requis',
      invalidCredentials: 'E-mail ou mot de passe invalide. Utilisez: john@example.com / password123',
      signingIn: 'Connexion...',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      passwordPlaceholder: 'Entrez votre mot de passe'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  // Mock credentials
  const mockCredentials = {
    email: 'john@example.com',
    password: 'password123'
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    }

    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userProfile', JSON.stringify({
          name: 'John Doe',
          email: formData.email,
          phone: '+1 (555) 123-4567'
        }));

        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/hotel-search-results');
        }
      } else {
        setErrors({
          general: t.invalidCredentials
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  const handleGuestCheckout = () => {
    if (onGuestCheckout) {
      onGuestCheckout();
    } else {
      navigate('/hotel-search-results');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          {t.email}
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t.emailPlaceholder}
          className={`w-full ${errors.email ? 'border-error-500 focus:border-error-500' : ''}`}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          {t.password}
        </label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t.passwordPlaceholder}
            className={`w-full pr-10 ${errors.password ? 'border-error-500 focus:border-error-500' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary transition-micro"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error-600">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 mr-2"
            disabled={isLoading}
          />
          <span className="text-sm text-text-secondary">{t.rememberMe}</span>
        </label>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-micro"
          disabled={isLoading}
        >
          {t.forgotPassword}
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? t.signingIn : t.signIn}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleGuestCheckout}
          className="text-sm text-text-secondary hover:text-text-primary transition-micro underline"
          disabled={isLoading}
        >
          {t.guestCheckout}
        </button>
      </div>
    </form>
  );
};

export default SignInForm;