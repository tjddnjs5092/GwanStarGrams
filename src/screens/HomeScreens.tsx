import {Text, View} from 'react-native';
import { MypageTabViewScreen } from "@/screens/myPage/MypageTabViewScreen.tsx";

export const HomeScreens = ({navigation, route}) => {
  return (
    <View className="flex-1 bg-black">
      <MypageTabViewScreen />
    </View>
  );
};
