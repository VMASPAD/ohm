/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import mobileAds, {
  BannerAd,
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
const Fasoriales = () => {
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-3093048889634559/4026025202';
  const [circuitType, setCircuitType] = useState('series');
  const [componentType, setComponentType] = useState('resistorCapacitor');
  const [resistance, setResistance] = useState('');
  const [capacitance, setCapacitance] = useState('');
  const [inductance, setInductance] = useState('');
  const [frequency, setFrequency] = useState('');
  const [resistanceAngle, setResistanceAngle] = useState('');
  const [capacitanceAngle, setCapacitanceAngle] = useState('');
  const [inductanceAngle, setInductanceAngle] = useState('');
  const [result, setResult] = useState(null);

  const calculateImpedance = () => {
    const R = parseFloat(resistance);
    const C = parseFloat(capacitance);
    const L = parseFloat(inductance);
    const f = parseFloat(frequency);
    const omega = 2 * Math.PI * f;
    const Xc = 1 / (omega * C);
    const Xl = omega * L;
    const resistanceAng = parseFloat(resistanceAngle) * (Math.PI / 180);
    const capacitanceAng = parseFloat(capacitanceAngle) * (Math.PI / 180);
    const inductanceAng = parseFloat(inductanceAngle) * (Math.PI / 180);

    let impedance, angle;

    if (componentType === 'resistorCapacitor') {
      impedance = circuitType === 'series' ? Math.sqrt(R ** 2 + Xc ** 2 - 2 * R * Xc * Math.cos(resistanceAng + capacitanceAng)) : R * Xc / Math.sqrt(R ** 2 + Xc ** 2 - 2 * R * Xc * Math.cos(resistanceAng - capacitanceAng));
      angle = circuitType === 'series' ? Math.atan(Xc / R * Math.sin(resistanceAng - capacitanceAng) / (1 - Math.cos(resistanceAng - capacitanceAng))) * (180 / Math.PI) : -Math.atan(R / Xc * Math.sin(resistanceAng - capacitanceAng) / (1 - Math.cos(resistanceAng - capacitanceAng))) * (180 / Math.PI);
    } else if (componentType === 'resistorInductor') {
      impedance = circuitType === 'series' ? Math.sqrt(R ** 2 + Xl ** 2 - 2 * R * Xl * Math.cos(resistanceAng - inductanceAng)) : R * Xl / Math.sqrt(R ** 2 + Xl ** 2 - 2 * R * Xl * Math.cos(resistanceAng + inductanceAng));
      angle = circuitType === 'series' ? Math.atan(Xl / R * Math.sin(inductanceAng - resistanceAng) / (1 - Math.cos(inductanceAng - resistanceAng))) * (180 / Math.PI) : Math.atan(R / Xl * Math.sin(inductanceAng + resistanceAng) / (1 - Math.cos(inductanceAng + resistanceAng))) * (180 / Math.PI);
    } else {
      impedance = circuitType === 'series' ? Math.sqrt((Xl - Xc) ** 2 + 2 * (Xl * Xc) * Math.cos(inductanceAng - capacitanceAng)) : (Xl * Xc) / Math.sqrt(Xl ** 2 + Xc ** 2 - 2 * Xl * Xc * Math.cos(inductanceAng - capacitanceAng));
      angle = circuitType === 'series' ? Math.atan((Xl - Xc) / R * Math.sin(inductanceAng - capacitanceAng) / (1 - Math.cos(inductanceAng - capacitanceAng))) * (180 / Math.PI) : Math.atan(R / (Xl - Xc) * Math.sin(inductanceAng - capacitanceAng) / (1 - Math.cos(inductanceAng - capacitanceAng))) * (180 / Math.PI);
    }

    setResult({ impedance, angle });
  };

  return (
    <ScrollView>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
    <View style={styles.container}>
      <Picker
        selectedValue={circuitType}
        style={styles.picker}
        onValueChange={(value) => setCircuitType(value)}
      >
        <Picker.Item label="Serie" value="series" />
        <Picker.Item label="Paralelo" value="parallel" />
      </Picker>

      <Picker
        selectedValue={componentType}
        style={styles.picker}
        onValueChange={(value) => setComponentType(value)}
      >
        <Picker.Item label="Resistencia con Capacitor" value="resistorCapacitor" />
        <Picker.Item label="Resistencia con Bobina" value="resistorInductor" />
        <Picker.Item label="Capacitor con Bobina" value="capacitorInductor" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Resistencia (Ω)"
        keyboardType="numeric"
        value={resistance}
        onChangeText={setResistance}
      />

      {componentType !== 'capacitorInductor' && (
        <TextInput
          style={styles.input}
          placeholder={componentType === 'resistorCapacitor' ? 'Capacitancia (F)' : 'Inductancia (H)'}
          keyboardType="numeric"
          value={componentType === 'resistorCapacitor' ? capacitance : inductance}
          onChangeText={componentType === 'resistorCapacitor' ? setCapacitance : setInductance}
        />
      )}

      {componentType === 'capacitorInductor' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Capacitancia (F)"
            keyboardType="numeric"
            value={capacitance}
            onChangeText={setCapacitance}
          />
          <TextInput
            style={styles.input}
            placeholder="Inductancia (H)"
            keyboardType="numeric"
            value={inductance}
            onChangeText={setInductance}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Frecuencia (Hz)"
        keyboardType="numeric"
        value={frequency}
        onChangeText={setFrequency}
      />
      <TextInput
        style={styles.input}
        placeholder="Ángulo de Resistencia (°)"
        keyboardType="numeric"
        value={resistanceAngle}
        onChangeText={setResistanceAngle}
      />

      {componentType !== 'resistorInductor' && (
        <TextInput
          style={styles.input}
          placeholder="Ángulo de Capacitancia (°)"
          keyboardType="numeric"
          value={capacitanceAngle}
          onChangeText={setCapacitanceAngle}
        />
      )}

      {componentType !== 'resistorCapacitor' && (
        <TextInput
          style={styles.input}
          placeholder="Ángulo de Inductancia (°)"
          keyboardType="numeric"
          value={inductanceAngle}
          onChangeText={setInductanceAngle}
        />
      )}
      <Button title="Calcular" onPress={calculateImpedance}  mode="outlined" >Calcular</Button>

      {result && (
        <>
          <Text style={styles.result}>Impedancia: {result.impedance.toFixed(2)} Ω</Text>
          <Text style={styles.result}>Ángulo: {result.angle.toFixed(2)}°</Text>
          <Text style={styles.result}>Ángulo de Resistencia: {resistanceAngle}°</Text>
          <Text style={styles.result}>Ángulo de Capacitancia: {capacitanceAngle}°</Text>
          <Text style={styles.result}>Ángulo de Inductancia: {inductanceAngle}°</Text>
        </>
      )}
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  result: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Fasoriales;
