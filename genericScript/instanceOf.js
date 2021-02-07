/**
 * 模拟 instanceof
 * @param {*} L 
 * @param {*} R 
 */
function instanceOf(L, R) {
  //L 表示左表达式，R 表示右表达式
  let Rprototype = R.prototype // 显示原型
      Lproto = L.__proto__; // 隐式原型
  while ( true ) {
    if ( Lproto === null || Lproto == undefined ) return false;
    if ( Rprototype === Lproto ) return true;
    Lproto = Lproto.__proto__;
  }
}

function Person () {};
let p = new Person();

console.log(instanceOf(p, Person))