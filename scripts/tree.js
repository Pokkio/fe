/**
 * 二叉搜索树
 */

function BinarySearchTree() {

  // 根节点
  this.root = null;

  // 节点
  function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  BinarySearchTree.prototype.insertNode = function (node, newNode) {
    if ( newNode.key < node.key ) {
      if ( node.left == null ) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode); // 递归
      }
    } else {
      if ( node.right == null ) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  };

  BinarySearchTree.prototype.insert = function (key) {
    let newNode = new Node(key);
    if ( this.root == null ) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  };

  // 先序遍历（先处理根节点，再左子节点，右子节点）
  BinarySearchTree.prototype.preOrderTraversal = function (handler) {
    this.preOrderTraversalNode(this.root, handler);
  };

  BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
    if ( node != null ) {
      // 处理经过的节点
      handler(node.key);
      // 遍历左子树中的节点
      this.preOrderTraversalNode(node.left, handler);
      // 遍历右子树中的节点
      this.preOrderTraversalNode(node.right, handler);
    }
  };

  // 中序遍历
  BinarySearchTree.prototype.midOrderTraversal = function(handler){
    this.midOrderTraversalNode(this.root, handler)
  };

  BinarySearchTree.prototype.midOrderTraversalNode = function (node, handler) {
    if ( node != null ) {
      this.midOrderTraversalNode(node.left, handler);
      handler(node.key);
      this.midOrderTraversalNode(node.right, handler);
    }
  };

  // 后序遍历（先处理左子节点，再右子节点，再根节点）
  BinarySearchTree.prototype.postOrderTraversal = function (handler){
    this.postOrderTraversalNode(this.root, handler)
  };

  BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler){
    if ( node != null ) {
      this.postOrderTraversalNode(node.left, handler)
      this.postOrderTraversalNode(node.right, handler)
      handler(node.key)
    }
  };

  // 获取最大值
  BinarySearchTree.prototype.max = function () {
    let node = this.root;
    let key = null;
    while ( node != null ) {
      node = node.right;
      key = node.key;
    }
    return key;
  };

  // 获取最小值
  BinarySearchTree.prototype.min = function () {
    let node = this.root;
    let key = null;
    while ( node != null ) {
      node = node.left;
      key = node.key;
    }
    return key;
  };

  // 查找特定值
  BinarySearchTree.prototype.search = function (key) {
    let node = this.root;
    
  }
}

let bst = new BinarySearchTree()

//2.插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

//3.测试遍历
let resultString = ""
//掺入处理节点值的处理函数
bst.preOrderTraversal(function(key){
  resultString += key + "->"
})
console.log(resultString)