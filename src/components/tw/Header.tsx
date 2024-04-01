import React from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "@/components/Icon";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  usrNm?: string;
  title?: string;
  left?: boolean;
  right?: boolean;
}
export const Header: React.FC<HeaderProps> = ({
  usrNm,
  title,
  left,
  rigth
}) => {
  const navigation = useNavigation();
  return (
    <View className="h-11 justify-center items-center border-b border-[#a8a8a8] mb-2">
      <Pressable>
        <View className="flex-1 justify-center">
          <Text className="text-[#a8a8a8] uppercase">{usrNm}</Text>
          <Text className="text-white font-bold">{title}</Text>
        </View>
      </Pressable>
      <Pressable
        hitSlop={20}
        onPress={() => navigation.goBack()}
        className="absolute left-1">
        <Icon name="chevron-back" size={6} color="#fff" />
      </Pressable>
    </View>
  )
};
