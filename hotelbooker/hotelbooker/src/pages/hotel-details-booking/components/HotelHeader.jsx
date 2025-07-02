import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HotelHeader = ({ hotel, onWishlistToggle, onShare }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const languages = {
    en: {
      reviews: 'reviews',
      review: 'review',
      excellent: 'Excellent',
      veryGood: 'Very Good',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      addToWishlist: 'Add to Wishlist',
      removeFromWishlist: 'Remove from Wishlist',
      share: 'Share',
      viewOnMap: 'View on Map',
      starRating: 'star rating'
    },
    es: {
      reviews: 'reseñas',
      review: 'reseña',
      excellent: 'Excelente',
      veryGood: 'Muy Bueno',
      good: 'Bueno',
      fair: 'Regular',
      poor: 'Malo',
      addToWishlist: 'Añadir a Favoritos',
      removeFromWishlist: 'Quitar de Favoritos',
      share: 'Compartir',
      viewOnMap: 'Ver en Mapa',
      starRating: 'calificación de estrellas'
    },
    fr: {
      reviews: 'avis',
      review: 'avis',
      excellent: 'Excellent',
      veryGood: 'Très Bien',
      good: 'Bien',
      fair: 'Correct',
      poor: 'Médiocre',
      addToWishlist: 'Ajouter aux Favoris',
      removeFromWishlist: 'Retirer des Favoris',
      share: 'Partager',
      viewOnMap: 'Voir sur la Carte',
      starRating: 'note étoilée'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Check if hotel is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('hotelWishlist') || '[]');
    setIsWishlisted(wishlist.includes(hotel.id));
  }, [hotel.id]);

  const getRatingText = (rating) => {
    if (rating >= 4.5) return t.excellent;
    if (rating >= 4.0) return t.veryGood;
    if (rating >= 3.5) return t.good;
    if (rating >= 3.0) return t.fair;
    return t.poor;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-primary';
    if (rating >= 3.5) return 'text-accent';
    if (rating >= 3.0) return 'text-warning';
    return 'text-error';
  };

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('hotelWishlist') || '[]');
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = wishlist.filter(id => id !== hotel.id);
    } else {
      updatedWishlist = [...wishlist, hotel.id];
    }

    localStorage.setItem('hotelWishlist', JSON.stringify(updatedWishlist));
    setIsWishlisted(!isWishlisted);

    if (onWishlistToggle) {
      onWishlistToggle(hotel.id, !isWishlisted);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: `Check out ${hotel.name} in ${hotel.location}`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      if (onShare) {
        onShare();
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Icon name="Star" size={16} className="text-secondary-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Icon name="Star" size={16} className="text-accent fill-current" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-secondary-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Hotel Info */}
          <div className="flex-1">
            {/* Hotel Name and Star Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                  {hotel.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1" aria-label={`${hotel.starRating} ${t.starRating}`}>
                    {renderStars(hotel.starRating)}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {hotel.starRating} {t.starRating}
                  </span>
                </div>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="flex items-center space-x-2 sm:hidden">
                <Button
                  variant="ghost"
                  onClick={handleWishlistToggle}
                  iconName={isWishlisted ? "Heart" : "Heart"}
                  className={`${isWishlisted ? 'text-error' : 'text-text-secondary'} hover:text-error`}
                  aria-label={isWishlisted ? t.removeFromWishlist : t.addToWishlist}
                />
                <Button
                  variant="ghost"
                  onClick={handleShare}
                  iconName="Share"
                  className="text-text-secondary hover:text-primary"
                  aria-label={t.share}
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-2 mb-4">
              <Icon name="MapPin" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-text-primary font-medium">{hotel.location}</p>
                <p className="text-sm text-text-secondary">{hotel.address}</p>
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded text-sm font-semibold ${getRatingColor(hotel.rating)} bg-opacity-10`}>
                  {hotel.rating.toFixed(1)}
                </div>
                <div>
                  <p className={`text-sm font-medium ${getRatingColor(hotel.rating)}`}>
                    {getRatingText(hotel.rating)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {hotel.reviewCount.toLocaleString()} {hotel.reviewCount === 1 ? t.review : t.reviews}
                  </p>
                </div>
              </div>

              {/* View on Map Button */}
              <Button
                variant="outline"
                size="sm"
                iconName="Map"
                iconPosition="left"
                className="self-start sm:self-auto"
                onClick={() => {
                  const mapSection = document.getElementById('hotel-map');
                  if (mapSection) {
                    mapSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t.viewOnMap}
              </Button>
            </div>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden sm:flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={handleWishlistToggle}
              iconName="Heart"
              iconPosition="left"
              className={`${isWishlisted ? 'text-error bg-error-50' : 'text-text-secondary'} hover:text-error hover:bg-error-50`}
            >
              {isWishlisted ? t.removeFromWishlist : t.addToWishlist}
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              iconName="Share"
              iconPosition="left"
            >
              {t.share}
            </Button>
          </div>
        </div>

        {/* Hotel Highlights */}
        {hotel.highlights && hotel.highlights.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {hotel.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelHeader;