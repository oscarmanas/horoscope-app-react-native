import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { horoscopes } from '../../assets/data';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [horoscopeData, setHoroscopeData] = useState([]);

  useEffect(() => {
    // Fetch horoscope data for all signs
    Promise.all(
      horoscopes.map((element) =>
        fetchHoroscopeDaily(element.name_api).then((info) => ({
          ...element,
          info,
        }))
      )
    )
      .then((data) => {
        setHoroscopeData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const fetchHoroscopeDaily = async (sign) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ENTER_YOUR_API_KEY',
        'X-RapidAPI-Host': 'horoscopes-ai.p.rapidapi.com',
      },
    };
  
    const response = await fetch(
      `https://horoscopes-ai.p.rapidapi.com/get_horoscope/${sign}/today/general/es`,
      options
    );
  
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
  
    const data = await response.json();
    return data;
  };  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ca4b4b" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>D A I L Y     H O R O S C O P E</Text>
      </View>
      <View style={styles.menuContainer}>
        {horoscopeData.map((element) => (
          <View style={styles.menuItem} key={element.id}>
            <Pressable
              style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                navigation.navigate('HoroscopeScreen', { item: element, info: element.info });
              }}
            >
              <Image style={styles.image} source={element.image} />
              <Text style={styles.name}>{element.name}</Text>
              <Text style={styles.dateRange}>{element.date_range}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FEEAE6',
  },
  top: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#442C2E',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#442C2E',
    borderWidth: 2,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#FEDBD0',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuItem: {
    width: '33.333333%',
    padding: 27,
  },
  image: {
    width: 70,
    height: 70,
    opacity: 0.8,
  },
  name: {
    color: '#442C2E',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  dateRange: {
    color: '#442C2E',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEEAE6',
  },
});
