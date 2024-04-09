import { InMemoryCache, makeVar } from '@apollo/client';
import { EMPTY_STRING } from '../../constants/stubs';
import { secureStoreService } from '../secureStore/secureStoreService';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    LoginResponse: {
      fields: {
        accessToken: {
          read() {
            return secureStoreService.getSecureStoreItem('token');
          },
        },
      },
    },
  },
});

export const accessTokenVar = makeVar(EMPTY_STRING);
