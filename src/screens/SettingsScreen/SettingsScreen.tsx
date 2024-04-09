import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { accessTokenVar } from '../../services/apollo/cache';
import { Button } from 'react-native-paper';
import { MainTabScreenProps } from '../../navigators/MainTabNavigator/mainTabNavigator.types';
import { FC } from 'react';
import { apolloClient } from '../../services/apollo/apolloService';
import { EMPTY_STRING } from '../../constants/stubs';

export const SettingsScreen: FC<MainTabScreenProps<'Settings'>> = () => {
  const handleLogOutButtonPress = () => {
    accessTokenVar(EMPTY_STRING);
    apolloClient.resetStore();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Hello!</Text>
        <Button mode="contained-tonal" onPress={handleLogOutButtonPress}>
          <Text>Log out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
