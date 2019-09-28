'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    router.get('/', jwt, controller.home.index);
    router.post('/registered', controller.home.registered);
};