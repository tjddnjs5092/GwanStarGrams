import { Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Header } from "@/components/tw/Header";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/usrInfoState";
import Carousel from 'react-native-reanimated-carousel';
import React, { useEffect, useRef, useState } from "react";
import { getGistContent } from "@/types/commAxios";
import { Pagination } from "@/components/Pagination";

export const BoardDetailScreen = ({navigation, route})=> {
  const {memberInfo, storeMbrCd} = useRecoilValue(userInfoState);
  const windowWidth = Dimensions.get('window').width;
  const [boardList, setBoardList] = useState<[] | null>([]);
  const [pageIndices, setPageIndices] = useState({});
  const scrollViewRef = useRef(null);
  const [positions, setPositions] = useState({}); // 각 게시물의 위치를 저장하는 상태
  const selectedBoardId = route.params?.boardCd;

  useEffect(() => {
    const myBoardList = async () => {
      const boardsString = await getGistContent('gwanStarGramsBoard.json');
      const images = boardsString[route?.params.usrName];
      setBoardList(images);
    };
    myBoardList();
  }, []);


  const handleLayout = (event, boardCd) => {
    const {y} = event.nativeEvent.layout;
    setPositions(prev => ({...prev, [boardCd]: y}));
  };

  // 선택된 게시물로 스크롤하는 함수
  useEffect(() => {
    const scrollToSelectedPost = () => {
      const yPosition = positions[selectedBoardId];
      if (yPosition !== undefined) {
        scrollViewRef.current?.scrollTo({y: yPosition, animated: true});
      }
    };

    if (Object.keys(positions).length === boardList.length) {
      scrollToSelectedPost();
    }
  }, [positions, selectedBoardId, boardList.length]);


  const parseBoardCdToDate = (boardCd) => {
    const year = boardCd.substring(0, 4);
    const month = boardCd.substring(4, 6);
    const day = boardCd.substring(6, 8);
    const hour = boardCd.substring(8, 10);
    const minute = boardCd.substring(10, 12);
    const second = boardCd.substring(12, 14);

    // Date 객체 생성
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  };

  // 시간 차이 계산 함수
  const calculateTimeDifference = (postTime) => {
    console.log('postTime : ', postTime);
    const now = new Date();
    const postDate = parseBoardCdToDate(postTime); // 변환 함수 사용
    const differenceInSeconds = (now - postDate) / 1000;
    if (differenceInSeconds < 60) {
      return `${Math.floor(differenceInSeconds)}초 전`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)}분 전`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)}시간 전`;
    } else {
      // ISO 8601 형식을 기본적으로 사용, 필요에 따라 형식을 조정
      return postDate.toLocaleDateString('ko-KR');
    }
  };

  const handleSnapToItem = (index, boardCd) => {
    setPageIndices(prevIndices => ({
      ...prevIndices,
      [boardCd]: index
    }));
  };

  return (
    <View className="flex-1 bg-black">
      <Header usrNm={route?.params?.usrName} title="게시물" />
      <ScrollView ref={scrollViewRef} className="flex-1">
        {boardList && boardList.length > 0 ? (
          <View className="flex-1 top-3">
            {boardList.map((item, idx) => (
              <Pressable
                key={item.board_cd}
                onLayout={(event) => handleLayout(event, item.board_cd)}
              >
                <View className="flex-1">
                  <View className="flex-row justify-center items-center">
                    <View className="flex-1 flex-row left-3">
                      <Image
                        className="w-10 h-10 rounded-full"
                        source={
                          item?.usrImage !== ''
                            ? {uri: item.usrImage}
                            : require('@/assets/images/noImg.png')
                        }
                        resizeMode="cover"
                      />
                      <View className="justify-center ml-3">
                        <Text className="text-white font-bold">{route?.params?.usrName}</Text>
                      </View>
                    </View>
                    <View className="mr-3">
                      <Image className="w-5 h-5" source={require('@/assets/images/more-options.png')} />
                    </View>
                  </View>
                  <View className="h-96">
                    <View className="flex-1 m-3">
                      {item.image.length === 1 ? (
                        // 이미지가 하나일 때
                        <Image style={{width: windowWidth, height: windowWidth * 0.8}} source={{uri: item.image[0]}} resizeMode="cover" />
                      ) : (
                        // 이미지가 여러 개일 때
                        <Carousel
                          loop
                          width={windowWidth}
                          height={windowWidth * 0.8}
                          onSnapToItem={index => handleSnapToItem(index, item.board_cd)}
                          autoPlay={false}
                          data={item.image}
                          renderItem={({item}) => (
                            <Image source={{uri: item}} className="h-[100%]" resizeMode="cover" />
                          )}
                          // Carousel에 필요한 다른 속성들을 여기에 추가하세요.
                        />
                      )}
                    </View>
                  </View>
                  <View className="flex-1 bottom-2">
                    <View className="flex-row justify-center items-center">
                      <View className="flex-1 flex-row left-6">
                        <Image source={require('@/assets/images/heart.png')} />
                        <Image className="left-3" source={require('@/assets/images/comments.png')} />
                        <Image className="left-6" source={require('@/assets/images/send.png')} />
                      </View>
                      {item.image.length > 1 && (
                        <View className="w-full">
                          <Pagination
                            className="mr-2 w-2.5 h-2.5"
                            pageIndex={pageIndices[item.board_cd] || 0}
                            pageData={item.image}
                            activeClassName="bg-blue-600"
                          />
                        </View>
                      )}
                      <View className="right-3">
                        <Image source={require('@/assets/images/saved.png')} />
                      </View>
                    </View>
                  </View>
                  <View className="m-3 bottom-3">
                    <Text className="text-white font-bold">좋아요 {item.like}개</Text>
                    <View className="flex-row mt-1">
                      <Text className="text-white font-bold">{route?.params?.usrName} </Text>
                      <Text className="text-white font-bold">{item.cont}</Text>
                    </View>
                    <Text className="mt-1 text-[#a8a8a8]">댓글 {item.comment?.length ?? 0}개 모두 보기</Text>
                    <Text className="mt-1 text-[#a8a8a8]">{calculateTimeDifference(item.board_cd)}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View>
            <Text className="text-white">로딩중</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
};

