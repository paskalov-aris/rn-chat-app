import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { MainTabScreenProps } from '../../navigators/MainTabNavigator/mainTabNavigator.types';
import { FC } from 'react';
import { logOut } from '../../helpers/auth/auth';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../../services/apollo/queries/user/user.query';

export const SettingsScreen: FC<MainTabScreenProps<'Settings'>> = () => {
  const { data } = useQuery(CURRENT_USER);

  const userName = data?.currentUser?.username || 'user';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Hello, {userName}</Text>
        <Button mode="contained-tonal" onPress={logOut}>
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
