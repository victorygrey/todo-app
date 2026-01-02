import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      {
        text,
        done: false,
        id: Date.now().toString(),
      },
    ]);
    setText("");
    Toast.show({ type: "success", text1: "Berhasil", text2: "Todo ditambahkan" });
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
    Toast.show({ type: "success", text1: "Sip", text2: "Status berhasil diubah" });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    Toast.show({ type: "info", text1: "Terhapus", text2: "Todo telah dihapus" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Todo List</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Tambah todo..."
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Tambah</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.todoRow}>
              <TouchableOpacity
                onPress={() => toggleDone(item.id)}
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <MaterialIcons
                  name={item.done ? "check-circle" : "panorama-fish-eye"}
                  size={24}
                  color={item.done ? "#2ecc71" : "#ccc"}
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={[
                    styles.todoText,
                    item.done && styles.done,
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => deleteTodo(item.id)}
              >
                <Text style={styles.buttonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3498db",
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: "#ecf0f1",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    borderRadius: 25,
    padding: 10,
    backgroundColor: "#f5f6fa",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  buttonDelete: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: "center",
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  todoText: {
    fontSize: 18,
    flex: 1,
  },
  done: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
});