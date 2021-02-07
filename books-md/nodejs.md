## 模块

### fs

#### 功能

- `fs.stat` - 检测是文件还是目录

  ```javascript
  fs.stat(file or directory, (err, data) => {
      if (data.isFile()) {}
      if (data.isDirectory()) {}
  })
  ```

- `fs.mkdir` - 创建目录

  ```javascript
  fs.mkdir(directory, mode, err => {})
  ```

- `fs.writeFile` - 创建并写入文件

- `fs.appendFile` - 追加文件

- `fs.readFile` - 读取文件

- `fs.readdir` - 读取目录

- `fs.rename` - 重命名

  ```javascript
  fs.rename(oldName, newName, err => {}) {}
  ```

- `fs.rmdir` - 删除目录

- `fs.unlink` - 删除文件

- `fs.createReadStream` - 流读取（适用于较大文件读取上传下载）

  ```javascript
  const readStream = fs.createReadStream(file)
  readStream.on('data', data => {}) // 流读取为分开读取，每次读取一点
  readStream.on('end', () => {}) // 监听读取完成
  readStream.on('error', (err) => {})
  ```

- `fs.createWriteStream` - 写入文件（适用于较大文件）

  ```javascript
  let data
  const writeStream = fs.createWriteStream(outputFile)
  writeStream.write(data, 'UTF8')
  writeStream.end()
  writeStream.on('finish', () => {})
  writeStream.on('error', () => {})
  ```

- 管道流（适用于大文件的复制）

  ```javascript
  const readStream = fs.createReadStream(file)
  const writeStream = fs.createWriteStream(outputFile)
  readStream.pipe(writeStream)
  ```

## 框架

### express

```javascript
const express = require('express')
const app = express()
app.listen(3000)

// get
app.get(route, (req, res) => {
    res.send(something)
})

// post
app.post(route, (req, res) => {
    res.send()
})

// put
app.put(route, (req, res) => {})

// delete
app.delete(route, (req, res) => {})
```



#### ejs

> 模板引擎

```javascript
// express 配置 ejs
app.set('view engine', 'ejs') // 模板文件默认放在 views 文件夹下，以 .ejs 结尾

// ejs 模板替换变量
app.get(route, (req, res) => {
    let title = 'ejs'
    res.render('index', {
        title
    })
})
// index.ejs
<%=title%>

// 格式化标签
<%-variable%>

// 条件判断
<%if () {%>
    something
<%}%>
    
// 模板文件引入文件
<%- include('file') %>
```



#### 托管静态文件

```javascript
app.use(express.static('staticDiretory'))
```



#### 中间件

> 中间件是匹配路由之前或匹配完成时做的一系列操作。
>
> - 应用级中间件
> - 路由级中间件
> - 错误处理中间件
> - 内置中间件
> - 第三方中间件

##### 应用级

```javascript
const app = express()
// 常用于权限判断
app.use((req, res, next) => {
  do something
  next()
})
```

##### 路由级

> 少用

```javascript
app.get('/node/add', (req, res, next) => {
  next()
})

app.get('/node/:id', (req, res, next) => {
  res.render('id')
})
```

即匹配到 `/node/add` 路由时再继续匹配 /node/:id`

##### 错误级

```javascript
// 放在所有路由末尾，捕捉匹配不到的
app.use((req, res, next) => {
    do something
})
```

##### 内置中间件

```javascript
// 例如配置静态文件
// 一般放在路由匹配最顶部
app.use(express.static('staticDiretory'))
```

##### 第三方中间件

```javascript
// 获取 post 提交的参数
// 使用 req.body 提取
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```

