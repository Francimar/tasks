import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import commonStyles from '../commonStyles.js';
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';
import Task from '../components/Task';
import AddTask from './AddTasks';
import EditTask from './EditTask';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  showEditTask: false,
  visibleTasks: [],
  tasks: [],
  id: null,
  desc: 'aqui',
  date: null,
};

export default class TaskList extends Component {
  state = {
    ...initialState,
  };

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState');
    const state = JSON.parse(stateString) || initialState;
    this.setState(state, this.filterTasks);
  };

  toggleTask = (taskId) => {
    const tasks = [...this.state.tasks];
    tasks.forEach((task) => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    this.setState({ tasks }, this.filterTasks);
  };

  togleFilter = () => {
    this.setState(
      { showDoneTasks: !this.state.showDoneTasks },
      this.filterTasks
    );
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = (task) => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }
    this.setState({ visibleTasks });
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state));
  };

  addTask = (newTask) => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada');
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimatedAt: newTask.date,
      doneAt: null,
    });

    this.setState({ tasks, showAddTask: false }, this.filterTasks);
  };

  deleteTask = (id) => {
    const tasks = this.state.tasks.filter((task) => task.id != id);
    this.setState({ tasks }, this.filterTasks);
  };

  update = (id) => {
    const taskEditable = this.state.tasks.find((task) => task.id === id);
    this.setState({
      id: taskEditable.id,
      desc: taskEditable.desc,
      date: taskEditable.estimatedAt,
      showEditTask: true,
    });
  };

  editTask = (taskEdit, id) => {
    const tasks = this.state.tasks.filter((task) => task.id != id);
    tasks.push({
      id: Math.random(),
      desc: taskEdit.desc,
      estimatedAt: taskEdit.date,
      doneAt: null,
    });

    this.setState({ tasks, showEditTask: false }, this.filterTasks);
  };

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask}
        />
        <EditTask
          isVisible={this.state.showEditTask}
          onCancel={() => this.setState({ showEditTask: false })}
          onUpdate={this.update}
          onEdit={this.editTask}
          desc={this.state.desc}
          date={this.state.date}
          id={this.state.id}
        />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.togleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secundary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>

        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <Task
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
                onUpdate={this.update}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.setState({ showAddTask: true })}
        >
          <Icon name="plus" size={20} color={commonStyles.colors.secundary} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
