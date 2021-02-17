/**
 * 实现 new 关键字
 */

function _new() {
  let obj = {};
  let Constructor = [].shift.apply(arguments);
  obj.__proto__ = Constructor.prototype;
  let result = Constructor.apply(obj, arguments);
  return typeof result == 'object' ? result : obj;
}

function Car(color, name) {
  this.color = color;
  this.name = name;
}

var car = _new(Car, "black", "BMW")

console.log(car.color);

console.log(car.name);