import { useEffect, useState } from "react";
import {TabBar, TabView} from 'react-native-tab-view';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";
import { getGistContent } from "@/types/commAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/usrInfoState";
export const windowWidth = Dimensions.get('window').width;
export const imageWidthSize = windowWidth / 3;
export const imageHeightSize = windowWidth / 3;
const BoardRoute = ({memberNm}) => {
  const [boardList, setBpardList] = useState<[] | null>([]);

  useEffect(() => {
    const getGistBoard = async () => {
      const boardsString = await getGistContent('gwanStarGramsBoard.json');
      const images = boardsString[memberNm].map((post, index) => ({
        id: `image-${index}`, // 고유한 id 값 생성
        src: post.image[0], // 첫 번째 이미지 URL
        multiple: post.image.length > 1, // 여러 이미지 여부 확인
      }));
      setBpardList(images);
    };
    getGistBoard();
  }, []);

  const renderImageRows = () => {
    return (
      <View style={styles.row}>
        {boardList.map((image, i) => renderImage(image, i))}
      </View>
    );
  };

  const renderImage = (image, indexNum) => {
    const isLastImage = (indexNum + 1) % 3 === 0;
    return (
      <View key={indexNum} style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: image.src}} />
        {image.multiple && (
          <View className={`flex-row absolute ${isLastImage ? 'right-2' : 'right-0'} top-0 h-10 w-10 justify-center items-center`}>
            <Svg fill="#fff" width="22" height="22" viewBox="0 0 48 48">
              <Path stroke="#fff" d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z" />
            </Svg>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {boardList && boardList?.length > 0 ? (
            <View style={{ flex: 1 }}>
              {renderImageRows()}
            </View>
          ) : (
            <View className="flex-1 justify-center items-center">
              <View className="flex-row h-20 w-20 rounded-full border-2 border-white justify-center items-center">
                <Image className="w-[70%] h-[70%]" source={require('@/assets/images/camera.png')} />
              </View>
              <View>
                <Text className="top-5 font-bold text-3xl text-white">게시물 없음</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: imageWidthSize,
    height: imageHeightSize,
    margin: 1.5,
    resizeMode: 'cover',
  },
});
const ReelsRoute = ({memberNm}) => {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <View className="flex-1 top-10 items-center">
          <Text className="text-white text-[20px] font-bold text-center">{`전 세계에 여러분의\n순간을 공유해보세요.`}</Text>
          <Text className="top-5 font-bold text-blue-500">첫 릴스 만들기</Text>
        </View>
      </View>
    </View>
  );
};
const TaggedRoute = ({memberNm}) => {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <View className="flex-1 justify-center items-center">
          <View className="flex-row h-[32%] w-[30%] rounded-full border-2 border-white justify-center items-center">
            <Svg fill="#fff" height="80" width="80" viewBox="0 0 24 24">
              <Path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
              <Path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
              <Circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
            </Svg>
          </View>
          <View className="top-5 justify-center items-center w-80">
            <Text className="text-white text-2xl font-bold">내가 태그된 사진과 동영상</Text>
            <Text className="top-2 text-[#a8a8a8] text-center">사람들이 회원님을 사진 및 동영상에 태그하면 태그된 사진 및 동영상이 여기에 표시됩니다.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export const MypageTabViewScreen = ({navigation, route}) => {
  const {memberInfo, storeMbrCd} = useRecoilValue(userInfoState);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'board', title: '게시글', board_num: '010'},
    {key: 'reels', title: '릴스', board_num: '010'},
    {key: 'tagged', title: '해시태그', board_num: '010'},
  ]);

  const renderScreen = ({route}) => {
    switch (route.key) {
      case 'board':
        return <BoardRoute memberNm={memberInfo.usrName} />;
      case 'reels':
        return <ReelsRoute memberNm={memberInfo.usrName} />;
      case 'tagged':
        return <TaggedRoute memberNm={memberInfo.usrName} />;
      default:
        return null;
    }
  };
// a8a8a8
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#000000' }}
      renderLabel={({ route, focused }) => (
        <View>
          {route.key === 'board' && (
            <View>
              <Svg fill={`${focused ? '#fff' : '#a8a8a8'}`} height="30" width="30" viewBox="0 0 24 24">
                <Rect fill="none" height="18" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3" />
                <Line fill="none" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21" />
                <Line fill="none" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21" />
                <Line fill="none" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015" />
                <Line fill="none" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985" />
              </Svg>
            </View>
          )}
          {route.key === 'reels' && (
            <Svg fill={`${focused ? '#fff' : '#a8a8a8'}`} height="30" width="30" viewBox="0 0 24 24">
              <Line fill="#fff" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002" />
              <Line fill="#fff" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002" />
              <Line fill="#fff" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002" />
              <Path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <Path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd" />
            </Svg>
          )}
          {route.key === 'tagged' && (
            <Svg fill="#fff" height="30" width="30" viewBox="0 0 24 24">
              <Path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <Path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <Circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke={`${focused ? '#fff' : '#a8a8a8'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </Svg>
          )}
        </View>
      )}
      inactiveColor={'#ff0000'}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabView
        lazy
        navigationState={{index, routes}}
        renderScene={renderScreen}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: windowWidth}}
      />
    </SafeAreaView>
  );
};
