/**
 * 栈
 * 后进先出（LIFO）
 * 数组/链表 实现
 * JS中函数调用会形成一个调用栈，若某个函数递归调用自身就会造成栈溢出
 */

function Stack() {
  let items = [];

  // 进栈
  this.push = function(e) {
    items.push(e);
  };

  // 移除栈顶元素
  this.pop = function () {
    items.pop();
  };

  // 返回栈顶的元素，不对栈做任何修改
  this.peek = function () {
    return items[items.length - 1];
  };

  // 栈是否为空
  this.isEmpty = function () {
    return items.length === 0;
  };

  // 栈里的元素个数
  this.size = function () {
    return items.length;
  };

  // 清空栈
  this.clear = function () {
    items = [];
  }

  // 将栈结构的内容以字符串的形式返回
  this.toString = function () {
    let string = '';
    for ( let item of items ) {
      string += item + ' ';
    }
    return string;
  }
}
