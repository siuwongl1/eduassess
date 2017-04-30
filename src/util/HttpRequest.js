/**
 * Created by SiuWongLi on 17/3/23.
 * http请求相关，分别对应RESTful的get,post,put动作。
 */
import co from 'co'
var HttpUtil = {
    getJson (url) {
        var promise = new Promise((resolve, reject) => {
            if (url) {
                var client = new XMLHttpRequest();
                client.open("GET", url, true);
                client.onreadystatechange = function () {
                    var that = this;
                    handler(that,resolve,reject);
                };
                client.send();
            } else {
                reject('url不能为空');
            }
        })
        return promise;
    },
    postJson (url, data) {
        var promise = new Promise((resolve, reject) => {
            if (url && data) {
                var client = new XMLHttpRequest();
                client.open("POST", url, true);
                client.onreadystatechange = function () {
                    var that = this;
                    handler(that,resolve,reject);
                };
                client.send(data);
            } else {
                reject("url或data不能为空");
            }
        });
        return promise;
    },
    putJson (url, data){
        var promise = new Promise((resolve, reject) => {
            if (url && data) {
                var client = new XMLHttpRequest();
                client.open("PUT", url, true);
                client.onreadystatechange =function () {
                    var that = this;
                    handler(that,resolve,reject);
                };
                client.send(data);
            }
        })
        return promise;
    },
    parseResp (result){
        var promise = new Promise((resolve, reject) => {
            if (result) {
                var obj = JSON.parse(result);
                var code = obj.statusCode;
                if (code == 0) {
                    resolve(obj.data); //返回data
                } else {
                    reject(obj.message);
                }
            } else {
                reject("服务器无响应");
            }
        });
        return promise;
    }
}
var handler = function (obj,resolve,reject) {
    if (obj.readyState !== 4) {
        return;
    }
    if (obj.status === 200) {
        co(function *() {
            var result = yield HttpUtil.parseResp(obj.response);
            return result;
        }).then(result=>{
            resolve(result);
        },err=>{
            reject(err);
        }).catch(err=>{
            reject(err);
        })
    } else {
        reject(new Error(obj.statusText));
    }
}
export default HttpUtil