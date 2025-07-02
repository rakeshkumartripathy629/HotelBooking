import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchContextBar from '../../components/ui/SearchContextBar';
import SearchForm from './components/SearchForm';
import FilterBar from './components/FilterBar';
import SortDropdown from './components/SortDropdown';
import HotelCard from './components/HotelCard';
import MapView from './components/MapView';
import LoadingSkeleton from './components/LoadingSkeleton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HotelSearchResults = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchContext, setSearchContext] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [currentSort, setCurrentSort] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: null,
    starRating: null,
    amenities: []
  });
  const [showSearchForm, setShowSearchForm] = useState(false);

  const languages = {
    en: {
      searchResults: 'Search Results',
      showMap: 'Show Map',
      showList: 'Show List',
      noResults: 'No hotels found',
      noResultsDesc: 'Try adjusting your search criteria or filters',
      searchAgain: 'Search Again',
      loadMore: 'Load More Hotels',
      loading: 'Loading hotels...',
      error: 'Something went wrong',
      retry: 'Try Again'
    },
    es: {
      searchResults: 'Resultados de Búsqueda',
      showMap: 'Mostrar Mapa',
      showList: 'Mostrar Lista',
      noResults: 'No se encontraron hoteles',
      noResultsDesc: 'Intenta ajustar tus criterios de búsqueda o filtros',
      searchAgain: 'Buscar de Nuevo',
      loadMore: 'Cargar Más Hoteles',
      loading: 'Cargando hoteles...',
      error: 'Algo salió mal',
      retry: 'Intentar de Nuevo'
    },
    fr: {
      searchResults: 'Résultats de Recherche',
      showMap: 'Afficher la Carte',
      showList: 'Afficher la Liste',
      noResults: 'Aucun hôtel trouvé',
      noResultsDesc: 'Essayez d\'ajuster vos critères de recherche ou filtres',
      searchAgain: 'Rechercher à Nouveau',
      loadMore: 'Charger Plus d\'Hôtels',
      loading: 'Chargement des hôtels...',
      error: 'Quelque chose s\'est mal passé',
      retry: 'Réessayer'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  // Mock hotel data
  const mockHotels = [
    {
      id: 1,
      name: "Grand Plaza Hotel",
      starRating: 5,
      guestRating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      location: "Downtown, 0.2 km from center",
      distanceFromCenter: "0.2 km",
      pricePerNight: 299,
      type: "Luxury",
      specialOffer: "20% Off",
      amenities: ['wifi', 'parking', 'pool', 'gym', 'spa', 'restaurant', 'bar', 'breakfast'],
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 2,
      name: "Boutique City Inn",
      starRating: 4,
      guestRating: 4.5,
      reviewCount: 1523,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      location: "Midtown, 0.8 km from center",
      distanceFromCenter: "0.8 km",
      pricePerNight: 189,
      type: "Boutique",
      amenities: ['wifi', 'gym', 'restaurant', 'bar', 'airConditioning'],
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 3,
      name: "Comfort Suites",
      starRating: 3,
      guestRating: 4.2,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      location: "Business District, 1.2 km from center",
      distanceFromCenter: "1.2 km",
      pricePerNight: 129,
      type: "Business",
      amenities: ['wifi', 'parking', 'gym', 'breakfast', 'airConditioning'],
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    {
      id: 4,
      name: "Seaside Resort & Spa",
      starRating: 5,
      guestRating: 4.7,
      reviewCount: 3241,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      location: "Waterfront, 2.1 km from center",
      distanceFromCenter: "2.1 km",
      pricePerNight: 459,
      type: "Resort",
      specialOffer: "Free Upgrade",
      amenities: ['wifi', 'parking', 'pool', 'gym', 'spa', 'restaurant', 'bar', 'breakfast', 'petFriendly'],
      coordinates: { lat: 40.7282, lng: -74.0776 }
    },
    {
      id: 5,
      name: "Budget Stay Hotel",
      starRating: 2,
      guestRating: 3.8,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      location: "Suburbs, 3.5 km from center",
      distanceFromCenter: "3.5 km",
      pricePerNight: 79,
      type: "Budget",
      amenities: ['wifi', 'parking', 'airConditioning'],
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    {
      id: 6,
      name: "Historic Manor Hotel",
      starRating: 4,
      guestRating: 4.4,
      reviewCount: 1876,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      location: "Historic Quarter, 0.5 km from center",
      distanceFromCenter: "0.5 km",
      pricePerNight: 219,
      type: "Historic",
      amenities: ['wifi', 'restaurant', 'bar', 'breakfast', 'airConditioning'],
      coordinates: { lat: 40.7411, lng: -74.0040 }
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Load initial search context and hotels
    const savedSearchContext = localStorage.getItem('searchContext');
    if (savedSearchContext) {
      setSearchContext(JSON.parse(savedSearchContext));
    } else {
      // Default search context
      const defaultContext = {
        destination: "New York, USA",
        checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        checkOut: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        guests: { adults: 2, children: 0 },
        rooms: 1
      };
      setSearchContext(defaultContext);
      localStorage.setItem('searchContext', JSON.stringify(defaultContext));
    }

    // Simulate loading hotels
    setIsLoading(true);
    setTimeout(() => {
      setHotels(mockHotels);
      setFilteredHotels(mockHotels);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...hotels];

    // Apply price filter
    if (filters.priceRange) {
      const priceRanges = {
        budget: { min: 0, max: 100 },
        mid: { min: 100, max: 250 },
        luxury: { min: 250, max: 500 },
        premium: { min: 500, max: null }
      };
      
      const range = priceRanges[filters.priceRange];
      if (range) {
        filtered = filtered.filter(hotel => {
          return hotel.pricePerNight >= range.min && 
                 (range.max === null || hotel.pricePerNight <= range.max);
        });
      }
    }

    // Apply star rating filter
    if (filters.starRating) {
      filtered = filtered.filter(hotel => hotel.starRating >= filters.starRating);
    }

    // Apply amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Apply sorting
    switch (currentSort) {
      case 'priceLowToHigh':
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'priceHighToLow':
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.guestRating || 0) - (a.guestRating || 0));
        break;
      case 'starRating':
        filtered.sort((a, b) => b.starRating - a.starRating);
        break;
      case 'distance':
        filtered.sort((a, b) => {
          const aDistance = parseFloat(a.distanceFromCenter) || 0;
          const bDistance = parseFloat(b.distanceFromCenter) || 0;
          return aDistance - bDistance;
        });
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default: // recommended
        filtered.sort((a, b) => {
          const aScore = (a.guestRating || 0) * 0.4 + a.starRating * 0.3 + (a.reviewCount || 0) * 0.0001;
          const bScore = (b.guestRating || 0) * 0.4 + b.starRating * 0.3 + (b.reviewCount || 0) * 0.0001;
          return bScore - aScore;
        });
    }

    setFilteredHotels(filtered);
  }, [hotels, filters, currentSort]);

  const handleSearch = useCallback((searchData) => {
    setIsLoading(true);
    setSearchContext(searchData);
    setShowSearchForm(false);
    localStorage.setItem('searchContext', JSON.stringify(searchData));

    // Simulate API call
    setTimeout(() => {
      setHotels(mockHotels);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      priceRange: null,
      starRating: null,
      amenities: []
    });
  }, []);

  const handleSortChange = useCallback((sortType) => {
    setCurrentSort(sortType);
  }, []);

  const handleSearchEdit = useCallback(() => {
    setShowSearchForm(true);
  }, []);

  const handleClearSearch = useCallback(() => {
    const defaultContext = {
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: { adults: 2, children: 0 },
      rooms: 1
    };
    setSearchContext(defaultContext);
    setShowSearchForm(true);
    localStorage.removeItem('searchContext');
  }, []);

  const handleHotelSelect = useCallback((hotel) => {
    setSelectedHotel(hotel);
  }, []);

  const handleFavoriteToggle = useCallback((hotelId, isFavorite) => {
    // Handle favorite toggle logic here
    console.log(`Hotel ${hotelId} favorite status: ${isFavorite}`);
  }, []);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceRange) count++;
    if (filters.starRating) count++;
    if (filters.amenities && filters.amenities.length > 0) count += filters.amenities.length;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {searchContext && !showSearchForm && (
        <SearchContextBar
          searchContext={searchContext}
          onSearchEdit={handleSearchEdit}
          onClearSearch={handleClearSearch}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
        {/* Search Form */}
        {(showSearchForm || !searchContext?.destination) && (
          <SearchForm
            onSearch={handleSearch}
            initialSearchData={searchContext}
            isLoading={isLoading}
          />
        )}

        {/* Results Section */}
        {searchContext?.destination && !showSearchForm && (
          <>
            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              activeFiltersCount={getActiveFiltersCount()}
            />

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <SortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
                resultsCount={filteredHotels.length}
              />

              {/* Map Toggle */}
              <Button
                variant={showMap ? "primary" : "outline"}
                onClick={() => setShowMap(!showMap)}
                iconName={showMap ? "List" : "Map"}
                iconPosition="left"
                className="hidden md:flex"
              >
                {showMap ? t.showList : t.showMap}
              </Button>
            </div>

            {/* Results Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Hotels List */}
              <div className={`${showMap ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                {isLoading ? (
                  <LoadingSkeleton count={6} />
                ) : filteredHotels.length > 0 ? (
                  <div className="space-y-6">
                    {filteredHotels.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        searchContext={searchContext}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={64} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {t.noResults}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {t.noResultsDesc}
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setShowSearchForm(true)}
                      iconName="Search"
                      iconPosition="left"
                    >
                      {t.searchAgain}
                    </Button>
                  </div>
                )}
              </div>

              {/* Map View */}
              {showMap && (
                <div className="lg:col-span-6">
                  <div className="sticky top-32">
                    <MapView
                      hotels={filteredHotels}
                      onHotelSelect={handleHotelSelect}
                      selectedHotel={selectedHotel}
                      searchContext={searchContext}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Map Toggle */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:hidden z-40">
              <Button
                variant={showMap ? "primary" : "outline"}
                onClick={() => setShowMap(!showMap)}
                iconName={showMap ? "List" : "Map"}
                iconPosition="left"
                className="shadow-elevation"
              >
                {showMap ? t.showList : t.showMap}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HotelSearchResults;