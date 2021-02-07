Function.prototype.NewApply = function (context, args) {
  if ( context === null || context === undefined ) {
    context = window;
  } else {
    context = Object(context); // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
    console.log(context)
  }
  args = args || [];
  // 给 context 新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};