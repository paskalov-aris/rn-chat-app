import { TextInputProps } from 'react-native-paper';

export interface ControlledTextInputProps extends TextInputProps {
  errorMessage?: string;
}
