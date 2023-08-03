import { TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './loginScreen.styles';
import { LoginFieldNames, LoginFormData } from './loginScreen.types';
import { Button, Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './loginScreen.settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ControlledTextInput } from '../../../components/ControlledTextInput/ControlledTextInput';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { secureStoreService } from '../../../services/secureStore/secureStoreService';
import { LOGIN } from '../../../services/apollo/mutations/login/authService.mutation';
import { accessTokenVar } from '../../../services/apollo/cache';

// NOTE: show backend errors under input fields

export const LoginScreen = () => {
  const [login, { data }] = useMutation(LOGIN);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: 'aris.paskalov',
      password: 'testpass',
    },
  });

  const passwordInputRef: RefObject<TextInput> = useRef(null);

  const handleEmailSubmitEditing = useCallback(() => {
    passwordInputRef.current?.focus();
  }, [passwordInputRef]);

  const handleSuccessfulSubmit = async () => {
    const { username, password } = getValues();

    try {
      await login({
        variables: {
          input: {
            username,
            password,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const setAccessTokenToSecureStorage = useCallback(async () => {
    const access_token = data.login.access_token;

    if (access_token) {
      await secureStoreService.setSecureStoreItem('token', access_token);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setAccessTokenToSecureStorage();
      accessTokenVar(data.login.access_token);
    }
  }, [data, setAccessTokenToSecureStorage]);

  const handleLoginButtonPress = () => {
    handleSubmit(handleSuccessfulSubmit)();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textInputsContainer}>
        <Controller
          name="username"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ControlledTextInput
              value={value}
              autoCorrect={false}
              autoComplete="off"
              onChangeText={onChange}
              onSubmitEditing={handleEmailSubmitEditing}
              label="Username"
              errorMessage={errors?.[LoginFieldNames.username]?.message}
              autoCapitalize="none"
              style={styles.textInput}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ControlledTextInput
              ref={passwordInputRef}
              autoCorrect={false}
              autoComplete="off"
              value={value}
              onChangeText={onChange}
              label="Password"
              errorMessage={errors?.[LoginFieldNames.password]?.message}
              secureTextEntry
              style={styles.textInput}
            />
          )}
        />
      </View>
      <Button
        mode="contained-tonal"
        onPress={handleLoginButtonPress}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </Button>
    </SafeAreaView>
  );
};
