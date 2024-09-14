import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';


import { darkGreen } from '@/constants/Colors';
export default function Transactions() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
      <Text style={styles.welcomeText}>My previous bites</Text>

      </View>
        
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGreen,
    flex:1
  },
  centeredContainer: {
    justifyContent:'center',
    alignItems:'center'

  },
  welcomeText: {
    color: 'white',
    fontWeight:'bold',
    fontSize:27
   
  },

});
