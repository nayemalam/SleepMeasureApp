import React from 'react';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { theme } from '../styles/theme';

type Props = {
  color?: string;
};

const BackgroundRadioGlowEffect = ({ color = theme.colors.skyBlue }: Props) => (
  <Svg height="220" width="220" style={{ position: 'absolute' }}>
    <Defs>
      <RadialGradient
        id="glowGradient"
        cx="50%"
        cy="50%"
        rx="150"
        ry="150"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <Stop
          offset="100%"
          stopColor={theme.colors.darkGrayBlue}
          stopOpacity="0"
        />
      </RadialGradient>
    </Defs>
    <Rect x="0" y="0" width="220" height="220" fill="url(#glowGradient)" />
  </Svg>
);

export default BackgroundRadioGlowEffect;
