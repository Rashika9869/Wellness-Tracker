import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Target,
  BarChart3,
  Activity,
  Flame,
  Award,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HabitProgress {
  habitId: string;
  habitName: string;
  color: "wellness" | "energy" | "calm";
  weeklyData: number[]; // 7 days of completion percentage
  monthlyStreak: number;
  totalCompletions: number;
  consistency: number; // percentage
}

interface ProgressTrackerProps {
  habitProgress: HabitProgress[];
  timeframe: "week" | "month" | "year";
  onTimeframeChange: (timeframe: "week" | "month" | "year") => void;
}

const mockProgressData: HabitProgress[] = [
  {
    habitId: "1",
    habitName: "Drink Water",
    color: "calm",
    weeklyData: [100, 85, 100, 90, 100, 95, 80],
    monthlyStreak: 12,
    totalCompletions: 25,
    consistency: 92
  },
  {
    habitId: "2", 
    habitName: "Exercise",
    color: "energy",
    weeklyData: [100, 0, 100, 100, 85, 100, 70],
    monthlyStreak: 8,
    totalCompletions: 18,
    consistency: 78
  },
  {
    habitId: "3",
    habitName: "Meditation",
    color: "wellness", 
    weeklyData: [100, 100, 90, 100, 100, 100, 100],
    monthlyStreak: 15,
    totalCompletions: 28,
    consistency: 96
  }
];

export default function ProgressTracker({ 
  habitProgress = mockProgressData, 
  timeframe = "week",
  onTimeframeChange 
}: ProgressTrackerProps) {
  const [selectedHabit, setSelectedHabit] = useState<string>("all");
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const getColorClasses = (color: "wellness" | "energy" | "calm") => {
    const colors = {
      wellness: {
        bg: "bg-wellness-500",
        light: "bg-wellness-100",
        text: "text-wellness-700",
        border: "border-wellness-200"
      },
      energy: {
        bg: "bg-energy-500", 
        light: "bg-energy-100",
        text: "text-energy-700",
        border: "border-energy-200"
      },
      calm: {
        bg: "bg-calm-500",
        light: "bg-calm-100", 
        text: "text-calm-700",
        border: "border-calm-200"
      }
    };
    return colors[color];
  };

  const getOverallStats = () => {
    const totalHabits = habitProgress.length;
    const avgConsistency = habitProgress.reduce((sum, h) => sum + h.consistency, 0) / totalHabits;
    const bestStreak = Math.max(...habitProgress.map(h => h.monthlyStreak));
    const totalCompletions = habitProgress.reduce((sum, h) => sum + h.totalCompletions, 0);

    return { totalHabits, avgConsistency, bestStreak, totalCompletions };
  };

  const stats = getOverallStats();

  const getDayName = (offset: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - offset);
    return days[targetDate.getDay()];
  };

  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => getDayName(6 - i));
  };

  const filteredProgress = selectedHabit === "all" 
    ? habitProgress 
    : habitProgress.filter(h => h.habitId === selectedHabit);

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-wellness-900">Progress Tracking</h2>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedHabit} onValueChange={setSelectedHabit}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Habits</SelectItem>
              {habitProgress.map(habit => (
                <SelectItem key={habit.habitId} value={habit.habitId}>
                  {habit.habitName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={timeframe} onValueChange={onTimeframeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-wellness-50 to-wellness-100 border-wellness-200">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-wellness-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-wellness-900">{stats.totalHabits}</div>
            <div className="text-sm text-wellness-700">Active Habits</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-energy-50 to-energy-100 border-energy-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-energy-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-energy-900">{Math.round(stats.avgConsistency)}%</div>
            <div className="text-sm text-energy-700">Avg Consistency</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-calm-50 to-calm-100 border-calm-200">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 text-calm-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-calm-900">{stats.bestStreak}</div>
            <div className="text-sm text-calm-700">Best Streak</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-wellness-50 to-calm-50 border-wellness-200">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 text-wellness-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-wellness-900">{stats.totalCompletions}</div>
            <div className="text-sm text-wellness-700">Total Completions</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Weekly Progress</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">This Week</span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-muted-foreground">
              {getWeekDays().map((day, index) => (
                <div key={index} className="py-2">{day}</div>
              ))}
            </div>

            {/* Progress Bars for Each Habit */}
            {filteredProgress.map((habit) => {
              const colorClasses = getColorClasses(habit.color);
              return (
                <div key={habit.habitId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{habit.habitName}</span>
                    <Badge className={`${colorClasses.light} ${colorClasses.text}`}>
                      {habit.consistency}% consistent
                    </Badge>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {habit.weeklyData.map((completion, dayIndex) => (
                      <div key={dayIndex} className="space-y-1">
                        <div className={`h-12 rounded-md relative overflow-hidden bg-muted`}>
                          <div 
                            className={`${colorClasses.bg} absolute bottom-0 left-0 right-0 transition-all duration-500`}
                            style={{ height: `${completion}%` }}
                          />
                        </div>
                        <div className="text-xs text-center text-muted-foreground">
                          {completion}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Habit Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProgress.map((habit) => {
          const colorClasses = getColorClasses(habit.color);
          return (
            <Card key={habit.habitId} className={`${colorClasses.border}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{habit.habitName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Consistency Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Consistency</span>
                    <span className="text-sm text-muted-foreground">{habit.consistency}%</span>
                  </div>
                  <Progress value={habit.consistency} className="h-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-xl font-bold ${colorClasses.text}`}>
                      {habit.monthlyStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">Current Streak</div>
                  </div>
                  <div>
                    <div className={`text-xl font-bold ${colorClasses.text}`}>
                      {habit.totalCompletions}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Completions</div>
                  </div>
                </div>

                {/* Weekly Summary */}
                <div>
                  <div className="text-sm font-medium mb-2">This Week</div>
                  <div className="flex items-center space-x-1">
                    {habit.weeklyData.map((completion, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                          completion >= 100 
                            ? `${colorClasses.bg} text-white` 
                            : completion > 0
                            ? `${colorClasses.light} ${colorClasses.text}`
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {completion >= 100 ? "✓" : completion > 0 ? "○" : "—"}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Insights */}
      <Card className="bg-gradient-to-r from-wellness-50 to-energy-50 border-wellness-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-wellness-900">
            <TrendingUp className="w-5 h-5" />
            <span>Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-wellness-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-wellness-900">Great Progress!</h4>
                <p className="text-sm text-wellness-700">
                  You're maintaining an average consistency of {Math.round(stats.avgConsistency)}%. 
                  Keep up the excellent work!
                </p>
              </div>
            </div>

            {stats.avgConsistency < 80 && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-energy-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-energy-900">Room for Improvement</h4>
                  <p className="text-sm text-energy-700">
                    Try focusing on one habit at a time to build stronger consistency.
                  </p>
                </div>
              </div>
            )}

            {stats.bestStreak >= 14 && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-calm-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-calm-900">Streak Master!</h4>
                  <p className="text-sm text-calm-700">
                    Your {stats.bestStreak}-day streak shows incredible dedication. You're building lasting habits!
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
