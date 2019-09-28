'user strict';

const Controller = require('egg').Controller;
const config = require('../../config');
const Xunfei = require('xunfeisdk');
const qiniu = require('qiniu');

class XunfeiController extends Controller{
    async tts() {
        const { ctx } = this;
        const query = ctx.query;
        if (query.keyword == '') {
            ctx.body = {
                "result": {
                    "success": false,
                    "errorCode": 401,
                    "errorMsg": '请填写正确的 keyword'
                },
            };
            return
        }
        // 初始化 SDK
        const client = new Xunfei.Client(config.AppID);
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        // TTS 获取内容
        const ttsResult = await client.TTS(query.keyword, "audio/L16;rate=16000", "lame", "x_xiaomei");
        if (ttsResult && ttsResult.code) {
            ctx.body = {
                "result": {
                    "success": false,
                    "errorCode": 500,
                    "errorMsg": ttsResult.desc
                },
            };
            return
        }
        // TTS 文件流直传七牛云仓库
        const mac = new qiniu.auth.digest.Mac(config.qiniuAccessKey, config.qiniuSecretKey);
        const srcBucket = 'bugmoon-oss';
        // qiniu oss option
        const putPolicy = new qiniu.rs.PutPolicy({scope: srcBucket});
        const uploadToken = putPolicy.uploadToken(mac);
        const qiniuConfig = new qiniu.conf.Config();
        qiniuConfig.zone = qiniu.zone.Zone_z2;
        const putExtra = new qiniu.form_up.PutExtra();
        const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
        const key = 'geo-audio/'+ new Date().getTime() + Math.ceil(Math.random()*10) + '.mp3';
        await formUploader.put(uploadToken, key, ttsResult.audio, putExtra, (respErr, respBody, respInfo) => {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });
        ctx.body = {
            "result": {
                "success": true,
                "errorCode": 0,
                "errorMsg": ""
            },
            "content": 'https://cdn.boomgeek.cn/' + key
        };
    }
}

module.exports = XunfeiController