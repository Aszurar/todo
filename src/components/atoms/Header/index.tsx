import React from 'react';

import { Dimensions, Image, StyleSheet, View } from 'react-native';

import THEME from '@theme/index';

import LogoPNG from '@images/Logo.png';

export function Header() {
  return (
    <View style={styles.container}>
      <Image source={LogoPNG} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.21,
    width: '100%',
    backgroundColor: THEME.COLORS.GRAY_800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 32,
    width: 110,
  },
});
