import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CommonComponentProps} from '../../../types';

type TodoItemProps = CommonComponentProps & {
  title: string;
  isCompleted: boolean;
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
  },
  title: {
    textTransform: 'uppercase',
  },
  completedStatus: {
    fontSize: 12,
  },
  completed: {
    color: '#4895ef',
  },
  notCompleted: {
    color: '#e85d04',
  },
});

const TodoItem: React.FC<TodoItemProps> = ({
  style = {},
  title,
  isCompleted,
}) => {
  return (
    <View style={[styles.view, style]}>
      <Text style={styles.title}>{title}</Text>

      {isCompleted ? (
        <Text style={[styles.completedStatus, styles.completed]}>Finished</Text>
      ) : (
        <Text style={[styles.completedStatus, styles.notCompleted]}>
          Not Finished
        </Text>
      )}
    </View>
  );
};

export default TodoItem;
