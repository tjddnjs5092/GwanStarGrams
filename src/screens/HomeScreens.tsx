import { SafeAreaView, View } from "react-native";
import React from "react";
import moment from "moment";
import 'moment/locale/ko'
import WeeklyCalendar from "@/screens/WeeklyCalendar";

type WeekDay = {
  date: moment.Moment;
  label: string;
};
export const HomeScreens = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <View className="flex-1">
        <View className="flex-1 top-3">
          <View className="flex-1">
            <View className="pb-5 border-b-8 border-b-ggray-200 bg-blue-600">
              <View className="bg-white rounded-md border m-2">
                {/* 야기에 달력 */}
                <WeeklyCalendar />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
