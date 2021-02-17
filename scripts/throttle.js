/**
 * 节流函数
 * n秒内多次触发的事件，只会执行一次。
 */

// 使用时间戳
const throttleTimeStamp = (fn, wait = 50) => {
  // 上次 fn 执行的时间
  let previous = 0;
  return function(args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date();
    // 将当前时间和上一次执行函数的时间进行对比
    if ( now - previous > wait ) {
      previous = now;
      fn.call(this, args);
    }
  }
};

// 使用定时器
const throttleSetInterval = (fn, wait = 500) => {
  let timer = null;
  return function(...args) {
    if ( !timer ) {
      timer =  setTimeout(() => {
        timer = null;
        fn.apply(this, args)
      }, wait);
    }
  }
};
