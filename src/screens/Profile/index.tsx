import { RouteProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import sleepSessionService from '../../services/SleepSessionService';
import {
  FamilyMember,
  FamilyMemberData,
  RootStackParamList,
} from '../../types';
import { platform } from '../../utils/constants';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

export default function ProfileScreen({ route }: Props) {
  const familyMember = route.params?.familyMember as FamilyMember;
  const [memberSleepInfo, setMemberSleepInfo] = useState<FamilyMemberData>(
    {} as FamilyMemberData,
  );
  const [isLoading, setIsLoading] = useState(true);

  console.log(familyMember);

  const fetchProfile = useCallback(async () => {
    try {
      const results = await sleepSessionService.getProfileData(familyMember.id);
      setMemberSleepInfo(results);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [familyMember.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) {
    return <ActivityIndicator color="#FFF" />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: platform.ios ? 10 : 12,
      }}>
      <Text
        style={{
          color: '#FFF',
          fontSize: 24,
          fontWeight: 'bold',
          paddingVertical: 10,
        }}>
        {familyMember.name}'s Sleep Report
      </Text>
      <Text style={{ color: '#FFF' }}>
        Profile Screen for {familyMember.name} with sleep data{' '}
        {memberSleepInfo?.intervals?.length || 0} intervals
        {memberSleepInfo?.intervals?.map(interval => (
          <Text key={interval.id}>
            {interval.id} - {interval.ts}
          </Text>
        ))}
      </Text>
    </SafeAreaView>
  );
}
