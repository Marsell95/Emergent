import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import StudySession from "./components/StudySession";
import CreateCard from "./components/CreateCard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import { mockAuth } from "./data/mock";

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    if (mockAuth.isAuthenticated()) {
      const currentUser = mockAuth.getCurrentUser();
      setUser(currentUser);
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    mockAuth.logout();
    setUser(null);
    setCurrentView('dashboard');
  };

  const handleStartStudy = (category) => {
    setSelectedCategory(category);
    setCurrentView('study');
  };

  const handleStudyComplete = () => {
    setCurrentView('dashboard');
    setSelectedCategory(null);
  };

  const handleCreateCard = () => {
    setCurrentView('create');
  };

  const handleCardCreated = () => {
    setCurrentView('dashboard');
  };

  const handleProfile = () => {
    setCurrentView('profile');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCategory(null);
  };

  if (!user) {
    return (
      <>
        <AuthPage onAuthSuccess={handleAuthSuccess} />
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