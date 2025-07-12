import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import StudySession from "./components/StudySession";
import CreateCard from "./components/CreateCard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import OfflineIndicator from "./components/OfflineIndicator";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import MobileService from "./services/MobileService";
import OfflineService from "./services/OfflineService";

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize mobile services
      await MobileService.initialize();
      
      // Check authentication status
      const isAuth = await OfflineService.isAuthenticated();
      if (isAuth) {
        const currentUser = await OfflineService.getCurrentUser();
        setUser(currentUser);
        
        // Schedule daily study reminder
        if (currentUser) {
          await MobileService.scheduleStudyReminder(20, 0); // 8 PM daily
        }
      }
      
      // Setup network status listener
      MobileService.addNetworkListener((online) => {
        setIsOnline(online);
        if (online) {
          toast({
            title: "Back Online! 🌐",
            description: "Syncing your progress...",
          });
        } else {
          toast({
            title: "Offline Mode 📱",
            description: "You can continue studying offline!",
          });
        }
      });
      
    } catch (error) {
      console.error('Error initializing app:', error);
      toast({
        title: "Initialization Error",
        description: "Some features may not work properly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = async (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
    
    // Save authentication state
    await MobileService.setItem('user', userData);
    await MobileService.setItem('isAuthenticated', true);
    
    // Schedule study reminders
    await MobileService.scheduleStudyReminder(20, 0);
    
    toast({
      title: "Welcome! 🎉",
      description: `Hi ${userData.name}! Ready to learn IT English?`,
    });
  };

  const handleLogout = async () => {
    await OfflineService.logout();
    setUser(null);
    setCurrentView('dashboard');
    
    toast({
      title: "Logged Out",
      description: "See you soon! Keep up the great learning.",
    });
  };

  const handleStartStudy = (category) => {
    setSelectedCategory(category);
    setCurrentView('study');
  };

  const handleStudyComplete = async (sessionStats) => {
    setCurrentView('dashboard');
    setSelectedCategory(null);
    
    // Save study session
    await OfflineService.saveStudySession({
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      ...sessionStats,
      date: new Date().toISOString().split('T')[0]
    });
    
    // Update user progress
    if (user) {
      const updatedProgress = {
        ...user.preferences,
        totalWordsLearned: user.preferences.totalWordsLearned + sessionStats.total,
        studyStreak: user.preferences.studyStreak + (sessionStats.correct > 0 ? 1 : 0)
      };
      
      setUser(prev => ({
        ...prev,
        preferences: updatedProgress
      }));
      
      await OfflineService.updateUserProgress(updatedProgress);
      
      // Show streak notification if applicable
      if (sessionStats.correct > 0) {
        await MobileService.scheduleStreakNotification(updatedProgress.studyStreak);
      }
    }
  };

  const handleCreateCard = () => {
    setCurrentView('create');
  };

  const handleCardCreated = async (cardData) => {
    setCurrentView('dashboard');
    
    // Save the card
    await OfflineService.createCard(cardData);
    
    toast({
      title: "Card Created! 📝",
      description: isOnline ? "Your card has been saved and synced." : "Your card has been saved offline.",
    });
  };

  const handleProfile = () => {
    setCurrentView('profile');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl text-white mx-auto animate-pulse">
            💻
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Loading IT English Learning...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthPage onAuthSuccess={handleAuthSuccess} />
        <OfflineIndicator isOnline={isOnline} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar 
        user={user} 
        onLogout={handleLogout}
        onProfile={handleProfile}
        onDashboard={handleBackToDashboard}
        currentView={currentView}
      />
      
      <OfflineIndicator isOnline={isOnline} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            onStartStudy={handleStartStudy}
            onCreateCard={handleCreateCard}
          />
        )}
        
        {currentView === 'study' && selectedCategory && (
          <StudySession
            category={selectedCategory}
            user={user}
            onBack={handleBackToDashboard}
            onComplete={handleStudyComplete}
          />
        )}
        
        {currentView === 'create' && (
          <CreateCard
            user={user}
            onBack={handleBackToDashboard}
            onCardCreated={handleCardCreated}
          />
        )}
        
        {currentView === 'profile' && (
          <Profile
            user={user}
            onBack={handleBackToDashboard}
          />
        )}
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;