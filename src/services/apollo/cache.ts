import { InMemoryCache, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache();

export const isUserLoggedInVar = makeVar(false);
