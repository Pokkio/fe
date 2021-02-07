### 原始数据类型

#### 布尔值
在 `TypeScript` 中，使用 `boolean` 定义布尔值类型
```JavaScript
let isDone: boolean = false;
```
`Boolean` 对象

```JavaScript
let obj: Boolean = Boolean(1);
```

#### 数值
使用 `number` 定义数值类型
```JavaScript
let dec: number = 1;
let hex: number = 0xf00d;
let binary: number = 0b0010;
let oct: number = 0o744;
let notNumber: number = NaN;
let infinity: number = Infinity;
```

#### 字符串
使用 `string` 定义字符串类型:
```JavaScript
let str: string = 'bar';
```

#### 空值
> 使用 `void` 来表示无定义返回值的函数

```JavaScript
function alertName(): void {
  alert('something');
}
```

#### null/undefined
```JavaScript
let u: undefined = undefined;
let n: null = null;
```
`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量

```JavaScript
let num: number = undefined;
let u: undefined;
let num: number = u;
```

void 类型的变量不能赋值给 number 类型的变量
```JavaScript
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.
```



### 任意值

> `any` 表示可以赋值为任意类型

```JavaScript
let x: any = 'seven';
x = 7;
```

#### 任意值的属性和方法
> 在任意值上访问任何属性都是允许的

```JavaScript
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

允许调用任何方法
```JavaScript
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```

#### 未声明类型的变量
> 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

```JavaScript
let something; // let something: any;
something = 'seven';
something = 7;
something.setName('Tom');
```



### 类型推论

> 如果声明赋值时没有明确的指定类型，那么 `TypeScript` 会依照类型推论（Type Inference）的规则推断出一个类型

```JavaScript
let myFavoriteNumber = 'seven'; // let myFavoriteNumber: string
myFavoriteNumber = 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```



### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种
```JavaScript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

#### 访问联合类型的属性或方法
> 当 `TypeScript` 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法

```JavaScript
function getLength(something: string | number): number {
    return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

`length` 不是 `string/number` 的共有属性，所以会报错。
联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

```JavaScript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```



### 对象的类型 - 接口

> 在 `TypeScript` 中，我们使用接口（Interfaces）来定义对象的类型

```JavaScript
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: 'Tom',
  age: 18
}
```
定义接口 `Person`，接着定义变量 `tom`，它的类型是 `Person`。这样就约束了 `tom` 的形状必须和接口 `Person` 一致

定义的变量比接口少/多一些属性是不允许的
```JavaScript
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: 'Tom'
};
// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

#### 可选属性
> 此时还是不允许添加未定义的属性

```JavaScript
interface Person {
  name: string;
  age?: number;
}
let tom: Person = {
    name: 'Tom'
};
```

#### 任意属性
> 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

```JavaScript
interface Person {
  name: string;
  age?: string; // age 不能取 number 
  [propName: string]: string;
}
```

可通过在任意属性中使用联合类型来修改
```JavaScript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
```

#### 只读属性
> `readonly`: 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

```JavaScript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
}; // 没有给 id 赋值

tom.id = 9527; // id 是只读属性
```



### 数组的类型

#### 类型 + 方括号 表示法
```JavaScript
let arr: number[] = [1, 2, 3];
```
此时数组中不允许出现其它类型的值，并且一些方法参数会根据定义时约束的类型进行限制
```JavaScript
let arr: number[] = [1, 2, 3];
arr.push('8');
// Argument of type '"8"' is not assignable to parameter of type 'number'.
```
`push` 方法此时根据数组定义只允许传入 `number` 类型的参数，但是却传了一个 "8" 类型的参数

#### 数组泛型
`Array<elemType>`
```JavaScript
let arr: Array<number> = [1, 2, 3];
```

#### 接口表示
> 接口也可以描述数组的形状，但是因为复杂一般比较少用

```JavaScript
let NumberArray {
  [index: number]: number;
}
let arr: NumberArray = [1, 2, 3];
```
`NumberArray` 表示：只要索引的类型是数字时，那么值的类型必须是数字。

#### 类数组
`Array-like Object`: `arguments` 等等；此类对象不能使用普通数组那样来描述，需要使用接口

```JavaScript
function () {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```
事实上常用的类数组都有自己的接口定义，如 `IArgument`s`, `NodeList`, `HTMLCollection` 等
```JavaScript
function sum() {
  let args: IArguments = arguments;
}
```

#### any
> 允许数组中存在任意类型的子元素

```JavaScript
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```



### 函数的类型

#### 函数声明
```JavaScript
function sum(x: number, y: number): number {
  return x + y;
}
```
输入多余或者少余的参数都是会报错的

#### 函数表达式
```JavaScript
let sum = function (x: number, y: number): number {}
```
以上等号左边是通过赋值操作进行类型推论
```JavaScript
let sum: (x: number, y: number) => number = function (x: number, y: number): number {}
```
`TypeScript` 中的 `=>`: 表示函数的定义；左边是输入类型（`(x: number, y: number)`），右边是输出类型（`number`）

#### 接口定义函数的形状
> 可以使用接口的方式约束函数表达式左边

```JavaScript
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

#### 可选参数
> 使用 `?` 表示，并且定义时跟在必需参数后面

```JavaScript
function foo(x: number, y?: number): any {}
```

#### 参数默认值
> 默认参数可在必需参数前面或者后面

```JavaScript
function foo(x: number, y: number = 1): any {}
function foo(y: number = 1, x: number): any {}
```

#### 重载
> 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

```JavaScript
function reverse(x: number | string): number | string {}
```
这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串

```JavaScript
function reverse(x: number): number; // 函数定义
function reverse(x: string): string; // 函数定义
function reverse(x: number | string): number | string {} // 函数实现
```
`TypeScript` 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。



### 类型断言
> 手动指定一个值的类型
>

#### 语法
```typescript
1. 值 as 类型
2. <类型>值
```

一般使用第一种方式，因为在 `ts` 中，`<类型>` 有可能是一个泛型；而在 `tsx` 语法中，这样的形式有可能是一个 `ReactNode`

#### 将联合类型断言为其中一个类型

> 当 `TypeScript` 不确定一个联合类型的变量是哪种类型时，只能访问此联合类型中的所有类型的共有属性和方法

```typescript
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
function getName(animal: Cat | Fish) {
    return animal.name;
}

function isFish(animal: Cat | Fish) {
    if (typeof animal.swim === 'function') {
        return true; // Property 'swim' does not exist on type 'Cat'.
    }
    return false;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') { // 将 animal 断言为 Fish
        return true;
    }
    return false;
}
```

类型断言无法避免运行时错误

```typescript
interface Cat {
    name: string;
    run(): void;
}

