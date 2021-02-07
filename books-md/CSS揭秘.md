## 第1章 引言

1. 媒体查询的断点不是应该由具体的设备来决定，而是根据自身的设计来决定；因为需要面向的设备太多。
2. 使用百分比长度来取代固定长度；次之是使用和视口相关的单位（vw/vh/vmin/vmax）
3. 在较大分辨率屏幕下取固定宽度时，使用 `max-width` 而不是 `width`，因为它可适应较小的分辨率，无需使用媒体查询。
4. 为替换元素（img/object/video/iframe）设置一个 `max-width: 100%`



## 第 2 章 背景与边框

### 1 半透明边框

![1588687711296](C:\Users\A\AppData\Roaming\Typora\typora-user-images\1588687711296.png)

1. 默认情况下，元素背景颜色会延伸到边框所在的区域下层；在 CSS 2.1 中，这就是背景的工作原理。

   ```css
   border: 10px solid hsla(0, 0%, 100%, .5);
   background: white;
   ```

   但是现在可以通过 `background-clip` 属性来调整，让背景颜色不侵入到边框上面。

   `background-clip` 属性默认值是 `border-box`，意味着背景会被元素的边框的外沿框裁剪；可以修改为 `padding-box` ，浏览器就会适用元素的内边距把背景裁剪。

   ```css
   border: 10px solid hsla(0, 0%, 100%, .5);
   background: white;
   background-clip: padding-box;
   ```

   

### 2 多重边框

