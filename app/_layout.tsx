import {Stack} from "expo-router";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "react-native";

export default function RootLayout() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <SafeAreaView style={{flex: 1}}>
                    <StatusBar barStyle="dark-content"/>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    </Stack>
                </SafeAreaView>
            </ApplicationProvider>
        </>
    );
}