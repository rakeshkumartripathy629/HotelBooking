import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SignUpForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const languages = {
    en: {
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      phone: 'Phone Number (Optional)',
      acceptTerms: 'I accept the Terms of Service and Privacy Policy',
      signUp: 'Create Account',
      nameRequired: 'Full name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordWeak: 'Password must be at least 8 characters with uppercase, lowercase, and number',
      termsRequired: 'You must accept the terms and conditions',
      emailExists: 'Email already exists. Please use a different email address.',
      creatingAccount: 'Creating account...',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email address',
      passwordPlaceholder: 'Create a strong password',
      phonePlaceholder: '+1 (555) 123-4567',
      passwordStrength: {
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong'
      },
      passwordRequirements: {
        length: 'At least 8 characters',
        uppercase: 'One uppercase letter',
        lowercase: 'One lowercase letter',
        number: 'One number',
        special: 'One special character'
      }
    },
    es: {
      fullName: 'Nombre Completo',
      email: 'Dirección de Correo',
      password: 'Contraseña',
      phone: 'Número de Teléfono (Opcional)',
      acceptTerms: 'Acepto los Términos de Servicio y Política de Privacidad',
      signUp: 'Crear Cuenta',
      nameRequired: 'El nombre completo es requerido',
      emailRequired: 'El correo es requerido',
      emailInvalid: 'Por favor ingresa un correo válido',
      passwordRequired: 'La contraseña es requerida',
      passwordWeak: 'La contraseña debe tener al menos 8 caracteres con mayúscula, minúscula y número',
      termsRequired: 'Debes aceptar los términos y condiciones',
      emailExists: 'El correo ya existe. Por favor usa una dirección diferente.',
      creatingAccount: 'Creando cuenta...',
      namePlaceholder: 'Ingresa tu nombre completo',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      passwordPlaceholder: 'Crea una contraseña fuerte',
      phonePlaceholder: '+1 (555) 123-4567',
      passwordStrength: {
        weak: 'Débil',
        fair: 'Regular',
        good: 'Buena',
        strong: 'Fuerte'
      },
      passwordRequirements: {
        length: 'Al menos 8 caracteres',
        uppercase: 'Una letra mayúscula',
        lowercase: 'Una letra minúscula',
        number: 'Un número',
        special: 'Un carácter especial'
      }
    },
    fr: {
      fullName: 'Nom Complet',
      email: 'Adresse E-mail',
      password: 'Mot de Passe',
      phone: 'Numéro de Téléphone (Optionnel)',
      acceptTerms: 'J\'accepte les Conditions de Service et la Politique de Confidentialité',
      signUp: 'Créer un Compte',
      nameRequired: 'Le nom complet est requis',
      emailRequired: 'L\'e-mail est requis',
      emailInvalid: 'Veuillez entrer une adresse e-mail valide',
      passwordRequired: 'Le mot de passe est requis',
      passwordWeak: 'Le mot de passe doit contenir au moins 8 caractères avec majuscule, minuscule et chiffre',
      termsRequired: 'Vous devez accepter les termes et conditions',
      emailExists: 'L\'e-mail existe déjà. Veuillez utiliser une adresse différente.',
      creatingAccount: 'Création du compte...',
      namePlaceholder: 'Entrez votre nom complet',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      passwordPlaceholder: 'Créez un mot de passe fort',
      phonePlaceholder: '+1 (555) 123-4567',
      passwordStrength: {
        weak: 'Faible',
        fair: 'Correct',
        good: 'Bon',
        strong: 'Fort'
      },
      passwordRequirements: {
        length: 'Au moins 8 caractères',
        uppercase: 'Une lettre majuscule',
        lowercase: 'Une lettre minuscule',
        number: 'Un chiffre',
        special: 'Un caractère spécial'
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

  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const score = Object.values(requirements).filter(Boolean).length;
    const feedback = [];

    Object.entries(requirements).forEach(([key, met]) => {
      if (!met) {
        feedback.push(t.passwordRequirements[key]);
      }
    });

    setPasswordStrength({ score, feedback });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
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

    if (!formData.name.trim()) {
      newErrors.name = t.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.emailInvalid = t.emailInvalid;
    }

    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    } else if (passwordStrength.score < 4) {
      newErrors.password = t.passwordWeak;
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t.termsRequired;
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
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if email already exists (mock check)
      if (formData.email === 'john@example.com') {
        setErrors({
          email: t.emailExists
        });
        return;
      }

      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userProfile', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || ''
      }));

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/hotel-search-results');
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-error-500';
      case 2:
        return 'bg-warning-500';
      case 3:
        return 'bg-accent-500';
      case 4:
      case 5:
        return 'bg-success-500';
      default:
        return 'bg-surface-200';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return t.passwordStrength.weak;
      case 2:
        return t.passwordStrength.fair;
      case 3:
        return t.passwordStrength.good;
      case 4:
      case 5:
        return t.passwordStrength.strong;
      default:
        return '';
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
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
          {t.fullName}
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={t.namePlaceholder}
          className={`w-full ${errors.name ? 'border-error-500 focus:border-error-500' : ''}`}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error-600">{errors.name}</p>
        )}
      </div>

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
          className={`w-full ${errors.email || errors.emailInvalid ? 'border-error-500 focus:border-error-500' : ''}`}
          disabled={isLoading}
        />
        {(errors.email || errors.emailInvalid) && (
          <p className="mt-1 text-sm text-error-600">{errors.email || errors.emailInvalid}</p>
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
        
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1 bg-surface-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-text-secondary">
                {getPasswordStrengthText()}
              </span>
            </div>
            {passwordStrength.feedback.length > 0 && (
              <ul className="text-xs text-text-secondary space-y-1">
                {passwordStrength.feedback.map((item, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <Icon name="X" size={12} className="text-error-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {errors.password && (
          <p className="mt-1 text-sm text-error-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
          {t.phone}
        </label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder={t.phonePlaceholder}
          className="w-full"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="flex items-start space-x-3">
          <Input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className={`w-4 h-4 mt-1 ${errors.acceptTerms ? 'border-error-500' : ''}`}
            disabled={isLoading}
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            {t.acceptTerms}
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-error-600">{errors.acceptTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? t.creatingAccount : t.signUp}
      </Button>
    </form>
  );
};

export default SignUpForm;