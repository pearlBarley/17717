
var oldFetch = global.fetch
var newFetch = function (url, options={}) {
  //   this.interceptors = []
  this.request = {
      url,
      options
  }
  debugger
  //   this.interceptors.map(function(val, index){
  //       return val
  //   })
  // this.interceptors = fetch.prototype.interceptors
  // this.runInterceptors = fetch.prototype.runInterceptors
  
  if (this.interceptors.length > 0) this.runInterceptors(0)
  debugger
  return new Promise((resolve, reject) => {
      debugger
    //添加超时检测
    var timeout = options.timeout
    var timer
    if (timeout) {
        timer = setTimeout(function(){
                        reject(new Error("fetch timeout"))
                    }, timeout );
    }
    oldFetch(this.request.url, this.request.options)
    .then(data => {
        debugger
        // clearTimeout(timer)
        resolve(data);
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
breadFetch.prototype.runInterceptors = function (i) {
  debugger
  var _that = this
  // for (let i=0; i<this.interceptors.length; i++) {
  if (i >= this.interceptors.length) return
  this.interceptors[i](this.request, function (callback=function(){}) {
      _that.runInterceptors(++i)
  })
}

let objFetch = new breadFetch()
//let fetch = objFetch.newFetch  不能直接赋值，this指向会被切断
let fetch = function (url, options={}) {
     //objFetch.newFetch.call(objFetch, url, options)
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
