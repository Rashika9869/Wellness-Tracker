import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 via-background to-calm-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-wellness-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-wellness-500 to-wellness-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-wellness-900">WellnessTracker</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-wellness-200 shadow-lg">
            <CardContent className="p-8 sm:p-12">
              {/* 404 Illustration */}
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-wellness-500 to-calm-500 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-wellness-900 mb-4">404</h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-wellness-800 mb-4">
                  Page Not Found
                </h2>
              </div>

              {/* Error Message */}
              <div className="mb-8">
                <p className="text-wellness-700 text-lg mb-4">
                  Oops! It looks like you've wandered off the wellness path.
                </p>
                <p className="text-wellness-600 text-sm">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                {location.pathname && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted p-2 rounded">
                    Attempted path: {location.pathname}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-wellness-600 hover:bg-wellness-700">
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>

              {/* Helpful Links */}
              <div className="mt-8 pt-8 border-t border-wellness-200">
                <p className="text-sm text-wellness-600 mb-4">
                  Perhaps you were looking for one of these?
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/habits">Manage Habits</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/progress">View Progress</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/motivation">Daily Motivation</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/profile">Profile Settings</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
