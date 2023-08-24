import ImageColors from 'react-native-image-colors';

export const getColors = async ( uri: string ) => {

    const colors = await ImageColors.getColors(uri, {});

    let primary;
    let secondary;

    if ( colors.platform === 'android' ) {
        primary = colors.dominant;
        secondary = colors.average;
    } else {
        // iOS returns the same color for both dominant and average
        [primary] = Object.values(colors);
        console.log('iOS', colors);
    }

    return [ primary, secondary ];
};
