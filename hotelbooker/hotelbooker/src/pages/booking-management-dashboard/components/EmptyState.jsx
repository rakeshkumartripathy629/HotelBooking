import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onAction, currentLanguage }) => {
  const languages = {
    en: {
      noBookings: {
        title: 'No Bookings Found',
        description: 'You haven\'t made any hotel bookings yet. Start exploring amazing destinations and book your perfect stay.',
        actionText: 'Search Hotels'
      },
      noResults: {
        title: 'No Results Found',
        description: 'We couldn\'t find any bookings matching your search criteria. Try adjusting your filters or search terms.',
        actionText: 'Clear Filters'
      },
      error: {
        title: 'Something Went Wrong',
        description: 'We\'re having trouble loading your bookings. Please try again or contact support if the problem persists.',
        actionText: 'Try Again'
      }
    },
    es: {
      noBookings: {
        title: 'No se Encontraron Reservas',
        description: 'Aún no has hecho ninguna reserva de hotel. Comienza a explorar destinos increíbles y reserva tu estadía perfecta.',
        actionText: 'Buscar Hoteles'
      },
      noResults: {
        title: 'No se Encontraron Resultados',
        description: 'No pudimos encontrar reservas que coincidan con tus criterios de búsqueda. Intenta ajustar tus filtros o términos de búsqueda.',
        actionText: 'Limpiar Filtros'
      },
      error: {
        title: 'Algo Salió Mal',
        description: 'Tenemos problemas para cargar tus reservas. Inténtalo de nuevo o contacta soporte si el problema persiste.',
        actionText: 'Intentar de Nuevo'
      }
    },
    fr: {
      noBookings: {
        title: 'Aucune Réservation Trouvée',
        description: 'Vous n\'avez pas encore fait de réservations d\'hôtel. Commencez à explorer des destinations incroyables et réservez votre séjour parfait.',
        actionText: 'Rechercher des Hôtels'
      },
      noResults: {
        title: 'Aucun Résultat Trouvé',
        description: 'Nous n\'avons trouvé aucune réservation correspondant à vos critères de recherche. Essayez d\'ajuster vos filtres ou termes de recherche.',
        actionText: 'Effacer les Filtres'
      },
      error: {
        title: 'Quelque Chose s\'est Mal Passé',
        description: 'Nous avons des difficultés à charger vos réservations. Veuillez réessayer ou contacter le support si le problème persiste.',
        actionText: 'Réessayer'
      }
    }
  };

  const t = languages[currentLanguage] || languages.en;
  const content = t[type] || t.noBookings;

  const getIcon = () => {
    switch (type) {
      case 'noBookings':
        return 'Calendar';
      case 'noResults':
        return 'Search';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Calendar';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-surface-100 rounded-full flex items-center justify-center">
          <Icon name={getIcon()} size={32} className={getIconColor()} />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          {content.title}
        </h3>
        
        <p className="text-text-secondary mb-8 leading-relaxed">
          {content.description}
        </p>
        
        <Button
          variant="primary"
          onClick={onAction}
          iconName={type === 'noBookings' ? 'Search' : type === 'error' ? 'RefreshCw' : 'Filter'}
          iconPosition="left"
        >
          {content.actionText}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;