interface Fish {
    name: string;
    swim(): void;
}

function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom: Cat = {
    name: 'tom',
    run() { console.log('cat') }
};

swim(tom);
// animal.swim is not a function
```

> `(animal as Fish)` 将 `animal` 参数直接断言为 `Fish` 类型；一旦传入的参数是 `Cat` 类型的变量，那么就会导致运行错误。

#### 将一个父类断言为更加具体的子类

#### 将任何一个类型断言为 `any`

> 当引用一个已确定类型上不存在的属性或者方法时，会报错

```typescript
const foo: number = 1;
foo.length = 1;
// index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.

window.foo = 1;
// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

将 `window` 上添加一个属性 `foo`，但 `TypeScript` 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。

```typescript
(window as any).foo = 1;
```

在 `any` 类型的变量上，访问任何属性都是允许的。（慎用此断言）

#### 将 `any` 断言为一个具体的类型

> 类型断言把 `any` 断言为精确的类型

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key];
} // 返回值是 any
```

```typescript
interface Cat {
    name: string;
    run(): void;
}
const tom = getCacheData('tom') as Cat;
tom.run();
```

将 `getCacheData` 返回值断言为 `Cat` 类型，明确变量 `tom` 的类型。

#### 类型断言的限制

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 `any`
- `any` 可以被断言为任何类型
- 要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可

1. 类型断言不是类型转换，它不会真的影响到变量的类型

   ```typescript
   function toBoolean(something: any): boolean {
       return something as boolean;
   }
   toBoolean(1);
   // 返回值为 1
   ```

2. 类型声明是比类型断言更加严格的，最好优先使用类型声明



### 声明文件



### 内置对象

> 指的是 ES 和 DOM 等环境中的对象

#### ES 内置对象

```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error('403');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

#### DOM 和 BOM 内置对象

- `Document`、`HTMLElement`、`Event`、`NodeList` 等

```typescript
let body: HTMLElement = document.body;
let allDiv = document.querySelectorAll('div')
document.addEventListener('click', function(e: MouseEvent) {});
```



### 类型别名

> 用来给一个类型起新的名字

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```



### 字符串字面量类型

> 用来约束取值只能是某几个字符串中的一个

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {};
```



### 元组

> 元组不同于数组，不并使用 `any` 也可以合并不同类型的对象

```typescript
let tom: [string, number] = ['Tom', 25];
```

可以通过索引对其中一项赋值

```typescript
let tom: [string, number];
tom[0] = 'Tom';
```

若想直接对元组中的所有变量初始化赋值，需要指定所有元组类型的值

```typescript
let tom: [string, number];
tom = ['Tom']; // error
tom = ['Tom', 25];
```

#### 越界元素

> 添加越界的元素时，它的类型会被限制为元组中每个类型的**联合类型**

```typescript
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true); // error，添加越界的元素类型只能是 'string | number'
```



### 枚举

> Enum 类型用于取值被限定在一定范围内的场景，比如一周只能有七天

枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

#### 手动赋值

```typescript
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
```

未手动赋值的枚举项会**接着上一个枚举项递增**

```typescript
console.log(Days["Tue"] === 2); // true
```

如果未赋值的枚举项和手动赋值的重复了，前面的值会被后面的覆盖

```typescript
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```

手动赋值可以不是数字，此时需要使用类型断言让 tsc 来无视类型检查

```typescript
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat = <any>'S'};
```

手动赋值的枚举项可以是小数或负数，后续未赋值的枚举项的值递增步长为1

```typescript
enum Days {Sun = -7, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days['Mon'] === -6);
```

#### 常数项和计算所得项

> 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）

计算所得项（`'blue'.length` 就是一个计算所得项）

```typescript
enum Color {Red, Green, Blue = "blue".length};
console.log(Color['Red'] === 0);
console.log(Color['Green'] === 1);
console.log(Color['blue'] === 4);
```

**如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**

```typescript
enum Color {Red = "red".length, Green, Blue};
// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

#### 常数枚举

> 使用 `const enum` 定义的枚举类型；在编译阶段被删除，并且不能包含计算成员

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

