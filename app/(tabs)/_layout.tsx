import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";

export default function TabsLayout() {
  const TabBarIcon = ({
    title,
    iconName,
    focused,
  }: {
    title: string;
    iconName: any;
    focused: boolean;
  }) => {
    if (!focused) {
      return (
        <View className="flex flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
          <Ionicons name={iconName} size={20} color="#d1d5db" />
          <Text className="text-[#d1d5db]">{title}</Text>
        </View>
      );
    }

    return (
      <View className="flex flex-row min-w-[112px] justify-center items-center bg-rose-100 mt-4 min-h-16 rounded-full overflow-hidden">
        <Ionicons name={iconName} size={20} color="#f472b6" />
        <Text className="text-[#f472b6]">{title}</Text>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#f472b6",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Home"
              iconName="home-outline"
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Search"
              iconName="search-outline"
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Guardados",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Saved"
              iconName="bookmark-outline"
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Profile"
              iconName="person-outline"
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
