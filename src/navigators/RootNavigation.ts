import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamList } from './appStackNavigator.types';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export const getCurrentRoute = () => navigationRef.current?.getCurrentRoute();

export const getCurrentRouteName = () => getCurrentRoute()?.name;
