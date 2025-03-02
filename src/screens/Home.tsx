import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  BackHandler,
  PixelRatio,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Appbar, Button, FAB, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addFolder, addImageInFolder } from "../slices/folderSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { captureRef } from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { clearData } from "../slices/userSlice";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cameraRef = React.useRef();
  const { userFolders } = useSelector((state) => state.folder);
  const { currentUser } = useSelector((state) => state.user);
  const [folderName, setFolderName] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const currentUserFolders =
    userFolders.find((user) => user.username === currentUser?.username)
      ?.folders || [];

  useEffect(() => {
    getMediaPermission();
    const backAction = () => {
      if (isOpenCamera) {
        setIsOpenCamera(false);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const getMediaPermission = async () => {
    await MediaLibrary.requestPermissionsAsync();
  };

  const createFolder = async () => {
    const isExistingFolder = currentUserFolders.some(
      (folder) => folder.folderName === folderName.toUpperCase()
    );

    if (isExistingFolder) {
      alert("Folder already exists! Please try another name.");
      return;
    }

    dispatch(
      addFolder({
        username: currentUser?.username,
        folder: { id: Math.random(), folderName: folderName.toUpperCase() },
      })
    );

    setFolderName("");
  };

  const onCameraHandler = async () => {
    if (permission?.status !== "granted") {
      const { status } = await requestPermission();
      if (status !== "granted") {
        alert("Camera permission is required to use the camera.");
        return;
      }
    }
    setIsOpenCamera(true);
  };

  const takePhotoHandler = async () => {
    const targetPixelCount = 1080;
    const pixelRatio = PixelRatio.get();
    const pixels = targetPixelCount / pixelRatio;

    const result = await captureRef(cameraRef, {
      result: "tmpfile",
      height: pixels,
      width: pixels,
      quality: 1,
      format: "png",
    });

    setCapturedImage(result);
    setIsOpenCamera(false);
    setIsOpenModal(true);
  };

  const handleFolderSelect = async (folderName) => {
    dispatch(
      addImageInFolder({
        username: currentUser?.username,
        folderName,
        image: capturedImage,
      })
    );
    setIsOpenModal(false);
    setCapturedImage(null);
  };

  const renderFolderRecords = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("InFolder", {
          data: item,
        })
      }
      style={styles.folderContainer}
    >
      <Ionicons name="folder" size={50} />
      <Text numberOfLines={1} style={styles.folder}>
        {item.folderName}
      </Text>
    </TouchableOpacity>
  );

  const renderFolderOptions = ({ item }) => (
    <TouchableOpacity
      style={styles.folderOption}
      onPress={() => handleFolderSelect(item.folderName)}
    >
      <Text style={styles.folderOptionText}>{item.folderName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isOpenCamera ? (
        <>
          <CameraView
            ref={cameraRef}
            active={isOpenCamera}
            style={{ flex: 1 }}
          />
          <FAB
            style={{ position: "absolute", alignSelf: "center", bottom: 30 }}
            icon="camera"
            onPress={takePhotoHandler}
          />
        </>
      ) : (
        <>
          <Appbar.Header style={styles.headerStyles}>
            <Appbar.Content title="Dashboard" />
            <Appbar.Action
              icon="login"
              onPress={() => {
                dispatch(clearData());
                navigation.reset({
                  index: 0,
                  routes: [{ name: "SignIn" }],
                });
              }}
            />
          </Appbar.Header>
          <View style={styles.inputContainer}>
            <TextInput
              style={{ backgroundColor: "#EFE9ED" }}
              label="Folder Name"
              value={folderName}
              onChangeText={setFolderName}
            />
            <Button
              icon="folder-plus"
              mode="contained"
              onPress={createFolder}
              style={{ marginTop: 8 }}
              disabled={!folderName}
            >
              Create Folder
            </Button>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              data={currentUserFolders}
              renderItem={renderFolderRecords}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
          {currentUserFolders.length > 0 && (
            <FAB style={styles.fab} icon="camera" onPress={onCameraHandler} />
          )}
          <Modal visible={isOpenModal} onDismiss={() => setIsOpenModal(false)}>
            <View style={styles.modalContent}>
              <View style={styles.headerContainer}>
                <Text style={styles.modalTitle}>Select Folder</Text>
                <Ionicons
                  name="close"
                  size={26}
                  onPress={() => setIsOpenModal(false)}
                />
              </View>
              <FlatList
                data={currentUserFolders}
                renderItem={renderFolderOptions}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    padding: 8,
  },
  flatListContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headerStyles: {
    backgroundColor: "#EFE9ED",
  },
  folderContainer: {
    height: 90,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  folder: {
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  folderOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  folderOptionText: {
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
