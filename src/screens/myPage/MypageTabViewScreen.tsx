import { useEffect, useState } from "react";
import {TabBar, TabView} from 'react-native-tab-view';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";
import { getGistContent } from "@/types/commAxios";
export const windowWidth = Dimensions.get('window').width;
export const imageWidthSize = windowWidth / 3;
export const imageHeightSize = windowWidth / 3;
const BoardRoute = ({board_num}) => {
  const images = [
    { id: '1', src: require('@/assets/images/dummy/dummy1.png') },
    { id: '2', src: require('@/assets/images/dummy/dummy2.png') },
    { id: '3', src: require('@/assets/images/dummy/dummy3.png') },
    { id: '5', src: require('@/assets/images/dummy/dummy4.png') },
    { id: '6', src: require('@/assets/images/dummy/dummy5.png') },
    { id: '7', src: require('@/assets/images/dummy/dummy6.png') },
    { id: '8', src: require('@/assets/images/dummy/dummy7.png') },
    { id: '9', src: require('@/assets/images/dummy/dummy8.png') },
    { id: '10', src: require('@/assets/images/dummy/dummy9.png') },
    { id: '11', src: require('@/assets/images/dummy/dummy10.png') },
    { id: '12', src: require('@/assets/images/dummy/dummy11.png') },
    { id: '13', src: require('@/assets/images/dummy/dummy12.png') },
    { id: '14', src: require('@/assets/images/dummy/dummy13.png') },
    { id: '15', src: require('@/assets/images/dummy/dummy14.png') },
    // Add more images as needed
  ];
  const js =
  {
    "test": [
      {
        "image": [
          "https://i.ibb.co/vZKVhkj/dummy1.png",
          "https://i.ibb.co/R27L6Nh/dummy2.png",
          "https://i.ibb.co/vZKVhkj/dummy3.png",
          "https://i.ibb.co/vZKVhkj/dummy4.png",
          "https://i.ibb.co/vZKVhkj/dummy5.png"
        ],
        "cont": "test 내용입니다.",
        "like": 0,
        "likeUsr": [
          {
            "nickName": ["test", "test2"]
          }
        ],
        "comment": [
          {
            "nickName": "test2",
            "commentCont": "오 대박이다요",
            "commentLike": 2,
            "commentLikeUsr": [{
                "nickName": ["test", "test2"]
              }
            ],
            "reply": [
              {
                "nickname": "test",
                "replyCont": "감사합니다.",
                "replyLike": 1,
                "replyLikeUsr": [
                  {
                    "nickName": ["test2"]
                  }
                ],
              }
            ]
          },
          {
            "nickName": "test3",
            "commentCont": "와 이쁘다 사고싶네요",
            "commentLike": 0,
            "commentLikeUsr": [{
              "nickName": []
            }
            ],
            "reply": [{}]
          }
        ],
      }
    ]
  }
  console.log('js : ', js.test[0].image[0]);

  const renderImage = (image) => (
    <View key={image.id} style={styles.imageContainer}>
      <Image style={styles.image} source={image.src} />
      {/* 이미지가 여러장일때 */}
      <View className="flex-row absolute right-0 top-0 h-10 w-10 justify-center items-center">
        <Svg fill="#fff" width="22" height="22" viewBox="0 0 48 48">
          <Path stroke="#fff" d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z" />
        </Svg>
      </View>
    </View>
  );

  // Function to render rows of images
  const renderImageRows = (images) => {
    let rows = [];
    for (let i = 0; i < images.length; i += 3) {
      rows.push(
        <View key={i} style={styles.row}>
          {images.slice(i, i + 3).map((image) => renderImage(image))}
        </View>
      );
    }
    return rows;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {renderImageRows(images)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    /*<View className="flex-1">
      <View className="flex-1">
        <View className="flex-1 justify-center items-center">
          <View className="flex-row h-20 w-20 rounded-full border-2 border-white justify-center items-center">
            <Image className="w-[70%] h-[70%]" source={require('@/assets/images/camera.png')} />
          </View>
          <View>
            <Text className="top-5 font-bold text-3xl text-white">게시물 없음</Text>
          </View>
        </View>
      </View>
    </View>*/
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
const ReelsRoute = ({board_num}) => {
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
const TaggedRoute = ({board_num}) => {
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
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'board', title: '게시글', board_num: '010'},
    {key: 'reels', title: '릴스', board_num: '010'},
    {key: 'tagged', title: '해시태그', board_num: '010'},
  ]);

  const renderScreen = ({route}) => {
    switch (route.key) {
      case 'board':
        return <BoardRoute board_num="010" />;
      case 'reels':
        return <ReelsRoute board_num="020" />;
      case 'tagged':
        return <TaggedRoute board_num="030" />;
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
