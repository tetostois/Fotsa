import React, { useState } from 'react';
import { CreditCard, Smartphone, Phone, CheckCircle, Shield, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  certificationType: string;
  paymentType: 'full' | 'per-module';
  moduleId?: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  onPaymentSuccess, 
  certificationType,
  paymentType,
  moduleId 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'cinetpay'>('cinetpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'details' | 'processing'>('method');
  
  // Stripe fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  // CinetPay fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileProvider, setMobileProvider] = useState<'orange' | 'mtn' | 'moov'>('orange');
  const [pin, setPin] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulation du paiement
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    onPaymentSuccess();
  };

  const paymentMethods = [
    {
      id: 'stripe' as const,
      name: 'Stripe',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Paiement par carte bancaire (Visa, MasterCard)',
      fees: '2.9% + 30 FCFA',
      processingTime: 'Instantané'
    },
    {
      id: 'cinetpay' as const,
      name: 'CinetPay',
      icon: <Smartphone className="h-6 w-6 text-blue-500" />,
      description: 'Paiement mobile (Orange Money, MTN Money, Moov)',
      fees: '1.5% + 100 FCFA',
      processingTime: '1-3 minutes'
    setStep('processing');
    setIsProcessing(true);
  ];
    try {
      if (selectedMethod === 'stripe') {
        // Simulation paiement Stripe
        await simulateStripePayment();
      } else {
        // Simulation paiement CinetPay
        await simulateCinetPayPayment();
      }
      
      onPaymentSuccess();
    } catch (error) {
      console.error('Erreur de paiement:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
      setStep('details');
    }
    { id: 'orange' as const, name: 'Orange Money', color: 'bg-orange-500' },
    { id: 'mtn' as const, name: 'MTN Money', color: 'bg-yellow-500' },
  ];

  const simulateStripePayment = async () => {
    // Simulation des étapes Stripe
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Validation de la carte...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Traitement du paiement...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Paiement confirmé');
  };

  const simulateCinetPayPayment = async () => {
    // Simulation des étapes CinetPay
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Connexion au service mobile...');
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log('Envoi de la demande de paiement...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Confirmation du paiement mobile');
  };

  const canProceed = () => {
    if (selectedMethod === 'stripe') {
      return cardNumber && expiryDate && cvv && cardName;
    } else {
      return phoneNumber && pin;
    }
  };

  if (step === 'processing') {
    return (
      <Card className="max-w-md mx-auto text-center">
        <div className="py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Traitement du paiement...
          </h3>
          <p className="text-gray-600 mb-4">
            {selectedMethod === 'stripe' 
              ? 'Validation de votre carte bancaire en cours'
              : 'Envoi de la demande à votre opérateur mobile'
            }
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">
              Ne fermez pas cette fenêtre pendant le traitement
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Paiement</h2>
        <p className="text-gray-600 mt-2">
          {paymentType === 'full' ? 'Certification complète' : 'Paiement par module'}
        </p>
        <p className="text-lg font-semibold text-gray-900 mt-1">
          Montant: {formatPrice(amount)}
        </p>
      </div>

      {step === 'method' && (
        <>
          <div className="space-y-4 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    selectedMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">Frais: {method.fees}</span>
                      <span className="text-xs text-gray-500">{method.processingTime}</span>
                    </div>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setStep('details')}
            className="w-full"
            size="lg"
          >
            Continuer avec {paymentMethods.find(m => m.id === selectedMethod)?.name}
          </Button>
        </>
      )}

      {step === 'details' && (
        <>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                {paymentMethods.find(m => m.id === selectedMethod)?.name}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setStep('method')}
              >
                Changer
              </Button>
            </div>
          </div>

          {selectedMethod === 'stripe' && (
            <div className="space-y-4 mb-6">
              <Input
                label="Nom sur la carte"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Jean Dupont"
                required
              />
              <Input
                label="Numéro de carte"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date d'expiration"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/AA"
                  required
                />
                <Input
                  label="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Paiement sécurisé SSL 256-bit</span>
              </div>
            </div>
          )}

          {selectedMethod === 'cinetpay' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opérateur mobile
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {mobileProviders.map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => setMobileProvider(provider.id)}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        mobileProvider === provider.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${provider.color} mx-auto mb-1`}></div>
                      <span className="text-xs font-medium">{provider.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <Input
                label="Numéro de téléphone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+237 6XX XXX XXX"
                required
              />
              
              <Input
                label="Code PIN"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
              />
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Lock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Instructions :</p>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Vérifiez que votre compte mobile a suffisamment de fonds</li>
                      <li>Vous recevrez un SMS de confirmation</li>
                      <li>Entrez votre code PIN pour valider</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handlePayment}
              className="w-full"
              size="lg"
              disabled={!canProceed()}
            >
              Payer {formatPrice(amount)}
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => setStep('method')}
              className="w-full"
            >
              Retour
            </Button>
          </div>
        </>
      )}

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Paiement sécurisé • Vos données sont protégées
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Support: +237 6XX XXX XXX
        </p>
      </div>
    </Card>
  );
};