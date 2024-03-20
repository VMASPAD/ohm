/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import React, {useState} from 'react';

import mobileAds, {
  BannerAd,
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
export default function Tension() {
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-3093048889634559/4026025202';
  const [potencia, setPotencia] = useState('');
  const [ampers, setAmpers] = useState('');
  const [resistencia, setResistencia] = useState('');
  const [resultado, setResultado] = useState(0);

  function CalcTension() {
    const Potencia = parseFloat(potencia);
    const Ampers = parseFloat(ampers);
    const Resistencia = parseFloat(resistencia);

    if (isNaN(Resistencia)) {
      console.log('ampers,Potencia 1');
      const form1 = Potencia / Ampers;
      return form1 + 'V';
    } else if (isNaN(Ampers)) {
      console.log('Resistencia,Potencia 2');
      const form2 = Math.sqrt(Potencia * Resistencia);
      return form2 + 'V';
    } else if (isNaN(Potencia)) {
      console.log('ampers,Resistencia 3');
      const form3 = Resistencia * Ampers;
      return form3 + 'V';
    } else {
      console.log('no hay valores');
      return "0"
    }
  }
  const handleCalcular = () => {
    const result = CalcTension();
    setResultado(result);
  };

  return (
    <View style={styles.container}>
      <Text>Potencia (W)</Text>
      <TextInput
        onChangeText={texto => setPotencia(texto)}
        keyboardType="numeric"
        style={styles.input}
        activeUnderlineColor="blue"
      />
      <Text>Ampers (A)</Text>
      <TextInput
        onChangeText={texto => setAmpers(texto)}
        keyboardType="numeric"
        style={styles.input}
        activeUnderlineColor="blue"
      />
      <Text>Resistencia Ω</Text>
      <TextInput
        onChangeText={texto => setResistencia(texto)}
        keyboardType="numeric"
        style={styles.input}
        activeUnderlineColor="blue"
      />
      <Button
        icon="alpha"
        mode="contained"
        onPress={handleCalcular}
        style={styles.buttons}>
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
  input: {
    backgroundColor: '#dbeafe',
  },
  buttons: {
    backgroundColor: '#2563eb',
  },
  result: {
    fontFamily: 'Montserrat-Black',
    fontSize: 20,
  },
});
