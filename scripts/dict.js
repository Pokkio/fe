/**
 * 字典
 */

function Dict() {
  this.items = {};

  Dict.prototype.set = function (k, v) {
    this.items[k] = v;
  };

  Dict.prototype.has = function (k) {
    return this.items.hasOwnProperty(k);
  };

  Dict.prototype.remove = function (k) {
    if ( !this.has(k) ) {
      return false
    }
    delete this.items[k];
    return true;
  };

  Dict.prototype.get = function (k) {
    return this.has(k) ? this.items[k] : undefined;
  };

  Dict.prototype.keys = function () {
    return Object.keys(this.items);
  };

  Dict.prototype.clear = function () {
    this.items = {};
  };
}