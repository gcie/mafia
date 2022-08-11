import { LogLevel } from 'src/app/core/services/logger.service';

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDK2d_sDWl2jj397VS3lGRezyPOfp8AcjE',
    authDomain: 'mafia-gd.firebaseapp.com',
    databaseURL: 'https://mafia-gd.firebaseio.com',
    projectId: 'mafia-gd',
    storageBucket: 'mafia-gd.appspot.com',
    messagingSenderId: '888055194384',
    appId: '1:888055194384:android:fa4e7d453ac734814cbb95',
    // measurementId: 'G-WZ74WC043C',
  },
  logging: {
    level: LogLevel.ERROR,
  },
};
