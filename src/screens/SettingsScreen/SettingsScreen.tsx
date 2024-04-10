import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { MainTabScreenProps } from '../../navigators/MainTabNavigator/mainTabNavigator.types';
import { FC } from 'react';
import { logOut } from '../../helpers/authentication';

export const SettingsScreen: FC<MainTabScreenProps<'Settings'>> = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.text}>Hello!</Text>
      <Button mode="contained-tonal" onPress={logOut}>
        <Text>Log out</Text>
      </Button>
    </View>
  </SafeAreaView>
);

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
