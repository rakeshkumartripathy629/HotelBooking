import React from 'react';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-surface rounded-lg border border-border overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="h-48 md:h-56 bg-surface-100" />
          
          {/* Content Skeleton */}
          <div className="p-4">
            {/* Title and Rating Row */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="h-6 bg-surface-100 rounded w-3/4 mb-2" />
                <div className="flex items-center space-x-1">
                  <div className="h-4 bg-surface-100 rounded w-20" />
                </div>
              </div>
              <div className="text-right ml-3">
                <div className="h-4 bg-surface-100 rounded w-8 mb-1" />
                <div className="h-3 bg-surface-100 rounded w-12 mb-1" />
                <div className="h-3 bg-surface-100 rounded w-16" />
              </div>
            </div>

            {/* Location */}
            <div className="h-4 bg-surface-100 rounded w-1/2 mb-3" />

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-surface-100 rounded w-16" />
              ))}
            </div>

            {/* Price and Actions */}
            <div className="flex items-end justify-between">
              <div>
                <div className="h-8 bg-surface-100 rounded w-24 mb-1" />
                <div className="h-3 bg-surface-100 rounded w-32" />
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <div className="h-8 bg-surface-100 rounded w-24" />
                <div className="h-8 bg-surface-100 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;