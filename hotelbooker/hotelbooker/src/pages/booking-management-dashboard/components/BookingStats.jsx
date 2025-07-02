import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ stats, currentLanguage }) => {
  const languages = {
    en: {
      totalBookings: 'Total Bookings',
      upcomingTrips: 'Upcoming Trips',
      completedTrips: 'Completed Trips',
      loyaltyPoints: 'Loyalty Points',
      totalSpent: 'Total Spent',
      averageRating: 'Average Rating'
    },
    es: {
      totalBookings: 'Reservas Totales',
      upcomingTrips: 'Viajes Próximos',
      completedTrips: 'Viajes Completados',
      loyaltyPoints: 'Puntos de Lealtad',
      totalSpent: 'Total Gastado',
      averageRating: 'Calificación Promedio'
    },
    fr: {
      totalBookings: 'Réservations Totales',
      upcomingTrips: 'Voyages à Venir',
      completedTrips: 'Voyages Terminés',
      loyaltyPoints: 'Points de Fidélité',
      totalSpent: 'Total Dépensé',
      averageRating: 'Note Moyenne'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const statItems = [
    {
      key: 'totalBookings',
      label: t.totalBookings,
      value: stats.totalBookings,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary-50'
    },
    {
      key: 'upcomingTrips',
      label: t.upcomingTrips,
      value: stats.upcomingTrips,
      icon: 'MapPin',
      color: 'text-success',
      bgColor: 'bg-success-50'
    },
    {
      key: 'completedTrips',
      label: t.completedTrips,
      value: stats.completedTrips,
      icon: 'CheckCircle',
      color: 'text-secondary',
      bgColor: 'bg-secondary-50'
    },
    {
      key: 'loyaltyPoints',
      label: t.loyaltyPoints,
      value: stats.loyaltyPoints?.toLocaleString() || '0',
      icon: 'Award',
      color: 'text-accent',
      bgColor: 'bg-accent-50'
    },
    {
      key: 'totalSpent',
      label: t.totalSpent,
      value: `$${stats.totalSpent?.toLocaleString() || '0'}`,
      icon: 'DollarSign',
      color: 'text-warning',
      bgColor: 'bg-warning-50'
    },
    {
      key: 'averageRating',
      label: t.averageRating,
      value: `${stats.averageRating || '0'}/5`,
      icon: 'Star',
      color: 'text-accent',
      bgColor: 'bg-accent-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statItems.map((item) => (
        <div
          key={item.key}
          className="bg-surface rounded-lg border border-border p-4 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wide truncate">
                {item.label}
              </p>
              <p className="text-lg font-bold text-text-primary mt-1">
                {item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;