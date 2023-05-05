import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/AuthScreens/LoginScreen/LoginScreen';
import { AppStackParamList } from './appStackNavigator.types';

const NativeStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigator = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="Login" component={LoginScreen} />
    </NativeStack.Navigator>
  );
};
