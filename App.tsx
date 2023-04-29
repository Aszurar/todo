import React from 'react';
import 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StatusBar, StyleSheet } from 'react-native';

import THEME from '@theme/index';
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';

import { Home } from '@screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={THEME.COLORS.PURPLE}
      />
      {fontsLoaded ? (
        <Home />
      ) : (
        <ActivityIndicator size="large" color={THEME.COLORS.PURPLE} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GRAY_600,
  },
});
