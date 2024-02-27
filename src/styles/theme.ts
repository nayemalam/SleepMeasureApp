import { TextStyle } from 'react-native';

type ThemeType = {
  colors: {
    defaultWhite: string;
    defaultBlack: string;
    gray: string;
    slateGray: string;
    lightGray: string;
    softGray: string;
    skyBlue: string;
    fadedSkyBlue: string;
    darkGray: string;
    darkGrayBlue: string;
    charcoalGray: string;
    gunMetalGray: string;
  };
  pageTitleLarge: TextStyle;
};

export const theme: ThemeType = {
  colors: {
    defaultWhite: '#FFF',
    defaultBlack: '#000',
    gray: '#888888',
    slateGray: '#19191C',
    lightGray: '#D3D3D3',
    softGray: '#ADB3C5',
    skyBlue: '#00E0FF',
    fadedSkyBlue: '#7182B7',
    darkGray: '#333333',
    darkGrayBlue: '#3d5875',
    charcoalGray: '#2D2D2D',
    gunMetalGray: '#303033',
  },
  pageTitleLarge: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
};
