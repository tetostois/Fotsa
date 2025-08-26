import React from 'react';
import { CheckCircle, Clock, Lock, Play } from 'lucide-react';
import { CertificationType, CertificationModule } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ModuleProgressProps {
  certification: CertificationType;
  completedModules: string[];
  currentModule?: string;
  onStartModule: (moduleId: string) => void;
  onContinueModule: (moduleId: string) => void;
  examStartDate?: string;
}

export const ModuleProgress: React.FC<ModuleProgressProps> = ({
  certification,
  completedModules,
  currentModule,
  onStartModule,
  onContinueModule,
  examStartDate
}) => {
  const getModuleStatus = (module: CertificationModule, index: number) => {
    if (completedModules.includes(module.id)) {
      return 'completed';
    }
    if (currentModule === module.id) {
      return 'current';
    }
    if (index === 0 || completedModules.includes(certification.modules[index - 1].id)) {
      return 'available';
    }
    return 'locked';
  };

  const getTimeRemaining = () => {
    if (!examStartDate) return null;
    
    const startDate = new Date(examStartDate);
    const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 jours
    const now = new Date();
    const remaining = endDate.getTime() - now.getTime();
    
    if (remaining <= 0) return 'Expiré';
    
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) {
      return `${days}j ${hours}h restantes`;
    }
    return `${hours}h restantes`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'current':
        return <Play className="h-6 w-6 text-blue-600" />;
      case 'available':
        return <Clock className="h-6 w-6 text-orange-600" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'current':
        return 'border-blue-200 bg-blue-50';
      case 'available':
        return 'border-orange-200 bg-orange-50';
      case 'locked':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200';
    }
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {certification.name}
        </h2>
        <p className="text-gray-600 mb-4">{certification.description}</p>
        
        {timeRemaining && (
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
            timeRemaining === 'Expiré' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-medium">{timeRemaining}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certification.modules.map((module, index) => {
          const status = getModuleStatus(module, index);
          const isDisabled = status === 'locked' || timeRemaining === 'Expiré';

          return (
            <Card
              key={module.id}
              className={`relative ${getStatusColor(status)} border-2 transition-all duration-200 ${
                !isDisabled ? 'hover:shadow-lg' : 'opacity-60'
              }`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(status)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {module.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {module.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>20 questions</span>
                    <span>60 minutes</span>
                    <span>Module {index + 1}/3</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {status === 'completed' && (
                  <div className="text-center py-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-800">Module terminé</p>
                  </div>
                )}

                {status === 'current' && (
                  <Button
                    onClick={() => onContinueModule(module.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Continuer le module
                  </Button>
                )}

                {status === 'available' && (
                  <Button
                    onClick={() => onStartModule(module.id)}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Commencer le module
                  </Button>
                )}

                {status === 'locked' && (
                  <div className="text-center py-2">
                    <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Terminez le module précédent
                    </p>
                  </div>
                )}
              </div>

              {/* Progress indicator */}
              <div className="absolute top-4 right-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  status === 'completed' ? 'bg-green-600 text-white' :
                  status === 'current' ? 'bg-blue-600 text-white' :
                  status === 'available' ? 'bg-orange-600 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Overall Progress */}
      <Card className="bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Progression globale</h3>
          <span className="text-sm text-gray-600">
            {completedModules.length} / {certification.modules.length} modules
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${(completedModules.length / certification.modules.length) * 100}%`
            }}
          ></div>
        </div>

        {completedModules.length === certification.modules.length && (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Certification terminée !
            </h4>
            <p className="text-sm text-green-700">
              Votre certificat sera disponible après validation par nos examinateurs
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};