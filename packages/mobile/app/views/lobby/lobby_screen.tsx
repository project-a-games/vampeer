import {
    View, Text, TouchableOpacity, StyleSheet, ImageBackground, useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import Carousel, {
    Pagination,
} from 'react-native-snap-carousel';
import { Nav, RouteNames } from '../routes';
import { sharedStyles } from '../shared_styles';
import VillageImage from '../../assets/andrew-butler-darkagesvillage-studentgallerysub.jpg';

const neatGreen = '#25e8aa';
const IconWithText = ({ name, text }: {name: string, text: string}) => (
    <TouchableOpacity style={{
        flex: 1, margin: 8,
    }}
    >
        <View style={{
            flex: 1, borderColor: neatGreen, borderWidth: 2,
        }}
        >
            <Icon name={name} size={70} style={{ flex: 3, alignSelf: 'center', textAlignVertical: 'center' }} color={neatGreen} />
            <Text style={{
                flex: 1, textAlign: 'center', textAlignVertical: 'top', fontSize: 18,
            }}
            >
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    controlRow: {
        flex: 2,
        flexDirection: 'row',
        marginHorizontal: 40,
        alignContent: 'center',
    },
});

function renderVillageCard({ item, index }: {item: any, index: number}) {
    return (
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}>
            <ImageBackground style={{ flex: 1 }} source={VillageImage}>
                <View style={{ flex: 2 }} />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 18 }}>{item}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const demoItems = ['one', 'two', 'whatever', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export const LobbyScreen = ({ navigation }: Nav<RouteNames.Lobby>) => {
    const { width: windowWidth } = useWindowDimensions();
    const [carouselIdx, setCarouselIdx] = useState(0);

    return (
        <View style={[sharedStyles.centeredView, { marginTop: 15 }]}>
            <View style={{ flex: 2 }}>
                <Carousel
                    data={demoItems}
                    renderItem={renderVillageCard}
                    itemWidth={windowWidth / 2}
                    sliderWidth={windowWidth}
                    onSnapToItem={setCarouselIdx}
                />
                <Pagination
                    containerStyle={{
                        paddingTop: 10, paddingBottom: 5,
                    }}
                    dotsLength={demoItems.length}
                    activeDotIndex={carouselIdx}
                />
            </View>
            <View style={{ flex: 3, marginTop: 5 }}>
                <View style={styles.controlRow}>
                    <IconWithText name="plus" text="Create Village" />
                    <IconWithText name="external-link" text="Join Village" />
                </View>
                <View style={[styles.controlRow, { flex: 2, marginBottom: 40 }]}>
                    <IconWithText name="heart" text="Freyends" />
                    <IconWithText name="gear" text="Settings" />
                </View>

            </View>
        </View>
    );
};
