import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingPoliciesSection = ({ onPolicyAcceptance }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [acceptedPolicies, setAcceptedPolicies] = useState({
    terms: false,
    privacy: false,
    cancellation: false
  });
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  const languages = {
    en: {
      bookingPolicies: 'Booking Policies & Terms',
      cancellationPolicy: 'Cancellation Policy',
      termsConditions: 'Terms & Conditions',
      privacyPolicy: 'Privacy Policy',
      freeCancellation: 'Free Cancellation',
      freeCancellationDesc: 'Cancel up to 24 hours before check-in for a full refund',
      partialRefund: 'Partial Refund',
      partialRefundDesc: 'Cancel up to 7 days before check-in for 50% refund',
      noRefund: 'No Refund',
      noRefundDesc: 'No refund for cancellations made within 7 days of check-in',
      importantNotes: 'Important Notes',
      checkInTime: 'Check-in: 3:00 PM - 11:00 PM',
      checkOutTime: 'Check-out: 11:00 AM',
      idRequired: 'Valid ID required at check-in',
      creditCardRequired: 'Credit card required for incidentals',
      smokingPolicy: 'Non-smoking property',
      petPolicy: 'Pets not allowed',
      ageRestriction: 'Minimum age for check-in: 18 years',
      acceptTerms: 'I accept the Terms & Conditions',
      acceptPrivacy: 'I accept the Privacy Policy',
      acceptCancellation: 'I understand the Cancellation Policy',
      viewFull: 'View Full Policy',
      collapse: 'Collapse',
      required: 'You must accept all policies to continue'
    },
    es: {
      bookingPolicies: 'Políticas de Reserva y Términos',
      cancellationPolicy: 'Política de Cancelación',
      termsConditions: 'Términos y Condiciones',
      privacyPolicy: 'Política de Privacidad',
      freeCancellation: 'Cancelación Gratuita',
      freeCancellationDesc: 'Cancela hasta 24 horas antes del check-in para un reembolso completo',
      partialRefund: 'Reembolso Parcial',
      partialRefundDesc: 'Cancela hasta 7 días antes del check-in para un reembolso del 50%',
      noRefund: 'Sin Reembolso',
      noRefundDesc: 'Sin reembolso para cancelaciones hechas dentro de 7 días del check-in',
      importantNotes: 'Notas Importantes',
      checkInTime: 'Check-in: 3:00 PM - 11:00 PM',
      checkOutTime: 'Check-out: 11:00 AM',
      idRequired: 'ID válido requerido en el check-in',
      creditCardRequired: 'Tarjeta de crédito requerida para gastos adicionales',
      smokingPolicy: 'Propiedad libre de humo',
      petPolicy: 'No se permiten mascotas',
      ageRestriction: 'Edad mínima para check-in: 18 años',
      acceptTerms: 'Acepto los Términos y Condiciones',
      acceptPrivacy: 'Acepto la Política de Privacidad',
      acceptCancellation: 'Entiendo la Política de Cancelación',
      viewFull: 'Ver Política Completa',
      collapse: 'Colapsar',
      required: 'Debes aceptar todas las políticas para continuar'
    },
    fr: {
      bookingPolicies: 'Politiques de Réservation et Conditions',
      cancellationPolicy: 'Politique d\'Annulation',
      termsConditions: 'Conditions Générales',
      privacyPolicy: 'Politique de Confidentialité',
      freeCancellation: 'Annulation Gratuite',
      freeCancellationDesc: 'Annulez jusqu\'à 24 heures avant l\'arrivée pour un remboursement complet',
      partialRefund: 'Remboursement Partiel',
      partialRefundDesc: 'Annulez jusqu\'à 7 jours avant l\'arrivée pour un remboursement de 50%',
      noRefund: 'Aucun Remboursement',
      noRefundDesc: 'Aucun remboursement pour les annulations dans les 7 jours de l\'arrivée',
      importantNotes: 'Notes Importantes',
      checkInTime: 'Arrivée: 15h00 - 23h00',
      checkOutTime: 'Départ: 11h00',
      idRequired: 'Pièce d\'identité valide requise à l\'arrivée',
      creditCardRequired: 'Carte de crédit requise pour les frais accessoires',
      smokingPolicy: 'Établissement non-fumeur',
      petPolicy: 'Animaux non admis',
      ageRestriction: 'Âge minimum pour l\'arrivée: 18 ans',
      acceptTerms: 'J\'accepte les Conditions Générales',
      acceptPrivacy: 'J\'accepte la Politique de Confidentialité',
      acceptCancellation: 'Je comprends la Politique d\'Annulation',
      viewFull: 'Voir Politique Complète',
      collapse: 'Réduire',
      required: 'Vous devez accepter toutes les politiques pour continuer'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const allAccepted = Object.values(acceptedPolicies).every(accepted => accepted);
    if (onPolicyAcceptance) {
      onPolicyAcceptance(allAccepted);
    }
  }, [acceptedPolicies, onPolicyAcceptance]);

  const handlePolicyAcceptance = (policyType, accepted) => {
    setAcceptedPolicies(prev => ({
      ...prev,
      [policyType]: accepted
    }));
  };

  const togglePolicyExpansion = (policyType) => {
    setExpandedPolicy(expandedPolicy === policyType ? null : policyType);
  };

  const cancellationPolicyDetails = `Free Cancellation Policy:\n\n• Full refund if cancelled 24+ hours before check-in\n• No refund for no-shows or early departures\n• Cancellation must be made through the booking platform\n• Refunds processed within 5-7 business days\n• Special rates may have different cancellation terms\n\nPartial Refund Policy:\n\n• 50% refund if cancelled 7+ days before check-in\n• 25% refund if cancelled 3-6 days before check-in\n• No refund if cancelled within 72 hours of check-in\n\nNo Refund Policy:\n\n• No refund for any cancellations\n• Applies to special promotional rates\n• Modifications may be allowed subject to availability`;

  const termsConditionsDetails = `Terms and Conditions:\n\n1. Booking Confirmation\n• Booking is confirmed upon payment\n• Confirmation email will be sent within 24 hours\n• Changes subject to availability and fees\n\n2. Check-in/Check-out\n• Check-in: 3:00 PM - 11:00 PM\n• Check-out: 11:00 AM\n• Early check-in/late check-out subject to availability\n• Valid government-issued ID required\n\n3. Payment Terms\n• Full payment due at booking\n• Credit card required for incidentals\n• Additional charges for damages or extra services\n\n4. Guest Responsibilities\n• Comply with hotel policies\n• Respect other guests and property\n• Report any issues immediately\n\n5. Liability\n• Hotel not liable for personal belongings\n• Guests responsible for damages caused\n• Travel insurance recommended`;

  const privacyPolicyDetails = `Privacy Policy:\n\n1. Information Collection\n• Personal information for booking purposes\n• Payment information processed securely\n• Communication preferences\n\n2. Information Use\n• Process and confirm bookings\n• Provide customer service\n• Send booking confirmations and updates\n• Improve our services\n\n3. Information Sharing\n• With hotels for booking fulfillment\n• With payment processors for transactions\n• With service providers for operations\n• Never sold to third parties for marketing\n\n4. Data Security\n• SSL encryption for all transactions\n• PCI DSS compliant payment processing\n• Regular security audits and updates\n\n5. Your Rights\n• Access your personal information\n• Request corrections or deletions\n• Opt-out of marketing communications\n• Contact us for privacy concerns`;

  const importantNotes = [
    { icon: 'Clock', text: t.checkInTime },
    { icon: 'Clock', text: t.checkOutTime },
    { icon: 'IdCard', text: t.idRequired },
    { icon: 'CreditCard', text: t.creditCardRequired },
    { icon: 'Ban', text: t.smokingPolicy },
    { icon: 'Ban', text: t.petPolicy },
    { icon: 'Users', text: t.ageRestriction }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{t.bookingPolicies}</h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Cancellation Policy */}
        <div className="border border-border rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>{t.cancellationPolicy}</span>
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => togglePolicyExpansion('cancellation')}
                iconName={expandedPolicy === 'cancellation' ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {expandedPolicy === 'cancellation' ? t.collapse : t.viewFull}
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-success-50 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <div>
                  <p className="font-medium text-success">{t.freeCancellation}</p>
                  <p className="text-sm text-text-secondary">{t.freeCancellationDesc}</p>
                </div>
              </div>
            </div>

            {expandedPolicy === 'cancellation' && (
              <div className="mt-4 p-4 bg-surface-50 rounded-lg">
                <pre className="text-sm text-text-secondary whitespace-pre-wrap font-body">
                  {cancellationPolicyDetails}
                </pre>
              </div>
            )}

            <div className="mt-4 flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptCancellation"
                checked={acceptedPolicies.cancellation}
                onChange={(e) => handlePolicyAcceptance('cancellation', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="acceptCancellation" className="text-sm text-text-secondary">
                {t.acceptCancellation}
              </label>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="border border-border rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="FileText" size={16} className="text-primary" />
                <span>{t.termsConditions}</span>
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => togglePolicyExpansion('terms')}
                iconName={expandedPolicy === 'terms' ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {expandedPolicy === 'terms' ? t.collapse : t.viewFull}
              </Button>
            </div>

            {expandedPolicy === 'terms' && (
              <div className="mb-4 p-4 bg-surface-50 rounded-lg">
                <pre className="text-sm text-text-secondary whitespace-pre-wrap font-body">
                  {termsConditionsDetails}
                </pre>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptedPolicies.terms}
                onChange={(e) => handlePolicyAcceptance('terms', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="acceptTerms" className="text-sm text-text-secondary">
                {t.acceptTerms}
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="border border-border rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span>{t.privacyPolicy}</span>
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => togglePolicyExpansion('privacy')}
                iconName={expandedPolicy === 'privacy' ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {expandedPolicy === 'privacy' ? t.collapse : t.viewFull}
              </Button>
            </div>

            {expandedPolicy === 'privacy' && (
              <div className="mb-4 p-4 bg-surface-50 rounded-lg">
                <pre className="text-sm text-text-secondary whitespace-pre-wrap font-body">
                  {privacyPolicyDetails}
                </pre>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptPrivacy"
                checked={acceptedPolicies.privacy}
                onChange={(e) => handlePolicyAcceptance('privacy', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="acceptPrivacy" className="text-sm text-text-secondary">
                {t.acceptPrivacy}
              </label>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="border border-border rounded-lg">
          <div className="p-4">
            <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span>{t.importantNotes}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {importantNotes.map((note, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name={note.icon} size={14} className="text-primary flex-shrink-0" />
                  <span>{note.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Validation Message */}
        {!Object.values(acceptedPolicies).every(accepted => accepted) && (
          <div className="flex items-center space-x-2 p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <p className="text-sm text-warning">{t.required}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPoliciesSection;