import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  Activity,
  Droplets,
  Brain,
  Clock,
  Heart,
  Target,
  BookOpen,
  Utensils
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HabitCard from "./HabitCard";

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

interface HabitLoggerProps {
  habits: Habit[];
  onUpdateHabit: (id: string, updates: Partial<Habit>) => void;
  onAddHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'current'>) => void;
  onDeleteHabit: (id: string) => void;
}

const habitTemplates = [
  { name: "Drink Water", icon: <Droplets className="w-5 h-5" />, target: 8, unit: "glasses", color: "calm" as const, category: "Health" },
  { name: "Exercise", icon: <Activity className="w-5 h-5" />, target: 1, unit: "session", color: "energy" as const, category: "Fitness" },
  { name: "Meditation", icon: <Brain className="w-5 h-5" />, target: 1, unit: "session", color: "wellness" as const, category: "Mindfulness" },
  { name: "Sleep 8 Hours", icon: <Clock className="w-5 h-5" />, target: 8, unit: "hours", color: "calm" as const, category: "Health" },
  { name: "Read", icon: <BookOpen className="w-5 h-5" />, target: 30, unit: "minutes", color: "wellness" as const, category: "Learning" },
  { name: "Healthy Meal", icon: <Utensils className="w-5 h-5" />, target: 3, unit: "meals", color: "energy" as const, category: "Nutrition" },
  { name: "Gratitude", icon: <Heart className="w-5 h-5" />, target: 1, unit: "entry", color: "wellness" as const, category: "Mindfulness" },
];

export default function HabitLogger({ habits, onUpdateHabit, onAddHabit, onDeleteHabit }: HabitLoggerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: "",
    target: 1,
    unit: "",
    color: "wellness" as const,
    category: "Health",
    icon: <Target className="w-5 h-5" />
  });

  const categories = Array.from(new Set([...habits.map(h => h.category), ...habitTemplates.map(t => t.category)]));

  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || habit.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const newCompleted = !habit.completedToday;
      const newCurrent = newCompleted ? habit.target : Math.max(0, habit.current);
      const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
      
      onUpdateHabit(id, {
        completedToday: newCompleted,
        current: newCurrent,
        streak: newStreak
      });
    }
  };

  const handleIncrementHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (habit && habit.current < habit.target) {
      const newCurrent = habit.current + 1;
      const newCompleted = newCurrent >= habit.target;
      onUpdateHabit(id, {
        current: newCurrent,
        completedToday: newCompleted
      });
    }
  };

  const handleDecrementHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (habit && habit.current > 0) {
      const newCurrent = habit.current - 1;
      const newCompleted = newCurrent >= habit.target;
      onUpdateHabit(id, {
        current: newCurrent,
        completedToday: newCompleted
      });
    }
  };

  const handleAddHabit = () => {
    if (newHabit.name.trim()) {
      onAddHabit({
        name: newHabit.name,
        icon: newHabit.icon,
        target: newHabit.target,
        color: newHabit.color,
        unit: newHabit.unit,
        category: newHabit.category
      });
      setNewHabit({
        name: "",
        target: 1,
        unit: "",
        color: "wellness",
        category: "Health",
        icon: <Target className="w-5 h-5" />
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleUseTemplate = (template: typeof habitTemplates[0]) => {
    setNewHabit({
      name: template.name,
      target: template.target,
      unit: template.unit,
      color: template.color,
      category: template.category,
      icon: template.icon
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-wellness-900">Habit Logger</h2>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-48"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-wellness-600 hover:bg-wellness-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Habit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Habit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Quick Templates */}
                <div>
                  <Label className="text-sm font-medium">Quick Templates</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {habitTemplates.slice(0, 4).map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleUseTemplate(template)}
                        className="justify-start"
                      >
                        {template.icon}
                        <span className="ml-2 text-xs">{template.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Habit Form */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="habit-name">Habit Name</Label>
                    <Input
                      id="habit-name"
                      value={newHabit.name}
                      onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter habit name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="habit-target">Target</Label>
                      <Input
                        id="habit-target"
                        type="number"
                        min="1"
                        value={newHabit.target}
                        onChange={(e) => setNewHabit(prev => ({ ...prev, target: parseInt(e.target.value) || 1 }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="habit-unit">Unit</Label>
                      <Input
                        id="habit-unit"
                        value={newHabit.unit}
                        onChange={(e) => setNewHabit(prev => ({ ...prev, unit: e.target.value }))}
                        placeholder="e.g. glasses, minutes"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="habit-category">Category</Label>
                      <Select 
                        value={newHabit.category} 
                        onValueChange={(value) => setNewHabit(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["Health", "Fitness", "Mindfulness", "Learning", "Nutrition", "Productivity"].map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="habit-color">Color Theme</Label>
                      <Select 
                        value={newHabit.color} 
                        onValueChange={(value: "wellness" | "energy" | "calm") => setNewHabit(prev => ({ ...prev, color: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wellness">Wellness Green</SelectItem>
                          <SelectItem value="energy">Energy Orange</SelectItem>
                          <SelectItem value="calm">Calm Blue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={handleAddHabit}
                    className="flex-1 bg-wellness-600 hover:bg-wellness-700"
                  >
                    Add Habit
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Habits Grid */}
      {filteredHabits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              {...habit}
              onToggle={handleToggleHabit}
              onIncrement={handleIncrementHabit}
              onDecrement={handleDecrementHabit}
              onDelete={onDeleteHabit}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {searchTerm || filterCategory !== "all" ? "No habits found" : "No habits yet"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm || filterCategory !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Start your wellness journey by adding your first habit"
              }
            </p>
            {!searchTerm && filterCategory === "all" && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-wellness-600 hover:bg-wellness-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Habit
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      {habits.length > 0 && (
        <Card className="bg-gradient-to-r from-wellness-50 to-energy-50 border-wellness-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-wellness-900">{habits.length}</div>
                <div className="text-sm text-wellness-700">Total Habits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-energy-900">
                  {habits.filter(h => h.completedToday).length}
                </div>
                <div className="text-sm text-energy-700">Completed Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-calm-900">
                  {Math.max(...habits.map(h => h.streak), 0)}
                </div>
                <div className="text-sm text-calm-700">Best Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wellness-900">
                  {Math.round((habits.filter(h => h.completedToday).length / habits.length) * 100)}%
                </div>
                <div className="text-sm text-wellness-700">Daily Success</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
