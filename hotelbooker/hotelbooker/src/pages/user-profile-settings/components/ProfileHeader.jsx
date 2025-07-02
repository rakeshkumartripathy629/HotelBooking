import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const ProfileHeader = ({ userProfile, onProfileUpdate, currentLanguage }) => {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const languages = {
    en: {
      memberSince: 'Member since',
      loyaltyPoints: 'Loyalty Points',
      editPhoto: 'Edit Photo',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove Photo',
      cancel: 'Cancel',
      save: 'Save',
      goldMember: 'Gold Member',
      silverMember: 'Silver Member',
      bronzeMember: 'Bronze Member',
      regularMember: 'Regular Member'
    },
    es: {
      memberSince: 'Miembro desde',
      loyaltyPoints: 'Puntos de Lealtad',
      editPhoto: 'Editar Foto',
      uploadPhoto: 'Subir Foto',
      removePhoto: 'Eliminar Foto',
      cancel: 'Cancelar',
      save: 'Guardar',
      goldMember: 'Miembro Oro',
      silverMember: 'Miembro Plata',
      bronzeMember: 'Miembro Bronce',
      regularMember: 'Miembro Regular'
    },
    fr: {
      memberSince: 'Membre depuis',
      loyaltyPoints: 'Points de Fidélité',
      editPhoto: 'Modifier Photo',
      uploadPhoto: 'Télécharger Photo',
      removePhoto: 'Supprimer Photo',
      cancel: 'Annuler',
      save: 'Enregistrer',
      goldMember: 'Membre Or',
      silverMember: 'Membre Argent',
      bronzeMember: 'Membre Bronze',
      regularMember: 'Membre Régulier'
    }
  };

  const t = languages[currentLanguage] || languages.en;

  const getMembershipBadge = (points) => {
    if (points >= 10000) return { label: t.goldMember, color: 'bg-accent text-accent-foreground' };
    if (points >= 5000) return { label: t.silverMember, color: 'bg-secondary-300 text-secondary-800' };
    if (points >= 1000) return { label: t.bronzeMember, color: 'bg-amber-100 text-amber-800' };
    return { label: t.regularMember, color: 'bg-surface-100 text-text-secondary' };
  };

  const membershipBadge = getMembershipBadge(userProfile.loyaltyPoints);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onProfileUpdate({ ...userProfile, avatar: e.target.result });
        setIsEditingPhoto(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onProfileUpdate({ ...userProfile, avatar: null });
    setIsEditingPhoto(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-lg border border-border">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-surface border-4 border-surface shadow-md">
            {userProfile.avatar ? (
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-semibold">
                {getInitials(userProfile.name)}
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsEditingPhoto(!isEditingPhoto)}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary-600 transition-colors"
            title={t.editPhoto}
          >
            <Icon name="Camera" size={16} />
          </button>

          {/* Photo Edit Menu */}
          {isEditingPhoto && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-surface rounded-lg shadow-elevation border border-border z-50">
              <div className="py-2">
                <label className="flex items-center space-x-3 px-4 py-2 hover:bg-surface-50 cursor-pointer transition-colors">
                  <Icon name="Upload" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">{t.uploadPhoto}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {userProfile.avatar && (
                  <button
                    onClick={handleRemovePhoto}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-error-50 text-error transition-colors"
                  >
                    <Icon name="Trash2" size={16} />
                    <span className="text-sm">{t.removePhoto}</span>
                  </button>
                )}
                <button
                  onClick={() => setIsEditingPhoto(false)}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-surface-50 text-text-secondary transition-colors"
                >
                  <Icon name="X" size={16} />
                  <span className="text-sm">{t.cancel}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <h1 className="text-2xl font-bold text-text-primary">{userProfile.name}</h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${membershipBadge.color}`}>
              <Icon name="Award" size={12} className="mr-1" />
              {membershipBadge.label}
            </span>
          </div>
          
          <p className="text-text-secondary mt-1">{userProfile.email}</p>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-8 mt-4">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm text-text-secondary">
                {t.memberSince} {new Date(userProfile.memberSince).toLocaleDateString(
                  currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR',
                  { year: 'numeric', month: 'long' }
                )}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-accent" />
              <span className="text-sm text-text-secondary">
                {t.loyaltyPoints}: <span className="font-semibold text-text-primary">{userProfile.loyaltyPoints.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;