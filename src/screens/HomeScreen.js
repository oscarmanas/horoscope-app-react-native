import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import { StyleSheet } from "react-native";
import { horoscopes } from "../../assets/data"

export default function HomeScreen({ navigation }) {

  let infoHoroscope = {};

  const getHoroscopeDaily = async (sign) => {

    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': '7b343897b8msha67e8baf471f32ep1c2270jsnb779eec89a39',
        'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
      }
    };

    await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=today`, options)
      .then((res) => {
        if (!res.ok) throw new Error(res.status.toString());
        else return res.json();
      })
      .then((response) => { infoHoroscope = response })
      .catch((err) => { console.error(err) });
  }

  return (
      <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: '#FEEAE6' }} showsVerticalScrollIndicator={false} >
        <View style={styles.top}>
          <Text style={styles.header}>D A I L Y     H O R O S C O P E</Text>
        </View>
        <View style={styles.menuContainer}>
          {
            horoscopes.map((element) => {
              return (
                <View style={styles.menuItem} key={element.id}>
                  <Pressable style={{ width: 80, justifyContent: 'center', alignItems: 'center' }} onPress={async () => {
                    await getHoroscopeDaily(element.name_api);
                    navigation.navigate('HoroscopeScreen', { item: element, info: infoHoroscope });
                  }} >
                    <Image style={styles.image} source={element.image} />
                    <Text style={styles.name}>{element.name}</Text>
                    <Text style={styles.dateRange}>{element.date_range}</Text>
                  </Pressable>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    backgroundColor: '#FEDBD0'
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
    marginTop: 5
  },
  dateRange: {
    color: '#442C2E',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 0
  }
});
