import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  textInputsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  textInput: {
    width: '80%',
  },
  loginButton: {
    width: '80%',
    paddingVertical: 10,
  },
  loginButtonText: {
    fontSize: 18,
  },
});
