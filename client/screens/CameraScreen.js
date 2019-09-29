import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';


const serverURL = "http://feb5887e.ngrok.io/upload";

export default class CameraExample extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        isCapturing: false,
        accessCameraLabel: 'Start',
        capturedPhoto: null
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    async accessCamera()
    {
        if (this.state.isCapturing)
        {
            let photo = await this.camera.takePictureAsync();
            this.setState({ isCapturing: false, accessCameraLabel: 'Retake', capturedPhoto: photo.uri});

            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    capturedPhoto: this.state.capturedPhoto
                });
            };

            reader.readAsDataURL(photo.uri);
            // Config file to send to back end.
            const data = new FormData();
            data.append('file', {
                uri: this.state.capturedPhoto,
            });
            data.append('base', {
                uri: photo.uri,
            });
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: data
            };

            fetch(serverURL, config).then((response) => {
                console.log(JSON.stringify(data));
                console.log(photo);
            }).catch((err) => {console.log(err)}) ;
        }
        else
        {
            this.setState({ isCapturing: true, accessCameraLabel: 'Capture', capturedPhoto: null});
        }
    }

    renderImage() {
        return (
            <View style={{flex: 1}}>
                <Image
                    style={{ flex: 1, alignItems: 'stretch', flexDirection: 'row'}}
                    source={{ uri: this.state.capturedPhoto }}
                />
                <Text
                    style={{width: 50, height: 50}}
                    onPress={() => this.setState({ capturedPhoto: null })}
                >Retake
                </Text>
            </View>
        );
    }

    renderCamera() {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={this.state.type} ref={ (ref) => {this.camera = ref} }>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.setState({
                                    type:
                                        this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                });
                            }}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.accessCamera.bind(this)}>
                            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 10, color: 'white' }} >{this.state.accessCameraLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if (this.state.capturedPhoto) {
            return (this.renderImage()); // test
        } else {
            return (this.renderCamera());
        }
    }
}

