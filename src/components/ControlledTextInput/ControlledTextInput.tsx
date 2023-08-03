import { forwardRef } from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import { ControlledTextInputProps } from './ControlledTextInput.types';

export const ControlledTextInput = forwardRef(function ControlledTextInput(
  { errorMessage, ...rest }: ControlledTextInputProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any, // TODO: types for ref
) {
  const hasError = !!errorMessage;

  return (
    <>
      <TextInput ref={ref} {...rest} error={hasError} />
      <HelperText type="error" visible={hasError}>
        {errorMessage}
      </HelperText>
    </>
  );
});
