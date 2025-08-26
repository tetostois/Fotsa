import React, { useState } from 'react';
import { CreditCard, Smartphone, Phone, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  candidateLevel?: 'debutant' | 'intermediaire' | 'expert';
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onPaymentSuccess, candidateLevel }) => {
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'cinetpay'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
      description: 'Paiement par carte bancaire (Visa, MasterCard)'
    },
    {
      id: 'cinetpay' as const,
      name: 'CinetPay',
      icon: <Smartphone className="h-6 w-6 text-blue-500" />,
      description: 'Paiement mobile (Orange Money, MTN Money, Moov)'
    }
  ];

  return (
    <Card className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Paiement</h2>
        <p className="text-gray-600 mt-2">Montant à payer: {formatPrice(amount)}</p>
      </div>

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
              </div>
              {selectedMethod === method.id && (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedMethod === 'stripe' && (
        <div className="space-y-4 mb-6">
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
        </div>
      )}

      {selectedMethod === 'cinetpay' && (
        <div className="mb-6">
          <Input
            label="Numéro de téléphone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+237 6XX XXX XXX"
            required
          />
        </div>
      )}

      <Button
        onClick={handlePayment}
        className="w-full"
        size="lg"
        isLoading={isProcessing}
        disabled={
          (selectedMethod === 'stripe' && (!cardNumber || !expiryDate || !cvv)) ||
          (selectedMethod === 'cinetpay' && !phoneNumber)
        }
      >
        {isProcessing ? 'Traitement en cours...' : `Payer ${formatPrice(amount)}`}
      </Button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Paiement sécurisé • Vos données sont protégées
        </p>
      </div>
    </Card>
  );
};