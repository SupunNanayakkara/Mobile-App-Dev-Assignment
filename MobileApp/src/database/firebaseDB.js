import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB8hSYsBTDMZEzdKyM9VwwYFQIMESy6U5I',
  authDomain: 'scs3212-assignment.firebaseapp.com',
  projectId: 'scs3212-assignment',
  storageBucket: 'scs3212-assignment.appspot.com',
  messagingSenderId: '360447375265',
  appId: '1:360447375265:web:74d4c2e3fa2436d5a7fde0',
  measurementId: 'G-QCTN4MS6JP',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
