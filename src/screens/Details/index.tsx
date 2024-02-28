import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../styles/theme';
import { DetailsType, RootStackParamList, SleepInterval } from '../../types';
import { aggregateTossNTurns } from '../../utils';
import { DetailsTypeLabels } from '../../utils/constants';

export type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

export default function DetailsScreen({ route }: Props) {
  const sleepIntervals = route.params?.sleepIntervals as SleepInterval[];
  const type = route.params?.type as DetailsType;
  const navigation = useNavigation();
  let data = [] as any;
  let description = '';

  if (type === 'tnt') {
    data = aggregateTossNTurns(sleepIntervals);
    // TODO: probably a good idea to show a button for "read more" (ref: https://rexmd.com/learn/why-am-i-tossing-and-turning-in-my-sleep)
    description = `Tossing and turning in your sleep is an indication that you're not getting quality sleep.

This can be due to a number of factors, including stress, caffeine consumption, poor sleep hygiene, your sleeping environment, and even recognized sleeping disorders.

Identifying and fixing the shortcomings in your sleep hygiene is the first step in getting the sleep you need: turn off screens 60 minutes before bed, go to sleep at the same time each night, and avoid big (and unhealthy) snacks before bed.`;
  }
  // TODO: Add more details types here

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="chevron-left"
              size={30}
              color={theme.colors.defaultWhite}
            />
          </TouchableOpacity>
          <Text style={[theme.pageTitleLarge, styles.pageTitle]}>
            {DetailsTypeLabels[type]} Details
          </Text>
        </View>
        <Text
          style={{
            color: theme.colors.defaultWhite,
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {moment(sleepIntervals[0].ts).format('MMM D, YYYY')}
        </Text>
        <ScrollView
          style={{
            height: 150,
            marginBottom: 20,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: theme.colors.defaultWhite,
              fontSize: 16,
            }}>
            {description}
          </Text>
        </ScrollView>
        {data?.map(([time, value]: Omit<DetailsType, 'stages'>) => (
          <View key={`${time}-${value}`} style={styles.row}>
            <Text style={styles.name}>{moment(time).format('h:mm A')}</Text>
            <Text style={styles.value}>{value} times</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.defaultBlack,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.defaultBlack,
    padding: 10,
  },
  pageTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: theme.colors.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  name: {
    color: theme.colors.defaultWhite,
    fontSize: 16,
  },
  value: {
    color: theme.colors.defaultWhite,
    fontSize: 16,
    fontWeight: '500',
  },
});
