import {useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";
export const windowWidth = Dimensions.get('window').width;

const BoardRoute = ({board_num}) => {
  return (
    <View>
      <Text className="text-white">gd</Text>
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
        return <BoardRoute board_num="020" />;
      case 'tagged':
        return <BoardRoute board_num="030" />;
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
