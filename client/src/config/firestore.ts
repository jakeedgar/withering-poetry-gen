import app from './firebase';
import { getFirestore, collection } from '@firebase/firestore';

export const store = getFirestore(app);

export const poemCollection = collection(store, 'poems');
