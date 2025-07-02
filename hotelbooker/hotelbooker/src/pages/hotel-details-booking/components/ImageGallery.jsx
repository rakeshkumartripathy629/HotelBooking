import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageGallery = ({ images, hotelName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      viewAllPhotos: 'View All Photos',
      photo: 'Photo',
      of: 'of',
      close: 'Close',
      previous: 'Previous',
      next: 'Next'
    },
    es: {
      viewAllPhotos: 'Ver Todas las Fotos',
      photo: 'Foto',
      of: 'de',
      close: 'Cerrar',
      previous: 'Anterior',
      next: 'Siguiente'
    },
    fr: {
      viewAllPhotos: 'Voir Toutes les Photos',
      photo: 'Photo',
      of: 'sur',
      close: 'Fermer',
      previous: 'Précédent',
      next: 'Suivant'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openZoom = () => {
    setIsZoomed(true);
    document.body.style.overflow = 'hidden';
  };

  const closeZoom = () => {
    setIsZoomed(false);
    document.body.style.overflow = 'unset';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeZoom();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };

  useEffect(() => {
    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isZoomed]);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative bg-surface rounded-lg overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-2 md:h-96">
          {/* Main Image */}
          <div className="col-span-2 relative group cursor-pointer" onClick={openZoom}>
            <Image
              src={images[0]}
              alt={`${hotelName} - Main view`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Icon name="ZoomIn" size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Side Images */}
          <div className="col-span-2 grid grid-rows-2 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden"
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  openZoom();
                }}
              >
                <Image
                  src={image}
                  alt={`${hotelName} - View ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Icon name="ZoomIn" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Icon name="Plus" size={24} className="mx-auto mb-1" />
                      <span className="text-sm font-medium">+{images.length - 5}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative">
          <div className="aspect-video relative">
            <Image
              src={images[currentImageIndex]}
              alt={`${hotelName} - ${t.photo} ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                  aria-label={t.previous}
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                  aria-label={t.next}
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {currentImageIndex + 1} {t.of} {images.length}
            </div>

            {/* Zoom Button */}
            <button
              onClick={openZoom}
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
              aria-label="Zoom image"
            >
              <Icon name="ZoomIn" size={16} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
            {images.slice(0, 8).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${hotelName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {images.length > 8 && (
              <button
                onClick={openZoom}
                className="flex-shrink-0 w-16 h-12 bg-surface-100 rounded flex items-center justify-center text-text-secondary hover:bg-surface-200 transition-colors duration-200"
              >
                <div className="text-center">
                  <Icon name="Plus" size={12} className="mx-auto" />
                  <span className="text-xs">+{images.length - 8}</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* View All Photos Button - Desktop */}
        <div className="hidden md:block absolute bottom-4 right-4">
          <Button
            variant="outline"
            onClick={openZoom}
            iconName="Grid3X3"
            iconPosition="left"
            className="bg-white bg-opacity-90 hover:bg-opacity-100"
          >
            {t.viewAllPhotos}
          </Button>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-modal flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 z-10"
              aria-label={t.close}
            >
              <Icon name="X" size={20} />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm z-10">
              {currentImageIndex + 1} {t.of} {images.length}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 z-10"
                  aria-label={t.previous}
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 z-10"
                  aria-label={t.next}
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}

            {/* Zoomed Image */}
            <div className="max-w-full max-h-full">
              <Image
                src={images[currentImageIndex]}
                alt={`${hotelName} - ${t.photo} ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-full overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${hotelName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;