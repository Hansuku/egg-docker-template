const mongoose = require('mongoose');

module.exports = (options, app) => {
    return async (ctx, next) => {
        try {
            const token = ctx.request.header.authorization.replace('Bearer ', '');;
            const decoded = app.jwt.verify(token, app.config.jwt.secret);
            const User = mongoose.model('User');
            const userResult = await User.findOne({_id: decoded.user_id});
            if (userResult) {
                app.userInfo = userResult;
                await next();
            } else {
                ctx.body = app.json_result([false , 409, '身份校验失败，请重新登录']);
            }
            // await next();
        } catch (err) {
            if (
                ctx.path.includes('unauthorerror') &&
                err instanceof app.jwt.UnauthorizedError
            ) {
                ctx.status = 200;
                ctx.body = 'UnauthorizedError';
                return;
            }
            if (err.message === 'jwt expired') {
                ctx.body = app.json_result([false, 401, 'Token 已经超时过期，请重新登录']);
            } else {
                ctx.body = app.json_result([false, 401, '未登录，请先登录']);
            }
        }
    };
};
