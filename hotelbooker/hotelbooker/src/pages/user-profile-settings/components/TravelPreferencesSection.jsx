import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const TravelPreferencesSection = ({ userProfile, onProfileUpdate, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    roomType: userProfile.travelPreferences?.roomType || 'standard',
    bedType: userProfile.travelPreferences?.bedType || 'any',
    smokingPreference: userProfile.travelPreferences?.smokingPreference || 'non-smoking',
    floorPreference: userProfile.travelPreferences?.floorPreference || 'any',
    amenities: userProfile.travelPreferences?.amenities || [],
    specialRequests: userProfile.travelPreferences?.specialRequests || '',
    dietaryRestrictions: userProfile.travelPreferences?.dietaryRestrictions || [],
    accessibilityNeeds: userProfile.travelPreferences?.accessibilityNeeds || []
  });

  const languages = {
    en: {
      travelPreferences: 'Travel Preferences',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      roomType: 'Preferred Room Type',
      bedType: 'Bed Type',
      smokingPreference: 'Smoking Preference',
      floorPreference: 'Floor Preference',
      amenities: 'Preferred Amenities',
      specialRequests: 'Special Requests',
      dietaryRestrictions: 'Dietary Restrictions',
      accessibilityNeeds: 'Accessibility Needs',
      roomTypes: {
        standard: 'Standard Room',
        deluxe: 'Deluxe Room',
        suite: 'Suite',
        executive: 'Executive Room'
      },
      bedTypes: {
        any: 'Any',
        single: 'Single Bed',
        double: 'Double Bed',
        queen: 'Queen Bed',
        king: 'King Bed',
        twin: 'Twin Beds'
      },
      smokingOptions: {
        'non-smoking': 'Non-Smoking',
        'smoking': 'Smoking Allowed'
      },
      floorOptions: {
        any: 'Any Floor',
        low: 'Lower Floors (1-5)',
        high: 'Higher Floors (6+)'
      },
      amenityOptions: {
        wifi: 'Free Wi-Fi',
        parking: 'Parking',
        gym: 'Fitness Center',
        pool: 'Swimming Pool',
        spa: 'Spa Services',
        restaurant: 'Restaurant',
        roomService: '24/7 Room Service',
        businessCenter: 'Business Center',
        petFriendly: 'Pet Friendly',
        airConditioning: 'Air Conditioning'
      },
      dietaryOptions: {
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        glutenFree: 'Gluten-Free',
        halal: 'Halal',
        kosher: 'Kosher',
        lactoseFree: 'Lactose-Free',
        nutFree: 'Nut-Free'
      },
      accessibilityOptions: {
        wheelchair: 'Wheelchair Accessible',
        hearingImpaired: 'Hearing Impaired Assistance',
        visuallyImpaired: 'Visually Impaired Assistance',
        mobilityAssistance: 'Mobility Assistance'
      }
    },
    es: {
      travelPreferences: 'Preferencias de Viaje',
      edit: 'Editar',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      roomType: 'Tipo de Habitación Preferida',
      bedType: 'Tipo de Cama',
      smokingPreference: 'Preferencia de Fumar',
      floorPreference: 'Preferencia de Piso',
      amenities: 'Servicios Preferidos',
      specialRequests: 'Solicitudes Especiales',
      dietaryRestrictions: 'Restricciones Dietéticas',
      accessibilityNeeds: 'Necesidades de Accesibilidad',
      roomTypes: {
        standard: 'Habitación Estándar',
        deluxe: 'Habitación Deluxe',
        suite: 'Suite',
        executive: 'Habitación Ejecutiva'
      },
      bedTypes: {
        any: 'Cualquiera',
        single: 'Cama Individual',
        double: 'Cama Doble',
        queen: 'Cama Queen',
        king: 'Cama King',
        twin: 'Camas Gemelas'
      },
      smokingOptions: {
        'non-smoking': 'No Fumadores',
        'smoking': 'Se Permite Fumar'
      },
      floorOptions: {
        any: 'Cualquier Piso',
        low: 'Pisos Bajos (1-5)',
        high: 'Pisos Altos (6+)'
      },
      amenityOptions: {
        wifi: 'Wi-Fi Gratuito',
        parking: 'Estacionamiento',
        gym: 'Gimnasio',
        pool: 'Piscina',
        spa: 'Servicios de Spa',
        restaurant: 'Restaurante',
        roomService: 'Servicio a la Habitación 24/7',
        businessCenter: 'Centro de Negocios',
        petFriendly: 'Admite Mascotas',
        airConditioning: 'Aire Acondicionado'
      },
      dietaryOptions: {
        vegetarian: 'Vegetariano',
        vegan: 'Vegano',
        glutenFree: 'Sin Gluten',
        halal: 'Halal',
        kosher: 'Kosher',
        lactoseFree: 'Sin Lactosa',
        nutFree: 'Sin Nueces'
      },
      accessibilityOptions: {
        wheelchair: 'Accesible en Silla de Ruedas',
        hearingImpaired: 'Asistencia para Discapacidad Auditiva',
        visuallyImpaired: 'Asistencia para Discapacidad Visual',
        mobilityAssistance: 'Asistencia de Movilidad'
      }
    },
    fr: {
      travelPreferences: 'Préférences de Voyage',
      edit: 'Modifier',
      save: 'Enregistrer les Modifications',
      cancel: 'Annuler',
      roomType: 'Type de Chambre Préféré',
      bedType: 'Type de Lit',
      smokingPreference: 'Préférence Fumeur',
      floorPreference: 'Préférence d\'Étage',
      amenities: 'Équipements Préférés',
      specialRequests: 'Demandes Spéciales',
      dietaryRestrictions: 'Restrictions Alimentaires',
      accessibilityNeeds: 'Besoins d\'Accessibilité',
      roomTypes: {
        standard: 'Chambre Standard',
        deluxe: 'Chambre Deluxe',
        suite: 'Suite',
        executive: 'Chambre Exécutive'
      },
      bedTypes: {
        any: 'N\'importe lequel',
        single: 'Lit Simple',
        double: 'Lit Double',
        queen: 'Lit Queen',
        king: 'Lit King',
        twin: 'Lits Jumeaux'
      },
      smokingOptions: {
        'non-smoking': 'Non-Fumeur',
        'smoking': 'Fumeur Autorisé'
      },
      floorOptions: {
        any: 'N\'importe quel Étage',
        low: 'Étages Inférieurs (1-5)',
        high: 'Étages Supérieurs (6+)'
      },
      amenityOptions: {
        wifi: 'Wi-Fi Gratuit',
        parking: 'Parking',
        gym: 'Salle de Sport',
        pool: 'Piscine',
        spa: 'Services Spa',
        restaurant: 'Restaurant',
        roomService: 'Service en Chambre 24/7',
        businessCenter: 'Centre d\'Affaires',
        petFriendly: 'Animaux Acceptés',
        airConditioning: 'Climatisation'
      },
      dietaryOptions: {
        vegetarian: 'Végétarien',
        vegan: 'Végétalien',
        glutenFree: 'Sans Gluten',
        halal: 'Halal',
        kosher: 'Casher',
        lactoseFree: 'Sans Lactose',
        nutFree: 'Sans Noix'
      },
      accessibilityOptions: {
        wheelchair: 'Accessible en Fauteuil Roulant',
        hearingImpaired: 'Assistance Malentendants',
        visuallyImpaired: 'Assistance Malvoyants',
        mobilityAssistance: 'Assistance Mobilité'
      }
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const handleSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleTextChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onProfileUpdate({
      ...userProfile,
      travelPreferences: preferences
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreferences({
      roomType: userProfile.travelPreferences?.roomType || 'standard',
      bedType: userProfile.travelPreferences?.bedType || 'any',
      smokingPreference: userProfile.travelPreferences?.smokingPreference || 'non-smoking',
      floorPreference: userProfile.travelPreferences?.floorPreference || 'any',
      amenities: userProfile.travelPreferences?.amenities || [],
      specialRequests: userProfile.travelPreferences?.specialRequests || '',
      dietaryRestrictions: userProfile.travelPreferences?.dietaryRestrictions || [],
      accessibilityNeeds: userProfile.travelPreferences?.accessibilityNeeds || []
    });
    setIsEditing(false);
  };

  const CheckboxGroup = ({ title, options, selectedValues, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-3">{title}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(options).map(([key, label]) => (
          <label key={key} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedValues.includes(key)}
              onChange={() => onChange(key)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              disabled={!isEditing}
            />
            <span className="text-sm text-text-secondary">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <span>{t.travelPreferences}</span>
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit2"
            iconPosition="left"
            size="sm"
          >
            {t.edit}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Room Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.roomType}
            </label>
            {isEditing ? (
              <select
                value={preferences.roomType}
                onChange={(e) => handleSelectChange('roomType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(t.roomTypes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {t.roomTypes[userProfile.travelPreferences?.roomType] || t.roomTypes.standard}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.bedType}
            </label>
            {isEditing ? (
              <select
                value={preferences.bedType}
                onChange={(e) => handleSelectChange('bedType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(t.bedTypes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {t.bedTypes[userProfile.travelPreferences?.bedType] || t.bedTypes.any}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.smokingPreference}
            </label>
            {isEditing ? (
              <select
                value={preferences.smokingPreference}
                onChange={(e) => handleSelectChange('smokingPreference', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(t.smokingOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {t.smokingOptions[userProfile.travelPreferences?.smokingPreference] || t.smokingOptions['non-smoking']}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.floorPreference}
            </label>
            {isEditing ? (
              <select
                value={preferences.floorPreference}
                onChange={(e) => handleSelectChange('floorPreference', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(t.floorOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary py-2">
                {t.floorOptions[userProfile.travelPreferences?.floorPreference] || t.floorOptions.any}
              </p>
            )}
          </div>
        </div>

        {/* Amenities */}
        <CheckboxGroup
          title={t.amenities}
          options={t.amenityOptions}
          selectedValues={preferences.amenities}
          onChange={(value) => handleCheckboxChange('amenities', value)}
        />

        {/* Dietary Restrictions */}
        <CheckboxGroup
          title={t.dietaryRestrictions}
          options={t.dietaryOptions}
          selectedValues={preferences.dietaryRestrictions}
          onChange={(value) => handleCheckboxChange('dietaryRestrictions', value)}
        />

        {/* Accessibility Needs */}
        <CheckboxGroup
          title={t.accessibilityNeeds}
          options={t.accessibilityOptions}
          selectedValues={preferences.accessibilityNeeds}
          onChange={(value) => handleCheckboxChange('accessibilityNeeds', value)}
        />

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.specialRequests}
          </label>
          {isEditing ? (
            <textarea
              value={preferences.specialRequests}
              onChange={(e) => handleTextChange('specialRequests', e.target.value)}
              placeholder="Enter any special requests or requirements..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          ) : (
            <p className="text-text-secondary py-2 min-h-[2rem]">
              {userProfile.travelPreferences?.specialRequests || '-'}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              {t.save}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
            >
              {t.cancel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPreferencesSection;