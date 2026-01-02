import React, { useState } from "react";
// import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, _View } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, {
      text,
      done:false,
      id:Date.now().toString()
    }]);
    setText('');
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {
          ...todo,
          done: !todo.done
        } :todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(
      todos.filter(
        todo => todo.id !== id
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Tambah todo..."
          onChangeText={setText}
        />
        <Button title="Tambah" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity onPress={() => toggleDone(item.id)} style={{ flex:1 }}>
              <Text style={[styles.todoText, item.done && styles.done]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="Hapus" color="red" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    borderRadius: 4,
    padding: 8
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  todoText: {
    fontSize: 16
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#aaa'
  }
});
