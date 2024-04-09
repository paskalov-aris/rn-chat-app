import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/AuthScreens/LoginScreen/LoginScreen';
import { AppStackParamList } from './appStackNavigator.types';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { LOGIN_SCREEN_OPTIONS } from './appStackNavigator.settings';
import { useReactiveVar } from '@apollo/client';
import { accessTokenVar } from '../services/apollo/cache';

const NativeStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigator = () => {
  // TODO: check user authorization in a request middleware
  const accessToken = useReactiveVar(accessTokenVar);

  return (
    <NativeStack.Navigator>
      {accessToken ? (
        <NativeStack.Screen name="Home" component={HomeScreen} />
      ) : (
        <NativeStack.Screen
          name="Login"
          component={LoginScreen}
          options={LOGIN_SCREEN_OPTIONS}
        />
      )}
    </NativeStack.Navigator>
  );
};
