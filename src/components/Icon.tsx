import Ionicons from 'react-native-vector-icons/Ionicons';
import {styled} from 'nativewind';
import React from 'react';

type IconProps = {
  className?: string;
  name: typeof Ionicons extends Ionicons<infer G, any> ? G : never;
  size: number;
  color?: string;
  style?: any;
};

export const Icon: React.FC<IconProps> = ({
  className,
  name,
  size,
  color,
  style,
}) => {
  const StyledIcon = styled(Ionicons);
  return (
    <StyledIcon
      style={style}
      className={className}
      name={name}
      size={size * 4}
      color={color ? color : '#999999'}
    />
  );
};
