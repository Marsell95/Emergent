import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, RotateCcw, Check, X, Volume2 } from 'lucide-react';
import { mockStudy, supportedLanguages } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const StudySession = ({ category, user, onBack, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const sessionCards = mockStudy.startSession(category.id);
    setCards(sessionCards);
  }, [category.id]);

  const currentCard = cards[currentCardIndex];
  const progressPercent = ((currentCardIndex + 1) / cards.length) * 100;
  const userLanguage = user.preferences?.nativeLanguage || 'ukrainian';

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (wasCorrect) => {
    if (!currentCard) return;

    const newStats = {
      ...sessionStats,
      total: sessionStats.total + 1,
      correct: wasCorrect ? sessionStats.correct + 1 : sessionStats.correct,
      incorrect: wasCorrect ? sessionStats.incorrect : sessionStats.incorrect + 1
    };
    setSessionStats(newStats);

    // Mark card as reviewed
    mockStudy.markCardReviewed(currentCard.id, wasCorrect);

    // Move to next card or complete session
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Session complete
      mockStudy.updateProgress(newStats);
      toast({
        title: "Session Complete! 🎉",
        description: `Great job! You studied ${newStats.total} cards with ${Math.round((newStats.correct / newStats.total) * 100)}% accuracy.`,
      });
      onComplete(newStats);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading study session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600">Card {currentCardIndex + 1} of {cards.length}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart</span>
          </Button>
          <div className="text-sm text-gray-600">
            Score: {sessionStats.correct}/{sessionStats.total}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-3" />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <div
          className="relative w-full max-w-2xl h-96 perspective-1000 cursor-pointer"
          onClick={handleCardFlip}
        >
          <div
            className={`w-full h-full relative preserve-3d transition-transform duration-700 ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front of card */}
            <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="h-full flex flex-col justify-center items-center p-8 text-center space-y-6">
                <Badge 
                  className={`${
                    currentCard.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    currentCard.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {currentCard.difficulty}
                </Badge>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <h2 className="text-4xl font-bold text-gray-900">
                      {currentCard.word}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(currentCard.word);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Volume2 className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <p className="text-xl text-gray-600">
                    {currentCard.translations[userLanguage]}
                  </p>
                </div>
                
                <div className="text-sm text-gray-500 bg-blue-50 px-4 py-2 rounded-lg">
                  Click to see definition & example
                </div>
              </CardContent>
            </Card>

            {/* Back of card */}
            <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="h-full flex flex-col justify-center p-8 space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {currentCard.word}
                  </h3>
                  
                  <div className="space-y-4 text-left">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Definition:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {currentCard.definition}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Example:</h4>
                      <p className="text-gray-600 italic leading-relaxed">
                        "{currentCard.example}"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isFlipped && (
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handleAnswer(false)}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <X className="w-5 h-5" />
            <span>Need More Practice</span>
          </Button>
          <Button
            onClick={() => handleAnswer(true)}
            size="lg"
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
          >
            <Check className="w-5 h-5" />
            <span>Got It!</span>
          </Button>
        </div>
      )}

      {/* Instructions */}
      {!isFlipped && (
        <div className="text-center text-gray-500 text-sm">
          <p>Click the card to see the definition and example sentence</p>
        </div>
      )}
    </div>
  );
};

// Add CSS for 3D flip effect
const style = document.createElement('style');
style.textContent = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;
document.head.appendChild(style);

export default StudySession;