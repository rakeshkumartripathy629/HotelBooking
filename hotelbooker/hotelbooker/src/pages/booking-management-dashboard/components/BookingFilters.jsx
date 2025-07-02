import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingFilters = ({ onFilterChange, onSearchChange, currentLanguage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const languages = {
    en: {
      searchPlaceholder: 'Search by hotel name or booking reference...',
      filters: 'Filters',
      status: 'Status',
      dateRange: 'Date Range',
      sortBy: 'Sort By',
      all: 'All',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      completed: 'Completed',
      refunded: 'Refunded',
      upcoming: 'Upcoming',
      past: 'Past',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      thisYear: 'This Year',
      newest: 'Newest First',
      oldest: 'Oldest First',
      priceHigh: 'Price: High to Low',
      priceLow: 'Price: Low to High',
      alphabetical: 'Hotel Name A-Z',
      clearFilters: 'Clear Filters',
      applyFilters: 'Apply Filters'
    },
    es: {
      searchPlaceholder: 'Buscar por nombre del hotel o referencia de reserva...',
      filters: 'Filtros',
      status: 'Estado',
      dateRange: 'Rango de Fechas',
      sortBy: 'Ordenar Por',
      all: 'Todos',
      confirmed: 'Confirmado',
      pending: 'Pendiente',
      cancelled: 'Cancelado',
      completed: 'Completado',
      refunded: 'Reembolsado',
      upcoming: 'Próximos',
      past: 'Pasados',
      thisMonth: 'Este Mes',
      lastMonth: 'Mes Pasado',
      thisYear: 'Este Año',
      newest: 'Más Recientes',
      oldest: 'Más Antiguos',
      priceHigh: 'Precio: Alto a Bajo',
      priceLow: 'Precio: Bajo a Alto',
      alphabetical: 'Nombre del Hotel A-Z',
      clearFilters: 'Limpiar Filtros',
      applyFilters: 'Aplicar Filtros'
    },
    fr: {
      searchPlaceholder: 'Rechercher par nom d\'hôtel ou référence de réservation...',
      filters: 'Filtres',
      status: 'Statut',
      dateRange: 'Plage de Dates',
      sortBy: 'Trier Par',
      all: 'Tous',
      confirmed: 'Confirmé',
      pending: 'En Attente',
      cancelled: 'Annulé',
      completed: 'Terminé',
      refunded: 'Remboursé',
      upcoming: 'À Venir',
      past: 'Passés',
      thisMonth: 'Ce Mois',
      lastMonth: 'Mois Dernier',
      thisYear: 'Cette Année',
      newest: 'Plus Récents',
      oldest: 'Plus Anciens',
      priceHigh: 'Prix: Élevé à Bas',
      priceLow: 'Prix: Bas à Élevé',
      alphabetical: 'Nom d\'Hôtel A-Z',
      clearFilters: 'Effacer Filtres',
      applyFilters: 'Appliquer Filtres'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const statusOptions = [
    { value: 'all', label: t.all },
    { value: 'confirmed', label: t.confirmed },
    { value: 'pending', label: t.pending },
    { value: 'cancelled', label: t.cancelled },
    { value: 'completed', label: t.completed },
    { value: 'refunded', label: t.refunded }
  ];

  const dateRangeOptions = [
    { value: 'all', label: t.all },
    { value: 'upcoming', label: t.upcoming },
    { value: 'past', label: t.past },
    { value: 'thisMonth', label: t.thisMonth },
    { value: 'lastMonth', label: t.lastMonth },
    { value: 'thisYear', label: t.thisYear }
  ];

  const sortOptions = [
    { value: 'newest', label: t.newest },
    { value: 'oldest', label: t.oldest },
    { value: 'priceHigh', label: t.priceHigh },
    { value: 'priceLow', label: t.priceLow },
    { value: 'alphabetical', label: t.alphabetical }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      status: 'all',
      dateRange: 'all',
      sortBy: 'newest'
    };
    setFilters(defaultFilters);
    setSearchQuery('');
    onFilterChange(defaultFilters);
    onSearchChange('');
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={toggleFilters}
          iconName="Filter"
          iconPosition="left"
          className="whitespace-nowrap"
        >
          {t.filters}
        </Button>
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="border-t border-border pt-4 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.status}
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.dateRange}
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.sortBy}
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-text-secondary"
            >
              {t.clearFilters}
            </Button>
            <Button
              variant="primary"
              onClick={toggleFilters}
              iconName="Check"
              iconPosition="left"
            >
              {t.applyFilters}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFilters;