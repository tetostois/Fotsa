import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    birthPlace: '',
    city: '',
    country: '',
    profession: '',
    level: 'debutant' as 'debutant' | 'intermediaire' | 'expert',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = await register(formData, formData.password);
    if (!success) {
      setErrors({ email: 'Erreur lors de l\'inscription' });
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Inscription Candidat</h2>
          <p className="text-gray-600 mt-2">Créez votre compte pour passer l'examen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={errors.firstName}
              required
            />
            <Input
              label="Nom"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={errors.lastName}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            required
          />

          <Input
            label="Téléphone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="+237 xxx xxx xxx"
            required
          />

          <Input
            label="Adresse"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Votre adresse complète"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date de naissance"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
            <Input
              label="Lieu de naissance"
              value={formData.birthPlace}
              onChange={(e) => handleChange('birthPlace', e.target.value)}
              placeholder="Ville de naissance"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Ville"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Votre ville actuelle"
            />
            <Input
              label="Pays"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              placeholder="Cameroun"
            />
          </div>

          <Input
            label="Profession"
            value={formData.profession}
            onChange={(e) => handleChange('profession', e.target.value)}
            placeholder="Votre profession actuelle"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Niveau de leadership
            </label>
            <select
              value={formData.level}
              onChange={(e) => handleChange('level', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="expert">Expert</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Ce niveau déterminera le type d'examen qui vous sera attribué
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
              required
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            Créer mon compte
          </Button>
        </form>
      </Card>
    </div>
  );
};