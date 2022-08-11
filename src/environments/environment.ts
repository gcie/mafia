// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LogLevel } from 'src/app/core/services/logger.service';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDK2d_sDWl2jj397VS3lGRezyPOfp8AcjE',
    authDomain: 'mafia-gd.firebaseapp.com',
    databaseURL: 'https://mafia-gd.firebaseio.com',
    projectId: 'mafia-gd',
    storageBucket: 'mafia-gd.appspot.com',
    messagingSenderId: '888055194384',
    appId: '1:888055194384:android:fa4e7d453ac734814cbb95',
  },
  logging: {
    level: LogLevel.DEBUG,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
