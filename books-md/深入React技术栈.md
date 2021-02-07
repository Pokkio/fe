## 1 初入 React 世界

### 1.5 React 生命周期

通常把 React 生命周期分成两类：

- 当组件在挂载时或卸载时；
- 当组件接收新的数据时，即组件更新时；



#### 1.5.2 数据更新过程

> 指父组件向下传递 props 或组件自身执行 setState 方法时的一系列更新动作。

组件自身 `state` 更新，会依次执行 `shouldComponentUpdate` -> `componentWillUpdate` -> `render` -> `componentDidUpdate` 。

`shouldComponentUpdate` 是一个特别的方法，它接收需要更新的 `props` 和 `state`，让开发者增加必要的条件判断，让其在需要时更新，不需要时不更新。因此，**当方法返回 `false` 的时候，组件不再向下执行生命周期方法**。

默认情况下，父节点更新 `props` 时，React 会重新渲染所有节点，因为 `shouldComponentUpdate` 默认返回 `true`；另一方面该方法也是性能优化的一部分。



#### 1.5.3 生命周期流程

![duEg1I.png](https://s1.ax1x.com/2020/08/18/duEg1I.png)



### 1.6 React 与 DOM

#### 1.6.3 refs

> 组件内，JSX 返回的是一个 `ReactElement` 。
>
> refs 是特殊的 `prop` ，可附加到任意组件上；组件被调用时会新建一个该组件的实例，而 refs 就会指向这个实例。
>
> 可以是一个回调函数，这个回调函数会在组件被挂载后立即执行。

```react
class App extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if ( this.myTextInput !== null ) {
      this.myTextInput.focus()
    }
  }

  render() {
    return(
      <div>
        <input type='text' ref={(ref) => this.myTextInput = ref} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.handleClick}
        />
      </div>
    )
  }
}
```

以上是放在原生组件 input 上，得到组件的实例；也可以放在 React 组件上，从而调用组件的实例方法。



