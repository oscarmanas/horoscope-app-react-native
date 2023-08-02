import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HoroscopeScreen = ({ route }) => {
  
  const { item, info } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.containerTitle}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date_range}</Text>
        </View>
      </View>
      <Text style={styles.description}>{info.general}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEAE6',
    height: '100%',
    width: '100%',
  },
  component: {
    flexDirection: 'row',
    marginTop: 30
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  containerTitle: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    color: '#442C2E',
    fontWeight: 'bold',
    fontSize: 16
  },
  description: {
    color: '#442C2E',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    textAlign: 'justify',
    lineHeight: 25,
    fontSize: 16
  },

})

export default HoroscopeScreen;