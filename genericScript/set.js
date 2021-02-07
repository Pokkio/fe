/**
 * 集合
 * 只存储值，没有见，并且值是不重复，无序
 * 对象实现
 */

function Set() {
  this.items = {};

  //
  Set.prototype.has = function (v) {
    return this.items.hasOwnProperty(v);
  };

  Set.prototype.add = function (v) {
    if ( this.has(v) ) {
      return false;
    }
    this.items[v] = v;
    return true;
  };

  Set.prototype.remove = function (v) {
    if ( !this.has(v) ) {
      return false;
    }
    delete this.items[v];
    return true;
  };

  Set.prototype.clear = function () {
    items = {};
  };

  Set.prototype.size = function () {
    return Object.keys(this.items).length;
  };

  Set.prototype.values = function () {
    return Object.keys(this.items);
  };
}
