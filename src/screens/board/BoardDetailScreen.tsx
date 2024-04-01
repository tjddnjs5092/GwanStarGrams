import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Header } from "@/components/tw/Header";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/usrInfoState";
import { Icon } from "@/components/Icon";
import React, { useEffect, useState } from "react";
import { getGistContent } from "@/types/commAxios";
import { log } from "react-native-reanimated-carousel/lib/typescript/utils/log";

export const BoardDetailScreen = ({navigation, route})=> {
  const {memberInfo, storeMbrCd} = useRecoilValue(userInfoState);
  /* {"boardCd": "20240328112842", "multiple": true, "src": "https://i.ibb.co/xJgcjfR/jpg.jpg", "usrName": "test"} */
  console.log('route?.params : ', route?.params);
  const [boardList, setBoardList] = useState<[] | null>([]);
  useEffect(() => {
    const myBoardList = async () => {
      const boardsString = await getGistContent('gwanStarGramsBoard.json');
      const images = boardsString[route?.params.usrName];
      console.log('images : ', images);
      setBoardList(images);
    };
    myBoardList();
  }, []);

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

  return (
    <View className="flex-1 bg-black">
      <Header usrNm={route?.params?.usrName} title="게시물" />
      <ScrollView className="">
        {boardList && boardList.length > 0 ? (
          <View className="flex-1">
            {boardList.map((item, idx) => (
              <View className="flex-1">
                <View className="flex-row h-50 justify-center items-center">
                  <View className="flex-1 flex-row m-3">
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
                <View className="mt-3 h-[100%] w-full">
                  <Image className="flex-1" source={{uri: item.image[idx]}} resizeMode="cover" />
                </View>
                <View className="flex-row h-10 justify-center items-center">
                  <View className="flex-1 flex-row items-center top-2">
                    <View className="m-3">
                      <Image source={require('@/assets/images/heart.png')} />
                    </View>
                    <View className="m-3">
                      <Image source={require('@/assets/images/comments.png')} />
                    </View>
                    <View className="m-3">
                      <Image source={require('@/assets/images/send.png')} />
                    </View>
                  </View>
                  <View className="right-3 top-2">
                    <Image source={require('@/assets/images/saved.png')} />
                  </View>
                </View>
                <View className="mt-3 m-3">
                  <Text className="text-white font-bold">좋아요 {item.like}개</Text>
                  <View className="flex-row mt-1">
                    <Text className="text-white font-bold">{route?.params?.usrName} </Text>
                    <Text className="text-white font-bold">{item.cont}</Text>
                  </View>
                  <Text className="mt-1 text-[#a8a8a8]">댓글 {item.comment?.length ?? 0}개 모두 보기</Text>
                  <Text className="mt-1 text-[#a8a8a8]">{calculateTimeDifference(item.board_cd)}</Text>
                </View>
              </View>
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
