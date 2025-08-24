import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, MessageCircle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  icon = <MessageCircle className="w-12 h-12 text-wellness-500" />
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 via-background to-calm-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-wellness-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-wellness-500 to-wellness-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-wellness-900">WellnessTracker</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-wellness-700 hover:text-wellness-900" asChild>
                <Link to="/">Dashboard</Link>
              </Button>
              <Button variant="ghost" className="text-wellness-700 hover:text-wellness-900">Habits</Button>
              <Button variant="ghost" className="text-wellness-700 hover:text-wellness-900">Progress</Button>
              <Button variant="ghost" className="text-wellness-700 hover:text-wellness-900">Profile</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-wellness-200 shadow-lg">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                {icon}
              </div>
              <CardTitle className="text-2xl text-wellness-900">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-wellness-700 text-lg mb-8">
                {description}
              </p>
              <div className="space-y-4">
                <p className="text-sm text-wellness-600">
                  This page is coming soon! Continue prompting to have it built out with the features you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Dashboard
                    </Link>
                  </Button>
                  <Button className="bg-wellness-600 hover:bg-wellness-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Request Feature
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
