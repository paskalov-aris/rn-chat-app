import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        id
        username
      }
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_ACCESS_TOKEN = gql`
  mutation refreshAccessToken($input: RefreshAccessTokenInput!) {
    refreshAccessToken(refreshAccessTokenInput: $input) {
      accessToken
      refreshToken
    }
  }
`;
