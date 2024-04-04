import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SinInUpScreens} from '@/screens/SinInUpScreens';
import {HomeScreens} from '@/screens/HomeScreens';
import {BottomTabNavigationScrren} from '@/screens/BottomTabNavigationScrren';
import {useRecoilState} from 'recoil';
import {userInfoState} from '@/store/usrInfoState';
import {MyPageScreen} from '@/screens/myPage/MyPageScreen';
import {MypageTabViewScreen} from '@/screens/myPage/MypageTabViewScreen';
import { BoardDetailScreen } from "@/screens/board/BoardDetailScreen";
import DataItem from "@/types/DataItem";

function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const [userInfo] = useRecoilState(userInfoState);

  return (
    <Stack.Navigator screenOptions={{headerShown: false, contentStyle: { backgroundColor: 'black' }}}>
      <Stack.Group screenOptions={{headerShown: false}}>
        {!userInfo.isLogin ? (
          <Stack.Screen name="SinInUp" component={SinInUpScreens} />
        ) : (
          <>
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigationScrren}
            />
            <Stack.Screen name="Home" component={HomeScreens} />
            <Stack.Screen name="MyPage" component={MyPageScreen} />
            <Stack.Screen name="MypageTabView" component={MypageTabViewScreen} />
            <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
            <Stack.Screen name="DataItem" component={DataItem} />
          </>
        )}
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AppNavigator;
