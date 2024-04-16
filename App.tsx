import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Api from './src/services/api'

export default function App() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");

  async function buscarCep() {
    if (cep == "") {
      Alert.alert("Digite o CEP")
      setCep("")
    }

    try {
      const response = await Api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro)
      setBairro(response.data.bairro)
      setLocalidade(response.data.localidade)
      setUf(response.data.uf)
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar CEP");
      setLogradouro("")
      setBairro("")
      setLocalidade("")
      setUf("")
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de CEP</Text>
      </View>

      <View style={styles.containerCep}>
        <TextInput
          style={{
            borderColor: "black", borderWidth: 2, padding: 10,
            width: 200, fontSize: 20, marginTop: 30, marginEnd: 20, borderRadius: 10
          }}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder='Cep'
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
          <Text style={styles.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>

      </View>

      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder='Logradouro'
      />

      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder='Bairro'
      />

      <TextInput
        style={styles.caixaTexto}
        value={localidade}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder='Cidade'
      />

      <TextInput
        style={{
          borderColor: "black", borderWidth: 2, padding: 10, marginHorizontal: 20,
          width: 120, fontSize: 20, marginTop: 10, marginEnd: 20, borderRadius: 10
        }}
        value={uf}
        onChangeText={(texto) => setUf(texto)}
        placeholder='Estado'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'center',
  },
  containerCep: {
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 20,
  },
  botaoBuscar: {
    backgroundColor: 'black',
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20,
  },
  textoBotaoBuscar: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  caixaTexto: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  }

});
