import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Wifi, WifiOff, CloudOff, Cloud, Sync } from 'lucide-react';
import OfflineService from '../services/OfflineService';

const OfflineIndicator = ({ isOnline }) => {
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [offlineStats, setOfflineStats] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    updateOfflineStats();
    const interval = setInterval(updateOfflineStats, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [isOnline]);

  const updateOfflineStats = async () => {
    try {
      const stats = await OfflineService.getOfflineStats();
      setOfflineStats(stats);
      setPendingSyncCount(stats.pendingSyncCount);
    } catch (error) {
      console.error('Error updating offline stats:', error);
    }
  };

  const handleSync = async () => {
    try {
      await OfflineService.syncPendingData();
      updateOfflineStats();
    } catch (error) {
      console.error('Error syncing data:', error);
    }
  };

  return (
    <>
      {/* Main Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <Badge
          variant={isOnline ? "default" : "secondary"}
          className={`flex items-center space-x-2 px-3 py-1 ${
            isOnline 
              ? 'bg-green-100 text-green-800 border-green-200' 
              : 'bg-orange-100 text-orange-800 border-orange-200'
          } cursor-pointer transition-all duration-200 hover:scale-105`}
          onClick={() => setShowDetails(!showDetails)}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3" />
              <span>Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </>
          )}
          {pendingSyncCount > 0 && (
            <div className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {pendingSyncCount}
            </div>
          )}
        </Badge>
      </div>

      {/* Detailed Status Panel */}
      {showDetails && (
        <div className="fixed top-16 right-4 z-50 w-80">
          <Card className="shadow-lg border-2">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Connection Status</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {isOnline ? (
                    <Cloud className="w-4 h-4 text-green-600" />
                  ) : (
                    <CloudOff className="w-4 h-4 text-orange-600" />
                  )}
                  <span className="text-sm">
                    {isOnline ? 'Connected to internet' : 'Working offline'}
                  </span>
                </div>
                
                {offlineStats && (
                  <>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>• Offline cards: {offlineStats.totalOfflineCards}</p>
                      <p>• Unsynced sessions: {offlineStats.offlineSessionsCount}</p>
                      {offlineStats.lastSync && (
                        <p>• Last sync: {new Date(offlineStats.lastSync).toLocaleString()}</p>
                      )}
                    </div>
                    
                    {pendingSyncCount > 0 && isOnline && (
                      <Button
                        size="sm"
                        onClick={handleSync}
                        className="w-full flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                      >
                        <Sync className="w-3 h-3" />
                        <span>Sync {pendingSyncCount} items</span>
                      </Button>
                    )}
                    
                    {!isOnline && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                        <p className="text-xs text-orange-800">
                          📱 Don't worry! You can continue studying offline. 
                          Your progress will sync when you're back online.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default OfflineIndicator;