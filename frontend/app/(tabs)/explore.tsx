import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { darkGreen } from '@/constants/Colors';
export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}> Hi </Text>
        
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGreen,
    flex:1
  },
  welcomeText: {
    color: 'white',
    fontWeight:'bold'
   
  },

});
