import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Camera, Target, Flame, Apple, Clock, ChevronRight, ChartBar as BarChart3, Coffee, UtensilsCrossed, Moon, Cookie } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mealCategories = [
  { id: 'breakfast', name: 'Breakfast', icon: Coffee, color: '#F59E0B' },
  { id: 'lunch', name: 'Lunch', icon: UtensilsCrossed, color: '#10B981' },
  { id: 'dinner', name: 'Dinner', icon: Moon, color: '#6366F1' },
  { id: 'snacks', name: 'Snacks', icon: Cookie, color: '#EC4899' },
];

const todaysMeals = [
  {
    id: 1,
    category: 'breakfast',
    name: 'Greek Yogurt Bowl',
    calories: 320,
    protein: 20,
    carbs: 35,
    fat: 8,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    time: '8:30 AM'
  },
  {
    id: 2,
    category: 'lunch',
    name: 'Grilled Chicken Salad',
    calories: 450,
    protein: 35,
    carbs: 20,
    fat: 25,
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    time: '12:45 PM'
  },
];

const recommendedMeals = [
  {
    id: 3,
    name: 'Protein Smoothie',
    calories: 280,
    protein: 25,
    prepTime: '5 min',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    category: 'Post-Workout'
  },
  {
    id: 4,
    name: 'Quinoa Buddha Bowl',
    calories: 380,
    protein: 18,
    prepTime: '15 min',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    category: 'Dinner'
  },
];

export default function NutritionScreen() {
  const [searchText, setSearchText] = useState('');
  
  const dailyGoals = {
    calories: { current: 770, target: 2200 },
    protein: { current: 55, target: 150 },
    carbs: { current: 55, target: 250 },
    fat: { current: 33, target: 75 },
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getMacroColor = (type: string) => {
    switch (type) {
      case 'protein': return '#EC4899';
      case 'carbs': return '#10B981';
      case 'fat': return '#F59E0B';
      default: return '#6366F1';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <TouchableOpacity style={styles.scanButton}>
            <Camera size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Daily Progress */}
        <View style={styles.progressContainer}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.progressCard}
          >
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
              <TouchableOpacity>
                <BarChart3 size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.caloriesSection}>
              <View style={styles.caloriesInfo}>
                <Text style={styles.caloriesConsumed}>{dailyGoals.calories.current}</Text>
                <Text style={styles.caloriesLabel}>consumed</Text>
              </View>
              <View style={styles.caloriesProgress}>
                <View style={styles.caloriesProgressBar}>
                  <View 
                    style={[
                      styles.caloriesProgressFill, 
                      { width: `${getProgressPercentage(dailyGoals.calories.current, dailyGoals.calories.target)}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.caloriesRemaining}>
                  {dailyGoals.calories.target - dailyGoals.calories.current} remaining
                </Text>
              </View>
              <View style={styles.caloriesInfo}>
                <Text style={styles.caloriesTarget}>{dailyGoals.calories.target}</Text>
                <Text style={styles.caloriesLabel}>goal</Text>
              </View>
            </View>

            <View style={styles.macrosSection}>
              {Object.entries(dailyGoals).slice(1).map(([key, value]) => (
                <View key={key} style={styles.macroItem}>
                  <Text style={styles.macroValue}>{value.current}g</Text>
                  <View style={styles.macroProgress}>
                    <View 
                      style={[
                        styles.macroProgressFill, 
                        { 
                          width: `${getProgressPercentage(value.current, value.target)}%`,
                          backgroundColor: getMacroColor(key)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.macroLabel}>{key}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Quick Add */}
        <View style={styles.quickAddContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Add</Text>
          </View>
          <View style={styles.quickAddButtons}>
            {mealCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.quickAddButton}>
                <View style={[styles.quickAddIcon, { backgroundColor: category.color }]}>
                  <category.icon size={20} color="white" />
                </View>
                <Text style={styles.quickAddText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search foods..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.scanMiniButton}>
              <Camera size={16} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Meals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          {todaysMeals.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <Image source={{ uri: meal.image }} style={styles.mealImage} />
              <View style={styles.mealContent}>
                <View style={styles.mealHeader}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
                <View style={styles.mealMacros}>
                  <View style={styles.macroChip}>
                    <Flame size={12} color="#EF4444" />
                    <Text style={styles.macroChipText}>{meal.calories} cal</Text>
                  </View>
                  <Text style={styles.macroText}>P: {meal.protein}g</Text>
                  <Text style={styles.macroText}>C: {meal.carbs}g</Text>
                  <Text style={styles.macroText}>F: {meal.fat}g</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.mealEditButton}>
                <Plus size={16} color="#6366F1" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recommended Meals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.recommendedContainer}>
              {recommendedMeals.map((meal) => (
                <TouchableOpacity key={meal.id} style={styles.recommendedCard}>
                  <Image source={{ uri: meal.image }} style={styles.recommendedImage} />
                  <View style={styles.recommendedContent}>
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedBadgeText}>{meal.category}</Text>
                    </View>
                    <Text style={styles.recommendedName}>{meal.name}</Text>
                    <View style={styles.recommendedMeta}>
                      <View style={styles.metaItem}>
                        <Flame size={12} color="#EF4444" />
                        <Text style={styles.recommendedMetaText}>{meal.calories} cal</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Clock size={12} color="#6B7280" />
                        <Text style={styles.recommendedMetaText}>{meal.prepTime}</Text>
                      </View>
                    </View>
                    <View style={styles.proteinInfo}>
                      <Text style={styles.proteinText}>{meal.protein}g protein</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  scanButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressCard: {
    borderRadius: 20,
    padding: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  caloriesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  caloriesInfo: {
    alignItems: 'center',
  },
  caloriesConsumed: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  caloriesTarget: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  caloriesLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  caloriesProgress: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  caloriesProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  caloriesProgressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  caloriesRemaining: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  macrosSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 8,
  },
  macroProgress: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  macroLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
  },
  quickAddContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  quickAddButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAddButton: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  quickAddIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAddText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  scanMiniButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  mealContent: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  mealTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  mealMacros: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  macroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  macroChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  macroText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  mealEditButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedContainer: {
    flexDirection: 'row',
    paddingLeft: 24,
    gap: 16,
  },
  recommendedCard: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendedImage: {
    width: '100%',
    height: 100,
  },
  recommendedContent: {
    padding: 16,
  },
  recommendedBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  recommendedBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  recommendedName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  recommendedMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recommendedMetaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  proteinInfo: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  proteinText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#15803D',
  },
});