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
  const [potencia, setPotencia] = useState('');
  const [tension, setTension] = useState('');
  const [resultado, setResultado] = useState(0);

  function CalcTension() {
    const Resistencia = parseFloat(resistencia);
    const Potencia = parseFloat(potencia);
    const Tension = parseFloat(tension);

    if (isNaN(Potencia)) {
      const form1 = Tension / Resistencia;
      return form1 + 'A';
    } else if (isNaN(Resistencia)) {
      const form2 = Potencia / Tension;
      return form2 + 'A';
    } else if (isNaN(Tension)) {
      const form3 = Math.sqrt((Potencia / Resistencia));
      return form3 + 'A';
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
      <TextInput onChangeText={(texto) => setResistencia(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="yellow"/>
      <Text>Potencia (W)</Text>
      <TextInput onChangeText={(texto) => setPotencia(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="yellow"/>
      <Text>Tensión (V)</Text>
      <TextInput onChangeText={(texto) => setTension(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="yellow"/>
      <Button icon="alpha" mode="contained" onPress={handleCalcular} style={styles.buttons}>
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
    backgroundColor: '#fef08a',
  },
  buttons:{
    backgroundColor: '#a16207',
  },
  result:{
    fontFamily:'Montserrat-Black',
    fontSize: 20,
  },
});
