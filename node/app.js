// app.js 整个服务的启动配置
const dotenv = require('dotenv');
const {connect, initSchema} = require('./app/database/init');
const mongoose = require('mongoose');

dotenv.config('./env');

(async() => {
    connect(); // init database
    initSchema(); // init schema
})();