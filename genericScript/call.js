Function.prototype.NewCall = function (context, ...args) {
  if ( context === null || context === undefined ) {
    context = window;
  } else {
    context = Object(context);
  }
  args = args ? args : [];
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}