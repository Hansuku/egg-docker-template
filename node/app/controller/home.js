'use strict';

const Controller = require('egg').Controller;
const mongoose = require('mongoose');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async registered() {
    const { ctx } = this;
    const data = ctx.request.body;
    data._id = mongoose.Types.ObjectId();
    const User = mongoose.model('User');
    let newUser = new User(data);
    await newUser.save().then(() => {
      ctx.body = this.app.json_result([true, 200, 'Cteate Success']);
    }).catch((err) => {
      console.log(err);
      ctx.body = this.app.json_result([false, 401,  err]);
    });
  }
}

module.exports = HomeController;
