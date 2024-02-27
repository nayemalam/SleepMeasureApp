import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgress = ({
  size,
  width,
  fill,
  tintColor,
  backgroundColor,
  children,
}) => {
  return (
    <AnimatedCircularProgress
      size={15}
      width={15}
      backgroundWidth={30}
      fill={fill}
      tintColor="#00e0ff" // Foreground stroke color
      backgroundColor="#3d5875" // Background stroke color
      lineCap="round">
      {() => children}
    </AnimatedCircularProgress>
  );
};

{
  /* <AnimatedCircularProgress */
}
//   size={200}
//   width={15}
//   backgroundWidth={30}
//   fill={score}
//   tintColor="#00e0ff" // Foreground stroke color
//   backgroundColor="#3d5875" // Background stroke color
//   arcSweepAngle={240}
//   rotation={240}
//   lineCap="round">
//   {() => (
//     <View style={styles.containerView}>
//       <Text style={styles.scoreText}>{score}</Text>
//       <Text style={styles.subText}>{sleepScoreLabel(score)}</Text>
//     </View>
//   )}
// </AnimatedCircularProgress>;

export default CircularProgress;
