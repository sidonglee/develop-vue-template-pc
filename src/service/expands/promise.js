/**
 * 自定义promise类 将同步方法转为异步执行
 * doPromise(this.getUserinfo,this).then((data)=>{},(error)=>{})
 */
let promise = function(dofn,scope){
    return new Promise((resolve,reject)=>{
        let b = dofn.call(scope);
        if(b!=null)
            return resolve(b)
        else
            return reject(new Error('promise do error'))
    })
}
export {doPromise as promise}