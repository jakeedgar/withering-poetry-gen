import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBg1w--1PPFbZNZ1B28Q7_wSC515QiwnVw',
  authDomain: 'wither-ai.firebaseapp.com',
  projectId: 'wither-ai',
  storageBucket: 'wither-ai.appspot.com',
  messagingSenderId: '886345741673',
  appId: '1:886345741673:web:da7e15d41e6bc16c6ff9f8'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
