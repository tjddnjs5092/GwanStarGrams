import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, Pressable, Text, View} from 'react-native';
import {HomeScreens} from '@/screens/HomeScreens';
import Svg, {Line, Path} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {userInfoState} from '@/store/usrInfoState';
import { MyPageScreen } from "@/screens/myPage/MyPageScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ExploreScreen = () => {
  return <Text>Explore</Text>;
};
const MakeScreen = () => {
  return <Text>MakeScreen</Text>;
};
const ReelsScreen = () => {
  return <Text>ReelsScreen</Text>;
};
const ProFileScreen = () => {
  const resetUserInfo = useResetRecoilState(userInfoState);
  const privateCheckFc = async () => {
    await AsyncStorage.removeItem('loginUsrId');
    resetUserInfo();
  };
  return (
    <Pressable onPress={privateCheckFc}>
      <View>
        <Text>로그아웃</Text>
      </View>
    </Pressable>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={HomeScreens} />
    </Stack.Navigator>
  );
};
export const BottomTabNavigationScrren = () => {
  const {memberInfo, storeMbrCd} = useRecoilValue(userInfoState);
  console.log('memberInfo.usrImage : ', memberInfo.usrImage);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.2, // 탭 테두리 제거
          borderColor: '#ff0000',
          backgroundColor: 'black', // 배경색 설정
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <Path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" />
              </Svg>
            ) : (
              <Svg width="24" height="24" viewBox="0 0 24 24">
                <Path
                  d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                  fill="none"
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </Svg>
            ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="currentColor">
                <Path
                  d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                <Line
                  x1="16.511"
                  y1="16.511"
                  x2="21.643"
                  y2="21.643"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </Svg>
            ) : (
              <Svg
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                width="24">
                <Path
                  d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <Line
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="16.511"
                  x2="22"
                  y1="16.511"
                  y2="22"
                />
              </Svg>
            ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Make"
        component={MakeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="#fff">
                <Path d="m12.003 5.545-.117.006-.112.02a1 1 0 0 0-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 0 0-.877.876L5.545 12l.007.117a1 1 0 0 0 .877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 0 0 .876.877l.117.007.117-.007a1 1 0 0 0 .876-.877l.007-.116V13h4.452l.116-.007a1 1 0 0 0 .877-.876l.007-.117-.007-.117a1 1 0 0 0-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 0 0-.876-.877ZM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1Z" />
              </Svg>
            ) : (
              <Svg
                fill="#fff"
                height="24"
                viewBox="0 0 24 24"
                width="24">
                <Path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <Line
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                />
                <Line
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                />
              </Svg>
            ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="#fff">
                <Path
                  d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z"
                  fillRule="evenodd"
                  stroke="#fff"
                />
              </Svg>
            ) : (
              <Svg fill="none" width="24" height="24" viewBox="0 0 24 24">
                <Line
                  x1="2.049"
                  y1="7.002"
                  x2="21.95"
                  y2="7.002"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Line
                  x1="13.504"
                  y1="2.001"
                  x2="16.362"
                  y2="7.002"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Line
                  x1="7.207"
                  y1="2.11"
                  x2="10.002"
                  y2="7.002"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                  fill="#fff"
                  stroke="#fff"
                />
              </Svg>
            ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="ProFile"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View className="w-7 h-7">
                <Image
                  className="w-[100%] h-[100%] rounded-full border-white border-2"
                  source={
                    memberInfo?.usrImage?.uri !== ''
                      ? {uri: memberInfo.usrImage}
                      : require('@/assets/images/noImg.png')
                  }
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View className="w-7 h-7">
                <Image
                  className="w-[100%] h-[100%] rounded-full"
                  source={
                    memberInfo?.usrImage?.uri !== ''
                      ? {uri: memberInfo.usrImage}
                      : require('@/assets/images/noImg.png')
                  }
                  resizeMode="cover"
                />
              </View>
            ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};
