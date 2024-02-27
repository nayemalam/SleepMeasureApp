import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { theme } from '../styles/theme';
import { sleepScoreLabel } from '../utils';
import BackgroundRadioGlowEffect from './BackgroundRadioGlowEffect';

type Props = {
  score: number;
};

const ScoreCircleProgress = ({ score }: Props) => {
  return (
    <View style={styles.scoreContainer}>
      <BackgroundRadioGlowEffect />
      <AnimatedCircularProgress
        style={{}}
        size={200}
        width={15}
        backgroundWidth={30}
        fill={score}
        tintColor={theme.colors.skyBlue}
        backgroundColor={theme.colors.darkGrayBlue}
        arcSweepAngle={240}
        rotation={240}
        lineCap="round">
        {() => (
          <View style={styles.containerView}>
            <Text style={styles.scoreText}>{score}</Text>
            <Text style={styles.subText}>{sleepScoreLabel(score)}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    elevation: 10,
    marginTop: 20,
  },
  containerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 48,
    color: theme.colors.defaultWhite,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: theme.colors.defaultWhite,
  },
});

export default ScoreCircleProgress;
