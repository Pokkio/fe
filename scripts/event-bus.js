// 发布者订阅者

class EventEmeitter {
  constructor() {
    this._events = this._events || new Map();
    this._maxListeners = this._maxListeners || 10;
  }
}

// 发布
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  handler = this._events.get(type);

  if ( Array.isArray(handler) ) {
    for ( let i=0; i < handler.length; i++ ) {
      if ( args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else {
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }
  return true;
}

// 订阅
EventEmeitter.prototype.addListener = function(type, fn) {
  const handler = this._events.get(type);

  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === 'function') {
    // 如果handler是函数说明只有一个监听者
    this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
  } else {
    handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
  }
}

EventEmeitter.prototype.removeListener = function(type, fn) {
  const handler = this._events.get(type);

  if (handler && typeof handler === 'function') {
    this._events.delete(type, fn);
  } else {
    let postion;
    // 如果handler是数组,说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        postion = i;
      } else {
        postion = -1;
      }
    }
    // 如果找到匹配的函数,从数组中清除
    if (postion !== -1) {
      // 找到数组对应的位置,直接清除此回调
      handler.splice(postion, 1);
      // 如果清除后只有一个函数,那么取消数组,以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      return this;
    }
  }
}

const emitter = new EventEmeitter();
emitter.addListener('arson', man => {
  console.log(`expl ${man}`);
})

emitter.emit('arson', 'low-end');