import firebaseDefault from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebase-config';

const app = firebaseDefault.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseDefault.auth();

export const fireStore = getFirestore(app);

