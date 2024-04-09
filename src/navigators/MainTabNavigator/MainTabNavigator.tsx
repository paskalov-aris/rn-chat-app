import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './mainTabNavigator.types';
import { HomeScreen } from '../../screens/HomeScreen/HomeScreen';
import { SettingsScreen } from '../../screens/SettingsScreen/SettingsScreen';
import {
  CONTACTS_TAB_SCREEN_OPTIONS,
  HOME_TAB_SCREEN_OPTIONS,
  SETTINGS_TAB_SCREEN_OPTIONS,
} from './mainTabNavigator.settings';
import { ContactsScreen } from '../../screens/ContactsScreen/ContactsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={CONTACTS_TAB_SCREEN_OPTIONS}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={HOME_TAB_SCREEN_OPTIONS}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={SETTINGS_TAB_SCREEN_OPTIONS}
      />
    </Tab.Navigator>
  );
};
