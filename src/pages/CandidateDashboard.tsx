import React, { useState } from 'react';
import { CheckCircle, Clock, CreditCard, FileText, BookOpen, AlertCircle, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useExam } from '../contexts/ExamContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PaymentForm } from '../components/payment/PaymentForm';
import { Input } from '../components/ui/Input';

export const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();
  const { startExam, getExamByLevel } = useExam();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(user?.hasPaid || false);
  const [examStarted, setExamStarted] = useState(false);
  const [showExamInstructions, setShowExamInstructions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profession: user?.profession || '',
    level: user?.level || 'debutant'
  });
  
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: ''
  });

  if (!user) return null;

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setShowPayment(false);
    // Mise à jour du statut utilisateur
    user.hasPaid = true;
  };

  const handleStartExam = () => {
    if (!user.level) {
      alert('Veuillez définir votre niveau dans votre profil avant de commencer l\'examen.');
      return;
    }
    startExam(user.level);
    setExamStarted(true);
  };
  
  const saveProfile = () => {
    // Simulation de la sauvegarde
    console.log('Profil mis à jour:', profileForm);
    alert('Profil mis à jour avec succès !');
    setShowProfileModal(false);
  };
  
  const sendSupportMessage = () => {
    if (!supportForm.subject || !supportForm.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    console.log('Message de support envoyé:', supportForm);
    alert('Votre message a été envoyé au support !');
    setSupportForm({ subject: '', message: '' });
    setShowSupportModal(false);
  };

  // Obtenir les détails de l'examen selon le niveau
  const currentExamDetails = user.level ? getExamByLevel(user.level) : null;

  const steps = [
    {
      id: 'payment',
      title: 'Paiement',
      description: 'Régler les frais d\'examen',
      completed: paymentCompleted,
      current: !paymentCompleted
    },
    {
      id: 'exam',
      title: 'Examen',
      description: 'Passer l\'évaluation',
      completed: user.examTaken || false,
      current: paymentCompleted && !user.examTaken && !examStarted
    },
    {
      id: 'correction',
      title: 'Correction',
      description: 'Attendre l\'évaluation',
      completed: user.score !== undefined,
      current: user.examTaken === true && user.score === undefined
    },
    {
      id: 'certificate',
      title: 'Certification',
      description: 'Récupérer l\'attestation',
      completed: user.certificate !== undefined,
      current: user.score !== undefined && user.certificate === undefined
    }
  ];

  if (examStarted) {
    // Redirection vers l'interface d'examen
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-600 mt-2">
            Suivez votre progression vers la certification en leadership
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Votre Progression</h2>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    step.completed 
                      ? 'bg-green-600 text-white'
                      : step.current
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="max-w-xs">
                    <p className="font-medium text-sm text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 -z-10">
              <div 
                className="h-full bg-green-600 transition-all duration-500"
                style={{
                  width: `${(steps.filter(s => s.completed).length / (steps.length - 1)) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!paymentCompleted && (
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Paiement requis
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Pour accéder à l'examen, vous devez d'abord régler les frais de certification.
                    </p>
                    {currentExamDetails && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-900 font-medium">Examen niveau {user.level} :</span>
                          <span className="text-sm text-blue-700 capitalize">{currentExamDetails.title}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-900 font-medium">Durée :</span>
                          <span className="text-blue-700">{currentExamDetails.duration} minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-900 font-medium">Montant à payer :</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'XAF',
                              minimumFractionDigits: 0
                            }).format(currentExamDetails.price)}
                          </span>
                        </div>
                      </div>
                    )}
                    <Button onClick={() => setShowPayment(true)}>
                      Procéder au paiement
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {paymentCompleted && !user.examTaken && !examStarted && (
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Prêt pour l'examen
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Votre paiement a été confirmé. Vous pouvez maintenant passer l'examen de certification.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Important :</span>
                      </div>
                      <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                        <li>• L'examen dure exactement 60 minutes</li>
                        <li>• Une fois commencé, vous ne pourrez pas le mettre en pause</li>
                        <li>• Assurez-vous d'avoir une connexion internet stable</li>
                        <li>• Préparez un environnement calme et sans distractions</li>
                      </ul>
                    </div>
                    <div className="flex space-x-3">
                      <Button onClick={() => setShowExamInstructions(true)}>
                        Commencer l'examen
                      </Button>
                      <Button variant="secondary">
                        Voir les instructions détaillées
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {user.examTaken && !user.score && (
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Examen soumis
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Votre examen a été soumis avec succès et est en cours de correction par nos examinateurs.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Délai de correction : 48-72 heures
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {user.score !== undefined && (
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Résultats disponibles
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Félicitations ! Votre examen a été corrigé et votre certificat est prêt.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-800 font-medium">Score obtenu :</span>
                        <span className="text-2xl font-bold text-green-600">{user.score}/100</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        {user.score >= 70 ? 'Certification réussie !' : 'Score insuffisant pour la certification'}
                      </p>
                    </div>
                    {user.score >= 70 && (
                      <Button className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Télécharger le certificat</span>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Informations</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Profil</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowProfileModal(true)}
                >
                  Modifier
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email :</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Téléphone :</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Profession :</span>
                  <span className="font-medium">{user.profession}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Niveau :</span>
                  <span className="font-medium capitalize">{user.level || 'Non défini'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Statut :</span>
                  <span className={`font-medium ${
                    user.score !== undefined ? 'text-green-600' :
                    user.examTaken ? 'text-blue-600' :
                    paymentCompleted ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {user.score !== undefined ? 'Certifié' :
                     user.examTaken ? 'En correction' :
                     paymentCompleted ? 'Prêt pour examen' : 'En attente de paiement'}
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Support</h3>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowSupportModal(true)}
                >
                  Contacter
                </Button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-4">Détails de l'examen</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durée :</span>
                  <span className="font-medium">
                    {currentExamDetails ? `${currentExamDetails.duration} minutes` : 'Non défini'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Questions :</span>
                  <span className="font-medium">
                    {currentExamDetails ? `${currentExamDetails.questions.length} questions` : 'Non défini'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Score minimum :</span>
                  <span className="font-medium">70/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Format :</span>
                  <span className="font-medium">QCM + Texte libre</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prix :</span>
                  <span className="font-medium">
                    {currentExamDetails ? 
                      new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'XAF',
                        minimumFractionDigits: 0
                      }).format(currentExamDetails.price) : 'Non défini'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Modifier mon profil</h3>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Prénom"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                />
                <Input
                  label="Nom"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                />
                <Input
                  label="Téléphone"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                />
                <Input
                  label="Profession"
                  value={profileForm.profession}
                  onChange={(e) => setProfileForm({...profileForm, profession: e.target.value})}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <select
                    value={profileForm.level}
                    onChange={(e) => setProfileForm({...profileForm, level: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button variant="secondary" onClick={() => setShowProfileModal(false)} className="flex-1">
                  Annuler
                </Button>
                <Button onClick={saveProfile} className="flex-1">
                  Sauvegarder
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Contacter le support</h3>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <select
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner un sujet</option>
                    <option value="payment">Problème de paiement</option>
                    <option value="exam">Question sur l'examen</option>
                    <option value="technical">Problème technique</option>
                    <option value="certificate">Certificat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Décrivez votre problème ou votre question..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button variant="secondary" onClick={() => setShowSupportModal(false)} className="flex-1">
                  Annuler
                </Button>
                <Button onClick={sendSupportMessage} className="flex-1">
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-1">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Paiement de l'examen</h3>
              <button 
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <PaymentForm 
                amount={currentExamDetails?.price || 50000}
                candidateLevel={user.level}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        </div>
      )}

      {/* Exam Instructions Modal */}
      {showExamInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Instructions de l'examen</h3>
              <button 
                onClick={() => setShowExamInstructions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Règles importantes :</h4>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                  <li>L'examen dure exactement 60 minutes et ne peut pas être interrompu</li>
                  <li>Il contient 5 questions : 3 QCM et 2 questions ouvertes</li>
                  <li>Vous pouvez naviguer entre les questions et modifier vos réponses</li>
                  <li>La soumission est automatique à la fin du temps imparti</li>
                  <li>Assurez-vous d'avoir une connexion internet stable</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Conseils :</h4>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                  <li>Lisez attentivement chaque question avant de répondre</li>
                  <li>Gérez votre temps efficacement</li>
                  <li>Pour les questions ouvertes, donnez des exemples concrets</li>
                  <li>Vérifiez vos réponses avant la soumission finale</li>
                </ul>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowExamInstructions(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={handleStartExam}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Commencer l'examen
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};