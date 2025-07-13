import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Settings, Trophy, Calendar, TrendingUp, Target } from 'lucide-react';
import { supportedLanguages, userProgress } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const Profile = ({ user, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    nativeLanguage: user.preferences.nativeLanguage
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would update the backend
      console.log('Profile updated:', profileData);
      
      toast({
        title: "Profile Updated! ✅",
        description: "Your changes have been saved successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progressPercentage = (userProgress.masteredCards / userProgress.totalCards) * 100;
  const weeklyProgressPercentage = (userProgress.weeklyProgress / userProgress.weeklyGoal) * 100;

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
          <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and learning preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <CardTitle>Profile Information</CardTitle>
                </div>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              <CardDescription>
                Your personal information and learning preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-sm text-gray-500">Native Language:</span>
                    {supportedLanguages.find(lang => lang.code === user.preferences.nativeLanguage) && (
                      <span className="flex items-center space-x-1 text-sm">
                        <span>{supportedLanguages.find(lang => lang.code === user.preferences.nativeLanguage).flag}</span>
                        <span>{supportedLanguages.find(lang => lang.code === user.preferences.nativeLanguage).name}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="transition-all duration-200 focus:ring-4 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="transition-all duration-200 focus:ring-4 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nativeLanguage">Native Language</Label>
                    <Select 
                      value={profileData.nativeLanguage} 
                      onValueChange={(value) => handleInputChange('nativeLanguage', value)}
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-4 focus:ring-blue-500/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedLanguages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <Label className="text-gray-600">Full Name</Label>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Email Address</Label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Statistics */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Learning Statistics</span>
              </CardTitle>
              <CardDescription>
                Your progress and achievements over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <p className="text-xs text-gray-500 mt-1">
                      {userProgress.masteredCards} of {userProgress.totalCards} words mastered
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Weekly Goal</span>
                      <span className="font-medium">{Math.round(weeklyProgressPercentage)}%</span>
                    </div>
                    <Progress value={weeklyProgressPercentage} className="h-3" />
                    <p className="text-xs text-gray-500 mt-1">
                      {userProgress.weeklyProgress} of {userProgress.weeklyGoal} cards this week
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Study Streak</span>
                    </div>
                    <span className="text-lg font-bold text-green-800">{userProgress.studyStreak} days</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Words Learned</span>
                    </div>
                    <span className="text-lg font-bold text-blue-800">{user.preferences.totalWordsLearned}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProgress.recentActivity.map((activity, index) => (
                  <div key={activity.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(activity.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.timeSpent} minutes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{activity.cardsStudied}</p>
                      <p className="text-xs text-gray-500">cards</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-800">🏆 Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600">✅</span>
                <span>First Week Completed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600">✅</span>
                <span>50 Words Mastered</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-yellow-600">🔒</span>
                <span className="text-gray-500">Programming Expert (100 words)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-yellow-600">🔒</span>
                <span className="text-gray-500">30-Day Streak</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;