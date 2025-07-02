import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HotelSearchResults from "pages/hotel-search-results";
import UserAuthentication from "pages/user-authentication";
import BookingManagementDashboard from "pages/booking-management-dashboard";
import PaymentCheckout from "pages/payment-checkout";
import UserProfileSettings from "pages/user-profile-settings";
import HotelDetailsBooking from "pages/hotel-details-booking";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HotelSearchResults />} />
        <Route path="/hotel-search-results" element={<HotelSearchResults />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/booking-management-dashboard" element={<BookingManagementDashboard />} />
        <Route path="/payment-checkout" element={<PaymentCheckout />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/hotel-details-booking" element={<HotelDetailsBooking />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;