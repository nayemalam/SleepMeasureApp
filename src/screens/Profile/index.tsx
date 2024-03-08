import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import BedTemperatureChart from '../../components/BedTemperatureChart';
import CardContainer from '../../components/CardContainer';
import CircularDayScoreSelector from '../../components/CircularDayScoreSelector';
import GenericErrorView from '../../components/GenericErrorView';
import NoActivityView from '../../components/NoActivityView';
import RoomTemperatureChart from '../../components/RoomTemperatureChart';
import ScoreCircleProgress from '../../components/ScoreProgressCircle';
import SleepHeartRateChart from '../../components/SleepHeartRateChart';
import SleepRespiratoryRateChart from '../../components/SleepRespiratoryRateChart';
import SleepStageDetails from '../../components/SleepStageDetails';
import SleepStageTimeline from '../../components/SleepStageTimeline';
import SleepStagesChart from '../../components/SleepStagesChart';
import TimeSlept from '../../components/TimeSlept';
import TimeframeSelector from '../../components/TimeframeSelector';
import TossAndTurnsChart from '../../components/TossAndTurnsChart';
import sleepSessionService from '../../services/SleepSessionService';
import { theme } from '../../styles/theme';
import { FamilyMember, RootStackParamList, SleepInterval } from '../../types';
import { platform } from '../../utils/constants';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

export default function ProfileScreen({ route }: Props) {
  if (!route.params) {
    return (
      <GenericErrorView
        title="No family member selected"
        goBackMessage="View family members"
      />
    );
  }
  const familyMember = route.params?.familyMember as FamilyMember;
  const [memberSleepInfo, setMemberSleepInfo] = useState<SleepInterval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  // TODO: move to backend, we can filter the data based on the selected date and fetch instead of performing this on client side
  const { dataByDate, averageScoresByDate, mostRecentDate } = useMemo(() => {
    // TODO: remove - measuring the performance of this
    const start = performance.now();

    const groupedDaysByTsMap: { [key: string]: SleepInterval[] } =
      memberSleepInfo?.reduce(
        (acc: { [key: string]: SleepInterval[] }, interval: SleepInterval) => {
          const dateKey = interval.ts.split('T')[0]; //"ts": "2017-03-09T08:06:00.000Z" = "2017-03-09"
          // 2017-03-09 = []
          acc[dateKey] = acc[dateKey] || [];
          // 2017-03-09 = [interval, ...]
          acc[dateKey].push(interval);
          return acc;
        },
        {},
      );

    const averageScoresByDate: { [key: string]: number } = Object.keys(
      groupedDaysByTsMap,
    ).reduce((acc: { [key: string]: number }, date: string) => {
      const intervals = groupedDaysByTsMap[date];
      const totalScore = intervals.reduce(
        (total, interval) => total + interval.score,
        0,
      );
      acc[date] = intervals.length > 0 ? totalScore / intervals.length : 0;
      return acc;
    }, {});

    const latestDate = Object.keys(groupedDaysByTsMap).reduce(
      (latest, date) =>
        !latest || moment(date).isAfter(moment(latest)) ? date : latest,
      '',
    );

    console.log(`Data processing: ${performance.now() - start}ms`);

    return {
      dataByDate: groupedDaysByTsMap,
      mostRecentDate: latestDate,
      averageScoresByDate,
    };
  }, [memberSleepInfo, selectedDate]);

  const fetchProfile = useCallback(async () => {
    setSelectedDate(moment().format('YYYY-MM-DD'));

    try {
      const results = await sleepSessionService.getProfileData(
        familyMember?.id,
      );
      setMemberSleepInfo(results?.intervals);
      setError('');
    } catch (e) {
      setError(e as string);
      console.error('Failed to fetch data:', e);
    } finally {
      setIsLoading(false);
    }
  }, [route]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingContent}>
          Retrieving sleep information...
        </Text>
        <ActivityIndicator animating={true} color={theme.colors.defaultWhite} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        style={[
          theme.pageTitleLarge,
          {
            marginTop: 10,
          },
        ]}>
        {familyMember.name}'s Sleep Report
      </Text>

      <TimeframeSelector />

      <Text style={styles.dateText}>
        {moment(selectedDate).format('ddd, MMMM D, YYYY')}
      </Text>

      <CircularDayScoreSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        scoresByDate={averageScoresByDate}
      />

      {!averageScoresByDate[selectedDate] && mostRecentDate ? (
        <NoActivityView
          onSeeLastData={() => setSelectedDate(mostRecentDate)}
          familyMember={familyMember}
        />
      ) : (
        <>
          <ScoreCircleProgress score={averageScoresByDate[selectedDate]} />

          <CardContainer title="Time slept">
            <TimeSlept sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>

          <CardContainer title="Timeline" hideInfo>
            {/* another component not being used - but you can uncomment to see how it looks */}
            {/* <SleepStageTimelineDetails
              sleepIntervals={dataByDate[selectedDate]}
            /> */}
            <SleepStageTimeline sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>

          <CardContainer title="Sleep stages">
            <SleepStagesChart sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>

          <CardContainer title="Sleep stage occurrences" hideInfo>
            <SleepStageDetails sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>

          <CardContainer
            title="Tosses and turns"
            moreDetailsInfo={{
              sleepIntervals: dataByDate[selectedDate],
              type: 'tnt',
            }}>
            <TossAndTurnsChart sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>

          <CardContainer title="Sleep heart rate">
            <SleepHeartRateChart sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>

          <CardContainer title="Sleep respiratory rate">
            <SleepRespiratoryRateChart
              sleepIntervals={dataByDate[selectedDate]}
            />
          </CardContainer>

          <CardContainer title="Room temperature">
            <RoomTemperatureChart sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>

          <CardContainer title="Bed temperature">
            <BedTemperatureChart sleepIntervals={dataByDate[selectedDate]} />
          </CardContainer>
        </>
      )}
    </ScrollView>
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
    backgroundColor: theme.colors.defaultBlack,
    paddingHorizontal: platform.ios ? 10 : 24,
  },
  name: {
    color: theme.colors.defaultWhite,
    fontSize: 24,
    fontWeight: 'bold',
  },
  score: {
    color: theme.colors.defaultWhite,
    fontSize: 18,
  },
  dateText: {
    color: theme.colors.defaultWhite,
    fontSize: 16,
    paddingBottom: 8,
    textAlign: 'center',
  },
});
