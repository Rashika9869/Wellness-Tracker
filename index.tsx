import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Calendar, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Flame, 
  Heart,
  Brain,
  Droplets,
  Clock,
  Plus,
  BarChart3,
  Menu,
  X,
  Settings,
  User
} from "lucide-react";
import HabitCard from "@/components/HabitCard";
import HabitLogger from "@/components/HabitLogger";
import MotivationSection from "@/components/MotivationSection";
import ProgressTracker from "@/components/ProgressTracker";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Habit {
  id: string;
  name: string;
  icon: React.ReactNode;
  streak: number;
  completedToday: boolean;
  target: number;
  current: number;
  color: "wellness" | "energy" | "calm";
  unit?: string;
  category: string;
}

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Drink Water",
      icon: <Droplets className="w-5 h-5" />,
      streak: 12,
      completedToday: false,
      target: 8,
      current: 3,
      color: "calm",
      unit: "glasses",
      category: "Health"
    },
    {
      id: "2", 
      name: "Exercise",
      icon: <Activity className="w-5 h-5" />,
      streak: 8,
      completedToday: true,
      target: 1,
      current: 1,
      color: "energy",
      unit: "session",
      category: "Fitness"
    },
    {
      id: "3",
      name: "Meditation",
      icon: <Brain className="w-5 h-5" />,
      streak: 15,
      completedToday: true,
      target: 1,
      current: 1,
      color: "wellness",
      unit: "session",
      category: "Mindfulness"
    },
    {
      id: "4",
      name: "Sleep 8hrs",
      icon: <Clock className="w-5 h-5" />,
      streak: 5,
      completedToday: false,
      target: 8,
      current: 6,
      color: "calm",
      unit: "hours",
      category: "Health"
    }
  ]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedToday).length;
  const overallProgress = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const addHabit = (newHabit: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'current'>) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      streak: 0,
      completedToday: false,
      current: 0
    };
    setHabits(prev => [...prev, habit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const NavItems = () => (
    <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
      <Button 
        variant={activeTab === "dashboard" ? "default" : "ghost"} 
        className="justify-start md:justify-center text-wellness-700 hover:text-wellness-900"
        onClick={() => {
          setActiveTab("dashboard");
          setIsMobileMenuOpen(false);
        }}
      >
        <BarChart3 className="w-4 h-4 mr-2 md:mr-0 md:w-5 md:h-5" />
        <span className="md:hidden">Dashboard</span>
      </Button>
      <Button 
        variant={activeTab === "habits" ? "default" : "ghost"}
        className="justify-start md:justify-center text-wellness-700 hover:text-wellness-900"
        onClick={() => {
          setActiveTab("habits");
          setIsMobileMenuOpen(false);
        }}
      >
        <Target className="w-4 h-4 mr-2 md:mr-0 md:w-5 md:h-5" />
        <span className="md:hidden">Habits</span>
      </Button>
      <Button 
        variant={activeTab === "progress" ? "default" : "ghost"}
        className="justify-start md:justify-center text-wellness-700 hover:text-wellness-900"
        onClick={() => {
          setActiveTab("progress");
          setIsMobileMenuOpen(false);
        }}
      >
        <TrendingUp className="w-4 h-4 mr-2 md:mr-0 md:w-5 md:h-5" />
        <span className="md:hidden">Progress</span>
      </Button>
      <Button 
        variant={activeTab === "motivation" ? "default" : "ghost"}
        className="justify-start md:justify-center text-wellness-700 hover:text-wellness-900"
        onClick={() => {
          setActiveTab("motivation");
          setIsMobileMenuOpen(false);
        }}
      >
        <Brain className="w-4 h-4 mr-2 md:mr-0 md:w-5 md:h-5" />
        <span className="md:hidden">Motivation</span>
      </Button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 via-background to-calm-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-wellness-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-wellness-500 to-wellness-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-wellness-900">WellnessTracker</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavItems />
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <User className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-6">
                    <NavItems />
                    <div className="border-t pt-4">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/profile">
                          <User className="w-4 h-4 mr-2" />
                          Profile & Settings
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/login">
                          <Settings className="w-4 h-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Section - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-wellness-900 mb-2">Good morning! 🌅</h2>
          <p className="text-sm sm:text-base text-wellness-700">Let's make today another step towards better health</p>
        </div>

        {/* Quick Stats - Mobile First */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-wellness-50 border-wellness-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-wellness-600 mb-1 sm:mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-wellness-900">{completedToday}/{totalHabits}</div>
                <p className="text-xs sm:text-sm text-wellness-600">Today</p>
              </div>
              <Progress value={overallProgress} className="mt-2 sm:mt-3 h-1 sm:h-2" />
            </CardContent>
          </Card>

          <Card className="bg-energy-50 border-energy-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-energy-600 mb-1 sm:mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-energy-900">
                  {habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0}
                </div>
                <p className="text-xs sm:text-sm text-energy-600">Best Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-calm-50 border-calm-200 col-span-2 sm:col-span-1">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-calm-600 mb-1 sm:mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-calm-900">85%</div>
                <p className="text-xs sm:text-sm text-calm-600">This Week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Today's Quick Actions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-wellness-900">Today's Habits</h3>
                  <Button 
                    size="sm" 
                    className="bg-wellness-600 hover:bg-wellness-700"
                    onClick={() => setActiveTab("habits")}
                  >
                    <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Add Habit</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {habits.slice(0, 3).map((habit) => (
                    <HabitCard
                      key={habit.id}
                      {...habit}
                      onToggle={(id) => {
                        const h = habits.find(h => h.id === id);
                        if (h) {
                          const newCompleted = !h.completedToday;
                          const newCurrent = newCompleted ? h.target : Math.max(0, h.current);
                          const newStreak = newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1);
                          updateHabit(id, {
                            completedToday: newCompleted,
                            current: newCurrent,
                            streak: newStreak
                          });
                        }
                      }}
                      onIncrement={(id) => {
                        const h = habits.find(h => h.id === id);
                        if (h && h.current < h.target) {
                          const newCurrent = h.current + 1;
                          updateHabit(id, {
                            current: newCurrent,
                            completedToday: newCurrent >= h.target
                          });
                        }
                      }}
                      onDecrement={(id) => {
                        const h = habits.find(h => h.id === id);
                        if (h && h.current > 0) {
                          const newCurrent = h.current - 1;
                          updateHabit(id, {
                            current: newCurrent,
                            completedToday: newCurrent >= h.target
                          });
                        }
                      }}
                    />
                  ))}
                </div>
                {habits.length > 3 && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("habits")}
                      className="w-full sm:w-auto"
                    >
                      View All Habits ({habits.length})
                    </Button>
                  </div>
                )}
              </div>

              {/* Motivation Section */}
              <div className="lg:hidden">
                <MotivationSection />
              </div>

              {/* Desktop: Side-by-side layout */}
              <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-wellness-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab("progress")}
                    >
                      <BarChart3 className="w-6 h-6" />
                      <span>View Progress</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab("habits")}
                    >
                      <Calendar className="w-6 h-6" />
                      <span>Manage Habits</span>
                    </Button>
                  </div>
                </div>
                <div>
                  <MotivationSection />
                </div>
              </div>
            </div>
          )}

          {activeTab === "habits" && (
            <HabitLogger
              habits={habits}
              onUpdateHabit={updateHabit}
              onAddHabit={addHabit}
              onDeleteHabit={deleteHabit}
            />
          )}

          {activeTab === "progress" && (
            <ProgressTracker
              habitProgress={habits.map(habit => ({
                habitId: habit.id,
                habitName: habit.name,
                color: habit.color,
                weeklyData: [100, 85, 100, 90, 100, 95, 80], // Mock data
                monthlyStreak: habit.streak,
                totalCompletions: habit.streak + 5, // Mock calculation
                consistency: Math.min(95, 60 + habit.streak * 2) // Mock calculation
              }))}
              timeframe="week"
              onTimeframeChange={() => {}}
            />
          )}

          {activeTab === "motivation" && (
            <MotivationSection />
          )}
        </div>
      </main>
    </div>
  );
}
