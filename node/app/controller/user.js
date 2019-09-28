'user strict';

const Controller = require('egg').Controller;
const mongoose = require('mongoose');

class UserController extends Controller{
    /**
     * 注册 仅在后台可视化邀请制注册
     *
     * @memberof UserController
     */
    async registered() {
        const { ctx } = this;
        const data = ctx.request.body;
        console.log(data);
        data._id = mongoose.Types.ObjectId();
        const User = mongoose.model('User');
        let newUser = new User(data);
        await newUser.save().then(() => {
            ctx.body = this.app.json_result([true, 200, '创建成功']);
        }).catch((err) => {
            console.log(err);
            ctx.body = this.app.json_result([false, 401,  err]);
        });
    }
    /**
     * 登录
     *
     * @memberof UserController
     */
    async login() {
        const { ctx } = this;
        const data = ctx.request.body;
        if (!data.phone) {
            ctx.body = this.app.json_result([false, 401, '请填写手机号']);
            return
        }
        if (!data.password) {
            ctx.body = this.app.json_result([false, 401, '请填写密码']);
            return
        }
        // import user model
        const User = mongoose.model('User');
        await User.findOne({phone: data.phone}).exec().then(async(result) => {
            if(result) {
                // console.log(result.id)
                let newUser = new User();
                await newUser.comparePassword(data.password, result.password)
                .then(isMatch => {
                    const token = this.app.jwt.sign({
                        user_id: result.id,
                        exp: Math.floor(Date.now() / 1000) + 86400
                    }, this.app.config.jwt.secret);
                    isMatch ?
                    ctx.body = this.app.json_result([true, 200, '登录成功', token]) :
                    ctx.body = this.app.json_result([false, 200, ' 密码错误'])
                }).catch((err) => {
                    ctx.body = this.app.json_result([false, 401,  err]);
                });
            } else {
                ctx.body = this.app.json_result([false, 200, '用户不存在']);
            }
        }).catch(error => {
            ctx.body = this.app.json_result([false, 401, error]);
        })
    }
    async info() {
        const { ctx, app } = this;
        const Role = mongoose.model('Role');        
        const result = await Role.findOne({id: app.userInfo.role}).exec();
        if (result && result.nodes) {
            const Node = mongoose.model('Node');
            const doc = await Node.find({id: result.nodes}).exec();
            const userInfo = {
                createAt: app.userInfo.createAt,
                lastLoginAt: app.userInfo.lastLoginAt,
                id: app.userInfo._id,
                phone: app.userInfo.phone,
                username: app.userInfo.username,
                role: app.userInfo.role,
                avatar: app.userInfo.avatar,
                role_name: result.role_name,
                nodes: doc
            }
            ctx.body = app.json_result([true, 200, '', userInfo]);
        } else {
            ctx.body = app.json_result([false, 409, '用户账号异常，无节点信息']);
        }
    }
}
module.exports =  UserController;
