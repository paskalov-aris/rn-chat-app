import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { secureStoreService } from '../../services/secureStore/secureStoreService';
import { EMPTY_STRING } from '../../constants/stubs';
import { accessTokenVar } from '../../services/apollo/cache';

export const HomeScreen = () => {
  const handleLogout = async () => {
    await secureStoreService.deleteSecureStoreItem('token');
    accessTokenVar(EMPTY_STRING);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome home!</Text>
      <Button onPress={handleLogout}>
        <Text>Log out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
