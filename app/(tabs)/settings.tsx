import {Dimensions, Text} from 'react-native';
import {Layout} from '@ui-kitten/components';

export default function SettingsScreen() {
    return (
        <Layout style={{flex: 1, height: Dimensions.get('screen').height, backgroundColor: 'darkgreen'}}>
            <Text style={{fontSize: 24, marginBottom: 20}}>Settings</Text>
        </Layout>
    );
}