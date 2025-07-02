import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Heart, MessageCircle, Share, Trophy, Users, Target, Flame, Clock, Crown, Medal, ChevronRight, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

const challenges = [
  {
    id: 1,
    title: 'Summer Shred Challenge',
    description: 'Burn 10,000 calories in 2 weeks',
    participants: 1247,
    daysLeft: 8,
    progress: 65,
    reward: '🏆 Gold Badge',
    gradient: ['#FF6B6B', '#FF8E53'],
  },
  {
    id: 2,
    title: 'Strength Building',
    description: 'Complete 20 strength workouts',
    participants: 856,
    daysLeft: 15,
    progress: 40,
    reward: '💪 Strong Badge',
    gradient: ['#4ECDC4', '#44A08D'],
  },
  {
    id: 3,
    title: 'Mindful Movement',
    description: 'Practice yoga for 30 days',
    participants: 623,
    daysLeft: 22,
    progress: 25,
    reward: '🧘 Zen Badge',
    gradient: ['#A8E6CF', '#88D8C0'],
  },
];

const leaderboard = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    points: 15420,
    rank: 1,
    badge: '👑',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    points: 14680,
    rank: 2,
    badge: '🥈',
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    points: 13920,
    rank: 3,
    badge: '🥉',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    points: 12150,
    rank: 4,
    badge: '⭐',
  },
];

const posts = [
  {
    id: 1,
    user: {
      name: 'Jessica Martinez',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      verified: true,
    },
    content: 'Just completed my first 5K run! 🏃‍♀️ The journey from couch to 5K was challenging but so rewarding. Thanks to everyone who supported me along the way! 💪',
    image: 'https://images.pexels.com/photos/2402264/pexels-photo-2402264.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    likes: 42,
    comments: 8,
    time: '2h ago',
    achievement: '5K Runner',
  },
  {
    id: 2,
    user: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      verified: false,
    },
    content: 'New personal record on bench press! 💪 125kg × 3 reps. Consistency and progressive overload really work. What\'s your current PR?',
    likes: 28,
    comments: 15,
    time: '4h ago',
    achievement: 'Strength Warrior',
  },
  {
    id: 3,
    user: {
      name: 'Lisa Thompson',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      verified: true,
    },
    content: 'Meal prep Sunday done! 🥗 Prepared healthy meals for the entire week. This habit has been a game-changer for my fitness goals.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    likes: 35,
    comments: 6,
    time: '6h ago',
    achievement: 'Nutrition Expert',
  },
];

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchText, setSearchText] = useState('');

  const renderPost = ({ item }: { item: typeof posts[0] }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
        <View style={styles.postUserInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{item.user.name}</Text>
            {item.user.verified && <Text style={styles.verifiedBadge}>✓</Text>}
          </View>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {item.achievement && (
        <View style={styles.achievementBanner}>
          <Trophy size={16} color="#F59E0B" />
          <Text style={styles.achievementText}>Earned: {item.achievement}</Text>
        </View>
      )}

      <Text style={styles.postContent}>{item.content}</Text>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={20} color="#6B7280" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#6B7280" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'feed', label: 'Feed', icon: Users },
          { key: 'challenges', label: 'Challenges', icon: Target },
          { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.tabButtonActive
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <tab.icon 
              size={20} 
              color={activeTab === tab.key ? '#6366F1' : '#6B7280'} 
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'feed' && (
          <>
            {/* Search */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color="#6B7280" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search posts..."
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Posts */}
            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.postsContainer}
            />
          </>
        )}

        {activeTab === 'challenges' && (
          <View style={styles.challengesContainer}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            {challenges.map((challenge) => (
              <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
                <LinearGradient
                  colors={challenge.gradient}
                  style={styles.challengeGradient}
                >
                  <View style={styles.challengeHeader}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeReward}>{challenge.reward}</Text>
                  </View>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  
                  <View style={styles.challengeStats}>
                    <View style={styles.challengeStat}>
                      <Users size={16} color="rgba(255, 255, 255, 0.8)" />
                      <Text style={styles.challengeStatText}>{challenge.participants.toLocaleString()}</Text>
                    </View>
                    <View style={styles.challengeStat}>
                      <Clock size={16} color="rgba(255, 255, 255, 0.8)" />
                      <Text style={styles.challengeStatText}>{challenge.daysLeft} days left</Text>
                    </View>
                  </View>

                  <View style={styles.challengeProgress}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${challenge.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{challenge.progress}% Complete</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'leaderboard' && (
          <View style={styles.leaderboardContainer}>
            <Text style={styles.sectionTitle}>This Week's Top Performers</Text>
            
            {leaderboard.map((user, index) => (
              <View key={user.id} style={styles.leaderboardItem}>
                <View style={styles.rankSection}>
                  <Text style={styles.rankNumber}>{user.rank}</Text>
                  <Text style={styles.rankBadge}>{user.badge}</Text>
                </View>
                
                <Image source={{ uri: user.avatar }} style={styles.leaderboardAvatar} />
                
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.leaderboardName}>{user.name}</Text>
                  <Text style={styles.leaderboardPoints}>{user.points.toLocaleString()} points</Text>
                </View>
                
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.yourRankCard}>
              <Text style={styles.yourRankTitle}>Your Rank</Text>
              <View style={styles.yourRankInfo}>
                <Text style={styles.yourRankNumber}>#247</Text>
                <Text style={styles.yourRankPoints}>8,420 points</Text>
              </View>
              <TouchableOpacity style={styles.viewFullButton}>
                <Text style={styles.viewFullText}>View Full Leaderboard</Text>
                <ChevronRight size={16} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </View>
        )}

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
  createButton: {
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#EEF2FF',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#6366F1',
  },
  content: {
    flex: 1,
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
  postsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  verifiedBadge: {
    fontSize: 14,
    color: '#6366F1',
  },
  postTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  achievementBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  achievementText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#92400E',
  },
  postContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  challengesContainer: {
    paddingVertical: 16,
  },
  challengeCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  challengeGradient: {
    padding: 24,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
    flex: 1,
    marginRight: 12,
  },
  challengeReward: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  challengeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  challengeStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  challengeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeStatText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  challengeProgress: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  leaderboardContainer: {
    paddingVertical: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  rankSection: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 40,
  },
  rankNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  rankBadge: {
    fontSize: 16,
    marginTop: 2,
  },
  leaderboardAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  leaderboardPoints: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  followButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  yourRankCard: {
    backgroundColor: '#F8FAFC',
    marginHorizontal: 24,
    marginTop: 8,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  yourRankTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 12,
  },
  yourRankInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yourRankNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  yourRankPoints: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  viewFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  viewFullText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
});