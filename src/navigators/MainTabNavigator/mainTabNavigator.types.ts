import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  AppStackParamList,
  RootStackScreenProps,
} from '../appStackNavigator.types';

export type MainTabParamList = {
  Contacts: undefined;
  Home: undefined;
  Settings: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof AppStackParamList>
  >;
