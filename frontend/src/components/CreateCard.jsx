import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { supportedLanguages, difficultyLevels } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const CreateCard = ({ user, onBack, onCardCreated }) => {
  const [cardData, setCardData] = useState({
    word: '',
    definition: '',
    example: '',
    difficulty: '',
    translations: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTranslationChange = (language, value) => {
    setCardData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [language]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!cardData.word || !cardData.definition || !cardData.example || !cardData.difficulty) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would save to backend
      const newCard = {
        id: Date.now(),
        categoryId: 6, // Custom cards category
        ...cardData,
        mastered: false,
        reviewCount: 0,
        lastReviewed: null
      };

      console.log('New card created:', newCard);
      
      toast({
        title: "Card Created! 🎉",
        description: "Your custom vocabulary card has been added to your collection.",
      });

      onCardCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = (wordData) => {
    setCardData(prev => ({
      ...prev,
      ...wordData
    }));
  };

  // Quick add suggestions for IT terms
  const quickAddSuggestions = [
    {
      word: "Deployment",
      definition: "The process of releasing and installing a software application on a server or device",
      example: "The deployment of the new feature went smoothly without any downtime."
    },
    {
      word: "Repository",
      definition: "A central location where data or code is stored and managed",
      example: "Push your changes to the Git repository before the end of the day."
    },
    {
      word: "Debugging",
      definition: "The process of finding and fixing errors or bugs in computer programs",
      example: "I spent hours debugging the authentication issue in the login system."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
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
          <h1 className="text-2xl font-bold text-gray-900">Create Custom Card</h1>
          <p className="text-gray-600">Add your own IT vocabulary words to practice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>New Vocabulary Card</span>
              </CardTitle>
              <CardDescription>
                Create a custom flashcard with word, definition, example, and translations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="word">Word *</Label>
                    <Input
                      id="word"
                      value={cardData.word}
                      onChange={(e) => handleInputChange('word', e.target.value)}
                      placeholder="Enter the English word"
                      className="transition-all duration-200 focus:ring-4 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select 
                      value={cardData.difficulty} 
                      onValueChange={(value) => handleInputChange('difficulty', value)}
                      required
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-4 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.level} value={level.level}>
                            <span className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              <span>{level.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="definition">Definition *</Label>
                  <Textarea
                    id="definition"
                    value={cardData.definition}
                    onChange={(e) => handleInputChange('definition', e.target.value)}
                    placeholder="Provide a clear definition of the word"
                    className="min-h-[80px] transition-all duration-200 focus:ring-4 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="example">Example Sentence *</Label>
                  <Textarea
                    id="example"
                    value={cardData.example}
                    onChange={(e) => handleInputChange('example', e.target.value)}
                    placeholder="Write an example sentence using the word"
                    className="min-h-[80px] transition-all duration-200 focus:ring-4 focus:ring-blue-500/20"
                    required
                  />
                </div>

                {/* Translations */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Translations</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supportedLanguages.filter(lang => lang.code !== 'english').map((language) => (
                      <div key={language.code} className="space-y-2">
                        <Label htmlFor={`translation-${language.code}`}>
                          <span className="flex items-center gap-2">
                            <span>{language.flag}</span>
                            <span>{language.name}</span>
                          </span>
                        </Label>
                        <Input
                          id={`translation-${language.code}`}
                          value={cardData.translations[language.code] || ''}
                          onChange={(e) => handleTranslationChange(language.code, e.target.value)}
                          placeholder={`Translation in ${language.name}`}
                          className="transition-all duration-200 focus:ring-4 focus:ring-blue-500/20"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? "Creating..." : "Create Card"}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Add Suggestions */}
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Add Suggestions</CardTitle>
              <CardDescription>
                Popular IT terms you might want to add
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickAddSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  onClick={() => handleQuickAdd(suggestion)}
                >
                  <h4 className="font-medium text-gray-900">{suggestion.word}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {suggestion.definition}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-800">💡 Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-yellow-700">
              <p>• Use simple, clear definitions</p>
              <p>• Make examples relevant to IT context</p>
              <p>• Include translations for better learning</p>
              <p>• Start with beginner level if unsure</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;