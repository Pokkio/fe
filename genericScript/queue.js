/**
 * 队列
 * 先进先出（FIFO）
 * 数组/链表 实现
 * 只在头部进行删除操作，尾部进行插入操作
 */

function Queue() {
  let items = [];

  // 元素加入队列
  this.enqueue = function(e) {
    items.push(e);
  };

  // 删除前端元素
  this.dequeue = function(e) {
    items.shift();
  };

  // 获取前端的元素
  this.front = function () {
    return items.length ? items[0] : null;
  };

  // 查看队列是否为空
  this.isEmpty = function () {
    return items.length === 0;
  };

  // 将栈结构的内容以字符串的形式返回
  this.toString = function () {
    let string = '';
    for ( let item of items ) {
      string += item + ' ';
    }
    return string;
  }
}

// 优先队列
function PriorityQueue() {
  this.items = [];

  // 元素构造函数
  function QueueEle(e, p) {
    this.e = e;
    this.p = p;
  }

  // 插入元素
  PriorityQueue.prototype.enqueue = function (e, p) {
    let node = new QueueEle(e, p);

    if ( this.items.length === 0 ) {
      this.items.push(node);
    } else {
      let isAdd = false;  // 判断新增加的元素是否已插入队列
      for ( let item of this.items ) {
        // 让新插入的元素与原有元素进行优先级比较(priority越小，优先级越大)
        if ( node.p < item.p ) {
          this.items.splice(item, 0, node);
          isAdd = true;
          break;
        }
      }
      if ( !isAdd ) { // 没有加入即新增加的元素优先级是最小的，末端插入
        this.items.push(node);
      }
    };
  }

    // 删除前端元素
  PriorityQueue.prototype.dequeue = function () {
    return this.items.shift();
  };

  // 查看前端的元素
  PriorityQueue.prototype.front = function () {
    return this.items[0]
  };

  // 队列是否为空
  PriorityQueue.prototype.isEmpty = function () {
    return this.items.length == 0;
  };

  // 
  PriorityQueue.prototype.toString = () => {
    let resultString = ''
      for (let i of this.items){
        resultString += i.e + '-' + i.p + ' '
      }
    return resultString
  }
}