import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userProfile, setUserProfile] = useState({ name: 'John Doe', email: 'john@example.com' });
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const languages = {
    en: {
      search: 'Search Hotels',
      signIn: 'Sign In',
      register: 'Register',
      myBookings: 'My Bookings',
      profile: 'Profile & Settings',
      signOut: 'Sign Out',
      menu: 'Menu',
      close: 'Close'
    },
    es: {
      search: 'Buscar Hoteles',
      signIn: 'Iniciar Sesión',
      register: 'Registrarse',
      myBookings: 'Mis Reservas',
      profile: 'Perfil y Configuración',
      signOut: 'Cerrar Sesión',
      menu: 'Menú',
      close: 'Cerrar'
    },
    fr: {
      search: 'Rechercher des Hôtels',
      signIn: 'Se Connecter',
      register: 'S\'inscrire',
      myBookings: 'Mes Réservations',
      profile: 'Profil et Paramètres',
      signOut: 'Se Déconnecter',
      menu: 'Menu',
      close: 'Fermer'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const navigationItems = [
    {
      label: t.search,
      path: '/hotel-search-results',
      icon: 'Search',
      authRequired: false,
      tooltip: 'Find and book hotels'
    }
  ];

  const accountMenuItems = [
    {
      label: t.myBookings,
      path: '/booking-management-dashboard',
      icon: 'Calendar',
      authRequired: true
    },
    {
      label: t.profile,
      path: '/user-profile-settings',
      icon: 'User',
      authRequired: true
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    if (authStatus) {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsAccountDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = (action) => {
    if (action === 'signOut') {
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userProfile');
      navigate('/');
    } else {
      navigate('/user-authentication');
    }
    setIsAccountDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavigation('/hotel-search-results')}
                className="flex items-center space-x-2 group transition-micro hover:opacity-80"
                aria-label="HotelBooker Home"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} color="white" />
                </div>
                <span className="text-xl font-heading font-semibold text-text-primary">
                  HotelBooker
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                  }`}
                  title={item.tooltip}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleAccountDropdown}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-surface-50 transition-micro"
                    aria-expanded={isAccountDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {getInitials(userProfile.name)}
                    </div>
                    <Icon 
                      name={isAccountDropdownOpen ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-text-secondary" 
                    />
                  </button>

                  {isAccountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-surface rounded-lg shadow-elevation border border-border z-dropdown animate-fade-in">
                      <div className="p-4 border-b border-border">
                        <p className="text-sm font-medium text-text-primary">{userProfile.name}</p>
                        <p className="text-xs text-text-secondary">{userProfile.email}</p>
                      </div>
                      <div className="py-2">
                        {accountMenuItems.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-surface-50 transition-micro ${
                              isActiveRoute(item.path) ? 'text-primary bg-primary-50' : 'text-text-secondary'
                            }`}
                          >
                            <Icon name={item.icon} size={16} />
                            <span>{item.label}</span>
                          </button>
                        ))}
                        <hr className="my-2 border-border" />
                        <button
                          onClick={() => handleAuthAction('signOut')}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 transition-micro"
                        >
                          <Icon name="LogOut" size={16} />
                          <span>{t.signOut}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthAction('signIn')}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    {t.signIn}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleAuthAction('register')}
                  >
                    {t.register}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-50 transition-micro"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? t.close : t.menu}
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-overlay md:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-surface shadow-elevation z-overlay transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} color="white" />
              </div>
              <span className="text-lg font-heading font-semibold text-text-primary">
                HotelBooker
              </span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-50 transition-micro"
              aria-label={t.close}
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile Section (if authenticated) */}
            {isAuthenticated && (
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {getInitials(userProfile.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{userProfile.name}</p>
                    <p className="text-xs text-text-secondary">{userProfile.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <div className="py-4">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface-50 transition-micro ${
                    isActiveRoute(item.path) ? 'text-primary bg-primary-50 border-r-2 border-primary' : 'text-text-secondary'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              {/* Account Menu Items (if authenticated) */}
              {isAuthenticated && (
                <>
                  <hr className="my-4 border-border" />
                  {accountMenuItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface-50 transition-micro ${
                        isActiveRoute(item.path) ? 'text-primary bg-primary-50 border-r-2 border-primary' : 'text-text-secondary'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-border">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={() => handleAuthAction('signOut')}
                className="w-full justify-start text-error hover:bg-error-50"
                iconName="LogOut"
                iconPosition="left"
              >
                {t.signOut}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => handleAuthAction('signIn')}
                  className="w-full"
                >
                  {t.signIn}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleAuthAction('register')}
                  className="w-full"
                >
                  {t.register}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;