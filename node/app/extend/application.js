module.exports = {
    json_result(param) {
        return {
            "result": {
                "success": param[0],
                "errorCode": param[1],
                "errorMsg": param[2],
            },
            "content": param[3],
        }
    }
};