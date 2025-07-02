import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Play,
  Target,
  Flame,
  Clock,
  ChevronRight,
  Award,
  Calendar,
  Zap
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.name}>Sarah! 👋</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
            <Text style={styles.notificationText}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Stats */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.statsCard}
          >
            <Text style={styles.statsTitle}>Today's Progress</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Flame size={20} color="white" />
                <Text style={styles.statValue}>2,450</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={20} color="white" />
                <Text style={styles.statValue}>45min</Text>
                <Text style={styles.statLabel}>Active</Text>
              </View>
              <View style={styles.statItem}>
                <Target size={20} color="white" />
                <Text style={styles.statValue}>7,842</Text>
                <Text style={styles.statLabel}>Steps</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#EC4899', '#F43F5E']}
                style={styles.actionGradient}
              >
                <Play size={24} color="white" />
                <Text style={styles.actionText}>Start Workout</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.actionGradient}
              >
                <Target size={24} color="white" />
                <Text style={styles.actionText}>Log Meal</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Challenge */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Challenge</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.challengeCard}>
            <View style={styles.challengeContent}>
              <View style={styles.challengeIcon}>
                <Zap size={24} color="#F59E0B" />
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>30-Minute HIIT</Text>
                <Text style={styles.challengeDescription}>
                  High-intensity workout to boost your metabolism
                </Text>
                <View style={styles.challengeProgress}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '70%' }]} />
                  </View>
                  <Text style={styles.progressText}>70% Complete</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsContainer}>
              <View style={styles.achievementCard}>
                <Award size={32} color="#F59E0B" />
                <Text style={styles.achievementTitle}>7-Day Streak</Text>
                <Text style={styles.achievementDate}>Yesterday</Text>
              </View>
              <View style={styles.achievementCard}>
                <Target size={32} color="#10B981" />
                <Text style={styles.achievementTitle}>Goal Crusher</Text>
                <Text style={styles.achievementDate}>2 days ago</Text>
              </View>
              <View style={styles.achievementCard}>
                <Calendar size={32} color="#6366F1" />
                <Text style={styles.achievementTitle}>Weekly Goal</Text>
                <Text style={styles.achievementDate}>3 days ago</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Upcoming Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Scheduled for Today</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.workoutCard}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTime}>2:00 PM</Text>
              <View>
                <Text style={styles.workoutTitle}>Upper Body Strength</Text>
                <Text style={styles.workoutDescription}>45 min • Intermediate</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.workoutButton}>
              <Play size={16} color="#6366F1" />
            </TouchableOpacity>
          </View>

          <View style={styles.workoutCard}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTime}>6:30 PM</Text>
              <View>
                <Text style={styles.workoutTitle}>Evening Yoga</Text>
                <Text style={styles.workoutDescription}>30 min • Beginner</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.workoutButton}>
              <Play size={16} color="#6366F1" />
            </TouchableOpacity>
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
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    zIndex: 1,
  },
  notificationText: {
    fontSize: 24,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statsCard: {
    borderRadius: 20,
    padding: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
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
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  workoutTime: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#6366F1',
    marginRight: 16,
    minWidth: 60,
  },
  workoutTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  workoutDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  workoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});