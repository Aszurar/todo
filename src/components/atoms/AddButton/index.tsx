import React, { useState } from 'react';

import { Pressable, StyleSheet } from 'react-native';

import THEME from '@theme/index';

import PLUSSVG from '@icons/plus.svg';

export function AddButton() {
  const [activated, setActivated] = useState(false);

  function handleActivated() {
    setActivated(true);
  }
  function handleDeactivated() {
    setActivated(false);
  }

  const activatedStyle = {
    backgroundColor: THEME.COLORS.PURPLE,
  };
  const deactivatedStyle = {
    backgroundColor: THEME.COLORS.PURPLE_DARK,
  };

  const additionalStyle = activated ? activatedStyle : deactivatedStyle;

  return (
    <Pressable
      style={[styles.container, additionalStyle]}
      onPressIn={handleActivated}
      onPressOut={handleDeactivated}>
      <PLUSSVG height={16} width={16} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    width: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
