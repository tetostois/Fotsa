import React, { useState } from 'react';
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { LandingFooter } from '../components/layout/LandingFooter';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: 'Examen Certifiant',
      description: 'Évaluation complète de vos compétences en leadership avec questions théoriques et pratiques.'
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: 'Session Chronométrée',
      description: 'Examen de 60 minutes avec timer en temps réel pour une évaluation authentique.'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Correction Professionnelle',
      description: 'Évaluation par des examinateurs qualifiés avec feedback détaillé.'
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: 'Certification Officielle',
      description: 'Attestation PDF automatique après validation de votre examen.'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Inscription',
      description: 'Créez votre compte candidat avec vos informations personnelles.'
    },
    {
      number: 2,
      title: 'Paiement',
      description: 'Réglez les frais d\'examen via PayPal, Orange Money ou MTN Money.'
    },
    {
      number: 3,
      title: 'Examen',
      description: 'Passez l\'examen chronométré de 60 minutes en ligne.'
    },
    {
      number: 4,
      title: 'Certification',
      description: 'Recevez votre attestation officielle par email après correction.'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Manager, TechCorp',
      content: 'Cette certification m\'a aidée à développer mes compétences managériales. Le processus est professionnel et rigoureux.',
      rating: 5
    },
    {
      name: 'Jean Kamga',
      role: 'Chef de Projet',
      content: 'Examen bien structuré avec des questions pertinentes. La correction est détaillée et constructive.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <LandingHeader 
        onLoginClick={() => setActiveTab('login')}
        onRegisterClick={() => setActiveTab('register')}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-10 w-10 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Leadership Exam</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Obtenez Votre
                <span className="text-blue-600 block">Certification Leadership</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Évaluez et certifiez vos compétences en leadership avec notre examen professionnel en ligne. 
                Processus sécurisé, correction par des experts, et certification officielle.
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Certification officielle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Correction professionnelle</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">Tarif de l'examen</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-blue-600">50,000</span>
                  <span className="text-blue-600">FCFA</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">Paiement sécurisé • Certificat inclus</p>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl shadow-xl p-2">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`flex-1 py-3 px-4 text-center font-medium rounded-t-lg transition-colors ${
                      activeTab === 'login'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab('login')}
                  >
                    Connexion
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 text-center font-medium rounded-t-lg transition-colors ${
                      activeTab === 'register'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab('register')}
                  >
                    Inscription
                  </button>
                </div>
                
                <div className="p-6">
                  {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Notre Certification ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un processus rigoureux et professionnel pour évaluer vos compétences en leadership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment Ça Marche ?
            </h2>
            <p className="text-lg text-gray-600">
              4 étapes simples pour obtenir votre certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-1/2 transform translate-x-6">
                    <ArrowRight className="h-6 w-6 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ce Que Disent Nos Candidats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à Obtenir Votre Certification ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines de professionnels qui ont déjà validé leurs compétences
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => setActiveTab('register')}
          >
            Commencer Maintenant
          </Button>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};