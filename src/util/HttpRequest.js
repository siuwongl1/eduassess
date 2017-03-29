/**
 * Created by SiuWongLi on 17/3/23.
 */
export default {
    getJson (url) {
        var promise =new Promise((resolve,reject)=>{
            var client = new XMLHttpRequest();
            client.open("GET", url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
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
        })
        return promise;
    },
    postJson (url,data) {
        if(url&&data){
            var promise = new Promise((resolve,reject)=>{
                var client = new XMLHttpRequest();
                client.open("POST", url,true);
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
            })
            return promise;
        }
    },
    parseResp (result){
        var promise = new Promise((resolve,reject)=>{
            if(result){
                var obj= JSON.parse(result);
                var code = obj.statusCode;
                if(code==0){
                    resolve(obj); //返回Json Object
                }else{
                    reject(obj.message);
                }
            }else{
                reject("服务器无响应");
            }
        });
        return promise;
    }
}