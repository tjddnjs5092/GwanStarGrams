import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { windowHeight } from "../../App";

type CommentProps = {
  params?: [];
  style?: any;
}
export const CommentModal: React.FC<CommentProps> = ({
  params,
  style,
}) => {
  const [modalHeight, setModalHeight] = useState(windowHeight * 0.7);

  const adjustModalHeight = () => {
    setModalHeight(windowHeight * 0.5); // Example adjustment
  };
  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={modalHeight}
      handlePosition="inside"
      // Add your other modal configurations here
    >
      <View >
        <Text>Modal Content Here</Text>
        <TouchableOpacity onPress={adjustModalHeight}>
          <Text>Adjust Height</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};
