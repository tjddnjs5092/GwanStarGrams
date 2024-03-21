import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
// import TextInputMask from 'react-native-text-input-mask';
import {styled} from 'nativewind';
import {forwardRef} from 'react';
export const TScrollView = styled(ScrollView);
export const TFlatList = styled(FlatList);
export const TView = styled(View);
export const TPressable = styled(Pressable);
export const TTouchableOpacity = styled(TouchableOpacity);
/*export const TTextInput = ({className, ...rest}) => {
  const baseClassName = 'font-400 text-basic-500 text-sm';
  const combineClassName = `${baseClassName} ${className}`;
  return <TextInput className={combineClassName} {...rest} />;
};*/

export const TTextInput = forwardRef(({className, ...rest}, ref) => {
  const baseClassName = 'font-400 text-basic-500 text-sm py-0 flex-1';
  const combineClassName = `${baseClassName} ${className}`;
  return <TextInput className={combineClassName} ref={ref} {...rest} />;
});

export const TText = ({className, children, ...rest}) => {
  const baseClassName = 'font-400 text-basic-500 text-sm';
  const combineClassName = `${baseClassName} ${className}`;
  return (
    <Text className={combineClassName} {...rest}>
      {children}
    </Text>
  );
};
export const TImage = styled(Image);
// export const TTextInputMask = styled(TextInputMask);
