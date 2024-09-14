import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, SafeAreaView, Text,TouchableOpacity, View } from 'react-native';

import { darkGreen } from '@/constants/Colors';

import { useState } from 'react';

export default function Profile() {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  




  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}> profile </Text>
  
    
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            {!isConnected ?  
              <>
              <TouchableOpacity style={{alignItems:'center'}}>
              <Ionicons name="wallet" size={100} color="#FDE5D4" />
              <Text style={{color:'white', fontWeight:'500'}}>Connect to your wallet</Text>
              </TouchableOpacity>
              </> :
              <>
               <TouchableOpacity style={{alignItems:'center'}}>
              <Ionicons name="wallet" size={100} color="#FDE5D4" />
              <Text style={{color:'white', fontWeight:'500'}}>My wallet</Text>
              </TouchableOpacity>
              </>
            }
        
        </View>


     

        
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
