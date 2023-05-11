import React, { useState } from 'react';

import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Crypto from 'expo-crypto';

import { TodoInfo } from '@atoms/TodoInfo';
import { MemoizedTodoCard } from '@atoms/TodoCard';
import { Spacer } from '@atoms/Spacer';
import { Input } from '@atoms/Input';
import { Header } from '@atoms/Header';
import { AddButton } from '@atoms/AddButton';

import { MAX_TOTO_TITLE_LENGTH, TODO_DEFAULT, TodoProps } from '@dto/todoDTO';

import THEME from '@theme/index';

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
    const index = todoList.findIndex(item => item.id === id);
    if (index !== -1) {
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    }
  }

  function handleCheckTodo(id: string) {
    setTodoList(prevTodoList => {
      return prevTodoList.map(item => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
    });
  }

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
            <MemoizedTodoCard
              item={item}
              onChecked={() => handleCheckTodo(item.id)}
              onDelete={() => handleDeleteTodo(item.id)}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.contentContainerList}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => console.log('refresh')}
              colors={['red', 'green', 'blue']}
            />
          }
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
