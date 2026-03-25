import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <View style={{
      flex: 1,
    }}>
      <StatusBar backgroundColor={"#51672D"} barStyle='default' />
      <View style={styles.container}>
        {children}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

