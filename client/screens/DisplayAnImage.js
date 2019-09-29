import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class DisplayAnImage extends Component {
    render() {
        return (
            <View>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri:
                        'file:///var/mobile/Containers/Data/Application/1D098DB4-1C72-42E3-BD98-752589AF310E/Library/Caches/ExponentExperienceData/%2540anonymous%252Fclient-a3433ba6-09dd-4a72-ad00-b8c5310c1f53/Camera/D4378237-490F-4E4D-A812-BCD39C114B8C.jpg'}} />
            </View>
        );
    }
}
