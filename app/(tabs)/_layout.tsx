import {Tabs} from "expo-router";
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {Ionicons} from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({navigation, state}) => (
                <BottomNavigation
                    selectedIndex={state.index}
                    onSelect={index => {
                        navigation.navigate(state.routeNames[index]);
                    }}
                >
                    <BottomNavigationTab
                        title="Список продуктов"
                        icon={(props) => <Ionicons name="list" {...props} />}
                    />
                    <BottomNavigationTab
                        title="Настройки"
                        icon={(props) => <Ionicons name="settings" {...props} />}
                    />
                </BottomNavigation>
            )}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Список продуктов",
                    tabBarLabel: "Список продуктов"
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Настройки",
                    tabBarLabel: "Настройки"
                }}
            />
        </Tabs>
    );
}