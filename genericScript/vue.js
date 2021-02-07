// 订阅者
class Dep {
  constructor () {
    // 存放 Watcher 对象
    this.subs = [];
  }

  // 添加 Watcher 对象
  addSub(sub) {
    this.subs.push(sub);
  }

  // 通知所有 Watcher 对象更新
  notify () {
    this.subs.forEach(( sub ) => {
      sub.update();
    })
  }
}

// 观察者
class Watcher {
  constructor () {
    Dep.target = this;
  }

  // 更新视图的方法
  update () {
    console.log('视图更新')
  }
}

function defineReactive(obj, key, val) {

  // 订阅者类
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 将Dep.target（即当前的Watcher对象存入dep的subs中）
      dep.addSub(Dep.target);
      return val; // 收集依赖
    },
    set: function reactiveSetter(newVal) {
      if ( newVal === val ) return;
      val = newVal;
      // cb(newVal);
      // 在set的时候触发dep的notify来通知所有的Watcher对象更新视图
      dep.notify();
    }
  })
}

function observer(value) {
  if ( !value || ( typeof value !== 'object' ) ) return;
  Object.keys(value).forEach(( key ) => {
    defineReactive(value, key, value[key]);
  })
}

class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    new Watcher();
    console.log('render', this._data.test);
  }
}

let o = new Vue({
  data: {
    test: 'I am test.'
  }
});

o._data.test = 'Hello';
console.log(o._data.test);
