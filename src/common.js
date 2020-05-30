import { Alert, Platform } from 'react-native';

const server =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.1.15:3000';

function showError(err) {
  if (err.response && err.response.data) {
    Alert.alert('Ops! Error!', `Mensagem: ${err.response.data}`);
  } else {
    Alert.alert('Ops! Error!', `Mensagem: ${err}`);
  }
}

function showSuccess(msg) {
  Alert.alert('Sucesso!', msg);
}

export { server, showError, showSuccess };
