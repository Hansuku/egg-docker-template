'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    router.get('/', jwt, controller.home.index);
    router.get('/tts', jwt, controller.xunfei.tts);
    router.post('/user/registered', controller.user.registered);
    router.post('/user/login', controller.user.login);
    router.get('/user/info', jwt, controller.user.info);
};