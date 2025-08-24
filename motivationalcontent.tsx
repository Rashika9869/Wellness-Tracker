import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Sparkles, 
  RefreshCw, 
  Share2, 
  BookHeart,
  Lightbulb,
  Star,
  Trophy,
  Target,
  Zap
} from "lucide-react";

interface Quote {
  text: string;
  author: string;
  category: "motivation" | "wellness" | "mindfulness" | "success";
}

interface Tip {
  title: string;
  content: string;
  icon: React.ReactNode;
  category: "health" | "fitness" | "mental" | "nutrition";
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
}

const motivationalQuotes: Quote[] = [
  {
    text: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt",
    category: "wellness"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn", 
    category: "wellness"
  },
  {
    text: "A healthy outside starts from the inside.",
    author: "Robert Urich",
    category: "wellness"
  },
  {
    text: "Your body can do it. It's your mind you need to convince.",
    author: "Unknown",
    category: "motivation"
  },
  {
    text: "Progress, not perfection.",
    author: "Unknown",
    category: "motivation"
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    category: "motivation"
  },
  {
    text: "Mindfulness is a way of befriending ourselves and our experience.",
    author: "Jon Kabat-Zinn",
    category: "mindfulness"
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    category: "success"
  }
];

const wellnessTips: Tip[] = [
  {
    title: "Start Your Day with Water",
    content: "Drink a glass of water first thing in the morning to kickstart your metabolism and hydrate your body after sleep.",
    icon: <Lightbulb className="w-5 h-5" />,
    category: "health"
  },
  {
    title: "Take Movement Breaks",
    content: "Set a timer to move for 2-3 minutes every hour. Simple stretches or a short walk can boost energy and focus.",
    icon: <Zap className="w-5 h-5" />,
    category: "fitness"
  },
  {
    title: "Practice Deep Breathing",
    content: "Take 5 deep breaths when feeling stressed. Inhale for 4 counts, hold for 4, exhale for 6. This activates your parasympathetic nervous system.",
    icon: <Heart className="w-5 h-5" />,
    category: "mental"
  },
  {
    title: "Eat Colorful Foods",
    content: "Aim for a variety of colors on your plate. Different colored fruits and vegetables provide different nutrients and antioxidants.",
    icon: <Star className="w-5 h-5" />,
    category: "nutrition"
  },
  {
    title: "Create a Sleep Routine",
    content: "Go to bed and wake up at the same time daily. Your body thrives on routine and consistent sleep improves everything.",
    icon: <Target className="w-5 h-5" />,
    category: "health"
  },
  {
    title: "Practice Gratitude",
    content: "Write down 3 things you're grateful for each day. This simple practice can significantly improve your mental wellbeing.",
    icon: <BookHeart className="w-5 h-5" />,
    category: "mental"
  }
];

const achievements: Achievement[] = [
  {
    title: "First Week Strong",
    description: "Complete habits for 7 consecutive days",
    icon: <Trophy className="w-5 h-5" />,
    earned: true
  },
  {
    title: "Streak Master",
    description: "Maintain a 21-day streak",
    icon: <Star className="w-5 h-5" />,
    earned: false
  },
  {
    title: "Habit Collector",
    description: "Track 5 different habits",
    icon: <Target className="w-5 h-5" />,
    earned: true
  }
];

export default function MotivationSection() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(motivationalQuotes[0]);
  const [currentTip, setCurrentTip] = useState<Tip>(wellnessTips[0]);
  const [isQuoteAnimating, setIsQuoteAnimating] = useState(false);

  // Rotate quote daily
  useEffect(() => {
    const today = new Date().getDate();
    const quoteIndex = today % motivationalQuotes.length;
    const tipIndex = today % wellnessTips.length;
    setCurrentQuote(motivationalQuotes[quoteIndex]);
    setCurrentTip(wellnessTips[tipIndex]);
  }, []);

  const getNewQuote = () => {
    setIsQuoteAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
      setIsQuoteAnimating(false);
    }, 300);
  };

  const getNewTip = () => {
    const randomIndex = Math.floor(Math.random() * wellnessTips.length);
    setCurrentTip(wellnessTips[randomIndex]);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      motivation: "bg-energy-100 text-energy-800",
      wellness: "bg-wellness-100 text-wellness-800", 
      mindfulness: "bg-calm-100 text-calm-800",
      success: "bg-wellness-100 text-wellness-800",
      health: "bg-wellness-100 text-wellness-800",
      fitness: "bg-energy-100 text-energy-800",
      mental: "bg-calm-100 text-calm-800",
      nutrition: "bg-energy-100 text-energy-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Daily Quote */}
      <Card className="bg-gradient-to-br from-energy-50 via-energy-100 to-wellness-100 border-energy-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-energy-900">
              <Sparkles className="w-5 h-5" />
              <span>Daily Inspiration</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={getNewQuote}
                className="text-energy-700 hover:text-energy-900 hover:bg-energy-200"
              >
                <RefreshCw className={`w-4 h-4 ${isQuoteAnimating ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-energy-700 hover:text-energy-900 hover:bg-energy-200"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`transition-opacity duration-300 ${isQuoteAnimating ? 'opacity-50' : 'opacity-100'}`}>
            <blockquote className="text-lg font-medium text-energy-900 mb-3 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <cite className="text-energy-700 font-medium">— {currentQuote.author}</cite>
              <Badge className={getCategoryColor(currentQuote.category)}>
                {currentQuote.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Tip of the Day */}
      <Card className="bg-gradient-to-br from-wellness-50 to-calm-50 border-wellness-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-wellness-900">
              <Lightbulb className="w-5 h-5" />
              <span>Wellness Tip</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={getNewTip}
              className="text-wellness-700 hover:text-wellness-900 hover:bg-wellness-200"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-wellness-500 rounded-lg flex items-center justify-center flex-shrink-0">
              {currentTip.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-wellness-900 mb-2">{currentTip.title}</h4>
              <p className="text-wellness-700 text-sm leading-relaxed mb-3">{currentTip.content}</p>
              <Badge className={getCategoryColor(currentTip.category)}>
                {currentTip.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-to-br from-calm-50 to-wellness-50 border-calm-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-calm-900">
            <Trophy className="w-5 h-5" />
            <span>Your Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  achievement.earned 
                    ? "bg-wellness-100 border border-wellness-200" 
                    : "bg-muted/50 border border-muted"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned 
                    ? "bg-wellness-500 text-white" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.earned ? "text-wellness-900" : "text-muted-foreground"
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.earned ? "text-wellness-700" : "text-muted-foreground"
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <Badge className="bg-wellness-500 text-white">
                    Earned!
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Motivation */}
      <Card className="text-center bg-gradient-to-r from-energy-500 to-wellness-500 text-white border-0">
        <CardContent className="p-6">
          <Heart className="w-8 h-8 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">You're doing amazing!</h3>
          <p className="text-energy-100 text-sm">
            Every small step counts towards your wellness journey. Keep going! 💪
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
