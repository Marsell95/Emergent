import MobileService from './MobileService';
import { mockAuth, flashcards, userProgress, cardCategories } from '../data/mock';

class OfflineService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.pendingSync = [];
    this.setupNetworkListeners();
  }

  setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Authentication with offline support
  async login(email, password) {
    if (this.isOnline) {
      const result = await mockAuth.login(email, password);
      if (result.success) {
        await MobileService.setItem('user', result.user);
        await MobileService.setItem('isAuthenticated', true);
      }
      return result;
    } else {
      // Offline login - check cached credentials
      const cachedUser = await MobileService.getItem('user');
      const isAuth = await MobileService.getItem('isAuthenticated');
      
      if (cachedUser && isAuth) {
        return { success: true, user: cachedUser };
      } else {
        return { success: false, error: 'No offline login data available' };
      }
    }
  }

  async logout() {
    await MobileService.removeItem('user');
    await MobileService.removeItem('isAuthenticated');
    await MobileService.cancelAllNotifications();
  }

  async isAuthenticated() {
    return await MobileService.getItem('isAuthenticated') || false;
  }

  async getCurrentUser() {
    return await MobileService.getItem('user');
  }

  // Flashcard data with offline support
  async getFlashcards(categoryId = null) {
    let cards;
    
    if (this.isOnline) {
      // In real app, this would be an API call
      cards = flashcards;
      // Cache for offline use
      await MobileService.saveFlashcards(cards);
    } else {
      // Get from offline storage
      const offlineData = await MobileService.getItem('flashcards');
      cards = offlineData ? offlineData.cards : flashcards;
    }

    return categoryId ? cards.filter(card => card.categoryId === categoryId) : cards;
  }

  async getCategories() {
    if (this.isOnline) {
      await MobileService.setItem('categories', cardCategories);
      return cardCategories;
    } else {
      const cached = await MobileService.getItem('categories');
      return cached || cardCategories;
    }
  }

  // Progress tracking with offline support
  async saveStudySession(sessionData) {
    await MobileService.saveStudySession(sessionData);
    
    if (this.isOnline) {
      // In real app, sync with backend
      console.log('Study session synced:', sessionData);
    } else {
      // Queue for later sync
      this.pendingSync.push({
        type: 'studySession',
        data: sessionData,
        timestamp: Date.now()
      });
    }
  }

  async getUserProgress() {
    if (this.isOnline) {
      await MobileService.saveUserProgress(userProgress);
      return userProgress;
    } else {
      const cached = await MobileService.getItem('userProgress');
      return cached || userProgress;
    }
  }

  async updateUserProgress(newProgress) {
    await MobileService.saveUserProgress(newProgress);
    
    if (this.isOnline) {
      // Sync with backend
      console.log('Progress synced:', newProgress);
    } else {
      this.pendingSync.push({
        type: 'userProgress',
        data: newProgress,
        timestamp: Date.now()
      });
    }
  }

  // Custom card creation with offline support
  async createCard(cardData) {
    const newCard = {
      id: Date.now(),
      categoryId: 6, // Custom cards category
      ...cardData,
      mastered: false,
      reviewCount: 0,
      lastReviewed: null,
      createdOffline: !this.isOnline
    };

    // Add to local storage
    const existingCards = await this.getFlashcards();
    const updatedCards = [...existingCards, newCard];
    await MobileService.saveFlashcards(updatedCards);

    if (this.isOnline) {
      // Sync with backend
      console.log('New card synced:', newCard);
    } else {
      this.pendingSync.push({
        type: 'createCard',
        data: newCard,
        timestamp: Date.now()
      });
    }

    return newCard;
  }

  async updateCard(cardId, updates) {
    const cards = await this.getFlashcards();
    const cardIndex = cards.findIndex(card => card.id === cardId);
    
    if (cardIndex !== -1) {
      cards[cardIndex] = { ...cards[cardIndex], ...updates };
      await MobileService.saveFlashcards(cards);
      
      if (this.isOnline) {
        console.log('Card update synced:', updates);
      } else {
        this.pendingSync.push({
          type: 'updateCard',
          data: { cardId, updates },
          timestamp: Date.now()
        });
      }
    }
  }

  // Sync management
  async syncPendingData() {
    if (!this.isOnline || this.pendingSync.length === 0) return;

    console.log(`Syncing ${this.pendingSync.length} pending items...`);
    
    for (const item of this.pendingSync) {
      try {
        switch (item.type) {
          case 'studySession':
            // Sync study session with backend
            console.log('Syncing study session:', item.data);
            break;
          case 'userProgress':
            // Sync user progress with backend
            console.log('Syncing user progress:', item.data);
            break;
          case 'createCard':
            // Sync new card with backend
            console.log('Syncing new card:', item.data);
            break;
          case 'updateCard':
            // Sync card update with backend
            console.log('Syncing card update:', item.data);
            break;
        }
      } catch (error) {
        console.error('Error syncing item:', item, error);
      }
    }
    
    // Clear pending sync after successful sync
    this.pendingSync = [];
    console.log('All pending data synced successfully');
  }

  async getPendingSyncCount() {
    return this.pendingSync.length;
  }

  async getOfflineStats() {
    const offlineData = await MobileService.getOfflineData();
    return {
      isOnline: this.isOnline,
      pendingSyncCount: this.pendingSync.length,
      offlineSessionsCount: offlineData.studySessions.filter(s => !s.synced).length,
      lastSync: offlineData.userProgress.lastUpdated || null,
      totalOfflineCards: offlineData.flashcards.cards.length
    };
  }
}

export default new OfflineService();