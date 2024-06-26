import React, { useEffect } from "react";
import { Dimensions, SafeAreaView, StatusBar } from "react-native";
import AppNavigator from '@/navigator/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/store/usrInfoState";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
function App() {
  const [usrInfo, setUsrInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const usrChk = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString || '{}');
      if (userInfo && Object.keys(userInfo).length > 0) {
        setUsrInfo({
          ...usrInfo,
          isLogin: true,
          usrName: userInfo.usrName,
          memberInfo: userInfo,
        });
      }
    };
    usrChk();
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <StatusBar />
          <AppNavigator className="flex-1" />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default App;
