import React, {useState} from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAppDispatch} from '../hooks';
import {postTodoList} from './reducer';

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffd166',
    borderColor: '#ffd166',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredHorizontal: {
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalBody: {
    width: '75%',
    borderRadius: 8,
    backgroundColor: '#fff',
    minHeight: 50,
    padding: 15,
    paddingBottom: 30,
  },
  closeModal: {
    position: 'absolute',
    right: 5,
    top: 4,
    padding: 10,
  },
  closeModaltext: {
    fontSize: 14,
    fontWeight: '700',
  },
  inputGroup: {
    marginTop: 30,
  },
  textInput: {
    padding: 2,
    borderBottomWidth: 1,
  },
  postButton: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#ffd166',
  },
  postButtonText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: '#fff',
  },
});

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

  const onPress = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    console.log('Closing modal!');

    setModalVisible(false);
  };

  const onSubmit = () => {
    dispatch(postTodoList({description: text}));
  };

  return (
    <>
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View style={styles.modalContent}>
          <View style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text>Description</Text>
              <TextInput style={styles.textInput} onChangeText={setText} />
              <View style={[styles.centeredHorizontal]}>
                <Pressable style={[styles.postButton]} onPress={onSubmit}>
                  <Text style={[styles.postButtonText]}>Post!</Text>
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.closeModal} onPress={onCloseModal}>
              <Text style={styles.closeModaltext}>x</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableWithoutFeedback style={styles.touchable} onPress={onPress}>
        <Text style={styles.text}>Add Todo</Text>
      </TouchableWithoutFeedback>
    </>
  );
};

export default AddTodo;
