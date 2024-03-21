import React, {FC, useState} from 'react';
import {ReactNode} from 'react';
import {Pressable, Text} from 'react-native';

type Props = {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
  style?: any;
  className?: string;
  textClass?: string;
  children?: ReactNode;
  isActive?: boolean;
};

export const Button: FC<Props> = ({
  onPress,
  title,
  disabled,
  isActive = true,
  style,
  className,
  textClass,
  children,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handlePress = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);

      // 1초 후에 버튼을 다시 활성화
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);

      onPress();
    }
  };
  return (
    <Pressable
      focusable
      disabled={disabled}
      style={style}
      className={`flex-1 py-3 rounded-lg items-center bg-[#262626] m-1`}
      onPress={handlePress}>
      {children || (
        <Text
          numberOfLines={1}
          className={`text-base text-white font-bold ${textClass}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};
