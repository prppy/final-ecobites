import { Tabs } from 'expo-router';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { darkGreen } from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor:"#D6CC99",
        },
        headerShown: false,
      
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'home'} color={focused? darkGreen : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="bites"
        options={{
          title: 'Bites',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="cookie-bite" size={24} color={focused? darkGreen : 'gray'} />
            
           
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'person-sharp'} color={focused? darkGreen : 'gray'} />
          ),
        }}
      />
    </Tabs>
  );
}
