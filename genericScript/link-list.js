/**
 * 链表
 * 链表本身元素是由一个数据节点和指向下一个元素的引用组成
 * head 属性指向第一个节点，最后一个节点指向null
 * 链表相较于数组一开始创建需要申请一整块连续的内存不同，链表在内存中是不连续的；插入和删除能达到O(1)
 * 访问任何一个节点需要从头开始访问，无法通过下标获取节点，并且访问上一个节点比较困难
 * 
 * 单向链表
 */

function SingleLinkList() {

  // 节点
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  this.head = null;
  this.length = 0;

  SingleLinkList.prototype.append = function (data) {
    let node = new Node(data);

    if ( !this.length ) { // 当前链表为空，即插入的是第一个
      this.head = node;
    } else {
      let current = this.head;
      while ( current.next ) {
        current = current.next;
      }
      current.next = node;
    }
    this.length += 1;
  };

  SingleLinkList.prototype.toString = function () {
    let current = this.head;
    let string = '';

    while ( current ) {
      string += current.data + ' ';
      current = current.next;
    }
    return string;
  };

  SingleLinkList.prototype.insert = function (position, data) {
    if ( position < 0 || position > this.length ) { // 插入位置越界
      return false
    }

    let node = new Node(data);

    if ( position == 0 ) {
      node.next = this.head; // 将原本head指向的第一个节点，换成新节点的next引用
      this.head = node;
    } else {
      let index = 0;
      let prev = null;
      let current = this.head;
      while ( index < position ) { // 移动节点
        prev = current; // 存储上个节点
        current = current.next;
        index++;
      }
      node.next = current;
      prev.next = node;
    }
    this.length += 1;
    return true;
  };

  SingleLinkList.prototype.get = function (searchIndex) {
    if ( searchIndex < 0 && searchIndex >= this.length ) {
      return false;
    }

    let current = this.head;
    let index = 0;
    while ( index < sIndex ) {
      current = current.next;
      index++;
    }
    return current.data;
  };

  SingleLinkList.prototype.indexOf = function (data) {
    let current = this.head;
    let index = 0;
    while( current ) { // current 不指向null；若是 current.next 绑定，只会遍历到倒数第二个元素
      if ( current.data == data ) {
        return index
      }
      current = current.next;
      index += 1;
    }
    return -1;
  };

  SingleLinkList.prototype.update = function (position, newData) {
    if ( position < 0 && position >= this.length ) {
      return false;
    }

    let current = this.head;
    let index = 0;
    while( index < position ) {
      current = current.next;
      index += 1;
    }
    current.data = newData;
    return true;
  }
}
