import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DetailsScreenNavigationProp } from '../screens/Details';
import { theme } from '../styles/theme';
import { DetailsType, SleepInterval } from '../types';
import InfoDialog from './InfoDialog';

type Props = {
  title: string;
  children: React.ReactNode;
  hideInfo?: boolean;
  moreDetailsInfo?: {
    sleepIntervals: SleepInterval[];
    type: DetailsType;
  };
};

const CardContainer = ({
  title,
  children,
  hideInfo = false,
  moreDetailsInfo,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.cardTitle}>{title}</Text>
          {!hideInfo && (
            <TouchableOpacity
              onPress={() => {
                setIsOpen(true);
              }}
              style={styles.infoIconContainer}>
              <Icon name="information" style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
        {children}
        {moreDetailsInfo && (
          <TouchableOpacity
            style={styles.moreDetailsButton}
            onPress={() => {
              navigation.navigate('Details', {
                sleepIntervals: moreDetailsInfo.sleepIntervals,
                type: moreDetailsInfo.type,
              });
            }}>
            <Text style={{ color: theme.colors.defaultWhite }}>
              More details
            </Text>
            <Icon
              name="chevron-right"
              style={[styles.icon, { color: theme.colors.defaultWhite }]}
            />
          </TouchableOpacity>
        )}
      </View>
      <InfoDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`${title} details`}
        description="Description or quick insights and tips about the data."
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.slateGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 32,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  cardTitle: {
    color: theme.colors.defaultWhite,
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    display: 'flex',
    width: '80%',
  },
  infoIconContainer: {
    backgroundColor: theme.colors.defaultWhite,
    borderRadius: 50,
  },
  icon: {
    color: theme.colors.slateGray,
    fontSize: 20,
    overflow: 'hidden',
  },
  moreDetailsButton: {
    backgroundColor: theme.colors.gunMetalGray,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardContainer;
