import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Home, User, LogOut, Plus } from 'lucide-react';

const Navbar = ({ user, onLogout, onProfile, onDashboard, currentView }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onDashboard}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold transform -rotate-3 hover:rotate-0 transition-transform duration-200">
              💻
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                IT English Learning
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Master IT vocabulary with flashcards
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Dashboard Button */}
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={onDashboard}
              className="hidden sm:flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>

            {/* Create Card Button */}
            <Button
              variant={currentView === 'create' ? 'default' : 'outline'}
              size="sm"
              onClick={() => window.location.hash = 'create'}
              className="hidden sm:flex items-center space-x-2 border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Plus className="w-4 h-4" />
              <span>Create Card</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        🔥 {user.preferences.studyStreak} day streak
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Mobile navigation items */}
                <DropdownMenuItem 
                  onClick={onDashboard}
                  className="sm:hidden cursor-pointer"
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => window.location.hash = 'create'}
                  className="sm:hidden cursor-pointer"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Card</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="sm:hidden" />
                
                <DropdownMenuItem onClick={onProfile} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile & Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={onLogout} 
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Study Streak Indicator */}
            <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-yellow-50 px-3 py-2 rounded-lg border border-orange-200">
              <span className="text-orange-600">🔥</span>
              <div className="text-sm">
                <span className="font-bold text-orange-800">{user.preferences.studyStreak}</span>
                <span className="text-orange-600 ml-1">day streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;