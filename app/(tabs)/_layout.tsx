import { Ionicons } from "@expo/vector-icons";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Tabs } from "expo-router";

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
              <Ionicons
                name="list"
                {...props}
                style={[props?.style, { fontSize: 24, color: 'rgba(0, 0, 0, 0.3)', }]}
              />
            )}
          />

          <BottomNavigationTab
            icon={(props) => (
              <Ionicons
                name="settings"
                {...props}
                style={[props?.style, { fontSize: 24 , color: 'rgba(0, 0, 0, 0.3)' }]}
              />
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
