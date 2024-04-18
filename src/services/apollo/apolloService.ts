import { Alert } from 'react-native';
import { ApolloClient, ApolloLink, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';
import { NetworkError } from '@apollo/client/errors';
import { getCurrentRouteName } from '../../navigators/RootNavigation';
import { REFRESH_ACCESS_TOKEN } from './mutations/login/authService.mutation';
import { ErrorCodes, ErrorMessages } from '../../constants/errors';
import { CURRENT_USER } from './queries/user/user.query';
import { logOut } from '../../helpers/auth/auth';
import { secureStoreService } from '../secureStore/secureStoreService';

// TODO: move the GRAPHQL_API_URL to .env file
const GRAPHQL_API_URL = 'http://localhost:3000/graphql';

// TODO: maybe there is a better way to pass the tokens between Apollo Links
let accessToken: string | null | undefined = undefined;
let refreshToken: string | null | undefined = undefined;

const handleAuthenticationError = async () => {
  await logOut();
  Alert.alert(
    '',
    "You've been logged out of your account. Please login to resume full functionality.",
  );
};

const refreshAccessToken = async () => {
  if (!accessToken) {
    accessToken = await secureStoreService.getSecureStoreItem('accessToken');
  }

  if (!refreshToken) {
    refreshToken = await secureStoreService.getSecureStoreItem('refreshToken');
  }

  const user = apolloClient.readQuery({
    query: CURRENT_USER,
  });

  const response = await apolloClient.mutate({
    mutation: REFRESH_ACCESS_TOKEN,
    variables: {
      input: {
        refreshToken,
        userId: user?.currentUser?.id,
      },
    },
  });

  const newRefreshToken = response.data.refreshAccessToken.refreshToken;
  const newAccessToken = response.data.refreshAccessToken.accessToken;

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const handleNetworkError = (networkError: NetworkError) => {
  Alert.alert('Something went wrong', networkError?.message || 'Network error');
};

const authLink = new ApolloLink((operation, forward) => {
  if (accessToken) {
    operation.setContext(
      ({ headers = {} }: { headers: Record<string, string> }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${accessToken}`,
        },
      }),
    );
  }

  return forward(operation);
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const currentRouteName = getCurrentRouteName();
      const isUnauthenticatedError = graphQLErrors.some(
        error => error.extensions?.code === ErrorCodes.UNAUTHENTICATED,
      );

      const isAuthenticationError =
        isUnauthenticatedError && currentRouteName !== 'Login';
      const isRefreshTokenExpiredError = graphQLErrors.some(
        error => error.message === ErrorMessages.JWT_EXPIRED,
      );

      if (isAuthenticationError) {
        const context = operation.getContext();

        operation.setContext({
          ...context,
          headers: {
            ...context?.headers,
            _needsRefresh: true,
          },
        });

        return forward(operation);
      } else if (isRefreshTokenExpiredError) {
        handleAuthenticationError();
      } else {
        Alert.alert('Something went wrong', graphQLErrors[0].message);
      }
    } else if (networkError) {
      handleNetworkError(networkError);
    }
  },
);

const refreshTokenLink = setContext(async (_, previousContext) => {
  if (previousContext?.headers?._needsRefresh) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await refreshAccessToken();

    if (accessToken && refreshToken) {
      accessToken = newAccessToken;
      refreshToken = newRefreshToken;
    } else {
      handleAuthenticationError();
    }
  }

  return previousContext;
});

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, refreshTokenLink, authLink, httpLink]),
  cache,
});

export const clearApolloCache = () => {
  apolloClient.clearStore();
};
