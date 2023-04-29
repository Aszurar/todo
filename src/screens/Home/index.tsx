import React, { useEffect, useState } from 'react';

import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Crypto from 'expo-crypto';

import THEME from '@theme/index';

import { TodoInfo } from '@atoms/TodoInfo';
import { TodoCard, TodoCardMemo } from '@atoms/TodoCard';
import { Spacer } from '@atoms/Spacer';
import { Input } from '@atoms/Input';
import { Header } from '@atoms/Header';
import { AddButton } from '@atoms/AddButton';

import { MAX_TOTO_TITLE_LENGTH, TODO_DEFAULT, TodoProps } from '@dto/todoDTO';

const keyExtractor = (item: TodoProps) => item.id;
const ItemSeparator = () => <Spacer vertical={8} />;

export function Home() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<TodoProps[]>(
    TODO_DEFAULT as TodoProps[],
  );
  const todoListQuantity = todoList.length;
  const todoTitleCharacterQuantity = todo.length;
  const todoCheckQuantity = todoList.filter(item => item.isChecked).length;

  function handleKeyboardDeactivate() {
    Keyboard.dismiss();
  }

  function handleAddTodoList() {
    if (todo.trim() === '') {
      return;
    }
    const alreadyTodoExists = todoList.some(item => item.title === todo);
    if (alreadyTodoExists) {
      return;
    }
    const todoFormatted =
      todo.length > MAX_TOTO_TITLE_LENGTH
        ? todo.substring(0, MAX_TOTO_TITLE_LENGTH)
        : todo;

    const newTodo: TodoProps = {
      id: Crypto.randomUUID(),
      title: todoFormatted,
      isChecked: false,
    };

    setTodoList(prevState => [...prevState, newTodo]);
    setTodo('');
  }

  function handleDeleteTodo(id: string) {
    const newTodoList = todoList.filter(item => item.id !== id);
    setTodoList(newTodoList);
  }

  function handleCheckTodo(id: string) {
    const newTodoList = todoList.map(item => {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setTodoList(newTodoList);
  }

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDeactivate}>
      <View style={styles.container}>
        <Header />

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              value={todo}
              multiline={true}
              maxLength={MAX_TOTO_TITLE_LENGTH}
              autoCorrect
              autoCapitalize="sentences"
              placeholder="Adicione uma nova tarefa"
              onChangeText={setTodo}
            />
            <Spacer horizontal={4} />
            <AddButton onPress={handleAddTodoList} />
          </View>
          {todoTitleCharacterQuantity > 0 && (
            <Text style={styles.text}>
              {todoTitleCharacterQuantity}/{MAX_TOTO_TITLE_LENGTH}
            </Text>
          )}
        </View>
        <View style={styles.headerList}>
          <TodoInfo title="Criadas" value={todoListQuantity} />
          <TodoInfo title="Concluídas" color="blue" value={todoCheckQuantity} />
        </View>
        <FlatList
          data={todoList}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <TodoCard
              item={item}
              onChecked={() => handleCheckTodo(item.id)}
              onDelete={() => handleDeleteTodo(item.id)}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.contentContainerList}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
    marginTop: -32,
  },
  form: {
    flexDirection: 'row',
  },
  headerList: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },

  contentContainerList: {
    paddingTop: 4,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  text: {
    color: THEME.COLORS.GRAY_300,
    fontSize: 12,
    fontFamily: THEME.FONTS.REGULAR,
  },
});
