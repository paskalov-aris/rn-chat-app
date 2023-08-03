import * as SecureStore from 'expo-secure-store';

const setSecureStoreItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const getSecureStoreItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.warn(error);
  }
};

const deleteSecureStoreItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.warn(error);
  }
};

export const secureStoreService = {
  setSecureStoreItem,
  getSecureStoreItem,
  deleteSecureStoreItem,
};
