import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  Github, 
  Download, 
  Copy, 
  ExternalLink, 
  CheckCircle, 
  Smartphone, 
  Code, 
  FileText,
  Zap,
  Star
} from 'lucide-react';

const SaveToGitHubButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState('');
  const { toast } = useToast();

  const packageInfo = {
    name: "it-english-learning-android",
    version: "1.0.0",
    size: "627KB",
    features: [
      "📱 Native Android App with Capacitor",
      "🔄 Offline Learning Mode",
      "🔔 Push Notifications",
      "🎴 3D Flip Flashcards",
      "🌍 Multi-language Support (EN/UK/PL)",
      "📊 Progress Tracking & Achievements",
      "💻 IT Vocabulary Focus (6 Categories)",
      "🎨 Modern UI with Animations",
      "🛠️ GitHub Actions CI/CD",
      "📚 Complete Documentation"
    ],
    files: [
      "📱 /android/ - Native Android project",
      "⚛️ /src/ - React app source code",
      "🎨 /public/ - Static assets & icons",
      "🔧 /.github/ - GitHub Actions workflows",
      "📖 README.md - Complete documentation",
      "🔨 BUILD.md - Build instructions",
      "🤝 CONTRIBUTING.md - Contribution guide",
      "🔒 SECURITY.md - Security policy",
      "📝 CHANGELOG.md - Version history",
      "⚖️ LICENSE - MIT license"
    ]
  };

  const copyToClipboard = (text, commandName) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(commandName);
    toast({
      title: "Copied! 📋",
      description: `${commandName} copied to clipboard`,
    });
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const downloadPackage = () => {
    // Create a downloadable package info file
    const packageData = {
      name: packageInfo.name,
      version: packageInfo.version,
      description: "IT English Learning Android App - Complete GitHub Package",
      features: packageInfo.features,
      instructions: {
        download: "Extract it-english-learning-android.tar.gz from the server",
        setup: "Follow BUILD.md for Android SDK setup",
        deploy: "Push to GitHub and enable Actions for automatic APK building"
      },
      downloadUrl: "/app/it-english-learning-android.tar.gz"
    };

    const blob = new Blob([JSON.stringify(packageData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'it-english-learning-android-info.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Package Info Downloaded! 📦",
      description: "Check your downloads folder for package details",
    });
  };

  const githubCommands = {
    create: `# Create new GitHub repository
gh repo create it-english-learning-android --public --description "IT English Learning Android App with flashcards, offline support, and native mobile features"

# Or create via web interface:
# https://github.com/new`,
    
    setup: `# Extract and setup project
tar -xzf it-english-learning-android.tar.gz
cd it-english-learning-android
yarn install`,

    deploy: `# Deploy to GitHub
git init
git add .
git commit -m "🎉 Initial commit: IT English Learning Android App"
git branch -M main
git remote add origin https://github.com/yourusername/it-english-learning-android.git
git push -u origin main`,

    actions: `# GitHub Actions will automatically:
# ✅ Build APK on every push
# ✅ Run tests and quality checks  
# ✅ Create releases with downloadable APK
# ✅ No local Android SDK needed!`
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          size="lg"
        >
          <Github className="w-5 h-5 mr-2" />
          Save to GitHub
          <Star className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold">
            <Github className="w-8 h-8 mr-3 text-purple-600" />
            Deploy Android App to GitHub
          </DialogTitle>
          <DialogDescription className="text-lg">
            Complete package ready for GitHub deployment with automatic APK building
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="download" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Setup</span>
            </TabsTrigger>
            <TabsTrigger value="deploy" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Deploy</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Name:</span>
                    <Badge variant="secondary">{packageInfo.name}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Version:</span>
                    <Badge variant="secondary">{packageInfo.version}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Size:</span>
                    <Badge variant="secondary">{packageInfo.size}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">License:</span>
                    <Badge variant="secondary">MIT</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-1 text-sm">
                    {packageInfo.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="text-green-700">{feature}</div>
                    ))}
                    <div className="text-green-600 text-xs mt-2">
                      + {packageInfo.features.length - 6} more features...
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <FileText className="w-5 h-5 mr-2" />
                  Package Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {packageInfo.files.map((file, index) => (
                    <div key={index} className="text-purple-700">{file}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Download Tab */}
          <TabsContent value="download" className="space-y-4">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <Download className="w-5 h-5 mr-2" />
                  Download Package
                </CardTitle>
                <CardDescription>
                  Get the complete Android app package ready for GitHub
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">📦 Package Location:</h4>
                  <code className="text-sm bg-white px-3 py-2 rounded border text-orange-700">
                    /app/it-english-learning-android.tar.gz
                  </code>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={downloadPackage}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Package Info
                  </Button>
                  
                  <div className="text-sm text-orange-700 space-y-2">
                    <p><strong>What you get:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Complete React app with mobile features</li>
                      <li>Native Android project (Capacitor)</li>
                      <li>GitHub Actions for automatic APK building</li>
                      <li>Professional documentation</li>
                      <li>MIT license for free usage</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Github className="w-5 h-5 mr-2" />
                    1. Create GitHub Repository
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="flex justify-between items-start">
                      <pre className="text-gray-800">{githubCommands.create}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(githubCommands.create, 'Repository Creation')}
                        className="ml-2"
                      >
                        {copiedCommand === 'Repository Creation' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://github.com/new', '_blank')}
                      className="flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Create Repository on GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    2. Setup Project Locally
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="flex justify-between items-start">
                      <pre className="text-gray-800">{githubCommands.setup}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(githubCommands.setup, 'Project Setup')}
                        className="ml-2"
                      >
                        {copiedCommand === 'Project Setup' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deploy Tab */}
          <TabsContent value="deploy" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Deploy to GitHub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="flex justify-between items-start">
                      <pre className="text-gray-800">{githubCommands.deploy}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(githubCommands.deploy, 'Deployment Commands')}
                        className="ml-2"
                      >
                        {copiedCommand === 'Deployment Commands' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Automatic GitHub Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-100 rounded-lg p-4 font-mono text-sm">
                    <pre className="text-green-800">{githubCommands.actions}</pre>
                  </div>
                  <div className="mt-4 text-sm text-green-700">
                    <p><strong>🎉 After deployment, GitHub will automatically:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Build APK on every push to main branch</li>
                      <li>Run tests and quality checks</li>
                      <li>Create downloadable APK artifacts</li>
                      <li>Generate releases with APK files</li>
                      <li>No local Android SDK setup needed!</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🚀 Ready for Production:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>✅ Google Play Store submission</p>
                  <p>✅ Direct APK distribution</p>
                  <p>✅ Enterprise deployment</p>
                  <p>✅ Educational use</p>
                  <p>✅ Open source contributions</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            Package ready for deployment • MIT License • Production ready
          </div>
          <Button 
            onClick={() => setIsOpen(false)}
            variant="outline"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveToGitHubButton;