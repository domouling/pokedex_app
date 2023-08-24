/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Tab1';

//import { getColors } from '../helpers/getColors';

const windowsWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

type pokemonScreenProp = StackNavigationProp<RootStackParams>;


export const PokemonCard = ({ pokemon }: Props) => {

    const [ bgColor, setBgColor ] = useState('gray');

    const isMounted = useRef(true);

    /* const getColorPokemon = async ( uri: string ) => {
        try {
            const colors = await ImageColors.getColors(uri, { fallback: 'grey' });
            if ( colors.platform === 'android' ) {
                setBgColor(colors.dominant || 'grey');
            } else {
                setBgColor('grey');
            }
        } catch (error) {
            setBgColor('grey');
        }
    }; */

    const navigation = useNavigation<pokemonScreenProp>();

    useEffect(() => {
        //getColorPokemon(pokemon.picture);
        ImageColors.getColors( pokemon.picture, { fallback: 'grey' } )
            .then( colors => {

                if (!isMounted.current) { return; }

                (colors.platform === 'android')
                    ? setBgColor( colors.dominant || 'grey' )
                    : setBgColor('grey');
            });

        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <TouchableOpacity
            onPress={ () => navigation.navigate('PokemonScreen', {
                    simplePokemon: pokemon,
                    color: bgColor,
                })
            }
            activeOpacity={ 0.9 }
        >
            <View style={{
                ...styles.cardContainer,
                width: windowsWidth * 0.4,
                backgroundColor: bgColor,
            }}>
                {/* Nombre del pokemon y ID */}
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer }>
                    <Image
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    );
    };

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25,
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        opacity: 0.5,
    },
});
