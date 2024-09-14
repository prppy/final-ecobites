import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { darkGreen, beige, mutedBeige, lightGreen, darkGrey, brown } from '@/constants/Colors'; 

export default function HomeScreen() {
  const [bitesToday, setBitesToday] = useState(2); // Replace with actual state logic
  const [streaks, setStreaks] = useState(5); // Replace with actual streak logic
  const [treesPlanted, setTreesPlanted] = useState(3); // Replace with actual logic for trees planted
  const mostRecentFood = require('@/assets/images/mostRecentFood.jpg');  // Replace with actual path to image

  const bitesPerMonth = 30;
  const numTreeStages = 5;
  const bitesPerStage = bitesPerMonth / numTreeStages; // Each stage requires 6 bites
  
  const treeStages = [
    { stage: "VerySmall", image: require('@/assets/images/Trees/1.png') },
    { stage: "Small", image: require('@/assets/images/Trees/2.png') },
    { stage: "Medium", image: require('@/assets/images/Trees/3.png') },
    { stage: "Large", image: require('@/assets/images/Trees/4.png') },
    { stage: "VeryLarge", image: require('@/assets/images/Trees/5.png') }
  ];

  // Calculate the tree stage based on the number of bites today
  const treeStage = Math.min(Math.floor(bitesToday / bitesPerStage), numTreeStages);

  // Function to simulate uploading a bite and increasing the bite count
  const handleUploadBite = () => {
    setBitesToday(prevBites => prevBites + 1);
    // If they reach 30 bites, reset the progress and grow a new tree
    if (bitesToday + 1 >= bitesPerMonth) {
      setBitesToday(0);
      setTreesPlanted(treesPlanted + 1);
    }
  };

  // Function to retrieve the correct tree image based on the current stage
  const getTreeImage = () => {
    return treeStages[treeStage].image;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Circular Progress with Tree */}
      <View style={styles.progressCircleContainer}>
        <AnimatedCircularProgress
          size={200}
          width={10}
          fill={(bitesToday / bitesPerMonth) * 100}  // Percentage of bites in the month
          tintColor={beige}
          backgroundColor={mutedBeige}
          rotation={0}
          lineCap="round"
          padding = {30}
        >
          {() => (
            <View style={styles.treeBackground}>
              <Image source={getTreeImage()} style={styles.treeImage} />
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {/* Bites Today */}
        <View style={styles.stat}>
          <Text style={styles.statValue}>{bitesToday}</Text>
          <Text style={styles.statLabel}>Bites Today</Text>
        </View>

        {/* Streaks */}
        <View style={styles.stat}>
          <Text style={styles.statValue}>{streaks}</Text>
          <Text style={styles.statLabel}>Streaks</Text>
        </View>

        {/* Trees Planted */}
        <View style={styles.stat}>
          <Text style={styles.statValue}>{treesPlanted}</Text>
          <Text style={styles.statLabel}>Trees Planted</Text>
        </View>
      </View>

      {/* Most Recent Food Finished */}
      <Text style={styles.sectionTitle}>Most Recent Food Finished</Text>
      <Image source={mostRecentFood} style={styles.recentFoodImage} />

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadContainer} onPress={handleUploadBite}>
        <Text style={styles.uploadText}>Upload Today’s Bite!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGreen,
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  progressCircleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  treeBackground: {
    width: 120,
    height: 120, 
    borderRadius: 60, 
    backgroundColor: '#e0f7fa', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeImage: {
    width: 100,
    height: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  recentFoodImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadContainer: {
    width: 250,
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    marginTop: 20,
  },
  uploadText: {
    color: 'brown',
    fontSize: 16,
  },
});

