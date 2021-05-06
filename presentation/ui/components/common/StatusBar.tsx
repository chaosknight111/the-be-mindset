import React from 'react';
import {StatusBar as RNStatusBar, StatusBarStyle, Platform} from 'react-native';

interface StatusBarProps {
  color?: string;
  barStyles?: StatusBarStyle;
  hidden?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({color, barStyles, hidden}) => {
  const defaultBartStyle = Platform.OS === 'ios' ? 'light-content' : 'default';
  return (
    <RNStatusBar
      backgroundColor={color || 'transparent'}
      barStyle={barStyles || defaultBartStyle}
      hidden={hidden}
    />
  );
};

export default StatusBar;
