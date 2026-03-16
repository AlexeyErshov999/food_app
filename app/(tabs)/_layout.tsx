import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { BottomTabIcon } from "../components/BottomTabIcon/BottomTabIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state }) => (
        <BottomNavigation
          selectedIndex={state.index}
          onSelect={(index) => {
            navigation.navigate(state.routeNames[index]);
          }}
        >
          <BottomNavigationTab
            icon={(props) => (
              <BottomTabIcon name="list" />
            )}
          />

          <BottomNavigationTab
            icon={(props) => (
              <BottomTabIcon name="settings" />
            )}
          />
        </BottomNavigation>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Список продуктов",
          tabBarLabel: "Список продуктов",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Настройки",
          tabBarLabel: "Настройки",
        }}
      />
    </Tabs>
  );
}
