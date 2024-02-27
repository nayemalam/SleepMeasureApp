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
        <Text style={[theme.pageTitleLarge, styles.pageTitleSpacing]}>
          Family Members
        </Text>
        {familyData.map((member: FamilyMember) => (
          <TouchableOpacity
            key={member.id}
            style={styles.cardStyle}
            onPress={() =>
              navigation.navigate('Profile', { familyMember: member })
            }>
            <View>
              <Text style={styles.cardTitle}>{member.name}</Text>
              <Text style={styles.cardContent}>{member.relation}</Text>
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
