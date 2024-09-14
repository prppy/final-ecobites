import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { beige, darkGreen } from '@/constants/Colors';
import { useState } from 'react';

export default function Profile() {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const tokenBalance = 500;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Profile</Text>
    
      {!isConnected ?  
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity style={{alignItems:'center'}}>
            <Ionicons name="wallet" size={100} color="#FDE5D4" />
            <Text style={{color:'white', fontWeight:'500'}}>Connect to your wallet</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={{flex:1}}>
          <View style={{flexDirection:'row-reverse'}}>
            <TouchableOpacity style={{alignItems:'center'}}>
              <Ionicons name="wallet" size={100} color="#FDE5D4" />
              <Text style={{color:'white', fontWeight:'500'}}>My wallet</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, marginTop:20}}>
          <Text style={styles.heading}>Your B3TR Token Balance: </Text>
        

            <View style={styles.banner}>
              <Text style={styles.text}>{tokenBalance}</Text>
            </View>
          </View>
          
        </View>
      }
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
    fontWeight:'bold',
    fontSize: 24, 
    textAlign: 'center', 
    marginVertical: 20  
  },
  banner: {
    backgroundColor: beige, 
    borderRadius: 20,
    height: 100,
    marginHorizontal: 10,
    alignItems:'center',
    justifyContent:'center'
  },
  heading: {
    color: 'white',  
    fontWeight: 'bold',
    fontSize:20,
    marginLeft:10,
    marginBottom:10
  }, 
  text: {
    fontWeight:'800',
    fontSize:50,
    textAlign:'center'
  }
});
