import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TodoList from '../features/todo/TodoList';

const todoStyles = StyleSheet.create({
  view: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

const TodoScreen = () => {
  return <TodoList />;
};

export default TodoScreen;
