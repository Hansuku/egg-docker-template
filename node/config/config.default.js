/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1566540052827_1665';

    // add your middleware config here
    config.middleware = [
        'gzip',
    ];

    // jwt setting
    config.jwt = {
        secret: "MaTianYuCattleBatch"
    };

    // gzip setting
    config.gzip = {
        threshold: 1024, // less then 1k do not comporess
    };

    // csrf setting
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: [''],
    };
    // cors setting
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };


    return {
        ...config,
        ...userConfig,
    };
};
