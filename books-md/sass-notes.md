## 使用变量

### 1-1. 变量声明

- 使用 `$` 来标识变量

- 与 `CSS` 属性不同，变量可以定义在规则块`{...}`范围之外；定在在规则块之内时，只能在该规则块使用。

  ```scss
  nav {
      $width: 100px;
      width: $width;
  }
  ```

  

### 1-2. 变量引用

- 

  ```scss
  $highlight-color: #F90;
  $highlight-border: 1px solid $highlight-color;
  .selected {
      border: $highlight-border;
  }
  ```

  

## 嵌套规则

- `CSS`

  ```css
  #content article h1 { color: #333 }
  #content article p { margin-bottom: 1.4em }
  #content aside { background-color: #EEE }
  ```

- `sass`

  ```scss
  #content {
      article {
          h1 { color: #333 }
          p { margin-bottom: 1.4em }
      }
      aside { background-color: #EEE }
  }
  ```

  如上简单的场景可以使用此嵌套，但是涉及到伪类就不可了。

### 2-1. 父选择器的标识符 &

- `sass`

  ```scss
  article a {
      color: blue;
      &:hover { color: red }
  }
  ```

- `css`

  ```css
  article a { color: blue }
  article a:hover { color: red }
  ```



### 2-2. 群组选择器的嵌套

- `css`

  ```css
  .container h1, .container h2, .container h3 { margin-bottom: .8em }
  ```

- `sass`

  ```scss
  .container {
      h1, h2, h3 { margin-bottom: .8em }
  }
  ```



### 2-3. 子组合选择器`>`和同层组合选择器`~/+`

- `>`：选择某个元素下紧跟着的子元素

- `~`：选择具有一样的父元素的兄弟元素（不管隔了几个元素）

- `+`：选择具有一样的父元素的**相邻**兄弟元素

- `sass`

  ```scss
  article {
      ~ article { boder-top: 1px }
      > section {}
      dl > {
          dt {}
          dd {}
      }
      nav + & {}
  }
  ```

  

### 2-4. 嵌套属性

- 嵌套规则：把属性名从中划线 `-` 的地方断开，在根属性后边添加一个冒号 `:`，紧跟一个`{ }`块，把子属性部分写在这个`{ }`块中。

- `sass`

  ```scss
  nav {
      border: {
          style: solid;
          width: 1px;
          color: #ccc;
      }
  }
  ```

- `css`

  ```css
  nav {
      border-style: solid;
    	border-width: 1px;
    	border-color: #ccc;
  }
  ```

- `sass`

  ```scss
  nav {
      border: 1px solid #ccc {
          left: 0px;
          right: 0px;
          }
  }
  ```



## 导入 SASS 文件

- `@import` 规则：`sass`的 `@import` 规则在生成 `css` 文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个 `css` 文件中，而无需发起额外的下载请求。
- 使用 `sass` 的 `@import` 规则并不需要指明被导入文件的全名。



### 3-1. 使用 SASS 部分文件

- 约定 `sass` 局部文件的文件名以**下划线**开头；这样，`sass` 就不会在编译时单独编译这个文件输出 `css`，而只把这个文件用作导入。
- 导入 `themes/_night-sky.scss` 这个局部文件里的变量，你只需在样式表中写`@import` `"themes/night-sky";`



### 3-2. 默认值

- `sass`

  ```scss
  $width: 400px !default;
  .fancybox {
      width: $width;
  }
  ```

  用户在导入你的`sass`局部文件**之前**声明了一个`$width`变量，那么你的局部文件中对`$width`赋值`400px`的操作就无效。如果用户没有做这样的声明，则`$width`将默认为`400px`。



### 3-3. 嵌套导入

- `sass` 允许在规则块中使用 `@import` 命令导入局部文件

  _blue-theme.scss：

  ```scss
  aside {
      background: blue;
      color: white;
  }
  
  ```

  ```scss
  .blue-theme { @import "blue-theme" }
  ```

  被导入的局部文件中定义的所有变量和混合器，只会在这个规则范围内生效。



## 静默注释

```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```



## 混合器

- 使用混合器实现大段样式的重用

- `@mixin`

  ```scss
  @mixin rounded-corners {
      -moz-border-radius: 5px;
    	-webkit-border-radius: 5px;
    	border-radius: 5px;
  }
  
  notice {
      @include rounded-corners;
  }
  ```

  

### 5-2. 混合器中的css规则

- 混合器中可以包含属性也可以包含规则

  ```scss
  @mixin no-bullets {
    list-style: none;
    li {
      list-style-image: none;
      list-style-type: none;
      margin-left: 0px;
    }
  }
  ```



### 5-3. 给混合器传参

- `scss`

  ```scss
  @mixin link-colors($normal, $hover, $visited) {
      color: $normal;
      &:hover { color: $hover }
      &:visited { color: $visited; }
  }
  ```

  ```scss
  a {
      @include link-colors(
          $normal: blue,
        	$visited: green,
        	$hover: red
      )
  }
  ```

  

### 5-4. 默认参数

- `scss`

  ```scss
  @mixin link-colors(
      $normal,
      $hover: $normal,
      $visited: $normal
    )
  {
    color: $normal;
    &:hover { color: $hover; }
    &:visited { color: $visited; }
  }
  ```



## 使用选择器继承来精简CSS

- 一个选择器可以继承另一个选择器定义的所有样式；通过 `@extend`

```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

- 不仅会继承 `.error` 自身的所有样式，任何跟 `.error` 有关的**组合选择器样式**也会被继承。

```scss
//.seriousError从.error继承样式
.error a{  //应用到.seriousError a
  color: red;
  font-weight: 100;
}
h1.error { //应用到hl.seriousError
  font-size: 1.2rem;
}
```



