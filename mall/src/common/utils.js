/**
 * 防抖动函数
 * 
 * @param {object} func 执行函数
 * @param {number} delay 延迟执行时间
 */
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
};

/**
 * 时间戳格式化
 * 
 * @param {number} timeStamp 10位时间戳
 * @param {string} fmt 格式化映射
 * @return {string}
 */
export function formatDate(timeStamp, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (timeStamp.getFullYear() + '').substr(4 - RegExp.$1.length));
  };
  let o = {
    'M+': timeStamp.getMonth() + 1, // getMonth返回0~11：表示1~12月
    'd+': timeStamp.getDate(),
    'h+': timeStamp.getHours(),
    'm+': timeStamp.getMinutes(),
    's+': timeStamp.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    };
  };
  return fmt;
};

/**
 * 补齐月/日/时/分/秒 不足两位的情况
 * 
 * @param {string} str 
 */
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}