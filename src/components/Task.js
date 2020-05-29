import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

export default (props) => {
  const doneOrNotStyle =
    props.doneAt != null ? { textDecorationLine: 'line-through' } : {};
  const date = props.doneAt ? props.doneAt : props.estimatedAt;
  const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

  const getRightContent = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.right}
          onPress={() => props.onDelete && props.onDelete(props.id)}
        >
          <Icon name="trash" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.right}
          onPress={() => props.onUpdate && props.onUpdate(props.id)}
        >
          <Icon name="edit" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  function getCheckView(doneAt) {
    if (doneAt != null) {
      return (
        <View style={styles.done}>
          <Icon name="check" size={20} color="#FFF"></Icon>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.pending}></Text>
        </View>
      );
    }
  }

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>

        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
          <Text style={styles.date}>
            {moment(props.estimateAt)
              .locale('pt-br')
              .format('ddd, D [de] MMMM [de] YYYY')}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 17,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 14,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  excludeText: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeIcon: {
    marginLeft: 10,
    color: '#FFF',
  },

  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
