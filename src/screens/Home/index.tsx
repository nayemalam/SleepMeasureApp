import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import familyService from '../../services/FamilyService';
import { theme } from '../../styles/theme';
import { FamilyMember, RootStackParamList } from '../../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [familyData, setFamilyData] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const handleAdd = (id: string) => {
    setFavorites([...favorites, id]);
  };

  const handleDelete = (id: string) => {
    setFavorites(favorites.filter(favorite => favorite !== id));
  };

  const fetchFamilyMembers = useCallback(async () => {
    try {
      const results = await familyService.getFamilyMembers();
      setFamilyData(results);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFamilyMembers();
  }, [fetchFamilyMembers]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingContent}>Retrieving family members...</Text>
        <ActivityIndicator animating={true} color={theme.colors.defaultWhite} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={[
            theme.pageTitleLarge,
            styles.pageTitleSpacing,
            {
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              width: Dimensions.get('window').width - 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text style={theme.pageTitleLarge}>Family Members</Text>
          <TouchableOpacity onPress={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? (
              <Text style={styles.cardTitle}>Hide Favorites</Text>
            ) : (
              <Text style={styles.cardTitle}>Show Favorites</Text>
            )}
          </TouchableOpacity>
        </View>
        {showFavorites &&
          favorites.map(id => {
            const member = familyData.find(m => m.id === id);
            if (member) {
              return (
                <TouchableOpacity
                  key={member.id}
                  testID={`memberButton-${member.id}`}
                  style={styles.cardStyle}
                  onPress={() =>
                    navigation.navigate('Profile', { familyMember: member })
                  }>
                  <Text style={styles.cardTitle}>{member.name}</Text>
                  <Text style={styles.cardContent}>{member.relation}</Text>
                </TouchableOpacity>
              );
            }
          })}
        {!showFavorites &&
          familyData.map((member: FamilyMember) => (
            <TouchableOpacity
              key={member.id}
              testID={`memberButton-${member.id}`}
              style={styles.cardStyle}
              onPress={() =>
                navigation.navigate('Profile', { familyMember: member })
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                {!favorites?.includes(member.id) ? (
                  <Icon
                    style={{
                      fontSize: 24,
                      color: theme.colors.defaultWhite,
                    }}
                    name="star-outline"
                    onPress={() => handleAdd(member.id)}
                  />
                ) : (
                  <Icon
                    style={{
                      fontSize: 24,
                      color: theme.colors.defaultWhite,
                    }}
                    name="star"
                    onPress={() => handleDelete(member.id)}
                  />
                )}
                <View>
                  <Text style={styles.cardTitle}>{member.name}</Text>
                  <Text style={styles.cardContent}>{member.relation}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.defaultBlack,
  },
  loadingContent: {
    color: theme.colors.defaultWhite,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.defaultBlack,
  },
  pageTitleSpacing: {
    marginVertical: 20,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    flexDirection: 'row',
  },
  cardStyle: {
    backgroundColor: theme.colors.slateGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cardTitle: {
    color: theme.colors.defaultWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 14,
    color: theme.colors.softGray,
    marginTop: 4,
  },
});
