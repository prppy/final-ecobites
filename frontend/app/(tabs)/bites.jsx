import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, SafeAreaView, Text, View, Image, FlatList } from 'react-native';
import { darkGreen } from '@/constants/Colors';
import { data } from '../../data';

export default function Bites() {

  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));


  const renderBite = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.date}</Text>
      <Text style={styles.text}> <Text style={{fontWeight:'bold'}}>{item.tokens}</Text> tokens</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
        <Text style={styles.welcomeText}>My previous bites</Text>
      </View>
      <FlatList
        data={sortedData}
        renderItem={renderBite}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGreen,
    flex: 1
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
    marginBottom: 20
  },
  listContainer: {
    marginHorizontal: 20
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFDDDB',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    height:100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10
  },
  text: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center'
  }
});
