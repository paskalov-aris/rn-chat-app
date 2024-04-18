import { Alert } from 'react-native';
import { secureStoreService } from '../../services/secureStore/secureStoreService';
import { isUserLoggedInVar } from '../../services/apollo/cache';
import { SetAuthTokensToSecureStorageArgs } from './auth.types';

export const setAuthTokensToSecureStorage = async ({
  accessToken,
  refreshToken,
}: SetAuthTokensToSecureStorageArgs) => {
  await secureStoreService.setSecureStoreItem('accessToken', accessToken);
  await secureStoreService.setSecureStoreItem('refreshToken', refreshToken);
};

const removeJwtTokensFromSecureStorage = async () => {
  await secureStoreService.deleteSecureStoreItem('refreshToken');
  await secureStoreService.deleteSecureStoreItem('accessToken');
};

export const logOut = async () => {
  try {
    await removeJwtTokensFromSecureStorage();

    isUserLoggedInVar(false);
  } catch (e) {
    Alert.alert('Error', 'Could not log out');
  }
};
