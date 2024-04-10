import { Alert } from 'react-native';
import { secureStoreService } from '../services/secureStore/secureStoreService';
import { isUserLoggedInVar } from '../services/apollo/cache';
import { apolloClient } from '../services/apollo/apolloService';

const removeJwtTokensFromSecureStorage = async () => {
  // TODO: remove refresh token here too (when it is implemented)
  await secureStoreService.deleteSecureStoreItem('token');
};

export const logOut = async () => {
  try {
    await removeJwtTokensFromSecureStorage();

    isUserLoggedInVar(false);

    // NOTE: maybe it will not be necessary to clear the whole apollo store in the future
    apolloClient.clearStore();
  } catch (e) {
    Alert.alert('Error', 'Could not log out');
  }
};
