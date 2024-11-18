import { View, Text } from "react-native";
import React from "react";
import SubstitutePage from "../../components/SubstitutePage";

const Messages = () => {
  return (
    <View>
      <SubstitutePage
        tabName="Inbox"
        shortDes="Log in to see messages"
        longDes="Once you log in, you'll find messages from hosts here."
      />
    </View>
  );
};

export default Messages;
