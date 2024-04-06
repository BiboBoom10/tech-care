import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = () => {
    const getItem = async (item) => {
        const val = await AsyncStorage.getItem(item);
        return val
    };

    const setItem = async (item, val) => {
        await AsyncStorage.setItem(item, val)
    };

    const removeItem = async (item) => {
        await AsyncStorage.removeItem(item);
    };

    return { getItem, setItem, removeItem };
};

export default useAsyncStorage;