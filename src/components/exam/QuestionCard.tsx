import React, { useState } from 'react';
import { HelpCircle, Lightbulb } from 'lucide-react';
import { Question } from '../../types';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  currentAnswer?: string | number;
  onAnswerChange: (answer: string | number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  onAnswerChange
}) => {
  const [textAnswer, setTextAnswer] = useState(
    typeof currentAnswer === 'string' ? currentAnswer : ''
  );
  const [showHint, setShowHint] = useState(false);

  const handleTextChange = (value: string) => {
    setTextAnswer(value);
    onAnswerChange(value);
  };

  const handleOptionSelect = (index: number) => {
    onAnswerChange(index);
  };

  const getQuestionHint = (questionText: string) => {
    // Hints basés sur le type de question
    if (questionText.toLowerCase().includes('leader transformationnel')) {
      return 'Pensez aux caractéristiques qui distinguent un leader transformationnel : vision, inspiration, développement des autres.';
    }
    if (questionText.toLowerCase().includes('conflit')) {
      return 'Un bon leader facilite la résolution de conflits plutôt que de les éviter ou de prendre parti.';
    }
    if (questionText.toLowerCase().includes('communication')) {
      return 'La communication est essentielle pour créer la confiance et aligner les équipes sur les objectifs.';
    }
    if (questionText.toLowerCase().includes('développer') && questionText.toLowerCase().includes('équipe')) {
      return 'Décrivez une approche structurée : évaluation, formation, mentorat, délégation progressive, feedback.';
    }
    return 'Réfléchissez aux meilleures pratiques en leadership et donnez des exemples concrets de votre expérience.';
  };
  return (
    <Card className="mb-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-blue-600">
            Question {questionNumber} sur {totalQuestions}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {question.points} point{question.points > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-gray-400 hover:text-blue-600 transition-colors"
              title="Voir l'indice"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
          {question.text}
        </h3>
        
        {showHint && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">Indice :</p>
                <p className="text-sm text-yellow-700">{getQuestionHint(question.text)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                currentAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={index}
                checked={currentAnswer === index}
                onChange={() => handleOptionSelect(index)}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-900 leading-relaxed">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'text' && (
        <div>
          <textarea
            value={textAnswer}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={8}
            placeholder="Saisissez votre réponse détaillée ici..."
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Développez votre réponse avec des exemples concrets</span>
              {textAnswer.length < 50 && (
                <span className="text-orange-600">Réponse trop courte</span>
              )}
            </div>
            <span>{textAnswer.length} caractères</span>
          </div>
          {textAnswer.length >= 200 && (
            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
              ✓ Réponse détaillée - Continuez à développer vos idées
            </div>
          )}
        </div>
      )}
    </Card>
  );
};