# Contributing to IT English Learning

Thank you for your interest in contributing to IT English Learning! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions
- **Bug Reports**: Report issues you encounter
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit bug fixes or new features
- **Documentation**: Improve documentation and guides
- **Translation**: Add support for more languages
- **Testing**: Help test the app on different devices

## 🐛 Reporting Bugs

### Before Reporting
1. **Search existing issues** to avoid duplicates
2. **Test on latest version** to ensure bug still exists
3. **Check device compatibility** (Android API 24+)

### Bug Report Template
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Device: [e.g. Samsung Galaxy S21]
- Android Version: [e.g. Android 12]
- App Version: [e.g. 1.0.0]

**Screenshots**
If applicable, add screenshots.

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### Before Suggesting
1. **Check existing issues** for similar requests
2. **Consider scope** - does it fit the app's purpose?
3. **Think about users** - who would benefit?

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
Any alternative solutions you've considered.

**Additional Context**
Any other context, mockups, or examples.
```

## 🔧 Development Setup

### Prerequisites
- **Node.js** 18+
- **Yarn** package manager
- **Java JDK** 17
- **Android SDK** (for mobile builds)
- **Git**

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/it-english-learning-android.git
cd it-english-learning-android

# Install dependencies
yarn install

# Start development server
yarn start
```

### Mobile Development
```bash
# Build for mobile
yarn build

# Sync with Capacitor
npx cap sync android

# Run on Android
npx cap run android
```

## 📝 Code Guidelines

### Code Style
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Use Prettier for code formatting
- **TypeScript**: Gradually migrate to TypeScript (preferred)
- **Comments**: Add meaningful comments for complex logic

### React Best Practices
- **Functional Components**: Use functional components with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Component Size**: Keep components under 300 lines
- **Props**: Use proper prop validation

### File Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature-specific components
├── data/               # Mock data and constants
├── services/           # Business logic services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # Global styles
```

### Naming Conventions
- **Components**: PascalCase (e.g., `StudySession.jsx`)
- **Files**: camelCase (e.g., `mobileService.js`)
- **Variables**: camelCase (e.g., `studyProgress`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_CARDS_PER_SESSION`)

## 🎨 UI/UX Guidelines

### Design Principles
- **Mobile First**: Design for mobile, enhance for desktop
- **Accessibility**: Follow WCAG guidelines
- **Performance**: Optimize for smooth animations
- **Consistency**: Use design system components

### Color Scheme
- **Primary**: Blue gradient (`from-blue-500 to-purple-600`)
- **Success**: Green (`text-green-600`)
- **Warning**: Yellow (`text-yellow-600`)
- **Error**: Red (`text-red-600`)

### Animation Guidelines
- **Duration**: 200-300ms for micro-interactions
- **Easing**: Use CSS transitions with `ease-out`
- **Performance**: Use `transform` and `opacity` for animations
- **Accessibility**: Respect `prefers-reduced-motion`

## 🌍 Internationalization

### Adding New Languages
1. **Create translation files** in `src/data/translations/`
2. **Add language to supported list** in `mock.js`
3. **Test with sample content** to ensure proper rendering
4. **Consider RTL languages** if applicable

### Translation Guidelines
- **Context**: Provide context for translators
- **Consistency**: Use consistent terminology
- **Length**: Consider text expansion in different languages
- **Cultural**: Be mindful of cultural differences

## 📱 Mobile Considerations

### Performance
- **Bundle Size**: Keep bundle size optimized
- **Lazy Loading**: Implement code splitting where beneficial
- **Memory Usage**: Monitor memory usage on low-end devices
- **Battery**: Minimize background processing

### Platform-Specific
- **Android**: Follow Material Design principles
- **Permissions**: Request minimal permissions
- **Storage**: Use efficient local storage strategies
- **Notifications**: Implement thoughtful notification strategies

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Device Testing**: Test on various Android devices

### Running Tests
```bash
# Unit tests
yarn test

# E2E tests (if implemented)
yarn test:e2e

# Test coverage
yarn test:coverage
```

### Manual Testing Checklist
- [ ] Authentication flow works
- [ ] Flashcard navigation is smooth
- [ ] Offline mode functions correctly
- [ ] Notifications work as expected
- [ ] Progress tracking is accurate
- [ ] Performance is acceptable on low-end devices

## 📦 Pull Request Process

### Before Submitting
1. **Fork the repository** and create a feature branch
2. **Write clear commit messages** following conventional commits
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Check code style** with ESLint and Prettier

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(flashcard): add 3D flip animation
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Tested on Android device

## Screenshots
If applicable, add screenshots of changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 📚 Learning Resources

### Technologies Used
- **React**: [React Documentation](https://reactjs.org/docs/)
- **Capacitor**: [Capacitor Documentation](https://capacitorjs.com/docs)
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
- **Radix UI**: [Radix UI Documentation](https://www.radix-ui.com/docs)

### Mobile Development
- **Android Development**: [Android Developer Guides](https://developer.android.com/guide)
- **Mobile Web**: [MDN Mobile Web Development](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## 🏆 Recognition

### Contributors
All contributors will be recognized in:
- **README.md**: Contributors section
- **App About Page**: Credits section
- **Release Notes**: Contributor mentions

### Types of Recognition
- **Code Contributors**: Listed with GitHub profile
- **Bug Reports**: Mentioned in fix commits
- **Feature Suggestions**: Credited in feature implementation
- **Documentation**: Listed in documentation credits

## 📞 Community

### Communication Channels
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community discussion
- **Pull Requests**: For code review and collaboration

### Code of Conduct
We follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

### Getting Help
- **Documentation**: Check README.md and BUILD.md first
- **Search Issues**: Look for existing solutions
- **Ask Questions**: Create a GitHub Discussion
- **Be Patient**: Maintainers volunteer their time

## 🎯 Roadmap

### Current Focus
- **Stability**: Bug fixes and performance improvements
- **Features**: Spaced repetition and advanced analytics
- **Platform**: iOS support planning

### Future Plans
- **Backend Integration**: Real user accounts
- **Social Features**: Study groups and leaderboards
- **AI Features**: Personalized learning paths
- **Advanced Analytics**: Detailed learning insights

---

Thank you for contributing to IT English Learning! 🚀📱

**Questions?** Feel free to open a GitHub Discussion or create an issue.