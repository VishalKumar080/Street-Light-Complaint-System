import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAc8PHbMhADEBm4hq_4RD3zbkG20mRQyL0",
  authDomain: "complaint-9cfba.firebaseapp.com",
  projectId: "complaint-9cfba",
  storageBucket: "complaint-9cfba.appspot.com",
  messagingSenderId: "490467951696",
  appId: "1:490467951696:web:b7bbf277aaef0282bcfd55",
  measurementId: "G-1Z0JQWW5MY",
};

const app = initializeApp(firebaseConfig);
export const ImageStorage = getStorage(app);

