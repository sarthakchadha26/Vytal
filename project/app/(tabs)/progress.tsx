import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TrendingUp,
  Calendar,
  Camera,
  Target,
  Flame,
  Activity,
  Award,
  ChevronRight,
  ChevronDown,
  Scale,
  Ruler,
  Clock,
  Zap,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const timeRanges = ['Week', 'Month', '3 Months', 'Year'];

const progressData = {
  weight: [
    { date: 'Jan', value: 75 },
    { date: 'Feb', value: 74.2 },
    { date: 'Mar', value: 73.8 },
    { date: 'Apr', value: 73.1 },
    { date: 'May', value: 72.5 },
    { date: 'Jun', value: 71.8 },
  ],
  workouts: [12, 15, 18, 14, 20, 16],
  calories: [2200, 2150, 2300, 2100, 2250, 2180],
};

const measurements = [
  { name: 'Weight', value: '71.8', unit: 'kg', change: '-3.2', icon: Scale, color: '#6366F1' },
  { name: 'Body Fat', value: '18.5', unit: '%', change: '-2.1', icon: Target, color: '#EC4899' },
  { name: 'Muscle Mass', value: '58.3', unit: 'kg', change: '+1.8', icon: Zap, color: '#10B981' },
  { name: 'BMI', value: '22.1', unit: '', change: '-1.2', icon: Activity, color: '#F59E0B' },
];

const achievements = [
  {
    id: 1,
    title: '30-Day Streak',
    description: 'Completed workouts for 30 consecutive days',
    date: '2 days ago',
    icon: Flame,
    color: '#EF4444',
    progress: 100,
  },
  {
    id: 2,
    title: 'Goal Crusher',
    description: 'Achieved weekly calorie burn goal',
    date: '1 week ago',
    icon: Target,
    color: '#10B981',
    progress: 100,
  },
  {
    id: 3,
    title: 'Strength Warrior',
    description: 'Increased max bench press by 10kg',
    date: '2 weeks ago',
    icon: Award,
    color: '#F59E0B',
    progress: 100,
  },
];

const bodyMeasurements = [
  { name: 'Chest', current: 98, previous: 96, unit: 'cm' },
  { name: 'Waist', current: 82, previous: 85, unit: 'cm' },
  { name: 'Hips', current: 95, previous: 97, unit: 'cm' },
  { name: 'Thigh', current: 58, previous: 60, unit: 'cm' },
  { name: 'Bicep', current: 35, previous: 33, unit: 'cm' },
  { name: 'Neck', current: 37, previous: 37, unit: 'cm' },
];

