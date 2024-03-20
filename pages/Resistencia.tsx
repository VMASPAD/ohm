/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import React, { useState } from 'react';

import mobileAds, {
  BannerAd,
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

export default function Resistencia() {
  const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-3093048889634559/4026025202';
  const [potencia, setPotencia] = useState('');
  const [ampers, setAmpers] = useState('');
  const [tension, setTension] = useState('');
  const [resultado, setResultado] = useState(0);

  function CalcTension() {
    const Potencia = parseFloat(potencia);
    const Ampers = parseFloat(ampers);
    const Tension = parseFloat(tension);

    if (isNaN(Tension)) {
      console.log('ampers,Potencia 1');
      const form1 = Potencia / (Ampers ** 2);
      return form1 + 'Ω';
    } else if (isNaN(Ampers)) {
      console.log('Resistencia,Potencia 2');
      const form2 = (Tension ** 2) / Potencia;
      return form2 + 'Ω';
    } else if (isNaN(Potencia)) {
      console.log('ampers,Resistencia 3');
      const form3 = Tension / Ampers;
      return form3 + 'Ω';
    } else {
      console.log('no hay valores');
    }
  }
  const handleCalcular = () => {
    const result = CalcTension();
    setResultado(result);
  };

  return (
    <View style={styles.container}>
      <Text>Potencia (W)</Text>
      <TextInput onChangeText={(texto) => setPotencia(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="red"/>
      <Text>Ampers (A)</Text>
      <TextInput onChangeText={(texto) => setAmpers(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="red"/>
      <Text>Tensión (V)</Text>
      <TextInput onChangeText={(texto) => setTension(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="red"/>
      <Button icon="beta" mode="contained" onPress={handleCalcular} style={styles.buttons}>
        Calcular
      </Button>
      <View style={styles.center}>
        <Text style={styles.result}>{resultado}</Text>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 100,
    gap: 10,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  input:{
    backgroundColor: '#fecaca',
  },
  buttons:{
    backgroundColor: '#ef4444',
  },
  result:{
    fontFamily:'Montserrat-Black',
    fontSize: 20,
  },
});
