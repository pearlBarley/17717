
var oldFetch = global.fetch
var newFetch = function (url, options={}) {
  this.request = {
      url,
      options
  }
  // this.interceptors.map(function(val, index){
  //     return val
  // })

  //执行请求前的拦截操作
  if (this.interceptors.length > 0) this.runInterceptors(0)

  return new Promise((resolve, reject) => {
    //添加超时检测
    var timeout = options.timeout
    var timer
    if (timeout) {
        timer = setTimeout(function(){
                        reject(new Error("fetch timeout"))
                    }, timeout );
    }
    oldFetch(this.request.url, this.request.options)
    .then(res=>res.json())
    .then(res => {
        //执行请求后的拦截操作
        this.response = res
        if (this.interceptors_after.length > 0) {
            this.runInterceptorsAfter(0)
            .then(data => {
              // clearTimeout(timer)
              resolve(data);
            })
        }
    })
    .catch(err => {
        // clearTimerout(timer)
        reject(err)
        //throw err
    });
  });
}

var breadFetch = function () {
    //也可以用箭头函数，this不变
    // var _that = this
    // this.newFetch = function (url, options={}) {
    //      //改变newfetch内部的this指向 
    //      newFetch.call(_that, url, options)
    // }
}

breadFetch.prototype.newFetch = newFetch  //new的时候也可以改变this指向，指向新对象

//fetch拦截器
breadFetch.prototype.interceptors = []
breadFetch.prototype.interceptors_after = []
breadFetch.prototype.runInterceptors = function (i) {
  var _that = this
  if(i===0) this.interceptors_after = []
  if (i >= this.interceptors.length) return
  this.interceptors[i](this.request, function (callback) {
      if(callback){
        //callback 存入请求后执行的数组
        _that.interceptors_after.push(callback)
      }
      _that.runInterceptors(++i)
  })
}

breadFetch.prototype.runInterceptorsAfter = function (i) {
  var _that = this
  //if (i >= this.interceptors_after.length) return
  return new Promise((resolve, reject) => {
    if (i >= this.interceptors_after.length) resolve(this.response)
    this.interceptors_after[i](this.response, function () {
        _that.runInterceptorsAfter(++i).then(res => {
            resolve(res)
        })   
    })
  })
}

let objFetch = new breadFetch()
//let fetch = objFetch.newFetch  不能直接赋值，this指向会被切断
let fetch = function (url, options = {}) {
     //objFetch.newFetch.call(objFetch, url, options) //应返回promise
     return new Promise((resolve, reject) => {
         objFetch.newFetch(url, options)    
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             reject(err)
         });
     })
}

export default objFetch
export { fetch } 
// global.fetch = new breadFetch().fetch
