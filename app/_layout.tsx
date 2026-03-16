import {DatabaseService} from "@/app/database/DatabaseService";
import {CustomSplashScreen} from "@/app/widgets/SplashScreen/CustomSplashScreen";
import * as eva from "@eva-design/eva";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";
import {StatusBar, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            retryDelay: 1000,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        },
    },
});

SplashScreen.preventAutoHideAsync();

function AppContent() {
    const [isDbReady, setIsDbReady] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function prepare() {
            try {
                const db = await DatabaseService.getInstance();
                await db.initDatabase();
            } catch (err) {
                console.error(`RootLayout:useEffect:prepare() failed, ${err}`);
                setError(err as Error);
            } finally {
                setIsDbReady(true);
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, []);

    if (error) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Ошибка загрузки: {error.message}</Text>
            </View>
        );
    }

    if (!isDbReady) {
        return <CustomSplashScreen/>;
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <SafeAreaView style={{flex: 1}}>
                    <StatusBar barStyle="dark-content"/>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="(tabs)"/>
                    </Stack>
                </SafeAreaView>
            </ApplicationProvider>
        </>
    );
}

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent/>
        </QueryClientProvider>
    );
}