# Build Instructions for IT English Learning Android App

## 🔧 Environment Setup

### Requirements
- **Operating System**: Linux (Ubuntu/Debian) or macOS recommended
- **Node.js**: Version 18 or higher
- **Yarn**: Package manager
- **Java**: OpenJDK 17
- **Android SDK**: API Level 34 minimum

### Environment Variables
Create these environment variables in your shell profile:

```bash
export ANDROID_HOME=/path/to/android-sdk
export JAVA_HOME=/path/to/jdk-17
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
```

## 📱 Android SDK Setup

### Option 1: Android Studio (Recommended)
1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio and follow the setup wizard
3. Install Android SDK API Level 34
4. Install Android SDK Build-Tools 34.0.0
5. Install Android SDK Platform-Tools

### Option 2: Command Line Tools
```bash
# Download command line tools
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip

# Extract and setup
unzip commandlinetools-linux-11076708_latest.zip
mkdir -p $ANDROID_HOME/latest
mv cmdline-tools $ANDROID_HOME/latest/

# Install required packages
sdkmanager --sdk_root=$ANDROID_HOME "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

## 🚀 Build Process

### Step 1: Install Dependencies
```bash
cd it-english-learning-android
yarn install
```

### Step 2: Build Web Assets
```bash
yarn build
```

### Step 3: Sync Capacitor
```bash
npx cap sync android
```

### Step 4: Configure Android Project
```bash
# Set SDK location
echo "sdk.dir=$ANDROID_HOME" > android/local.properties

# Make gradlew executable
chmod +x android/gradlew
```

### Step 5: Build APK
```bash
cd android
./gradlew assembleRelease
```

## 📦 Output

The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📲 Installation

### Install on Connected Device
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Install via File Manager
1. Transfer APK to your Android device
2. Enable "Install unknown apps" in Settings
3. Open the APK file and install

## 🐛 Common Issues

### Issue: "SDK location not found"
**Solution:**
```bash
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

### Issue: "JAVA_HOME is not set"
**Solution:**
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64  # Linux
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home  # macOS
```

### Issue: "Permission denied: ./gradlew"
**Solution:**
```bash
chmod +x android/gradlew
```

### Issue: "AAPT2 Daemon startup failed" (ARM64 systems)
**Workaround:**
This is a known issue with ARM64 systems. Use an x86_64 build environment or:
1. Use GitHub Actions for building
2. Use a cloud build service
3. Use Android Studio on x86_64 system

## 🔄 Development Workflow

### For Development
```bash
# Run in browser
yarn start

# Run on Android device/emulator
npx cap run android

# Open in Android Studio
npx cap open android
```

### For Production Builds
```bash
# Build web assets
yarn build

# Sync with native project
npx cap sync android

# Build release APK
cd android && ./gradlew assembleRelease
```

## 📋 Capacitor Configuration

The app is configured with:
- **App ID**: `com.itenglish.learning`
- **App Name**: "IT English Learning"
- **Target SDK**: 34
- **Min SDK**: 24

## 🔒 Signing (For Production)

For production releases, you'll need to sign the APK:

1. Generate a signing key:
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure signing in `android/app/build.gradle`

3. Build signed APK:
```bash
./gradlew assembleRelease
```

## 📈 Performance Tips

- Use `./gradlew assembleRelease` for optimized builds
- Enable Proguard for code minification
- Optimize images and assets
- Test on various Android versions (API 24+)

## 🏗️ CI/CD Setup

### GitHub Actions Example
```yaml
name: Build Android APK
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-java@v2
      with:
        java-version: '17'
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: yarn install
    - run: yarn build
    - run: npx cap sync android
    - run: cd android && ./gradlew assembleRelease
```

---

For additional help, refer to the main README.md or create an issue on GitHub.