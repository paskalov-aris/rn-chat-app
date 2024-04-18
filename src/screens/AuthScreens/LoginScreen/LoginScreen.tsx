import { TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './loginScreen.styles';
import { LoginFieldNames, LoginFormData, User } from './loginScreen.types';
import { Button, Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './loginScreen.settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ControlledTextInput } from '../../../components/ControlledTextInput/ControlledTextInput';
import { RefObject, useCallback, useRef } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { LOGIN } from '../../../services/apollo/mutations/login/authService.mutation';
import { isUserLoggedInVar } from '../../../services/apollo/cache';
import { CURRENT_USER } from '../../../services/apollo/queries/user/user.query';
import { setAuthTokensToSecureStorage } from '../../../helpers/auth/auth';

// NOTE: show backend errors under input fields

export const LoginScreen = () => {
  const apolloClient = useApolloClient();

  const [login] = useMutation(LOGIN);

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

  const setCurrentUserToCache = (user: User) => {
    apolloClient.writeQuery({
      query: CURRENT_USER,
      data: {
        currentUser: {
          __typename: 'User',
          id: user.id,
          username: user.username,
        },
      },
    });
  };

  const handleSuccessfulSubmit = async () => {
    const { username, password } = getValues();

    try {
      const response = await login({
        variables: {
          input: {
            username,
            password,
          },
        },
      });

      const { user, accessToken, refreshToken } = response.data.login;

      setCurrentUserToCache(user);
      setAuthTokensToSecureStorage({
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
      isUserLoggedInVar(true);
    } catch (e) {
      console.error(e);
    }
  };

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
