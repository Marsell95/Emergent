import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import SaveToGitHubButton from './SaveToGitHubButton';
import { cardCategories, userProgress } from '../data/mock';
import { Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = ({ user, onStartStudy, onCreateCard }) => {
  const progressPercentage = (userProgress.masteredCards / userProgress.totalCards) * 100;
  const weeklyProgressPercentage = (userProgress.weeklyProgress / userProgress.weeklyGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to continue your IT English learning journey?
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <SaveToGitHubButton />
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Study Streak
            </CardTitle>
            <Trophy className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">
              {userProgress.studyStreak}
            </div>
            <p className="text-xs text-green-600 mt-1">
              days in a row
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Total Progress
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">
              {Math.round(progressPercentage)}%
            </div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-blue-600 mt-1">
              {userProgress.masteredCards} of {userProgress.totalCards} mastered
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Weekly Goal
            </CardTitle>
            <Target className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800">
              {userProgress.weeklyProgress}
            </div>
            <Progress value={weeklyProgressPercentage} className="mt-2" />
            <p className="text-xs text-purple-600 mt-1">
              of {userProgress.weeklyGoal} cards this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">
              Today's Study
            </CardTitle>
            <Calendar className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800">
              {userProgress.recentActivity[0]?.cardsStudied || 0}
            </div>
            <p className="text-xs text-orange-600 mt-1">
              cards studied today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* GitHub Notice */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-800">
            <span className="text-2xl mr-2">🚀</span>
            Android App Ready for GitHub!
          </CardTitle>
          <CardDescription className="text-indigo-600">
            Your complete IT English Learning Android app is ready for deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3 border border-indigo-200">
              <div className="font-semibold text-indigo-800">📱 Native Android App</div>
              <div className="text-indigo-600 text-xs mt-1">Capacitor + React + Offline Mode</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-200">
              <div className="font-semibold text-indigo-800">🔄 GitHub Actions</div>
              <div className="text-indigo-600 text-xs mt-1">Automatic APK building</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-200">
              <div className="font-semibold text-indigo-800">📚 Complete Docs</div>
              <div className="text-indigo-600 text-xs mt-1">README + Build guide</div>
            </div>
          </div>
          <div className="flex justify-center">
            <SaveToGitHubButton />
          </div>
        </CardContent>
      </Card>

      {/* Learning Categories */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Learning Categories
          </h2>
          <Button
            onClick={onCreateCard}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
          >
            + Create Custom Card
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardCategories.map((category) => {
            const progressPercent = (category.completedCount / category.cardCount) * 100;
            
            return (
              <Card
                key={category.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                onClick={() => onStartStudy(category)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-full h-32 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform duration-200`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`${
                        category.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        category.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        category.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {category.cardCount} cards
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{Math.round(progressPercent)}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {category.completedCount} of {category.cardCount} completed
                    </p>
                  </div>
                  
                  <Button
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartStudy(category);
                    }}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;