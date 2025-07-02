import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  Play,
  Clock,
  Zap,
  Heart,
  Dumbbell,
  Activity,
  Target,
  Star
} from 'lucide-react-native';

const workoutCategories = [
  { id: 'all', name: 'All', icon: Target },
  { id: 'strength', name: 'Strength', icon: Dumbbell },
  { id: 'cardio', name: 'Cardio', icon: Heart },
  { id: 'hiit', name: 'HIIT', icon: Zap },
  { id: 'flexibility', name: 'Flexibility', icon: Activity },
];

const featuredWorkouts = [
  {
    id: 1,
    title: 'Morning Energy Boost',
    description: 'Start your day with this energizing full-body workout',
    duration: '20 min',
    difficulty: 'Beginner',
    image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    category: 'HIIT',
    rating: 4.8,
    gradient: ['#FF6B6B', '#FF8E53']
  },
  {
    id: 2,
    title: 'Upper Body Strength',
    description: 'Build muscle and strength in your upper body',
    duration: '45 min',
    difficulty: 'Intermediate',
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    category: 'Strength',
    rating: 4.9,
    gradient: ['#4ECDC4', '#44A08D']
  }
];

const popularWorkouts = [
  {
    id: 3,
    title: 'Fat Burning Cardio',
    duration: '30 min',
    difficulty: 'Intermediate',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    category: 'Cardio',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Core Crusher',
    duration: '15 min',
    difficulty: 'Advanced',
    image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    category: 'Strength',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Yoga Flow',
    duration: '40 min',
    difficulty: 'Beginner',
    image: 'https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    category: 'Flexibility',
    rating: 4.8
  },
  {
    id: 6,
    title: 'HIIT Blast',
    duration: '25 min',
    difficulty: 'Advanced',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    category: 'HIIT',
    rating: 4.9
  }
];

export default function WorkoutsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search workouts..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {workoutCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <category.icon
                  size={20}
                  color={selectedCategory === category.id ? 'white' : '#6B7280'}
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Workouts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredWorkouts.map((workout) => (
              <TouchableOpacity key={workout.id} style={styles.featuredCard}>
                <Image source={{ uri: workout.image }} style={styles.featuredImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.featuredOverlay}
                >
                  <View style={styles.featuredContent}>
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>{workout.category}</Text>
                    </View>
                    <Text style={styles.featuredTitle}>{workout.title}</Text>
                    <Text style={styles.featuredDescription}>{workout.description}</Text>
                    <View style={styles.featuredMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="white" />
                        <Text style={styles.metaText}>{workout.duration}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Star size={14} color="#F59E0B" />
                        <Text style={styles.metaText}>{workout.rating}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.playButton}>
                    <Play size={24} color="white" />
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Workouts</Text>
          <View style={styles.workoutGrid}>
            {popularWorkouts.map((workout) => (
              <TouchableOpacity key={workout.id} style={styles.workoutCard}>
                <Image source={{ uri: workout.image }} style={styles.workoutImage} />
                <View style={styles.workoutContent}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <View style={styles.workoutMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={12} color="#6B7280" />
                      <Text style={styles.workoutMetaText}>{workout.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Star size={12} color="#F59E0B" />
                      <Text style={styles.workoutMetaText}>{workout.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.difficultyContainer}>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(workout.difficulty) }
                      ]}
                    >
                      <Text style={styles.difficultyText}>{workout.difficulty}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#6366F1',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: 'white',
  },
  section: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  featuredCard: {
    width: 280,
    height: 200,
    borderRadius: 20,
    marginHorizontal: 8,
    marginLeft: 24,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
  },
  featuredContent: {
    flex: 1,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  featuredTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
  },
  workoutCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutImage: {
    width: '100%',
    height: 120,
  },
  workoutContent: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  workoutMetaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  difficultyContainer: {
    alignItems: 'flex-start',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
});