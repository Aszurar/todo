import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import THEME from '@theme/index';

import { Spacer } from '@atoms/Spacer';

type TodoInfoProps = {
  color?: 'blue' | 'purple';
  title: string;
  value: number;
};

export function TodoInfo({ color = 'purple', title, value }: TodoInfoProps) {
  const textColor =
    color === 'blue'
      ? { color: THEME.COLORS.BLUE }
      : { color: THEME.COLORS.PURPLE };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textColor]}>{title}</Text>
      <Spacer horizontal={8} />
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: THEME.FONTS.BOLD,
  },
  valueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 100,

    backgroundColor: THEME.COLORS.GRAY_400,
  },
  value: {
    fontSize: 12,
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONTS.BOLD,
  },
});
