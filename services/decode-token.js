import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { ToastAndroid } from "react-native";
import { removeItem, setItem } from "./async-storage";
import axiosInstance from "../utils/axios";

const jwtDecoder = (token) => {
    const payload = jwtDecode(token);
    return payload;
}

export const isValidToken = async (token) => {
    if (token) {
        const decodedToken = jwtDecoder(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime
    }
    return false;
}

export const tokenExpired = async (exp) => {
    let expiredTimer;
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;
    clearTimeout(expiredTimer);
    expiredTimer = setTimeout(async () => {
        ToastAndroid.show('Your session has expired', ToastAndroid.SHORT);
        await removeItem('token');
    }, timeLeft)
};

export const setSession = async (token) => {
    if (token) {
        await setItem('token', token);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        const { exp } = jwtDecoder(token);
        tokenExpired(exp);
    }
}