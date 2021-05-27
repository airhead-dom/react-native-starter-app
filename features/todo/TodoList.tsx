import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
  View,
} from 'react-native';
import {CommonComponentProps} from '../../types';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchTodoLists} from './reducer';
import AddTodoButton from './AddTodo';
import TodoItem from './components/TodoItem';

type TodoListProps = CommonComponentProps & {};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  list: {
    paddingBottom: 60,
  },
  loader: {
    marginVertical: 10,
  },
  buttonWrapperView: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

const TodoList: React.FC<TodoListProps> = ({style = {}}) => {
  const todoState = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, []);

  const _renderItem: ListRenderItem<any> = ({item}) => {
    return <TodoItem title={item.title} isCompleted={item.completed} />;
  };

  return (
    <View style={styles.view}>
      {todoState.isLoading && (
        <ActivityIndicator style={styles.loader} size="large" color="#ffc300" />
      )}

      {!todoState.isLoading && (
        <>
          <FlatList
            style={[styles.list, style]}
            data={todoState.list}
            renderItem={_renderItem}
          />

          <View style={styles.buttonWrapperView}>
            <AddTodoButton />
          </View>
        </>
      )}
    </View>
  );
};

export default TodoList;
