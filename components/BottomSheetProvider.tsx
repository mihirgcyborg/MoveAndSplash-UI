import { View, Text, LayoutAnimation } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

type BottomSheetContextType = {
  openBottomSheet: (
    component: React.ReactNode,
    title: string,
    enablePanDownToClose: boolean
  ) => void;
  closeBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet mustbe used within a BottomSheetProvider");
  }
  return context;
};

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<String>("");
  const [enablePanDownToClose, setEnablePanDownToClose] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = (
    component: React.ReactNode,
    headerTitle: String,
    enablePanDownToClose: boolean
  ) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTitle(headerTitle);
    setContent(component);
    setIsOpen(true);
    setEnablePanDownToClose(enablePanDownToClose);
  };

  const closeBottomSheet = () => {
    setIsOpen(false);
    bottomSheetRef.current?.close();
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => bottomSheetRef.current?.expand(), 100);
    }
  }, [isOpen]);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      <BottomSheet
        key={isOpen ? "open" : "closed"}
        snapPoints={["91%"]}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        index={isOpen ? 0 : -1}
      >
        <BottomSheetView className="flex-1 bg-primary">
          {/* Header */}
          <View className="flex-row items-center justify-between pb-2 border-b-[1px] border-b-[#DDD]">
            <TouchableOpacity onPress={closeBottomSheet}>
              <View className="pl-2">
                <Ionicons name="close" size={24} color={"grey"} />
              </View>
            </TouchableOpacity>
            <Text className="flex-1 font-pbold text-md text-center">
              {title}
            </Text>
            <View style={{ width: 24 }} />
          </View>
          {/* Welcome message */}
          {/* <View className="items-center mt-4">
            <Text className="text-lg font-semibold">WELCOME to AIRBNB</Text>
          </View> */}
          {/* Main content */}

          <ScrollView>
            <View className="flex-1 justify-start mt-10 px-5">{content}</View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};