![Ykm7Af.png](https://s1.ax1x.com/2020/05/05/Ykm7Af.png)

1. 多重边框可以通过 `border-image` 属性设置，但是这可能需要添加额外的元素及图片；在 CSS 层面进行操作可使用 `box-shadow` 。

   `box-shadow`：接收四个参数（x偏移量, y偏移量, 模糊半径, 扩张半径）并且可以使用多个逗号分隔符实现多重叠加，第一层投影位于最顶层，依次类推。

   ```css
   background: yellowgreen;
   box-shadow: 0 0 0 10px #65,
   			0 0 0 15px deeppink;
   ```

2. `box-shadow` 投影和 `border` 边框行为不一致，并不影响布局（不占据元素的宽度和高度，相邻元素若无设置 `margin/padding` 隔开，那么阴影会重叠），也不会受到 `box-sizing` 的影响。

3. 两重边框

   可以使用 `border` 和 `outline` 配合即可。

   ```css
   border: 10px solid #655;
   background: yellowgreen;
   width: 100px;
   height: 100px;
   outline: 5px solid deeppink;
   ```

   `outline`：描述的是 `border` 外面的一层轮廓，不占据空间。



### 3 灵活的背景定位

![YkmR9e.png](https://s1.ax1x.com/2020/05/05/YkmR9e.png)

1. CSS3 中对 `background-position` 进行扩展，允许对指定任意背景图片对任意角的偏移量。

   指定背景图片跟右边缘保持 20px 的偏移亮并同时跟底边保持 10px 的偏移量。

   ```css
   background: url(code-pirate.svg) no-repeat #58a;
   background-position: right 20px bottom 10px;
   ```

2. 回退方案

   ```css
   background: url(code-pirate.svg) no-repeat bottom right #58a;
   background-position: right 20px bottom 10px;
   ```

3. `background-origin` 可以辅助 `background-position` 始终偏移量和内边距一致。`background-position` 中的 `top/left` 默认值是以 `padding-box` 为准。`background-origin` 可以修改此行为，改成以 `content-box` 为准。

   ```css
   padding: 10px;
   background: url(code-pirate.svg) no-repeat bottom right #58a;
   background-origin: content-box;
   ```

4. `calc()` ：指定背景图片跟右边缘保持 20px 的偏移亮并同时跟底边保持 10px 的偏移量。**（函数内部 - + 运算符两侧各加一个空白符，不然会解析错误）**

   ```css
   background: url(code-pirate.svg) no-repeat #58a;
   background-position: calc(100% - 20px) calc(100%- 10px);
   ```



### 4 边框内圆角

![YkmFOI.png](https://s1.ax1x.com/2020/05/05/YkmFOI.png)

1. 使用两个 `div` 元素嵌套

   ```html
   <div class="box1">
       <div class="box2">
           test test test
       </div>
   </div>
   
   <style>
       .box1 {
           background: #655;
           padding: .8em;
       }
       
       .box2 {
           background: #tan;
           border-radius: .8em;
           padding: 1em;
       }
   </style>
   ```

2. hack 方案

   ```html
   <div class="box1">
   	test test test
   </div>
   
   <style>
   	div {
         background: tan;
         border-radius: .8em;
         padding: 1em;
         box-shadow: 0 0 0 .6em #655;
         outline: .6em solid #655;
       }
   </style>
   ```

   `outline` 不会跟着 `border` 为圆的边框走，但是 `box-shadow` 会填充描边和边框之间的空隙。



### 5 条纹背景

![YkMP4f.png](https://s1.ax1x.com/2020/05/05/YkMP4f.png)

1. 水平条纹

   ```css
   background: linear-gradient(#fb3 20%, #58a 80%);
   ```

   容器顶部 20% 区域被填充为 `#fb3` 颜色，容器底部 20%（100% - 80%） 被填充为 `#58a` 颜色。

2. 多个色标在相同位置

   ```css
   background: linear-gradient(#fb3 50%, #58a 50%);
   ```

   没有任何渐变颜色。

3. `background-size` 控制尺寸

   ```css
   background: linear-gradient(#fb3 50%, #58a 50%);
   background-size: 100% 30px;
   ```

   两条条纹分隔为上下 15px，且背景默认情况下是重复平铺的，会填满容器。

4. **如果某个色标的位置值比整个列表中在它之前的色标的位置值都要 小，则该色标的位置值会被设置为它前面所有色标位置值的最大值。**

   如果我们把第二个色标的位置值设置为 0，那它的位置就 总是会被浏览器调整为前一个色标的位置值。

   ```css
   background: linear-gradient(#fb3 30%, #58a 0) == linear-gradient(#fb3 30%, #58a 30%);
   background-size: 100% 30px;
   ```

5. 垂直条纹

   ```css
   background: linear-gradient(to right/90deg(逆时针), #fb3 50%, #58a 0);
   background-size: 30px 100%;
   ```




### 6 复杂的背景图案



### 7 伪随机背景



### 8 连续的图像边框



## 第 3 章 形状

### 9 自适应的椭圆

1. `border-radius` 接受一个百分比值，基于元素的尺寸进行解析，从而实现一个自适应椭圆。

   ```css
   width: 200px;
   height: 200px;
   background: #fb3;
   border-radius: 50% / 50%; /* == border-radius: 50% */
   ```

   `border-radius` 是基于元素的 `border-box` 进行切圆角处理，无边框时看不出差异；有边框时，以边框外侧的拐角作为切圆角的标准。

2. 半椭圆

   ```css
   border-radius: 50% 50% 0 0 / 100% 100% 0 0;
   ```

   `border-radius` 是 `border-top-left-radius/-top-right-/-bottom-left-/-bottom-right-` 的简写，从左上角顺时针顺序应用到拐角。以 `/` 分开，前面是横轴的值，后面是纵轴的值。

3. 四分之一椭圆

   ```css
    border-radius: 100% 0 0 0
   ```



### 10 平行四边形

1. `skewX`：进行拉伸，但是会对标签里面的文本进行拉伸。

   ```css
   div {
       width: 200px;
       height: 200px;
       background: #fb3;
       transform: skewX(-45deg);
   }
   ```

2. 嵌套元素，对文本进行一次方向拉伸。（需要多渲染一个标签）

   ```css
   div > p {
       transform: skewX(45deg);
   }
   ```

3. 伪元素解决

   ```css
   div {
       position: relative;
   }
   
   div::before {
       content: '';
       position: absolute;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: -1;
       background: #58a;
       transform: skewX(45deg);
   }
   ```

   给宿主使用 相对定位，伪元素使用绝对定位，再配合 `top/left/bottom/right = 0` 拉伸至和宿主元素一样的尺寸；但是此时伪元素的层面会遮住宿主元素，因此需要使用 `z-index` 将伪元素层次降低。



### 11 菱形图片



### 12 切角效果



### 13 梯形标签页



### 14 简单的拼图



## 第 4 章 视觉效果

### 15 单侧投影

1. `box-shadow: x轴偏移量 y轴偏移量 模糊半径 扩张半径 颜色`

   ```css
   box-shadow: 2px 3px 4px rgba(0,0,0, ,5);
   ```

   投影向右移动 2px，向下移动 3px；

   各个方向投影计算：

   顶部：因为 y 轴向下偏移，模糊半径 - y轴偏移量（4 - 3）

   左侧：因为 x 轴向右偏移，模糊半径 - x轴偏移量（4 - 2）

   底部：模糊半径 + y轴偏移量（4 + 3）

   右侧：模糊半径 + x轴偏移量（4 + 2）

   以上计算后的结果只是大概，接近此数值。

   扩张半径：根据指定值扩张或缩小投影（-5px：投影宽度和高度都会缩小10px）

   ```css
   box-shadow: 0px 5px 4px -4px rgba(0, 0, 0, .5);
   ```

   实现底部的单侧投影；扩张半径的负值刚好等于模糊半径，把投影效果缩小，然后向下移动，将底部的投影显示。

2. 双侧投影

   ```css
   box-shadow: 5px 0 4px -4px rgba(0, 0, 0, .5),
   			-5px 0 4px -4px rgba(0, 0, 0, .5);
   ```



### 16 不规则投影

