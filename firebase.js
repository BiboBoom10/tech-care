import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET } from './config';

const app = initializeApp({
    apiKey: FIREBASE_API_KEY,
    appId: FIREBASE_APP_ID,
    authDomain: FIREBASE_AUTH_DOMAIN,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET
});

export const storage = getStorage(app);