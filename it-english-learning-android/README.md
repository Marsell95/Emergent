# IT English Learning - Android App

A comprehensive English language learning app focused on IT vocabulary with flashcard-based learning, offline support, and mobile-first design.

## 🚀 Features

### 📚 Learning Features
- **IT-Focused Vocabulary**: 6 categories including Programming, Web Development, Databases, DevOps, AI/ML
- **Interactive Flashcards**: 3D flip animations with word, definition, example, and translations
- **Multi-language Support**: English, Ukrainian, Polish
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Custom Cards**: Create your own vocabulary cards
- **Progress Tracking**: Study streaks, mastery levels, weekly goals

### 📱 Mobile Features
- **Offline Study Mode**: Continue learning without internet connection
- **Push Notifications**: Daily study reminders
- **Local Storage**: Progress saved on device
- **Auto-sync**: Data synchronizes when back online
- **Network Status**: Real-time connection indicators
- **Native Mobile Experience**: Built with Capacitor for native performance

### 🎨 User Experience
- **Modern UI/UX**: Beautiful gradients, animations, and responsive design
- **Authentication**: Secure login/signup system
- **Profile Management**: Track learning statistics and preferences
- **Achievement System**: Unlock achievements as you progress

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Radix UI
- **Mobile**: Capacitor 7 for native Android functionality
- **Storage**: Local storage with offline support
- **Notifications**: Capacitor Local Notifications
- **Build Tools**: Gradle, Android SDK

## 📋 Prerequisites

- **Node.js** 18+ and Yarn
- **Java Development Kit (JDK)** 17
- **Android SDK** and **Android Studio** (recommended)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd it-english-learning-android
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Set Up Environment Variables
Create `.env` file in the root directory:
```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 4. Run in Browser (Development)
```bash
yarn start
```
The app will open at `http://localhost:3000`

### 5. Build for Production
```bash
yarn build
```

## 📱 Android APK Build

### 1. Install Android SDK
Download and install Android Studio or Android command line tools:
- **Android SDK**: API Level 34
- **Build Tools**: 34.0.0
- **Platform Tools**: Latest

### 2. Set Environment Variables
```bash
export ANDROID_HOME=/path/to/android-sdk
export JAVA_HOME=/path/to/jdk-17
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
```

### 3. Build the Web App
```bash
yarn build
```

### 4. Sync Capacitor
```bash
npx cap sync android
```

### 5. Build APK
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

### 6. Install on Device
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

## 🔧 Development

### Project Structure
```
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── AuthPage.jsx  # Authentication
│   │   ├── Dashboard.jsx # Main dashboard
│   │   ├── StudySession.jsx # Flashcard interface
│   │   └── ...
│   ├── data/             # Mock data and constants
│   ├── services/         # Mobile and offline services
│   ├── hooks/            # React hooks
│   └── App.js            # Main app component
├── android/              # Android native project
├── capacitor.config.json # Capacitor configuration
└── package.json          # Dependencies
```

### Key Services

#### MobileService.js
Handles native mobile functionality:
- Local notifications
- Device storage
- App lifecycle events
- Network status monitoring

#### OfflineService.js
Manages offline functionality:
- Offline authentication
- Local data storage
- Data synchronization
- Progress tracking

### Available Scripts

```bash
# Development
yarn start              # Start development server
yarn build             # Build for production
yarn test              # Run tests

# Mobile Development
npx cap run android     # Run on Android device/emulator
npx cap open android    # Open in Android Studio
npx cap sync android    # Sync web assets to native project
```

## 📚 App Usage

### Authentication
- Use any email/password combination for demo
- Select your native language (Ukrainian/Polish/English)

### Studying
1. **Choose Category**: Select from 6 IT vocabulary categories
2. **Study Cards**: Tap cards to flip and see definitions
3. **Mark Progress**: Use "Got It!" or "Need More Practice"
4. **Track Progress**: View your study streak and mastery level

### Offline Mode
- Study without internet connection
- Progress automatically syncs when back online
- Offline indicator shows connection status

### Notifications
- Daily study reminders at 8 PM
- Achievement notifications
- Streak milestone alerts

## 🎯 Learning Categories

1. **Programming Basics** (Beginner)
   - Variables, functions, algorithms, loops
   
2. **Web Development** (Intermediate)
   - APIs, frameworks, frontend/backend concepts
   
3. **Database Systems** (Intermediate)
   - SQL, CRUD operations, database design
   
4. **DevOps & Cloud** (Advanced)
   - Deployment, cloud services, containerization
   
5. **AI & Machine Learning** (Advanced)
   - Neural networks, algorithms, data science
   
6. **My Custom Cards** (Mixed)
   - User-created vocabulary cards

## 🔒 Permissions

The app requires these Android permissions:
- **INTERNET**: Online features and sync
- **ACCESS_NETWORK_STATE**: Network status detection
- **WAKE_LOCK**: Background notifications
- **VIBRATE**: Notification feedback
- **POST_NOTIFICATIONS**: Study reminders
- **SCHEDULE_EXACT_ALARM**: Precise notification timing

## 🐛 Troubleshooting

### Build Issues

**Error: SDK location not found**
```bash
echo "sdk.dir=/path/to/android-sdk" > android/local.properties
```

**Error: JAVA_HOME not set**
```bash
export JAVA_HOME=/path/to/jdk-17
```

**Error: Permission denied on gradlew**
```bash
chmod +x android/gradlew
```

### Runtime Issues

**App crashes on startup**
- Check if all permissions are granted
- Verify Android API level compatibility (minimum API 24)

**Notifications not working**
- Enable notifications in app settings
- Check Do Not Disturb mode

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**Happy Learning!** 🎓📱

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
