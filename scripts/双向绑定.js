/**
 * 订阅发布中心
 * 添加订阅者和更新消息分发
 */
class Dep {
  constructor() {
    this.subs = []; // 存储订阅者的数组
  }

  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub);
  }

  // 通知订阅者，触发订阅者更新
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}
Dep.target = null;

/**
 * 监听者
 * 监听属性的变化
 */ 
class Observer {
  
}

/**
 * 订阅者
 * 通知视图更新
 */
class Watcher {}