'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    jwt: {
        enable: true,
        package: 'egg-jwt'
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    }
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
