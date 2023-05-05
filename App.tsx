import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppStackNavigator } from './src/navigators/AppStackNavigator/AppStackNavigator';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
