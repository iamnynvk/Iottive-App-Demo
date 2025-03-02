import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

const InFolder = (props: any) => {
  const navigation = useNavigation();
  const { data } = props?.route?.params;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const getImageNameFromUri = (uri: string) => {
    return uri.match(/[^-/]+$/)[0];
  };

  const renderImages = async ({ item }: any) => {
    const imageName = getImageNameFromUri(item);
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderBottomWidth: 0.8,
        }}
      >
        <Ionicons name="image" size={20} />
        <Text style={styles.imageName}>{imageName}</Text>
      </View>
    );
  };

  const _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No images found in this folder</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.folderImages}
        renderItem={renderImages}
        keyExtractor={() => Math.random()}
        ListEmptyComponent={_renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageStyles: {
    height: 200,
    width: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageName: {
    fontSize: 14,
    marginStart: 10,
  },
});

export default InFolder;
