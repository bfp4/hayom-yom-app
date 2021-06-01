import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from "react-native-animatable"

import constansts from "../../assets/constants"

export default function Loading(props){
    const flipAnim = {
        0: {
            transform: [{rotate: "0deg"}]
        },
        0.25: {
            transform: [{rotate: "180deg"}]
        },
        0.5: {
            transform: [{rotate: "180deg"}]
        },
        0.75: {
            transform: [{rotate: "360deg"}]
        },
        1: {
            transform: [{rotate: "360deg"}]
        }
    }

    const fillAnim = {
        0: {
            transform: [{ scaleY: 0 }]
        },
        0.25: {
            transform: [{ scaleY: 0 }]
        },
        0.5: {
            transform: [{ scaleY: 1 }]
        },
        0.75: {
            transform: [{ scaleY: 1 }]
        },
        1: {
            transform: [{ scaleY: 0 }]
        }
    };

    const fillAnimTwo = {
        0: {
            height: 0
        },
        0.25: {
            height: 0
        },
        0.5: {
            height: 40
        },
        0.75: {
            height: 40
        },
        1: {
            height: 0
        }
    };
    
    return (
        <View style={{...styles.loadingCon, height: props.size}}>
            <Animatable.View 
                style={styles.loader} 
                animation={flipAnim}
                duration={2000}
                iterationCount="infinite"
                easing="linear"
                useNativeDriver={true}
            >
                <Animatable.View
                    style={styles.loaderInner}
                    animation={fillAnimTwo}
                    duration={2000}
                    iterationCount="infinite"
                    easing="linear"
                    useNativeDriver={false}
                >
                </Animatable.View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingCon: {
        justifyContent: "center",
        alignItems: "center"
    },
    loader: {
        width: 40,
        height: 40,
        borderWidth: 5,
        borderColor: constansts.colors.blues,
        borderRadius: 4,
    },
    loaderInner: {
        width: "100%",
        backgroundColor: constansts.colors.blues,
    }
})