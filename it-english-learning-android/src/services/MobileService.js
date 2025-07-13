import { Capacitor } from '@capacitor/core';
import { Storage } from '@capacitor/storage';
import { LocalNotifications } from '@capacitor/local-notifications';
import { App } from '@capacitor/app';

class MobileService {
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    if (this.isNative) {
      // Initialize notifications
      await this.setupNotifications();
      
      // Initialize app state listeners
      App.addListener('appStateChange', ({ isActive }) => {
        if (isActive) {
          this.onAppResume();
        } else {
          this.onAppPause();
        }
      });
    }
    
    this.initialized = true;
  }

  async setupNotifications() {
    try {
      const permission = await LocalNotifications.requestPermissions();
      if (permission.display === 'granted') {
        console.log('Notification permissions granted');
      }
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  }

  // Local Storage Service
  async setItem(key, value) {
    try {
      if (this.isNative) {
        await Storage.set({
          key,
          value: JSON.stringify(value)
        });
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  async getItem(key) {
    try {
      if (this.isNative) {
        const { value } = await Storage.get({ key });
        return value ? JSON.parse(value) : null;
      } else {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      }
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  }

  async removeItem(key) {
    try {
      if (this.isNative) {
        await Storage.remove({ key });
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }

  async clearStorage() {
    try {
      if (this.isNative) {
        await Storage.clear();
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // Notification Service
  async scheduleStudyReminder(hour = 20, minute = 0) {
    if (!this.isNative) {
      console.log('Study reminder scheduled for web (mock)');
      return;
    }

    try {
      // Clear existing notifications
      await LocalNotifications.cancel({
        notifications: [{ id: 1 }]
      });

      // Schedule daily study reminder
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hour, minute, 0, 0);
      
      // If the time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      await LocalNotifications.schedule({
        notifications: [{
          title: "📚 Time to study!",
          body: "Keep your streak alive! Practice your IT English vocabulary now.",
          id: 1,
          schedule: {
            at: scheduledTime,
            repeats: true,
            every: 'day'
          },
          extra: {
            type: 'study_reminder'
          }
        }]
      });

      console.log('Study reminder scheduled for', scheduledTime);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async scheduleStreakNotification(streakCount) {
    if (!this.isNative) return;

    try {
      await LocalNotifications.schedule({
        notifications: [{
          title: `🔥 ${streakCount} Day Streak!`,
          body: "Amazing progress! You're on fire with your English learning!",
          id: 2,
          schedule: {
            at: new Date(Date.now() + 2000) // Show in 2 seconds
          },
          extra: {
            type: 'streak_achievement',
            streakCount
          }
        }]
      });
    } catch (error) {
      console.error('Error scheduling streak notification:', error);
    }
  }

  async cancelAllNotifications() {
    if (!this.isNative) return;

    try {
      await LocalNotifications.cancelAll();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }

  // Offline Data Management
  async saveStudySession(sessionData) {
    const sessions = await this.getItem('studySessions') || [];
    const sessionWithTimestamp = {
      ...sessionData,
      timestamp: Date.now(),
      synced: !this.isOffline()
    };
    
    sessions.push(sessionWithTimestamp);
    await this.setItem('studySessions', sessions);
    
    // Keep only last 100 sessions
    if (sessions.length > 100) {
      sessions.shift();
      await this.setItem('studySessions', sessions);
    }
  }

  async saveUserProgress(progressData) {
    await this.setItem('userProgress', {
      ...progressData,
      lastUpdated: Date.now(),
      synced: !this.isOffline()
    });
  }

  async saveFlashcards(cards) {
    await this.setItem('flashcards', {
      cards,
      lastUpdated: Date.now()
    });
  }

  async getOfflineData() {
    return {
      studySessions: await this.getItem('studySessions') || [],
      userProgress: await this.getItem('userProgress') || {},
      flashcards: await this.getItem('flashcards') || { cards: [] },
      user: await this.getItem('user') || null
    };
  }

  isOffline() {
    return !navigator.onLine;
  }

  // App lifecycle methods
  onAppResume() {
    console.log('App resumed');
    // Check for pending sync
    this.syncOfflineData();
  }

  onAppPause() {
    console.log('App paused');
    // Save current state
  }

  async syncOfflineData() {
    if (this.isOffline()) return;

    try {
      const offlineData = await this.getOfflineData();
      
      // In a real app, this would sync with the backend
      console.log('Syncing offline data:', offlineData);
      
      // Mark data as synced
      if (offlineData.userProgress && !offlineData.userProgress.synced) {
        await this.saveUserProgress({ ...offlineData.userProgress, synced: true });
      }
      
      const sessions = offlineData.studySessions.map(session => 
        session.synced ? session : { ...session, synced: true }
      );
      await this.setItem('studySessions', sessions);
      
    } catch (error) {
      console.error('Error syncing offline data:', error);
    }
  }

  // Network status
  addNetworkListener(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
  }

  removeNetworkListener(callback) {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  }
}

export default new MobileService();