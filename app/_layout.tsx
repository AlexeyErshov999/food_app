import {Stack} from "expo-router";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar, View, Text} from "react-native";
import * as SplashScreen from 'expo-splash-screen'
import {useEffect, useState} from "react";
import {DatabaseService} from "@/app/database/DatabaseService";
import {CustomSplashScreen} from "@/app/components/splash/CustomSplashScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [isDbReady, setIsDbReady] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function prepare() {
            try {
                const db = DatabaseService.getInstance()
                await db.initDatabase()
                await db.fillDatabaseByTestData()

                // TODO: потом убрать!!! Это для теста SplashScreen
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error(`RootLayout:useEffect:prepare() failed, ${err}`)
                setError(err as Error);
            } finally {
                setIsDbReady(true)
                await SplashScreen.hideAsync()
            }
        }

        prepare();
    }, [])

    // TODO: подумать про нормальное отображение ошибки, если БД не может соединиться
    if (error) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Ошибка загрузки: {error.message}</Text>
            </View>
        );
    }

    if (!isDbReady) {
        return <CustomSplashScreen/>
    }

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