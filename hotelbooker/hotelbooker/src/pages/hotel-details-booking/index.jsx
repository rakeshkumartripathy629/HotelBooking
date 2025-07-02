import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import ImageGallery from './components/ImageGallery';
import HotelHeader from './components/HotelHeader';
import BookingWidget from './components/BookingWidget';
import HotelDescription from './components/HotelDescription';
import RoomTypeCards from './components/RoomTypeCards';
import ReviewsSection from './components/ReviewsSection';
import LocationMap from './components/LocationMap';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HotelDetailsBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);

  const languages = {
    en: {
      backToResults: 'Back to Search Results',
      loading: 'Loading hotel details...',
      errorLoading: 'Error loading hotel details',
      tryAgain: 'Try Again',
      shareSuccess: 'Link copied to clipboard!',
      bookingStep: 1
    },
    es: {
      backToResults: 'Volver a Resultados',
      loading: 'Cargando detalles del hotel...',
      errorLoading: 'Error al cargar detalles del hotel',
      tryAgain: 'Intentar de Nuevo',
      shareSuccess: '¡Enlace copiado al portapapeles!',
      bookingStep: 1
    },
    fr: {
      backToResults: 'Retour aux Résultats',
      loading: 'Chargement des détails de l\'hôtel...',
      errorLoading: 'Erreur lors du chargement des détails de l\'hôtel',
      tryAgain: 'Réessayer',
      shareSuccess: 'Lien copié dans le presse-papiers!',
      bookingStep: 1
    }
  };

  const t = languages[currentLanguage] || languages.en;

  // Mock hotel data
  const mockHotel = {
    id: 'hotel-001',
    name: 'Grand Ocean Resort & Spa',
    location: 'Miami Beach, Florida',
    address: '1234 Ocean Drive, Miami Beach, FL 33139, United States',
    coordinates: {
      lat: 25.7617,
      lng: -80.1918
    },
    starRating: 4.5,
    rating: 4.3,
    reviewCount: 2847,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop'
    ],
    highlights: ['Beachfront Location', 'Spa & Wellness', 'Fine Dining', 'Pool & Bar'],
    description: `Experience luxury at its finest at Grand Ocean Resort & Spa, where pristine beaches meet world-class hospitality. Our oceanfront resort offers an unparalleled escape with breathtaking views of the Atlantic Ocean.\n\nIndulge in our award-winning spa services, savor exquisite cuisine at our signature restaurants, and relax by our infinity pool overlooking the ocean. Each elegantly appointed room and suite features modern amenities and private balconies with stunning ocean or city views.\n\nWhether you're seeking a romantic getaway, family vacation, or business retreat, our dedicated team ensures every moment of your stay is exceptional. Discover the perfect blend of relaxation and sophistication at Grand Ocean Resort & Spa.`,
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Fitness Center', 'Restaurant', 'Bar', 'Spa','Parking', 'Pet Friendly', 'Business Center', 'Room Service', 'Laundry Service','Concierge', 'Air Conditioning', 'Elevator', 'Safe', 'Minibar', 'Balcony','Ocean View', 'Airport Shuttle', 'Conference Room'
    ],
    policies: {
      checkIn: '3:00 PM - 12:00 AM',checkOut: '12:00 PM',cancellation: 'Free cancellation up to 24 hours before check-in',pets: 'Pets allowed with additional fee ($50/night)',smoking: 'Non-smoking property'
    },
    nearbyAttractions: [
      {
        name: 'South Beach',type: 'beach',distance: 0.2,walkingTime: 3,drivingTime: 1,description: 'Famous white sand beach with art deco architecture'
      },
      {
        name: 'Lincoln Road Mall',type: 'shopping',distance: 0.8,walkingTime: 12,drivingTime: 4,publicTransport: 8,description: 'Pedestrian shopping mall with boutiques and restaurants'
      },
      {
        name: 'Art Deco Historic District',type: 'attraction',distance: 0.5,walkingTime: 8,drivingTime: 3,description: 'Historic district with iconic art deco buildings'
      },
      {
        name: 'Miami International Airport',type: 'airport',distance: 15.2,drivingTime: 25,publicTransport: 45,description: 'Major international airport serving Miami'
      },
      {
        name: 'Ocean Drive',type: 'attraction',distance: 0.1,walkingTime: 2,description: 'Famous street with restaurants, bars, and nightlife'
      }
    ],
    transportation: [
      { type: 'Miami Beach Trolley', distance: 2 },
      { type: 'Bus Stop', distance: 5 },
      { type: 'Taxi/Uber Pickup', distance: 1 }
    ]
  };

  // Mock rooms data
  const mockRooms = [
    {
      id: 'room-001',
      name: 'Ocean View King Room',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      price: 299,
      originalPrice: 349,
      size: '400 sq ft',
      bedType: '1 King Bed',
      maxOccupancy: 2,
      available: 3,
      isPopular: true,
      features: [
        'Free WiFi', 'Air Conditioning', 'Ocean View', 'Minibar', 'Safe',
        'Flat Screen TV', 'Coffee Maker', 'Balcony', 'Room Service', 'Hair Dryer'
      ]
    },
    {
      id: 'room-002',
      name: 'Deluxe Suite with Balcony',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
      price: 459,
      originalPrice: 529,
      size: '650 sq ft',
      bedType: '1 King Bed + Sofa',
      maxOccupancy: 4,
      available: 2,
      isBestValue: true,
      features: [
        'Free WiFi', 'Air Conditioning', 'Ocean View', 'Minibar', 'Safe',
        'Flat Screen TV', 'Coffee Maker', 'Balcony', 'Room Service', 'Hair Dryer',
        'Refrigerator', 'Sofa', 'Desk', 'Bathtub'
      ]
    },
    {
      id: 'room-003',
      name: 'Premium Ocean Suite',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      price: 699,
      size: '850 sq ft',
      bedType: '1 King Bed + Living Area',
      maxOccupancy: 4,
      available: 1,
      features: [
        'Free WiFi', 'Air Conditioning', 'Ocean View', 'Minibar', 'Safe',
        'Flat Screen TV', 'Coffee Maker', 'Balcony', 'Room Service', 'Hair Dryer',
        'Refrigerator', 'Sofa', 'Desk', 'Bathtub', 'Shower', 'Iron'
      ]
    }
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: 'review-001',
      guestName: 'Sarah Johnson',
      rating: 5.0,
      date: '2024-01-15',
      title: 'Perfect beachfront getaway!',
      comment: `Absolutely stunning hotel with incredible ocean views! The staff was exceptionally friendly and accommodating. Our room was spacious, clean, and beautifully decorated. The spa services were top-notch, and the restaurant food was delicious. The location is perfect - right on the beach with easy access to South Beach attractions. Would definitely stay here again!`,
      isVerified: true,
      helpfulCount: 12
    },
    {
      id: 'review-002',
      guestName: 'Michael Chen',
      rating: 4.0,
      date: '2024-01-10',
      title: 'Great location, excellent service',
      comment: `The hotel exceeded our expectations in many ways. The oceanfront location is unbeatable, and the views from our balcony were breathtaking. The pool area is beautiful and well-maintained. The only minor issue was that the WiFi was a bit slow in our room, but overall, it was a fantastic stay. The concierge helped us with restaurant reservations and local recommendations.`,
      isVerified: true,
      helpfulCount: 8
    },
    {
      id: 'review-003',
      guestName: 'Emily Rodriguez',
      rating: 4.5,
      date: '2024-01-05',
      title: 'Luxury and comfort combined',
      comment: `This resort truly delivers on luxury and comfort. The spa treatments were incredibly relaxing, and the fitness center was well-equipped. Our suite was spacious with a beautiful ocean view. The breakfast buffet had a great variety of options. The beach access is convenient, and the staff went above and beyond to make our stay memorable.`,
      isVerified: true,
      helpfulCount: 15
    },
    {
      id: 'review-004',
      guestName: 'David Thompson',
      rating: 3.5,
      date: '2023-12-28',
      title: 'Good hotel with minor issues',
      comment: `Overall a good experience, but there were a few issues. The room was clean and comfortable, but the air conditioning was quite loud. The location is excellent, and the beach is beautiful. The restaurant service was a bit slow during peak hours. Despite these minor issues, we enjoyed our stay and would consider returning.`,
      isVerified: false,
      helpfulCount: 5
    },
    {
      id: 'review-005',
      guestName: 'Lisa Wang',
      rating: 5.0,
      date: '2023-12-20',
      title: 'Exceptional experience!',
      comment: `From check-in to check-out, everything was perfect. The staff was incredibly professional and friendly. Our ocean view room was stunning, and the amenities were top-quality. The spa was a highlight of our stay - very relaxing and rejuvenating. The location is ideal for exploring Miami Beach. Highly recommend this hotel for anyone looking for a luxury beach vacation.`,
      isVerified: true,
      helpfulCount: 20
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate loading hotel data
    const loadHotelData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setHotel(mockHotel);
        setRooms(mockRooms);
        setReviews(mockReviews);
        
        // Auto-select first room if available
        if (mockRooms.length > 0) {
          setSelectedRoom(mockRooms[0]);
        }
      } catch (error) {
        console.error('Error loading hotel data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHotelData();
  }, []);

  const handleBackToResults = () => {
    navigate('/hotel-search-results');
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    // Scroll to booking widget on mobile
    if (window.innerWidth < 1024) {
      const bookingWidget = document.querySelector('.booking-widget-mobile');
      if (bookingWidget) {
        bookingWidget.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWishlistToggle = (hotelId, isAdded) => {
    // Handle wishlist toggle logic
    console.log(`Hotel ${hotelId} ${isAdded ? 'added to' : 'removed from'} wishlist`);
  };

  const handleShare = () => {
    // Show success message for clipboard copy
    const event = new CustomEvent('showToast', {
      detail: { message: t.shareSuccess, type: 'success' }
    });
    window.dispatchEvent(event);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-secondary">{t.loading}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  {t.errorLoading}
                </h2>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  {t.tryAgain}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Booking Progress Indicator */}
      <BookingProgressIndicator
        currentStep={t.bookingStep}
        bookingData={{ hotel }}
        onBack={handleBackToResults}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={hotel.images} hotelName={hotel.name} />

            {/* Hotel Header */}
            <HotelHeader
              hotel={hotel}
              onWishlistToggle={handleWishlistToggle}
              onShare={handleShare}
            />

            {/* Hotel Description */}
            <HotelDescription hotel={hotel} />

            {/* Room Types */}
            <RoomTypeCards
              rooms={rooms}
              onRoomSelect={handleRoomSelect}
              selectedRoom={selectedRoom}
            />

            {/* Reviews Section */}
            <ReviewsSection hotel={hotel} reviews={reviews} />

            {/* Location Map */}
            <LocationMap hotel={hotel} />
          </div>

          {/* Booking Widget - Desktop */}
          <div className="lg:col-span-1">
            <BookingWidget
              hotel={hotel}
              selectedRoom={selectedRoom}
              onRoomSelect={handleRoomSelect}
              isSticky={true}
            />
          </div>
        </div>
      </main>

      {/* Mobile Booking Widget */}
      <div className="booking-widget-mobile lg:hidden">
        <BookingWidget
          hotel={hotel}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
          isSticky={true}
        />
      </div>
    </div>
  );
};

export default HotelDetailsBooking;