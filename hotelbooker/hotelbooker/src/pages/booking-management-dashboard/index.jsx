import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BookingCard from './components/BookingCard';
import BookingStats from './components/BookingStats';
import BookingFilters from './components/BookingFilters';
import BookingDetailsModal from './components/BookingDetailsModal';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookingManagementDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });

  const languages = {
    en: {
      pageTitle: 'My Bookings - HotelBooker',
      title: 'My Bookings',
      subtitle: 'Manage your hotel reservations and travel history',
      upcomingBookings: 'Upcoming Bookings',
      pastBookings: 'Past Bookings',
      allBookings: 'All Bookings',
      loading: 'Loading your bookings...',
      exportCalendar: 'Export to Calendar',
      bookNewHotel: 'Book New Hotel',
      viewAll: 'View All',
      showLess: 'Show Less'
    },
    es: {
      pageTitle: 'Mis Reservas - HotelBooker',
      title: 'Mis Reservas',
      subtitle: 'Gestiona tus reservas de hotel e historial de viajes',
      upcomingBookings: 'Próximas Reservas',
      pastBookings: 'Reservas Pasadas',
      allBookings: 'Todas las Reservas',
      loading: 'Cargando tus reservas...',
      exportCalendar: 'Exportar al Calendario',
      bookNewHotel: 'Reservar Nuevo Hotel',
      viewAll: 'Ver Todo',
      showLess: 'Mostrar Menos'
    },
    fr: {
      pageTitle: 'Mes Réservations - HotelBooker',
      title: 'Mes Réservations',
      subtitle: 'Gérez vos réservations d\'hôtel et votre historique de voyage',
      upcomingBookings: 'Réservations à Venir',
      pastBookings: 'Réservations Passées',
      allBookings: 'Toutes les Réservations',
      loading: 'Chargement de vos réservations...',
      exportCalendar: 'Exporter vers le Calendrier',
      bookNewHotel: 'Réserver un Nouvel Hôtel',
      viewAll: 'Voir Tout',
      showLess: 'Afficher Moins'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  // Mock booking data
  const mockBookings = [
    {
      id: 1,
      bookingReference: "HB-2024-001234",
      status: "confirmed",
      hotel: {
        name: "Grand Plaza Hotel",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        rating: 5,
        amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym", "Room Service"]
      },
      checkIn: "2024-02-15T15:00:00Z",
      checkOut: "2024-02-18T11:00:00Z",
      guests: { adults: 2, children: 0 },
      rooms: 1,
      roomType: "Deluxe King Room",
      totalAmount: 1200,
      bookedDate: "2024-01-10T10:30:00Z",
      guestInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567"
      },
      paymentInfo: {
        method: "Visa ****1234",
        paidAmount: 1200,
        paymentDate: "2024-01-10T10:35:00Z"
      },
      cancellationPolicy: {
        isFree: true,
        deadline: "2024-02-13T23:59:00Z",
        details: "Free cancellation up to 48 hours before check-in"
      },
      specialRequests: "Late check-in requested, non-smoking room preferred"
    },
    {
      id: 2,
      bookingReference: "HB-2024-001235",
      status: "pending",
      hotel: {
        name: "Seaside Resort & Spa",
        location: "Miami Beach, FL",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        rating: 4,
        amenities: ["Beach Access", "Pool", "Spa", "Restaurant", "Bar"]
      },
      checkIn: "2024-03-20T15:00:00Z",
      checkOut: "2024-03-25T11:00:00Z",
      guests: { adults: 2, children: 1 },
      rooms: 1,
      roomType: "Ocean View Suite",
      totalAmount: 2100,
      bookedDate: "2024-01-15T14:20:00Z",
      guestInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567"
      },
      paymentInfo: {
        method: "Mastercard ****5678",
        paidAmount: 0,
        paymentDate: null
      },
      cancellationPolicy: {
        isFree: true,
        deadline: "2024-03-18T23:59:00Z",
        details: "Free cancellation up to 48 hours before check-in"
      }
    },
    {
      id: 3,
      bookingReference: "HB-2023-009876",
      status: "completed",
      hotel: {
        name: "Mountain Lodge",
        location: "Aspen, CO",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
        rating: 4,
        amenities: ["Ski Access", "Fireplace", "Restaurant", "Bar", "Spa"]
      },
      checkIn: "2023-12-20T15:00:00Z",
      checkOut: "2023-12-27T11:00:00Z",
      guests: { adults: 4, children: 2 },
      rooms: 2,
      roomType: "Family Mountain Suite",
      totalAmount: 3500,
      bookedDate: "2023-11-15T09:45:00Z",
      guestInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567"
      },
      paymentInfo: {
        method: "Visa ****1234",
        paidAmount: 3500,
        paymentDate: "2023-11-15T09:50:00Z"
      },
      cancellationPolicy: {
        isFree: false,
        isPartial: true,
        deadline: "2023-12-18T23:59:00Z",
        details: "50% refund available up to 48 hours before check-in"
      }
    },
    {
      id: 4,
      bookingReference: "HB-2023-009875",
      status: "cancelled",
      hotel: {
        name: "City Center Hotel",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
        rating: 3,
        amenities: ["Free WiFi", "Business Center", "Restaurant", "Gym"]
      },
      checkIn: "2023-11-10T15:00:00Z",
      checkOut: "2023-11-13T11:00:00Z",
      guests: { adults: 1, children: 0 },
      rooms: 1,
      roomType: "Standard Queen Room",
      totalAmount: 450,
      bookedDate: "2023-10-20T16:30:00Z",
      guestInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567"
      },
      paymentInfo: {
        method: "Visa ****1234",
        paidAmount: 450,
        paymentDate: "2023-10-20T16:35:00Z"
      },
      cancellationPolicy: {
        isFree: true,
        deadline: "2023-11-08T23:59:00Z",
        details: "Free cancellation up to 48 hours before check-in"
      }
    }
  ];

  const mockStats = {
    totalBookings: 15,
    upcomingTrips: 2,
    completedTrips: 12,
    loyaltyPoints: 2450,
    totalSpent: 18750,
    averageRating: 4.3
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/user-authentication');
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [bookings, filters, searchQuery]);

  const applyFiltersAndSearch = () => {
    let filtered = [...bookings];

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.hotel.name.toLowerCase().includes(query) ||
        booking.hotel.location.toLowerCase().includes(query) ||
        booking.bookingReference.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const currentYear = new Date(now.getFullYear(), 0, 1);

      filtered = filtered.filter(booking => {
        const checkInDate = new Date(booking.checkIn);
        
        switch (filters.dateRange) {
          case 'upcoming':
            return checkInDate > now;
          case 'past':
            return checkInDate < now;
          case 'thisMonth':
            return checkInDate >= currentMonth;
          case 'lastMonth':
            return checkInDate >= lastMonth && checkInDate < currentMonth;
          case 'thisYear':
            return checkInDate >= currentYear;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.bookedDate) - new Date(a.bookedDate);
        case 'oldest':
          return new Date(a.bookedDate) - new Date(b.bookedDate);
        case 'priceHigh':
          return b.totalAmount - a.totalAmount;
        case 'priceLow':
          return a.totalAmount - b.totalAmount;
        case 'alphabetical':
          return a.hotel.name.localeCompare(b.hotel.name);
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  const handleModifyBooking = (booking) => {
    // Navigate to hotel details with booking data
    navigate('/hotel-details-booking', { state: { booking, isModification: true } });
  };

  const handleCancelBooking = (booking) => {
    // In a real app, this would make an API call
    const updatedBookings = bookings.map(b =>
      b.id === booking.id ? { ...b, status: 'cancelled' } : b
    );
    setBookings(updatedBookings);
    setIsDetailsModalOpen(false);
  };

  const handleDownloadReceipt = (booking) => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for booking:', booking.bookingReference);
  };

  const handleBookNewHotel = () => {
    navigate('/hotel-search-results');
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      dateRange: 'all',
      sortBy: 'newest'
    });
    setSearchQuery('');
  };

  const getUpcomingBookings = () => {
    const now = new Date();
    return filteredBookings.filter(booking => new Date(booking.checkIn) > now);
  };

  const getPastBookings = () => {
    const now = new Date();
    return filteredBookings.filter(booking => new Date(booking.checkIn) <= now);
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t.pageTitle}</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-text-secondary">{t.loading}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const upcomingBookings = getUpcomingBookings();
  const pastBookings = getPastBookings();

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content="Manage your hotel bookings, view reservation history, and modify upcoming trips with HotelBooker." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {t.title}
                </h1>
                <p className="text-text-secondary">
                  {t.subtitle}
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  {t.exportCalendar}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleBookNewHotel}
                  iconName="Plus"
                  iconPosition="left"
                >
                  {t.bookNewHotel}
                </Button>
              </div>
            </div>

            {/* Booking Statistics */}
            <BookingStats stats={mockStats} currentLanguage={currentLanguage} />

            {/* Filters */}
            <BookingFilters
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              currentLanguage={currentLanguage}
            />

            {/* Bookings Content */}
            {filteredBookings.length === 0 ? (
              <EmptyState
                type={searchQuery || filters.status !== 'all' || filters.dateRange !== 'all' ? 'noResults' : 'noBookings'}
                onAction={searchQuery || filters.status !== 'all' || filters.dateRange !== 'all' ? handleClearFilters : handleBookNewHotel}
                currentLanguage={currentLanguage}
              />
            ) : (
              <div className="space-y-8">
                {/* Upcoming Bookings */}
                {upcomingBookings.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="Calendar" size={20} className="text-primary" />
                      <h2 className="text-xl font-semibold text-text-primary">
                        {t.upcomingBookings}
                      </h2>
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-sm font-medium">
                        {upcomingBookings.length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          onViewDetails={handleViewDetails}
                          onModify={handleModifyBooking}
                          onCancel={handleCancelBooking}
                          onDownloadReceipt={handleDownloadReceipt}
                          currentLanguage={currentLanguage}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Bookings */}
                {pastBookings.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="History" size={20} className="text-secondary" />
                      <h2 className="text-xl font-semibold text-text-primary">
                        {t.pastBookings}
                      </h2>
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-sm font-medium">
                        {pastBookings.length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {pastBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          onViewDetails={handleViewDetails}
                          onModify={handleModifyBooking}
                          onCancel={handleCancelBooking}
                          onDownloadReceipt={handleDownloadReceipt}
                          currentLanguage={currentLanguage}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Bookings (when no separation needed) */}
                {upcomingBookings.length === 0 && pastBookings.length === 0 && filteredBookings.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="List" size={20} className="text-text-secondary" />
                      <h2 className="text-xl font-semibold text-text-primary">
                        {t.allBookings}
                      </h2>
                      <span className="bg-surface-100 text-text-secondary px-2 py-1 rounded-full text-sm font-medium">
                        {filteredBookings.length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {filteredBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          onViewDetails={handleViewDetails}
                          onModify={handleModifyBooking}
                          onCancel={handleCancelBooking}
                          onDownloadReceipt={handleDownloadReceipt}
                          currentLanguage={currentLanguage}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Booking Details Modal */}
        <BookingDetailsModal
          booking={selectedBooking}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onModify={handleModifyBooking}
          onCancel={handleCancelBooking}
          onDownloadReceipt={handleDownloadReceipt}
          currentLanguage={currentLanguage}
        />
      </div>
    </>
  );
};

export default BookingManagementDashboard;