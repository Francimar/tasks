import React, { Component } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

import moment from 'moment';
import commonStyle from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

const initialState = { desc: '', date: new Date(), ShowDatePicker: false };

export default class EditTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    ...initialState,
  };

  edit = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    };

    this.props.onEdit && this.props.onEdit(newTask, this.props.id);
    this.setState({ ...initialState });
  };

  formatDate = (date) => {
    return moment(date).format('ddd, D [de] MMM [de] YYYY');
  };

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({ date, ShowDatePicker: false })}
        mode="date"
      />
    );

    const dateString = moment(this.state.date).format(
      'ddd, D [de] MMM [de] YYYY'
    );

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({ ShowDatePicker: true })}
          >
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.ShowDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <Text style={styles.header}>Editar Tarefa</Text>
          <View style={styles.oldDate}>
            <Text style={{ fontWeight: 'bold' }}>Dados Antigos</Text>
            <Text>Descrção: {this.props.desc}</Text>
            <Text>Data: {this.formatDate(this.props.date)}</Text>
          </View>
          <TextInput
            style={styles.input}
            //placeholder="Informe a Descrição ... "
            onChangeText={(desc) => this.setState({ desc })}
            value={this.state.desc}
          />
          <View style={{ marginLeft: 17, marginTop: 10 }}>
            {this.getDatePicker()}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.edit}>
              <Text style={styles.button}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: commonStyle.fontFamily,
    backgroundColor: commonStyle.colors.today,
    color: commonStyle.colors.secundary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyle.colors.today,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    fontFamily: commonStyle.fontFamily,
    height: 40,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  date: {
    fontFamily: commonStyle.fontFamily,
    fontSize: 20,
    marginLeft: 5,
  },
  oldDate: {
    margin: 10,
    marginLeft: 15,
  },
});
