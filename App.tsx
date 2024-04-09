import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppStackNavigator } from './src/navigators/AppStackNavigator';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './src/services/apollo/apolloService';
import { useApolloClientDevTools } from '@dev-plugins/apollo-client';

export default function App() {
  useApolloClientDevTools(apolloClient);

  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NavigationContainer>
            <AppStackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  );
}
