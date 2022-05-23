// The following packages need to be installed using the following commands:
// expo install expo-camera
// expo install expo-media-library
// expo install expo-sharing
// expo install expo-av

import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker'
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';


const API_URL = 'http://192.168.100.8:5000';

export default function TryOnScreen({ route, navigation }) {

    var { dressid, category } = route.params;
    console.log("id: ", dressid)
    var flag = 0;
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [galleryItems, setGalleryItems] = useState([]);
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')

            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
                setGalleryItems(userGalleryMedia.assets)
            }
        })();
    }, []);

    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
        return <Text>Requestion permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
    }

    const generateThumbnail = async (source) => {
        console.log("source: ", source)
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                source,
                {
                    time: 5000,
                }
            );
            console.log("uri thumb: ", uri)
            return uri;
        } catch (e) {
            console.warn(e);
        }
    };

    let recordVideo = async () => {
        setIsRecording(true);
        let options = {
            quality: "1080p",
            maxDuration: 60,
            mute: false
        };

        await cameraRef.current.recordAsync(options).then((recordedVideo) => {
            console.log("recorded video");
            console.log(recordedVideo);
            console.log("recorded video");

            setVideo(recordedVideo);
            console.log(recordedVideo);
            const { uri } = VideoThumbnails.getThumbnailAsync(
                recordedVideo.uri,
                {
                    time: 5000,
                }
            );
            console.log("uri thumb: ", uri)
            // let sourceThumb = generateThumbnail(recordedVideo)
            // console.log("thumbnail: ", sourceThumb)
            setIsRecording(false);
        });
    };

    let stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
    };

    if (video) {
        let shareVideo = () => {
            shareAsync(video.uri).then(() => {
                setVideo(undefined);
            });
        };

        let saveVideo = async () => {
            if (category === 'Jeans') {
                flag = 1
            } else if (category === 'Dress') {
                flag = 2
            }

            const type = "video/mp4"
            await MediaLibrary.saveToLibraryAsync(video.uri)

            const uid = await AsyncStorage.getItem('user');

            console.log("uid: ", uid)
            var data = new FormData();
            data.append('video', {
                name: "abc.mp4",
                uri: video.uri,
                type: "video/mp4"
            });

            dressid = dressid.toString();

            try {
                await fetch(`${API_URL}/mobileArTryOn?dress=${dressid}&flag=${flag}`, {
                    method: "POST",
                    body: data,
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
                    .then(async res => {
                        try {
                            setVideo(undefined);
                            //   navigation.navigate('MeasurmenetScreen')

                        } catch (e) {
                            console.error(e);
                        }
                    })
            } catch (e) {
                console.error(e);
            }
            // await MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
            //    fetch(`${API_URL}/mobilemeasurements`, {

            //     method: "POST",
            //     body: JSON.stringify({
            //         videoUri:video.uri,
            //         user:'6280d5c41871bb30048f5af2',
            //     }),

            //     headers: {
            //         "Content-type": "application/json; charset=UTF-8"
            //     }
            // })

            //     .then(async res => {
            //         try {

            //             const jsonRes = await res.json();

            //             if (jsonRes.message === true) {
            //               setVideo(undefined);
            //             } else {
            //                 console.log("error found ", jsonRes.error)
            //             }

            //         } catch (err) {
            //             console.log(err);
            //         };
            //     })
            //     .catch(err => {
            //         console.log("error: ", err.message);
            //     });


            // });
        };



        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: video.uri }}
                    useNativeControls
                    resizeMode='contain'
                    isLooping
                />
                <View style={{ flexDirection: 'row' }}>

                    {hasMediaLibraryPermission ?
                        <TouchableOpacity style={styles.saveBtn} onPress={() => saveVideo()}>
                            <MaterialCommunityIcons name="file-send-outline" color="white" size={20} />
                        </TouchableOpacity>
                        : undefined}
                    <TouchableOpacity style={styles.saveBtn} onPress={() => setVideo(undefined)}>
                        <AntDesign name="close" color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo} ><Text>{isRecording ? "Stop Recording" : "Record Video"}</Text></TouchableOpacity>
      </View> */}
            <View style={{ marginTop: -(SCREEN_HEIGHT * 0.8), marginLeft: -(SCREEN_WIDTH * 0.8) }}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.pop()}>
                    <MaterialIcons name="keyboard-arrow-left" color="white" size={40} />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomBarContainer}>

                <View style={{ flex: 1 }}></View>
                <View style={[styles.recordButtonContainer, { marginHorizontal: SCREEN_WIDTH / 16 }]}>
                    <TouchableOpacity
                        onLongPress={() => recordVideo()}
                        onPressOut={() => stopRecording()}
                        style={styles.recordButton}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={async () => {
                            let result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                                allowsEditing: true,
                                aspect: [16, 9],
                                quality: 1
                            })
                            if (!result.cancelled) {
                                setVideo(result)
                            }
                        }}
                        style={styles.galleryButton}>
                        {galleryItems[0] == undefined ?
                            <></>
                            :
                            <Image
                                style={styles.galleryButtonImage}
                                source={{ uri: galleryItems[0].uri }}
                            />}
                    </TouchableOpacity>
                </View>
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        alignSelf: "center",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    video: {
        flex: 1,
        alignSelf: "stretch",
    },
    backBtn: {
        position: 'relative',
        alignSelf: 'flex-start',
        bottom: 0,
        margin: 20,
    },
    bottomBarContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        marginBottom: 30,
    },
    recordButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    recordButton: {
        borderWidth: 8,
        borderColor: '#ff404087',
        backgroundColor: '#ff4040',
        borderRadius: 100,
        height: 80,
        width: 80,
        alignSelf: 'center'
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        width: 50,
        height: 50,
        marginRight: 20
    },
    galleryButtonImage: {
        width: 50,
        height: 50,
    },
    saveBtn: {
        backgroundColor: '#EC9684',
        padding: 10,
        margin: 20,
        borderRadius: 10
    }
});
