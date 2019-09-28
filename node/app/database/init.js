// mongodb init
const mongoose = require('mongoose');
const glob = require('glob');
const { resolve } = require('path');
const env = process.env;

exports.initSchema = () => {
    glob.sync(resolve(__dirname, './schemas', '*.js')).forEach(require)
};
mongoose.Promise = global.Promise;

exports.connect = () => {
    const connectConfig = `mongodb://${env.DB_USER}:${env.DB_PASSWD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
    mongoose.connect(connectConfig,
        {
            useNewUrlParser: true
        }
    );
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
        // 连不上进行重连，最多三次
        if (maxConnectTimes <= 3) {
            maxConnectTimes++
            mongoose.connect(connectConfig,
                {
                    useNewUrlParser: true
                }
            );
        } else {
            reject();
            throw new Error('DataBase Error');
        }
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection create error:'));
        db.once('open', () => {
            console.log('db connect success');
            resolve();
        });
    });
}