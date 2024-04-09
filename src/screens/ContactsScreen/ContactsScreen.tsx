import { FC } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export const ContactsScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Contacts Screen</Text>
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
});
