/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Tension from './pages/Tension';
import Resistencia from './pages/Resistencia';
import Ampers from './pages/Ampers';
import Potencia from './pages/Potencia';
import mobileAds, {
  BannerAd,
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import Conversor from './pages/Conversor';
import Impendancias from './pages/Impendancias';
import Capacitancia from './pages/Capacitancia';
import Fasoriales from './pages/Paralelo';

export function HomeScreen({navigation}) {
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-3093048889634559/4026025202';
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.columna}>
          <TouchableOpacity
            style={[styles.box, styles.box1, styles.borderTopLeftRadius]}
            onPress={() => navigation.navigate('Tensión')}>
            <Text style={styles.text}>Tensión (V)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.box2]}
            onPress={() => navigation.navigate('Resistencia')}>
            <Text style={styles.text}>Resistencia (Ω)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.box3]}
            onPress={() => navigation.navigate('Ampers')}>
            <Text style={styles.text}>Ampers (A)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.box4, styles.borderBottomLeftRadius]}
            onPress={() => navigation.navigate('Fasoriales')}>
            <Text style={styles.text}>Fasoriales</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columna}>
          <TouchableOpacity
            style={[styles.box, styles.box5, styles.borderTopRightRadius]}
            onPress={() => navigation.navigate('Potencia')}>
            <Text style={styles.text}>Potencia (W)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.box6]}
            onPress={() => navigation.navigate('Conversor')}>
            <Text style={styles.text}>Conversor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.box7]}
            onPress={() => navigation.navigate('Impendancias')}>
            <Text style={styles.text}>Impedancia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.box8, styles.borderBottomRightRadius]}
            onPress={() => navigation.navigate('Capacitancia')}>
            <Text style={styles.text}>Capacitancia</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ley de OHM">
        <Stack.Screen name="Ley de OHM" component={HomeScreen} />
        <Stack.Screen name="Tensión" component={Tension} />
        <Stack.Screen name="Resistencia" component={Resistencia} />
        <Stack.Screen name="Ampers" component={Ampers} />
        <Stack.Screen name="Potencia" component={Potencia} />
        <Stack.Screen name="Conversor" component={Conversor} />
        <Stack.Screen name="Impendancias" component={Impendancias} />
        <Stack.Screen name="Capacitancia" component={Capacitancia} />
        <Stack.Screen name="Fasoriales" component={Fasoriales} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: 'white',
  },
  columna: {
    flex: 1,
  },
  box: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    backgroundColor: '#c2410c',
  },
  box2: {
    backgroundColor: '#b91c1c',
  },
  box3: {
    backgroundColor: '#b45309',
  },
  box4: {
    backgroundColor: '#a16207',
  },
  box5: {
    backgroundColor: '#4d7c0f',
  },
  box6: {
    backgroundColor: '#15803d',
  },
  box7: {
    backgroundColor: '#047857',
  },
  box8: {
    backgroundColor: '#0f766e',
  },
  box9: {
    backgroundColor: '#0e7490',
  },
  borderBottomRightRadius: {
    borderBottomRightRadius: 15,
  },
  borderBottomLeftRadius: {
    borderBottomLeftRadius: 15,
  },
  borderTopRightRadius: {
    borderTopRightRadius: 15,
  },
  borderTopLeftRadius: {
    borderTopLeftRadius: 15,
  },
});
