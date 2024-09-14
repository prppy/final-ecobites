import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { darkGreen, beige, mutedBeige, lightGreen, mutedLightGreen, darkGrey, brown } from '@/constants/Colors'; 
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen() {
  const [bitesToday, setBitesToday] = useState(2);
  const [streaks, setStreaks] = useState(5); 
  const [treesPlanted, setTreesPlanted] = useState(3); 
  const [uploadStatus, setUploadStatus] = useState('initial'); 
  const [beforeImage, setBeforeImage] = useState(null); 
  const [afterImage, setAfterImage] = useState(null); 

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

  const treeStage = Math.min(Math.floor(bitesToday / bitesPerStage), numTreeStages);

  const getTreeImage = () => {
    return treeStages[treeStage].image;
  };

  const pickCamera = async (type) => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Error", "Camera permission is required to take a photo.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });

      if (!result.canceled) {
        const localUri = result.assets[0].uri;
        if (type === 'before') {
          setBeforeImage(localUri);
        } else if (type === 'after') {
          setAfterImage(localUri);
        }
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Unable to take photo.");
    }
  };

  const handleUploadBefore = async () => {
    await pickCamera('before');
    setUploadStatus('inProgress');
  };

  const handleUploadAfter = async () => {
    await pickCamera('after');
    setUploadStatus('completed');

    // Increment bites and handle tree planting
    setBitesToday(prevBites => {
      const newBites = prevBites + 1;
      if (newBites >= bitesPerMonth) {
        setTreesPlanted(treesPlanted + 1);
        return 0;
      }
      return newBites;
    });

    // Reset upload status to initial
    setUploadStatus('initial');
    setBeforeImage(null); // Clear before image
    setAfterImage(null);  // Clear after image

    // Show congratulatory alert
    Alert.alert(
      "Congratulations!",
      "Great job! You've finished eating and didn't waste any food. Keep it up!",
      [{ text: "OK", onPress: () => console.log("Alert closed") }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Circular Progress with Tree */}
      <View style={styles.progressCircleContainer}>
        <AnimatedCircularProgress
          size={200}
          width={10}
          fill={(bitesToday / bitesPerMonth) * 100}  // Percentage of bites in the month
          tintColor={lightGreen}
          backgroundColor={mutedLightGreen}
          rotation={0}
          lineCap="round"
          padding={30}
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
        <View style={styles.stat}>
          <Text style={styles.statValue}>{streaks}</Text>
          <Text style={styles.statLabel}>Streaks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{bitesToday}</Text>
          <Text style={styles.statLabel}>Bites This Month</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{treesPlanted}</Text>
          <Text style={styles.statLabel}>Trees Planted</Text>
        </View>
      </View>

      {/* Most Recent Food Section */}
      <View style={styles.mostRecentFood}>
        <Text style={styles.sectionTitle}>
          {uploadStatus === 'completed' ? "Bite Completed" : "Upload Your Bite"}
        </Text>
        <Image
          source={uploadStatus === 'completed' ? { uri: afterImage } : (uploadStatus === 'inProgress' ? { uri: beforeImage } : require('@/assets/images/placeholder.jpg'))}
          style={styles.recentFoodImage}
        />
      </View>

      {/* Upload Buttons */}
      {uploadStatus === 'initial' && (
        <TouchableOpacity style={styles.uploadContainer} onPress={handleUploadBefore}>
          <Text style={styles.uploadText}>Upload A Bite</Text>
        </TouchableOpacity>
      )}

      {uploadStatus === 'inProgress' && (
        <TouchableOpacity style={styles.uploadContainer} onPress={handleUploadAfter}>
          <Text style={styles.uploadText}>Finish Eating</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 10,
  },
  treeBackground: {
    width: 120,
    height: 120, 
    borderRadius: 60, 
    backgroundColor: beige, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeImage: {
    width: 100,
    height: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%', 
    maxWidth: 900, 
    marginBottom: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'white',
    fontSize: 18,
    marginTop: 5,
    textAlign:'center',
    alignContent: 'center',
  },
  mostRecentFood: {
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recentFoodImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadContainer: {
    width: 200,
    height: 50,
    backgroundColor: beige,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadText: {
    color: brown,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
