/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import mobileAds, {
  BannerAd,
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

export default function Conversor() {
  const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-3093048889634559/4026025202';
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedUnity, setSelectedUnity] = useState('');
  const [convertedValue, setConvertedValue] = useState('');

  const options = [
    { label: 'Ampers (A)', value: 'ampers' },
    { label: 'Voltaje (V)', value: 'volt' },
    { label: 'Ohms (Ω)', value: 'ohms' },
    { label: 'Potencia (W)', value: 'potencia' },
    { label: 'Faradios (F)', value: 'potencia' },
    { label: 'Henrios (W)', value: 'potencia' },
  ];

  const unity = [
    { label: 'Tera', value: 1e12 },
    { label: 'Giga', value: 1e9 },
    { label: 'Mega', value: 1e6 },
    { label: 'Kilo', value: 1e3 },
    { label: 'Unidad', value: 1 },
    { label: 'mili', value: 1e-3 },
    { label: 'micro', value: 1e-6 },
    { label: 'nano', value: 1e-9 },
    { label: 'pico', value: 1e-12 },
  ];

  const handleOptionChange = (itemValue) => {
    setSelectedOption(itemValue);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleUnityChange = (itemValue) => {
    setSelectedUnity(itemValue);
  };

  const convertUnity = () => {
    const baseValue = parseFloat(inputValue);
    const unityValue = parseFloat(selectedUnity);
    const convertedValue = baseValue * unityValue;
    setConvertedValue(convertedValue.toString());
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Picker selectedValue={selectedOption} onValueChange={handleOptionChange}>
        <Picker.Item label="Selecciona una opción" value="" />
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
      <TextInput
        keyboardType="numeric"
        placeholder="Ingresa un valor"
        value={inputValue}
        onChangeText={handleInputChange}
        style={{ borderWidth: 1, borderColor: 'gray', marginVertical: 8, paddingHorizontal: 8 }}
      />

      <Picker selectedValue={selectedUnity} onValueChange={handleUnityChange}>
        <Picker.Item label="Selecciona una unidad" value="" />
        {unity.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>

      <Text>Convierte tu valor a:</Text>
      <Text style={{ marginTop: 16, fontSize: 18 }}>Valor convertido: {convertedValue}</Text>

      <View style={{ marginTop: 16 }}>
        <Button title="Convertir" onPress={convertUnity} mode="contained">Convertir</Button>
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
