// Mock data for English IT learning app

export const mockUser = {
  id: 1,
  name: "Alex Developer",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  preferences: {
    nativeLanguage: "ukrainian",
    studyStreak: 7,
    totalWordsLearned: 145,
    masteredWords: 89
  }
};

export const supportedLanguages = [
  { code: "ukrainian", name: "Українська", flag: "🇺🇦" },
  { code: "polish", name: "Polski", flag: "🇵🇱" },
  { code: "english", name: "English", flag: "🇬🇧" }
];

export const difficultyLevels = [
  { level: "beginner", name: "Beginner", color: "bg-green-500" },
  { level: "intermediate", name: "Intermediate", color: "bg-yellow-500" },
  { level: "advanced", name: "Advanced", color: "bg-red-500" }
];

export const cardCategories = [
  {
    id: 1,
    name: "Programming Basics",
    description: "Essential programming terms and concepts",
    difficulty: "beginner",
    cardCount: 45,
    completedCount: 32,
    icon: "💻",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Web Development",
    description: "Frontend and backend development terminology",
    difficulty: "intermediate",
    cardCount: 38,
    completedCount: 18,
    icon: "🌐",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Database Systems",
    description: "Database and SQL related vocabulary",
    difficulty: "intermediate",
    cardCount: 29,
    completedCount: 15,
    icon: "🗄️",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 4,
    name: "DevOps & Cloud",
    description: "Cloud computing and deployment terms",
    difficulty: "advanced",
    cardCount: 33,
    completedCount: 8,
    icon: "☁️",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    name: "AI & Machine Learning",
    description: "Artificial intelligence and ML terminology",
    difficulty: "advanced",
    cardCount: 41,
    completedCount: 5,
    icon: "🤖",
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    name: "My Custom Cards",
    description: "Your personally created vocabulary cards",
    difficulty: "mixed",
    cardCount: 12,
    completedCount: 11,
    icon: "📝",
    color: "from-gray-500 to-slate-500"
  }
];

export const flashcards = [
  {
    id: 1,
    categoryId: 1,
    word: "Algorithm",
    definition: "A step-by-step procedure for calculations, data processing, and automated reasoning tasks",
    example: "The sorting algorithm efficiently organizes the data in ascending order.",
    translations: {
      ukrainian: "Алгоритм",
      polish: "Algorytm"
    },
    difficulty: "beginner",
    mastered: true,
    reviewCount: 8,
    lastReviewed: "2025-01-15T10:30:00Z"
  },
  {
    id: 2,
    categoryId: 1,
    word: "Variable",
    definition: "A storage location with an associated name that contains data that can be modified during program execution",
    example: "Declare a variable to store the user's age: let age = 25;",
    translations: {
      ukrainian: "Змінна",
      polish: "Zmienna"
    },
    difficulty: "beginner",
    mastered: true,
    reviewCount: 12,
    lastReviewed: "2025-01-14T15:45:00Z"
  },
  {
    id: 3,
    categoryId: 1,
    word: "Function",
    definition: "A reusable block of code that performs a specific task and can accept input parameters",
    example: "Create a function to calculate the area: function calculateArea(width, height) { return width * height; }",
    translations: {
      ukrainian: "Функція",
      polish: "Funkcja"
    },
    difficulty: "beginner",
    mastered: false,
    reviewCount: 3,
    lastReviewed: "2025-01-13T09:20:00Z"
  },
  {
    id: 4,
    categoryId: 2,
    word: "API",
    definition: "Application Programming Interface - a set of protocols and tools for building software applications",
    example: "The REST API allows the frontend to communicate with the backend server.",
    translations: {
      ukrainian: "API (Інтерфейс програмування додатків)",
      polish: "API (Interfejs programowania aplikacji)"
    },
    difficulty: "intermediate",
    mastered: false,
    reviewCount: 5,
    lastReviewed: "2025-01-12T14:10:00Z"
  },
  {
    id: 5,
    categoryId: 2,
    word: "Framework",
    definition: "A platform for developing software applications that provides a foundation with predefined classes and functions",
    example: "React is a popular JavaScript framework for building user interfaces.",
    translations: {
      ukrainian: "Фреймворк",
      polish: "Framework"
    },
    difficulty: "intermediate",
    mastered: true,
    reviewCount: 7,
    lastReviewed: "2025-01-11T11:30:00Z"
  }
];

export const userProgress = {
  totalCards: 186,
  masteredCards: 89,
  studyStreak: 7,
  weeklyGoal: 20,
  weeklyProgress: 14,
  recentActivity: [
    { date: "2025-01-15", cardsStudied: 8, timeSpent: 25 },
    { date: "2025-01-14", cardsStudied: 12, timeSpent: 32 },
    { date: "2025-01-13", cardsStudied: 6, timeSpent: 18 },
    { date: "2025-01-12", cardsStudied: 15, timeSpent: 45 },
    { date: "2025-01-11", cardsStudied: 9, timeSpent: 28 },
    { date: "2025-01-10", cardsStudied: 11, timeSpent: 35 },
    { date: "2025-01-09", cardsStudied: 7, timeSpent: 22 }
  ]
};

// Mock authentication functions
export const mockAuth = {
  login: async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    }
    return { success: false, error: 'Invalid credentials' };
  },
  
  register: async (name, email, password, nativeLanguage) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const newUser = {
      ...mockUser,
      name,
      email,
      preferences: { ...mockUser.preferences, nativeLanguage }
    };
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },
  
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Mock study session management
export const mockStudy = {
  startSession: (categoryId) => {
    const categoryCards = flashcards.filter(card => card.categoryId === categoryId);
    return categoryCards.sort(() => Math.random() - 0.5); // Shuffle cards
  },
  
  markCardReviewed: (cardId, wasCorrect) => {
    // In real app, this would update the backend
    console.log(`Card ${cardId} reviewed. Correct: ${wasCorrect}`);
  },
  
  updateProgress: (sessionData) => {
    // Mock progress update
    console.log('Session completed:', sessionData);
  }
};