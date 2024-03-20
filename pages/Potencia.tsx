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

export default function Potencia() {
  const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-3093048889634559/4026025202';
  const [resistencia, setResistencia] = useState('');
  const [ampers, setAmpers] = useState('');
  const [tension, setTension] = useState('');
  const [resultado, setResultado] = useState(0);

  function CalcTension() {
    const Resistencia = parseFloat(resistencia);
    const Ampers = parseFloat(ampers);
    const Tension = parseFloat(tension);

    if (isNaN(Resistencia)) {
      const form1 = Tension * Ampers;
      return form1 + 'W';
    } else if (isNaN(Tension)) {
      const form2 = (Ampers ** 2) * Resistencia;
      return form2 + 'W';
    } else if (isNaN(Ampers)) {
      const form3 = (Tension ** 2) / Resistencia;
      return form3 + 'W';
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
      <Text>Resistencia (Ω)</Text>
      <TextInput onChangeText={(texto) => setResistencia(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="green"/>
      <Text>Ampers (A)</Text>
      <TextInput onChangeText={(texto) => setAmpers(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="green"/>
      <Text>Tensión (V)</Text>
      <TextInput onChangeText={(texto) => setTension(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="green"/>
      <Button icon="delta" mode="contained" onPress={handleCalcular} style={styles.buttons}>
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
    backgroundColor: '#bef264',
  },
  buttons:{
    backgroundColor: '#3f6212',
  },
  result:{
    fontFamily:'Montserrat-Black',
    fontSize: 20,
  },
});
