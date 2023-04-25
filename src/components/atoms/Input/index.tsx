import React, { useState } from 'react';

import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import THEME from '@theme/index';

export function Input({ ...rest }: TextInputProps) {
  const [activated, setActivated] = useState(false);

  function handleActivated() {
    setActivated(true);
  }
  function handleDeactivated() {
    setActivated(false);
  }

  const activatedStyle = {
    borderColor: THEME.COLORS.PURPLE,
    borderWidth: 1,
  };
  const deactivatedStyle = {
    borderWidth: 0,
  };

  const additionalStyle = activated ? activatedStyle : deactivatedStyle;

  return (
    <TextInput
      style={[styles.input, additionalStyle]}
      onFocus={handleActivated}
      onBlur={handleDeactivated}
      placeholderTextColor={THEME.COLORS.GRAY_300}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 54,
    padding: 16,
    borderRadius: 6,
    fontSize: 16,
    fontFamily: THEME.FONTS.REGULAR,
    color: THEME.COLORS.GRAY_100,
    backgroundColor: THEME.COLORS.GRAY_500,
  },
});
