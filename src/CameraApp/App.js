import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Button } from "react-native-paper";
import * as MediaLibrary from 'expo-media-library';
import * as NavigationBar from "expo-navigation-bar";

const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState('back');
  const [flashVal, setFlash] = useState(true); // flash
  NavigationBar.setVisibilityAsync("hidden");

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  const takePicture = async () => {
    if (cameraRef) {

      const photo1 = await cameraRef.takePictureAsync();
      setFlash(false); // flash
      props.saveImage(photo1.uri) 

      await new Promise(resolve => setTimeout(resolve, 600));

      const photo2 = await cameraRef.takePictureAsync();
      props.saveImage(photo2.uri)  

      setFlash(true); // flash

      props.setModalVisible(); 

    }
  }

return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <CameraView
        style={{ flex: 1 }}
        ratio="16:9"
        enableTorch={flashVal}
        facing={type}
        autofocus="on"
        zoom={0.45}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >

        {/* Grid Overlay */}
        <View style={styles.gridContainer}>
          {/* Vertical lines */}
          <View style={styles.verticalLine} />
          <View style={[styles.verticalLine, { left: '33.33%' }]} />
          <View style={[styles.verticalLine, { left: '66.66%' }]} />

          {/* Horizontal lines */}
          <View style={styles.horizontalLine} />
          <View style={[styles.horizontalLine, { top: '33.33%' }]} />
          <View style={[styles.horizontalLine, { top: '66.66%' }]} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="close"
              style={{ marginLeft: 12 }}
              mode="outlined"
              textColor="#3ca89b"
              onPress={() => {
              props.setModalVisible();
              }}
            >
              Close
            </Button>
           <TouchableOpacity
              onPress={() => {
                takePicture();
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
       <Button
              icon="axis-z-rotate-clockwise"
              style={{ marginRight: 12 }}
              mode="outlined"
              textColor="#3ca89b"
              onPress={() => {CameraView
                setType(
                  type === "back"
                    ? "front"
                    : "back"
                );
              }}
            >
           {type === "back" ? "front" : "back "}
            </Button>
          </View>
        </View>
      </CameraView>
    </Modal>
  );
};
export default function ImagePickerExample() {
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const img_path = require('./assets/finger.jpg');

  const saveImage = async (uri) => {  // for server uri1, uri2
    try {
      // Save image to local storage

      const { status } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]);
      console.log("Permission status:", status);
      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(uri);
        console.log("Image", uri,  "successfully saved");
      }

        } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
return (
    
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <View
        style={{
          backgroundColor: "#eeee",
          width: 240,
          height: 240,
          borderRadius: 200,
          marginBottom: 8,
        }}
      >
       <Image
          source={img_path}
          style={{ width: 240, height: 240, borderRadius: 200 }}
        /> 

      </View> 
      <Button
        style={{ width: "60%", marginTop: 16 }}
        icon="camera"
        mode="contained"
        buttonColor="#3ca89b"
        onPress={() => {
          try {
            // Hide bottom navbar
            NavigationBar.setVisibilityAsync("hidden");
          } catch (e) {
            console.log(e);
          }
          setShowCamera(true);
        }}
      >
        Open Camera
      </Button>
    {camera && (
        <CameraModule
          showModal={camera}
          setModalVisible={() => setShowCamera(false)}
          saveImage={(uri) => saveImage(uri)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  gridContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  }
});
