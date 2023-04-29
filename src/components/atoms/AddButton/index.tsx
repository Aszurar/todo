import React from 'react';

import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import THEME from '@theme/index';

import PLUSSVG from '@icons/plus.svg';

type AddButtonProps = {
  onPress: () => void;
};

export function AddButton({ onPress }: AddButtonProps) {
  return (
    <GestureHandlerRootView>
      <RectButton style={styles.container} onPress={onPress}>
        <PLUSSVG height={16} width={16} />
      </RectButton>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    width: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.PURPLE,
  },
});
