import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (item) => {
    const val = await AsyncStorage.getItem(item);
    return val
};

export const setItem = async (item, val) => {
    await AsyncStorage.setItem(item, val)
};

export const removeItem = async (item) => {
    await AsyncStorage.removeItem(item);
};