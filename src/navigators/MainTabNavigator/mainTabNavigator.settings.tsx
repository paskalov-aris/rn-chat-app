import Feather from '@expo/vector-icons/Feather';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export const CONTACTS_TAB_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  tabBarIcon: () => <Feather name="user" size={24} color="black" />,
};

export const HOME_TAB_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  tabBarIcon: () => <Feather name="home" size={24} color="black" />,
};

export const SETTINGS_TAB_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  tabBarIcon: () => <Feather name="settings" size={24} color="black" />,
};
