import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";

export const HomeScreens = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View className="flex-1">
        <ScrollView>
          <View className="flex-1 top-3">
            <View className="flex-1 mb-10">
              <View className="flex-row justify-center items-center">
                <View className="flex-1 flex-row left-3">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={{uri: 'https://i.ibb.co/xJgcjfR/jpg.jpg'}}
                    resizeMode="cover"
                  />
                  <View className="justify-center ml-3">
                    <Text className="text-white font-bold">test</Text>
                  </View>
                </View>
                <View className="mr-3">
                  <Image className="w-5 h-5" source={require('@/assets/images/more-options.png')} />
                </View>
              </View>
              <View className="h-96">
                <View className="flex-1 m-3 bg-orange-400">
                  <Image className="h-[100%]" source={{uri: 'https://i.ibb.co/xJgcjfR/jpg.jpg'}} resizeMode="cover" />
                </View>
              </View>
              <View className="flex-1">
                <View className="flex-row justify-center items-center">
                  <View className="flex-1 flex-row">
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
                  <View className="right-3">
                    <Image source={require('@/assets/images/saved.png')} />
                  </View>
                </View>
              </View>
              <View className="m-3">
                <Text className="text-white font-bold">좋아요 2개</Text>
                <View className="flex-row mt-1">
                  <Text className="text-white font-bold">test </Text>
                  <Text className="text-white font-bold">2</Text>
                </View>
                <Text className="mt-1 text-[#a8a8a8]">댓글 2개 모두 보기</Text>
                <Text className="mt-1 text-[#a8a8a8]">2023.03.01</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
