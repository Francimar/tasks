import React, { Component } from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

export default class Auth extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: true,
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.sutTitle}>
            {this.state.stageNew ? 'Crie a sua Conta' : 'Informe Login/Senha'}
          </Text>
          {this.state.stageNew && (
            <TextInput
              placeholder="Nome"
              value={this.state.name}
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
            />
          )}

          <TextInput
            placeholder="E-mail"
            value={this.state.email}
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder="Senha"
            value={this.state.password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
          {this.state.stageNew && (
            <TextInput
              placeholder="Confirmação de Senha"
              value={this.state.confirmPassword}
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(confirmPassword) =>
                this.setState({ confirmPassword })
              }
            />
          )}
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Cadastrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    fontSize: 70,
    marginBottom: 10,
  },
  sutTitle: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
    padding: 10,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
});
