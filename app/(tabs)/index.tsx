import {Dimensions, Text} from 'react-native';
import {Layout} from '@ui-kitten/components';

export default function HomeScreen() {
    return (
        <Layout style={{flex: 1, height: Dimensions.get('screen').height, backgroundColor: 'gray'}}>
            <Text style={{fontSize: 24, marginBottom: 20}}>Products list</Text>
        </Layout>
    );
}