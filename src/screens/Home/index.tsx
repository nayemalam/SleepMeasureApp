import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import familyService from '../../services/FamilyService';
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
    return <ActivityIndicator color="#FFF" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <Text>{JSON.stringify(familyData, null, 2)}</Text> */}
        <Text>Hello, world jnjf!</Text>
        {familyData.map((member: FamilyMember) => (
          <Button
            key={member.id}
            title={member.name}
            onPress={() =>
              navigation.navigate('Profile', { familyMember: member })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
