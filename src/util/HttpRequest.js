/**
 * Created by SiuWongLi on 17/3/23.
 * http请求相关，分别对应RESTful的get,post,put动作。
 */

export default {
    getJson (url) {
        var promise = new Promise((resolve, reject) => {
            if (url) {
                var client = new XMLHttpRequest();
                client.open("GET", url, true);
                client.onreadystatechange = handler;
                client.send();
                function handler() {
                    if (this.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
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
                client.onreadystatechange = handler;
                client.send(data);
                function handler() {
                    if (this.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
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
                client.onreadystatechange = handler;
                client.send(data);
                function handler() {
                    if (this.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
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
                    resolve(obj); //返回Json Object
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