import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/AuthScreens/LoginScreen/LoginScreen';
import { AppStackParamList } from './appStackNavigator.types';
import { useReactiveVar } from '@apollo/client';
import { accessTokenVar } from '../services/apollo/cache';
import { MainTabNavigator } from './MainTabNavigator/MainTabNavigator';
import { HIDDEN_HEADER_SCREEN_OPTIONS } from './appStackNavigator.settings';

const NativeStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigator = () => {
  const accessToken = useReactiveVar(accessTokenVar);

  return (
    <NativeStack.Navigator>
      {accessToken ? (
        <NativeStack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={HIDDEN_HEADER_SCREEN_OPTIONS}
        />
      ) : (
        <NativeStack.Screen
          name="Login"
          component={LoginScreen}
          options={HIDDEN_HEADER_SCREEN_OPTIONS}
        />
      )}
    </NativeStack.Navigator>
  );
};
