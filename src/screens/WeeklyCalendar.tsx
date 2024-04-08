import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/ko'

export const WeeklyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  // Add state variables to control button visibility
  const [showPrev, setShowPrev] = useState(true);
  const [showNext, setShowNext] = useState(true);

  const generateWeekDates = (date: moment.Moment) => {
    return Array.from({ length: 7 }).map((_, index) => date.clone().add(index, 'days'));
  };

  const [weekDates, setWeekDates] = useState(generateWeekDates(currentDate));

  const handleScroll = (direction: 'prev' | 'next') => {
    setCurrentDate((prevDate) => {
      if (direction === 'next') {
        const newDate = prevDate.clone().add(7, 'days');
        // Limit navigation to within 30 days from today
        if (newDate.isAfter(moment().add(30, 'days'), 'day')) {
          return prevDate; // If the new date exceeds the limit, don't update the date
        }
        return newDate;
      } else {
        const newDate = prevDate.clone().subtract(7, 'days');
        // Allow navigating to the past but not before the earliest allowed date
        const earliestAllowedDate = moment().subtract(7, 'days'); // Example: Allow only one week before today
        if (newDate.isBefore(earliestAllowedDate, 'day')) {
          return earliestAllowedDate; // If the new date is before the earliest allowed, set to earliest allowed date
        }
        // updateButtonVisibility(newDate);
        return newDate;
      }
    });
  };

  useEffect(() => {
    setWeekDates(generateWeekDates(currentDate));
    // Logic to show/hide Prev button
    setShowPrev(!currentDate.isSame(moment().subtract(7, 'days'), 'day'));

    const endOfWeek = currentDate.clone().endOf('week');
    // Show "Next" button if the end of the current week is before the maximum future date limit
    setShowNext(endOfWeek.isBefore(moment().add(28, 'days'), 'day'));
  }, [currentDate]);


  return (
    <View className="">
      <View className="flex-row justify-between items-center p-3">
        <TouchableOpacity onPress={() => handleScroll('prev')}>
          <Text className={`${showPrev ? 'text-black' : 'text-white'}`}>Prev</Text>
        </TouchableOpacity>
        <Text>{selectedDate.format('YYYY년 MM월 DD일 (ddd)')}</Text>
        <TouchableOpacity onPress={() => handleScroll('next')}>
          <Text className={`${showNext ? 'text-black' : 'text-white'}`}>Next</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <FlatList
          data={weekDates}
          renderItem={({ item }) => {
            const isToday = item.isSame(moment(), 'day');
            const isTomorrow = item.isSame(moment().add(1, 'days'), 'day');
            const isSelected = item.isSame(selectedDate, 'day');
            const isWeekend = item.day() === 6 || item.day() === 0;
            const isPast = item.isBefore(moment(), 'day');

            let dayLabel = item.format('ddd');
            if (isToday) {
              dayLabel = "오늘";
            } else if (isTomorrow) {
              dayLabel = "내일";
            }

            let dateViewStyle = "w-6 h-6 items-center justify-center";
            let dateTextStyle = "font-16";
            let dayTextStyle = "font-16 text-ggray-600";

            if (isSelected) {
              dateViewStyle += " border-green-700 border-4 bg-green-700 rounded";
              dateTextStyle += " font-bold text-white";
              dayTextStyle = "font-16 text-green-700"; // Override to reset additional styles
            } else if (isWeekend || isPast) {
              dateTextStyle += " text-ggray-600";
            }

            return (
              <TouchableOpacity onPress={() => setSelectedDate(item)} style={{ alignItems: 'center', padding: 15 }}>
                <View className={dateViewStyle}>
                  {/*<Text style={{ fontSize: 18, ...textStyle }}>{item.format('D')}</Text>*/}
                  <Text className={dateTextStyle}>{item.format('D')}</Text>
                </View>
                <Text className={dayTextStyle}>{dayLabel}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.toString()}
          horizontal
        />
      </View>
    </View>
  );
};

export default WeeklyCalendar;
