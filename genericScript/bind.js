Function.prototype.NewBind = function (context) {
  let fn = this;

  let firstArgs = Array.prototype.slice.call(arguments, 1); // 获取执行bind函数传入的参数

  const boundFn = function () {
    let secondArgs = Array.from(arguments); // 获取执行bind函数返回的函数调用时传入的参数

    // 当作为构造函数时，this 指向实例，fn 指向绑定函数，因为下面一句 `boundFn.prototype = fn.prototype;`，已经修改了 boundFn.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
    // 当作为普通函数时，this 指向 window，fn 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
    return fn.apply(this instanceof fn ? this : context, firstArgs.concat(secondArgs));
  };

  boundFn.prototype = fn.prototype;
  return boundFn;
};


var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.NewBind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);