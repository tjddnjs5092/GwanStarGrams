import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text, Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Header } from "@/components/tw/Header";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/usrInfoState";
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getGistContent } from "@/types/commAxios";
import { Pagination } from "@/components/Pagination";
import {Modalize} from 'react-native-modalize';
import { windowHeight, windowWidth } from "../../../App";
import moment from 'moment';
import 'moment/locale/ko'

export const BoardDetailScreen = ({navigation, route})=> {
  const {memberInfo, storeMbrCd} = useRecoilValue(userInfoState);
  const [boardList, setBoardList] = useState<[] | null>([]);
  const [modalizeItem, setModalizeItem] = useState<[] | null>([]);
  const [pageIndices, setPageIndices] = useState({});
  const scrollViewRef = useRef(null);
  const [positions, setPositions] = useState({}); // 각 게시물의 위치를 저장하는 상태
  const modalizeRef = useRef<Modalize>(null);
  const selectedBoardId = route.params?.boardCd;
  const userNameParams = route?.params.usrName;

  useEffect(() => {
    const myBoardList = async () => {
      const boardsString = await getGistContent('gwanStarGramsBoard.json');
      const images = boardsString[userNameParams];
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

  const formatTimeAgo = (dateTimeString) => {
    const now = moment();
    const pastDate = moment(dateTimeString, 'YYYYMMDDHHmmss');
    const diffInMinutes = now.diff(pastDate, 'minutes');

    if (diffInMinutes < 1) {
      return '방금 전';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분`;
    } else if (diffInMinutes < 60 * 24) {
      return `${Math.floor(diffInMinutes / 60)}시간`;
    } else if (diffInMinutes < 60 * 24 * 7) {
      return `${Math.floor(diffInMinutes / (60 * 24))}일`;
    } else if (diffInMinutes < 60 * 24 * 30) {
      return `${Math.floor(diffInMinutes / (60 * 24 * 7))}주`;
    } else if (diffInMinutes < 60 * 24 * 365) {
      return `${Math.floor(diffInMinutes / (60 * 24 * 30))}달`;
    } else {
      return `${Math.floor(diffInMinutes / (60 * 24 * 365))}년`;
    }
  };

  const openModel = (item) => {
    const newItem = item.map(comment => {
      const formattedCommentDt = formatTimeAgo(comment.comment_dt);

      // 각 댓글의 답글의 reply_dt를 형식화
      const formattedReply = comment.reply?.map(reply => {
        const formattedReplyDt = formatTimeAgo(reply.reply_dt);
        return { ...reply, formattedReplyDt: formattedReplyDt }; // reply_dt를 형식화된 값으로 변경하여 반환
      });
      return { ...comment, formattedCommentDt: formattedCommentDt, reply: formattedReply }; // comment_dt를 형식화된 값으로 변경하여 반환
    });

    console.log('newItem : ', newItem);
    setModalizeItem(newItem);
    modalizeRef.current?.open();
  };
  return (
    <View className="flex-1 bg-black">
      <Header usrNm={userNameParams} title="게시물" />
      <ScrollView ref={scrollViewRef} className="flex-1">
        {boardList && boardList.length > 0 ? (
          <View className="flex-1 top-3">
            {boardList.map((item, idx) => (
              <View key={item.board_cd}>
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
                          <Text className="text-white font-bold">{userNameParams}</Text>
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
                        <View className={`flex-1 flex-row ${item.image.length > 1 ? "left-6" : "left-3"}`}>
                          <Pressable>
                            <Image source={require('@/assets/images/heart.png')} />
                          </Pressable>
                          <Pressable className="left-3" onPress={() => {openModel(item.comment)}}>
                            <Image className={` ${item.image.length > 1 ? "left-6" : ""}`} source={require('@/assets/images/comments.png')} />
                          </Pressable>
                          <Pressable className={`${item.image.length > 1 ? "left-12" : ""}`}>
                            <Image className="left-6" source={require('@/assets/images/send.png')} />
                          </Pressable>
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
                      <Pressable className="mt-1-3" onPress={() => {openModel(item.comment)}}>
                        <Text className="text-[#a8a8a8]">댓글 {item.comment?.length ?? 0}개 모두 보기</Text>
                      </Pressable>
                      <Text className="mt-1 text-[#a8a8a8]">{calculateTimeDifference(item.board_cd)}</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text className="text-white">로딩중</Text>
          </View>
        )}
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        handlePosition="inside"
        handleStyle={{backgroundColor: '#555555'}}
        modalHeight={780}
        snapPoint={600}
        closeSnapPointStraightEnabled={false}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        modalStyle={{backgroundColor: '#262626'}}
        onOpen={() => {
          // Once the modal is open, measure the content height and adjust modalHeight
          const contentHeight = modalizeRef.current.scrollView.contentSize.height;
          modalizeRef.current.setScrollViewHeight(contentHeight + 100); // Add some buffer
        }}
      >
        <View className="flex-1 mt-5">
          <View className="items-center border-b border-[#363636]">
            <Text className="font-200 text-white font-bold mb-5 mt-3">댓글</Text>
          </View>
          {/*{modalizeItem.map((item, idx) => (
            <View className="flex-1 flex-row m-3">
              <Image
                className="w-10 h-10 rounded-full"
                source={
                  item.commentUsrImage !== ''
                    ? {uri: item.commentUsrImage}
                    : require('@/assets/images/noImg.png')
                }
                resizeMode="cover"
              />
              <View className="justify-center ml-3">
                <Text className="text-white font-bold">{userNameParams}</Text>
              </View>
            </View>
          ))}*/}

          {/*<Image
                  className="w-10 h-10 rounded-full"
                  source={require('@/assets/images/noImg.png')}
                  resizeMode="cover"
                />
                <View className="justify-center ml-3">
                  <View className="flex-row">
                    <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                    <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                    <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                    <Image
                      className="w-4 h-4 left-1"
                      source={require('@/assets/images/heartO.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                  </View>
                  <View className="top-1">
                    <Text className="text-white font-bold w-[16%]">가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하</Text>
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                    <View className="flex-row">
                      <Text className="text-[#363636] top-5 text-xs">———  </Text>
                      <Text className="text-[#a8a8a8] top-5 text-xs font-bold">이전 답글 1개 더 보기</Text>
                    </View>
                  </View>

                  <View className="flex-1 flex-row w-screen top-10 mb-10">
                    <Image
                      className="w-10 h-10 rounded-full"
                      source={require('@/assets/images/noImg.png')}
                      resizeMode="cover"
                    />
                    <View className="justify-center ml-3">
                      <View className="flex-row">
                        <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                        <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                        <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                        <Image
                          className="w-4 h-4 left-1"
                          source={require('@/assets/images/heartO.png')}
                          resizeMode="cover"
                        />
                        <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                      </View>
                      <View className="top-1">
                        <Text className="text-white font-bold w-[20%]">가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하</Text>
                        <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      </View>
                    </View>
                    <View className="absolute left-80 top-3 justify-center items-center">
                      <Image
                        className="w-5 h-5"
                        source={require('@/assets/images/heart.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                    </View>
                  </View>
                  <View className="flex-1 flex-row w-screen top-10">
                    <Image
                      className="w-10 h-10 rounded-full"
                      source={require('@/assets/images/noImg.png')}
                      resizeMode="cover"
                    />
                    <View className="justify-center ml-3">
                      <View className="flex-row">
                        <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                        <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                        <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                        <Image
                          className="w-4 h-4 left-1"
                          source={require('@/assets/images/heartO.png')}
                          resizeMode="cover"
                        />
                        <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                      </View>
                      <View className="top-1">
                        <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                        <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      </View>
                    </View>
                    <View className="absolute left-80 top-3 justify-center items-center">
                      <Image
                        className="w-5 h-5"
                        source={require('@/assets/images/heart.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                    </View>
                  </View>
                </View>*/}
          <ScrollView ScrollView style={{ flex: 1 }}>
              <View className="flex-1 h-full">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[100%]">
                <View className="flex-row m-3 mb-12">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require('@/assets/images/noImg.png')}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <View className="flex-row">
                      <Text className="text-white font-bold text-xs">{userNameParams}</Text>
                      <Text className="text-[#a8a8a8] text-xs left-1">2일</Text>
                      <Text className="text-[#a8a8a8] left-1"> ‧ </Text>
                      <Image
                        className="w-4 h-4 left-1"
                        source={require('@/assets/images/heartO.png')}
                        resizeMode="cover"
                      />
                      <Text className="text-[#a8a8a8] left-2 text-xs">작성자가 좋아하는 댓글</Text>
                    </View>
                    <View className="top-1">
                      <Text className="text-white font-bold">가나다라마바사아자차카타파하</Text>
                      <Text className="text-[#a8a8a8] top-2 text-xs font-bold">답글 달기</Text>
                      <View className="flex-row">
                        <Text className="text-[#363636] top-5 text-xs">———  </Text>
                        <Text className="text-[#a8a8a8] top-5 text-xs font-bold">답글 1개 더 보기</Text>
                      </View>
                    </View>
                  </View>
                  <View className="absolute right-3 top-3 justify-center items-center">
                    <Image
                      className="w-5 h-5"
                      source={require('@/assets/images/heart.png')}
                      resizeMode="cover"
                    />
                    <Text className="text-[#a8a8a8] top-2 text-xs font-bold">10</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
        </View>
      </Modalize>
    </View>
  )
};
