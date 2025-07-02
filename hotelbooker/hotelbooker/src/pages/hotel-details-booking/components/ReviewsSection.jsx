import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReviewsSection = ({ hotel, reviews }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const languages = {
    en: {
      guestReviews: 'Guest Reviews',
      overallRating: 'Overall Rating',
      reviews: 'reviews',
      review: 'review',
      writeReview: 'Write a Review',
      filterBy: 'Filter by',
      sortBy: 'Sort by',
      all: 'All',
      excellent: 'Excellent (4.5+)',
      veryGood: 'Very Good (4.0+)',
      good: 'Good (3.5+)',
      fair: 'Fair (3.0+)',
      poor: 'Poor (Below 3.0)',
      newest: 'Newest First',
      oldest: 'Oldest First',
      highestRated: 'Highest Rated',
      lowestRated: 'Lowest Rated',
      helpful: 'Helpful',
      notHelpful: 'Not Helpful',
      reportReview: 'Report',
      readMore: 'Read More',
      readLess: 'Read Less',
      verified: 'Verified Stay',
      days: 'days ago',
      months: 'months ago',
      years: 'years ago',
      submitReview: 'Submit Review',
      cancel: 'Cancel',
      yourRating: 'Your Rating',
      reviewTitle: 'Review Title',
      reviewText: 'Your Review',
      signInToReview: 'Sign in to write a review'
    },
    es: {
      guestReviews: 'Reseñas de Huéspedes',
      overallRating: 'Calificación General',
      reviews: 'reseñas',
      review: 'reseña',
      writeReview: 'Escribir Reseña',
      filterBy: 'Filtrar por',
      sortBy: 'Ordenar por',
      all: 'Todas',
      excellent: 'Excelente (4.5+)',
      veryGood: 'Muy Bueno (4.0+)',
      good: 'Bueno (3.5+)',
      fair: 'Regular (3.0+)',
      poor: 'Malo (Menos de 3.0)',
      newest: 'Más Recientes',
      oldest: 'Más Antiguas',
      highestRated: 'Mejor Calificadas',
      lowestRated: 'Peor Calificadas',
      helpful: 'Útil',
      notHelpful: 'No Útil',
      reportReview: 'Reportar',
      readMore: 'Leer Más',
      readLess: 'Leer Menos',
      verified: 'Estancia Verificada',
      days: 'días atrás',
      months: 'meses atrás',
      years: 'años atrás',
      submitReview: 'Enviar Reseña',
      cancel: 'Cancelar',
      yourRating: 'Tu Calificación',
      reviewTitle: 'Título de Reseña',
      reviewText: 'Tu Reseña',
      signInToReview: 'Inicia sesión para escribir una reseña'
    },
    fr: {
      guestReviews: 'Avis des Clients',
      overallRating: 'Note Globale',
      reviews: 'avis',
      review: 'avis',
      writeReview: 'Écrire un Avis',
      filterBy: 'Filtrer par',
      sortBy: 'Trier par',
      all: 'Tous',
      excellent: 'Excellent (4.5+)',
      veryGood: 'Très Bien (4.0+)',
      good: 'Bien (3.5+)',
      fair: 'Correct (3.0+)',
      poor: 'Médiocre (Moins de 3.0)',
      newest: 'Plus Récents',
      oldest: 'Plus Anciens',
      highestRated: 'Mieux Notés',
      lowestRated: 'Moins Bien Notés',
      helpful: 'Utile',
      notHelpful: 'Pas Utile',
      reportReview: 'Signaler',
      readMore: 'Lire Plus',
      readLess: 'Lire Moins',
      verified: 'Séjour Vérifié',
      days: 'jours',
      months: 'mois',
      years: 'années',
      submitReview: 'Soumettre Avis',
      cancel: 'Annuler',
      yourRating: 'Votre Note',
      reviewTitle: 'Titre de l\'Avis',
      reviewText: 'Votre Avis',
      signInToReview: 'Connectez-vous pour écrire un avis'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    let filtered = [...reviews];

    // Apply filters
    if (selectedFilter !== 'all') {
      const filterMap = {
        excellent: (r) => r.rating >= 4.5,
        veryGood: (r) => r.rating >= 4.0 && r.rating < 4.5,
        good: (r) => r.rating >= 3.5 && r.rating < 4.0,
        fair: (r) => r.rating >= 3.0 && r.rating < 3.5,
        poor: (r) => r.rating < 3.0
      };
      filtered = filtered.filter(filterMap[selectedFilter]);
    }

    // Apply sorting
    const sortMap = {
      newest: (a, b) => new Date(b.date) - new Date(a.date),
      oldest: (a, b) => new Date(a.date) - new Date(b.date),
      highestRated: (a, b) => b.rating - a.rating,
      lowestRated: (a, b) => a.rating - b.rating
    };
    filtered.sort(sortMap[sortBy]);

    setFilteredReviews(filtered);
  }, [reviews, selectedFilter, sortBy]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Icon name="Star" size={14} className="text-secondary-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Icon name="Star" size={14} className="text-accent fill-current" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-secondary-300" />
      );
    }

    return stars;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now - reviewDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} ${t.days}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${t.months}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${t.years}`;
    }
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      const rating = Math.floor(review.rating);
      distribution[rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <section id="hotel-reviews">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-4 lg:mb-0">
          {t.guestReviews}
        </h2>
        {isAuthenticated ? (
          <Button
            variant="outline"
            onClick={() => setShowReviewForm(!showReviewForm)}
            iconName="Plus"
            iconPosition="left"
          >
            {t.writeReview}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => window.location.href = '/user-authentication'}
            iconName="User"
            iconPosition="left"
          >
            {t.signInToReview}
          </Button>
        )}
      </div>

      {/* Overall Rating Summary */}
      <div className="bg-surface-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Score */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
              <div className="text-4xl font-bold text-primary">
                {hotel.rating.toFixed(1)}
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(hotel.rating)}
                </div>
                <p className="text-sm text-text-secondary">
                  {totalReviews.toLocaleString()} {totalReviews === 1 ? t.review : t.reviews}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              {t.overallRating}
            </h3>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingDistribution[rating];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm text-text-secondary">{rating}</span>
                    <Icon name="Star" size={12} className="text-accent fill-current" />
                  </div>
                  <div className="flex-1 bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && isAuthenticated && (
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {t.writeReview}
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {t.yourRating}
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    className="text-secondary-300 hover:text-accent transition-colors duration-200"
                  >
                    <Icon name="Star" size={24} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {t.reviewTitle}
              </label>
              <Input
                type="text"
                placeholder="Summarize your experience"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {t.reviewText}
              </label>
              <textarea
                rows={4}
                placeholder="Share your experience with other travelers"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
            <div className="flex space-x-3">
              <Button variant="primary" type="submit">
                {t.submitReview}
              </Button>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowReviewForm(false)}
              >
                {t.cancel}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">{t.filterBy}:</span>
          {[
            { key: 'all', label: t.all },
            { key: 'excellent', label: t.excellent },
            { key: 'veryGood', label: t.veryGood },
            { key: 'good', label: t.good },
            { key: 'fair', label: t.fair },
            { key: 'poor', label: t.poor }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                selectedFilter === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-text-secondary">{t.sortBy}:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">{t.newest}</option>
            <option value="oldest">{t.oldest}</option>
            <option value="highestRated">{t.highestRated}</option>
            <option value="lowestRated">{t.lowestRated}</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            t={t}
            renderStars={renderStars}
            getTimeAgo={getTimeAgo}
          />
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No reviews match your current filters.</p>
        </div>
      )}
    </section>
  );
};

const ReviewCard = ({ review, t, renderStars, getTimeAgo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const shouldShowReadMore = review.comment.length > 200;
  const displayText = isExpanded ? review.comment : review.comment.substring(0, 200) + (shouldShowReadMore ? '...' : '');

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
          {review.guestName.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div>
              <h4 className="font-medium text-text-primary">{review.guestName}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-text-secondary">
                  {getTimeAgo(review.date)}
                </span>
                {review.isVerified && (
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <Icon name="Shield" size={12} />
                    <span>{t.verified}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {review.title && (
            <h5 className="font-medium text-text-primary mb-2">{review.title}</h5>
          )}

          <p className="text-text-secondary leading-relaxed mb-4">
            {displayText}
          </p>

          {shouldShowReadMore && (
            <Button
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto text-primary hover:text-primary-700 mb-4"
            >
              {isExpanded ? t.readLess : t.readMore}
            </Button>
          )}

          {/* Review Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleHelpful}
              disabled={hasVoted}
              className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                hasVoted ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name="ThumbsUp" size={14} />
              <span>{t.helpful} ({helpfulCount})</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-error transition-colors duration-200">
              <Icon name="Flag" size={14} />
              <span>{t.reportReview}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;