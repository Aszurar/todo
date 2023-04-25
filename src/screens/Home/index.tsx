import React from 'react';

import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Spacer } from '@atoms/Spacer';
import { Input } from '@atoms/Input';
import { Header } from '@atoms/Header';
import { AddButton } from '@atoms/AddButton';

export function Home() {
  function handleKeyboardDeactivate() {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDeactivate}>
      <View>
        <Header />

        <View style={styles.form}>
          <Input
            autoCorrect
            autoCapitalize="sentences"
            placeholder="Adicione uma nova tarefa"
          />
          <Spacer horizontal={4} />
          <AddButton />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -32,
  },
});