export default function ProgressScreen() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Month');
  const [showAllMeasurements, setShowAllMeasurements] = useState(false);

  const getChangeColor = (change: string) => {
    const isPositive = change.startsWith('+');
    const isNegative = change.startsWith('-');
    
    if (isPositive) return '#10B981';
    if (isNegative) return '#EF4444';
    return '#6B7280';
  };

  const getMeasurementChange = (current: number, previous: number) => {
    const change = current - previous;
    return change > 0 ? `+${change}` : `${change}`;
  };

  const getMeasurementChangeColor = (current: number, previous: number, name: string) => {
    const change = current - previous;
    const isImprovement = name === 'Waist' || name === 'Hips' || name === 'Thigh' ? change < 0 : change > 0;
    
    if (change === 0) return '#6B7280';
    return isImprovement ? '#10B981' : '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {timeRanges.map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeRangeButton,
                  selectedTimeRange === range && styles.timeRangeButtonActive
                ]}
                onPress={() => setSelectedTimeRange(range)}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    selectedTimeRange === range && styles.timeRangeTextActive
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Weight Progress Chart */}
        <View style={styles.chartContainer}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.chartCard}
          >
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Weight Progress</Text>
              <View style={styles.chartValue}>
                <Text style={styles.chartMainValue}>71.8 kg</Text>
                <Text style={styles.chartChange}>-3.2 kg</Text>
              </View>
            </View>
            
            {/* Simple Chart Visualization */}
            <View style={styles.chartArea}>
              <View style={styles.chartLine}>
                {progressData.weight.map((point, index) => (
                  <View key={index} style={styles.chartPoint}>
                    <View style={styles.chartDot} />
                    <Text style={styles.chartLabel}>{point.date}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            {measurements.map((metric, index) => (
              <View key={index} style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color }]}>
                  <metric.icon size={20} color="white" />
                </View>
                <Text style={styles.metricName}>{metric.name}</Text>
                <View style={styles.metricValueRow}>
                  <Text style={styles.metricValue}>
                    {metric.value}{metric.unit}
                  </Text>
                  <Text style={[styles.metricChange, { color: getChangeColor(metric.change) }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Body Measurements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Body Measurements</Text>
            <TouchableOpacity onPress={() => setShowAllMeasurements(!showAllMeasurements)}>
              <ChevronDown 
                size={20} 
                color="#6B7280" 
                style={[
                  styles.chevronIcon,
                  { transform: [{ rotate: showAllMeasurements ? '180deg' : '0deg' }] }
                ]}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.measurementsContainer}>
            {(showAllMeasurements ? bodyMeasurements : bodyMeasurements.slice(0, 3)).map((measurement, index) => (
              <View key={index} style={styles.measurementRow}>
                <Text style={styles.measurementName}>{measurement.name}</Text>
                <View style={styles.measurementValues}>
                  <Text style={styles.measurementCurrent}>
                    {measurement.current} {measurement.unit}
                  </Text>
                  <Text 
                    style={[
                      styles.measurementChange,
                      { color: getMeasurementChangeColor(measurement.current, measurement.previous, measurement.name) }
                    ]}
                  >
                    {getMeasurementChange(measurement.current, measurement.previous)} {measurement.unit}
                  </Text>
                </View>
              </View>
            ))}
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
          
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                <achievement.icon size={24} color="white" />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
              <View style={styles.achievementBadge}>
                <Award size={16} color="#F59E0B" />
              </View>
            </View>
          ))}
        </View>

        {/* Progress Photos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progress Photos</Text>
            <TouchableOpacity style={styles.addPhotoButton}>
              <Camera size={16} color="#6366F1" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.photosContainer}>
              <View style={styles.photoComparison}>
                <View style={styles.photoCard}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' }}
                    style={styles.progressPhoto}
                  />
                  <Text style={styles.photoLabel}>Jan 2024</Text>
                </View>
                <View style={styles.photoCard}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' }}
                    style={styles.progressPhoto}
                  />
                  <Text style={styles.photoLabel}>June 2024</Text>
                </View>
              </View>
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
  cameraButton: {
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
  timeRangeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  timeRangeButton: {
    paddingHorizontal: 20,
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
  timeRangeButtonActive: {
    backgroundColor: '#6366F1',
  },
  timeRangeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  timeRangeTextActive: {
    color: 'white',
  },
  chartContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  chartCard: {
    borderRadius: 20,
    padding: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  chartValue: {
    alignItems: 'flex-end',
  },
  chartMainValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  chartChange: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  chartArea: {
    height: 80,
    justifyContent: 'center',
  },
  chartLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  chartPoint: {
    alignItems: 'center',
  },
  chartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
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
  chevronIcon: {
    transform: [{ rotate: '0deg' }],
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    width: (width - 64) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  metricValueRow: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  measurementsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  measurementName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  measurementValues: {
    alignItems: 'flex-end',
  },
  measurementCurrent: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  measurementChange: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  achievementBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  addPhotoText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  photosContainer: {
    paddingLeft: 24,
  },
  photoComparison: {
    flexDirection: 'row',
    gap: 16,
  },
  photoCard: {
    alignItems: 'center',
  },
  progressPhoto: {
    width: 120,
    height: 160,
    borderRadius: 16,
    marginBottom: 8,
  },
  photoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
});