import {useRecoilValue} from 'recoil';
import {userInfoState} from '@/store/usrInfoState';
import {Image, Text, View} from 'react-native';
import Svg, {Line, Path} from 'react-native-svg';
import {Icon} from '@/components/Icon';
import {Button} from '@/components/Button';
import { MypageTabViewScreen } from "@/screens/myPage/MypageTabViewScreen";

export const MyPageScreen = ({navigation, route}) => {
  const {memberInfo, storeMbrCd} = useRecoilValue(userInfoState);
  return (
    <View className="flex-1 bg-black">
      <View className="px-3 py-5">
        <View className="flex-row">
          <Text className="text-white text-2xl font-bold">
            {memberInfo.usrName} ⋁
          </Text>
          <View className="flex-1 flex-row justify-end items-center">
            <View className="right-5">
              <Svg
                fill="currentColor"
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
            </View>
            <View className="">
              <Svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="currentColor">
                <Line
                  x1="3"
                  y1="4"
                  x2="21"
                  y2="4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Line
                  x1="3"
                  y1="20"
                  x2="21"
                  y2="20"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>
        </View>
        {/* 프로필사진 / 게시물 / 팔로워 / 팔로잉 */}
        <View className="flex-row h-40">
          <View className="flex-1 flex-row">
            <View className="top-5 w-[30%] h-[75%]">
              <Image
                className="w-[100%] h-[100%] rounded-full"
                source={
                  memberInfo?.usrImage?.uri !== ''
                    ? {uri: memberInfo.usrImage}
                    : require('@/assets/images/noImg.png')
                }
                resizeMode="cover"
              />
              <View className="flex-row absolute right-0 bottom-0 h-10 w-10 rounded-full border-4 border-black justify-center items-center">
                {/*<Icon name="camera-outline" size={7} color="black" />*/}
                <Image className="w-8 h-8" source={require('@/assets/images/plus.png')} />
              </View>
            </View>
            <View className="flex-1 flex-row justify-around">
              <View className="items-center justify-center">
                <Text className="text-white">0</Text>
                <Text className="text-white">게시물</Text>
              </View>
              <View className="items-center justify-center">
                <Text className="text-white">0</Text>
                <Text className="text-white">팔로워</Text>
              </View>
              <View className="items-center justify-center">
                <Text className="text-white">0</Text>
                <Text className="text-white">팔로잉</Text>
              </View>
            </View>
          </View>
        </View>
        {/* 내 소개 / 이름 */}
        <View className="">
          <View className="h-10">
            <Text className="text-white font-bold">일관인데용?</Text>
            <Text className="text-white top-2">{memberInfo.usrNikName}</Text>
          </View>
        </View>
        {/* 프로필 편집 / 프로필 공유 */}
        <View className="mt-5">
          <View className="flex-row justify-center">
            <Button onPress={() => {}} title="프로필 편집" classNmae="" />
            <Button onPress={() => {}} title="프로필 공유" classNmae="" />
          </View>
        </View>
        {/* 탭바 */}
      </View>
      <View className="flex-1">
        <MypageTabViewScreen />
      </View>
    </View>
  );
};
