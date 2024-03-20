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

export default function Capacitancia() {
  const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-3093048889634559/4026025202';
  const [resistencia, setResistencia] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [capacitancia, setCapacitancia] = useState('');
  const [resultado, setResultado] = useState(null);
  function CalcTension() {
    const Resistencia = parseFloat(resistencia);
    const Frecuencia = parseFloat(frecuencia);
    const Capacitancia = parseFloat(capacitancia);

    if (isNaN(Resistencia)) {
      console.log('ampers,Potencia 1');
      const form1 = 1 / (2 * Math.PI * Frecuencia * Capacitancia);
      const anguloRad = Math.atan(-1 / form1);
      const anguloGrade = (anguloRad * 180) / Math.PI;
      return JSON.stringify({
        form: form1.toFixed(5) + 'Ω',
        rad: anguloRad.toFixed(5) + 'rad',
        grade: anguloGrade.toFixed(5) + '°',
      });
    } else if (isNaN(Frecuencia)) {
      console.log('Resistencia,Potencia 2');
      const form2 = 1 / (2 * Math.PI * Resistencia * Capacitancia);
      const anguloRad = Math.atan(-1 / Resistencia);
      const anguloGrade = (anguloRad * 180) / Math.PI;
      return JSON.stringify({
        form: form2.toFixed(5) + 'Hz',
        rad: anguloRad.toFixed(5) + 'rad',
        grade: anguloGrade.toFixed(5) + '°',
      });
    } else if (isNaN(Capacitancia)) {
      console.log('ampers,Resistencia 3');
      const form3 = 1 / (2 * Math.PI * Frecuencia * Resistencia);
      const anguloRad = Math.atan(-1 / Resistencia);
      const anguloGrade = (anguloRad * 180) / Math.PI;
      return JSON.stringify({
        form: form3.toFixed(5) + 'F',
        rad: anguloRad.toFixed(5) + 'rad',
        grade: anguloGrade.toFixed(5) + '°',
      });
    } else {
      console.log('no hay valores');
    }
    console.log(CalcTension());
  }
  return (
    <View style={styles.container}>
      <Text>Resistencia (Xc)</Text>
      <TextInput onChangeText={(texto) => setResistencia(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="#0e7490"/>
      <Text>Frecuencia (Hz)</Text>
      <TextInput onChangeText={(texto) => setFrecuencia(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="#0e7490"/>
      <Text>Capacitancia (F)</Text>
      <TextInput onChangeText={(texto) => setCapacitancia(texto)} keyboardType="numeric" style={styles.input} activeUnderlineColor="#0e7490"/>
      <Button
  icon="beta"
  mode="contained"
  onPress={() => setResultado(JSON.parse(CalcTension()))}
  style={styles.buttons}
>
  Calcular
</Button>
<View style={styles.center}>
  <BannerAd
    unitId={adUnitId}
    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
  />
  {resultado && (
    <>
      <Text style={styles.result}>Resultado: {resultado.form}</Text>
      <Text style={styles.result}>Ángulo Rad: {resultado.rad}</Text>
      <Text style={styles.result}>Ángulo Grados: {resultado.grade}</Text>
    </>
  )}
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
    backgroundColor: '#cffafe',
  },
  buttons:{
    backgroundColor: '#0e7490',
  },
  result:{
    fontFamily:'Montserrat-Black',
    fontSize: 15,
  },
});
