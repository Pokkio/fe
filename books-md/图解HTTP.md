## 第 1 章 了解 Web 及网络基础

### 1.3 网络基础 TCP/IP

#### 1.3.2 模型分层

- `TCP/IP` 模型分为4层：应用层、传输层、网络层、数据链路层（从上往下）
- 应用层决定了向用户提供应用服务时通信的活动。
- 传输层有两个性质不同的协议，`TCP` 和 `UDP`。
- 网络层处理在网络上流动的数据包，规定使用什么样的路径把数据包传送到对方计算机。
- 数据链路层处理连接网络的硬件部分。



#### 1.3.3 传输流图

[![JAqXgf.png](https://s1.ax1x.com/2020/04/16/JAqXgf.png)](https://imgchr.com/i/JAqXgf)



## 第 2 章 简单的 HTTP 协议

### 2.2 通过请求和响应的交换达成通信

- 请求报文组成：请求方法、请求URI、协议版本、可选的请求头部字段和内容实体构成。
- 响应报文组成：协议版本、状态码、解释状态码的短语、可选的响应头部字段及实体内容构成。



### 2.3 HTTP 是不保存状态的协议

> 即无状态（stateless）协议。



## 第 4 章 返回的 HTTP 状态码

### 4.1 状态码告知从服务器端返回的请求结果

状态码类别（第一位指定响应类别）：

|      | 类别         | 原因短语             |
| ---- | ------------ | -------------------- |
| 1XX  | Information  | 服务端正在处理请求   |
| 2XX  | Success      | 服务端已成功处理请求 |
| 3XX  | Redirection  | 请求重定向           |
| 4XX  | Client Error | 客户端参数错误       |
| 5XX  | Server Error | 服务端响应错误       |



### 4.2 常见状态码

1. `200` OK
2. `200 No Content`
   1. 不返回资源。
3. `206 Partial Content`
   1. 范围请求，返回请求字段 `Content-Range` 指定范围的实体内容。
4. `301 Moved Permanently`
   1. 资源永久重定向。
5. `302 Found`
   1. 临时重定向。
6. `303 See Other`
   1. 请求的资源存在另一个URI，应适用 `GET` 发起请求。
7. `304 Not Modified`
   1. 请求头包含（`If-Match/If-Modified-Since/If-None-Match/If-Range/If-Unmodified-Since`）任意一种时，但是值未满足条件时出现。
8. `400 Bad Request`
   1. 请求报文中存在语法错误。
9. `401 Unauthorized`
   1. 请求报文中未带有认证信息或认证失败。
10. `403 Forbidden`
    1. 请求的资源被服务端拒绝。
11. `404 Not Found`
    1. 服务端找不到该资源。
12. `500 Internal Server Error`
    1. 服务端在响应时发生错误。
13. `503 Service Unavaliable `
    1. 服务器正在维护，暂时无法处理请求。



## 第 5 章 与 HTTP 协作的 Web 服务器



## 第 6 章 HTTP 首部（HTTP 1.1）

### 6.1 HTTP 报文首部

- 请求中，报文由 方法、URI、HTTP 版本、HTTP 首部字段等组成。

- 响应中，HTTP 版本、状态码、HTTP 首部字段组成。



### 6.2 HTTP 首部字段

- 字段由字段名和字段值组成，以 英文冒号: 分隔开。
- 目前各浏览器中对报文首部同时出现多个重复的字段表现不一。



#### 通用首部字段

| 首部字段名        | 说明                       |
| ----------------- | -------------------------- |
| Cache-Control     | 控制缓存行为               |
| Connnection       | 逐跳首部、连接的管理       |
| Date              | 创建报文的日期             |
| Pragma            | 报文指令                   |
| Trailer           | 报文末端的首部一览         |
| Transfer-Encoding | 指定报文主体的传输编码方式 |
| Upgrade           | 升级为其它协议             |
| Via               | 代理服务器的相关信息       |
| Warning           | 错误通知                   |



#### 请求首部字段

| 首部字段名        | 说明                            |
| ----------------- | ------------------------------- |
| Accept            | 用户代理可处理的媒体类型        |
| Accept-Charset    | 优先的字符集                    |
| Accept-Encoding   | 优先的内容编码                  |
| Accept-Language   | 优先的自然语言                  |
| Authorization     | Web认证信息                     |
| Expect            | 期待服务器的特定行为            |
| From              | 用户的电子邮箱地址              |
| Host              | 请求资源所在的服务器            |
| If-Match          | 比较实体标记                    |
| If-Modified-Since | 比较资源的更新时间              |
| If-None-Match     | 比较实体标记（与 If-Match相反） |
| Range             | 实体的字节范围要求              |
| Referer           | 对请求中 URI 的原始获取方       |



#### 响应首部字段

| 首部字段名    | 说明                    |
| ------------- | ----------------------- |
| Accept-Ranges | 是否接受字节范围请求    |
| Age           | 推算资源创建时间        |
| ETag          | 资源的匹配信息          |
| Location      | 令客户端重定向至指定URI |



#### 实体首部字段

| 首部字段名       | 说明                         |
| ---------------- | ---------------------------- |
| Allow            | 资源支持的HTTP方法           |
| Content-Encoding | 实体主体适用的编码方式       |
| Content-Language | 实体主体的自然语言           |
| Content-Length   | 实体主体的大小（单位：字节） |
| Content-Location | 替代对应的资源URI            |
| Content-MD5      | 实体主体的报文摘要           |
| Content-Range    | 实体主体的位置范围           |
| Content-Type     | 实体主体的媒体类型           |
| Expires          | 实体主体过期的时间           |
| Last-Modified    | 资源最后的修改时间           |



其它首部字段：

Cookie、Set-Cookie...



### 6.3 HTTP/1.1 通用首部字段

> 通用首部字段：请求报文和响应报文双方都会使用的字段

#### Cache-Control

> 控制缓存的行为；多个指令使用 `,` 分隔

**请求指令**

| 指令           | 参数 | 说明                       |
| -------------- | ---- | -------------------------- |
| no-cache       | 无   | 强制向源服务器再次验证     |
| no-store       | 无   | 不缓存请求或响应的任何内容 |
| max-age = [秒] | 必需 | 响应的最大 Age 值          |
| ...            |      |                            |

**响应指令**

| 指令           | 参数   | 说明                     |
| -------------- | ------ | ------------------------ |
| public         | 无     | 可向任意方提供缓存       |
| private        | 可省略 | 仅向特定用户返回响应     |
| no-cache       | 可省略 | 缓存前必须先确认其有效性 |
| max-age = [秒] | 必需   | 响应的最大 Age 值        |
| ...            |        |                          |

**no-cache**

> 不缓存过期的资源

**no-store**

> 不缓存资源

**max-age**

> `Cache-Control: max-age=604800(秒)`
>
> 请求报文中包含 `max-age` 指令时，若缓存的资源缓存时间比指定的时间小，那么客户端接收缓存的资源；`max-age=0`，不接收缓存资源，重新向服务器请求资源。
>
> 响应报文中包含 `max-age` 指令时，缓存服务器将在 `max-age` 指定的时间内部再对资源的有效性进行确认。
>
> HTTP/1.1 中，若同时存在 `Expires` 字段和 `max-age` 指令的情况，会优先使用 `max-age` 指令，忽略 `Expires`；HTTP/1.0 反之。

#### Connection

> - 控制不再转发给代理的首部字段
> - 管理持久连接

**不再转发给代理的首部字段**

[![tt8ARx.png](https://s1.ax1x.com/2020/06/02/tt8ARx.png)](https://imgchr.com/i/tt8ARx)

**管理持久连接**

> HTTP/1.1 版本默认连接都是持久连接；客户端会在持久连接上连续发送请求，当服务器想断开时，指定 `Connection: close`



#### Date

> HTTP 报文创建的日期和时间



#### Trailer

> 事先说明在报文主体后记录哪些首部字段。该字段可应用在 HTTP/1.1 版本分块传输编码时。

![ttGqg0.png](https://s1.ax1x.com/2020/06/02/ttGqg0.png)



#### Transfer-Encoding

> 规定传输报文主体时采用的编码方式。
>
> HTTP/1.1 的传输编码方式仅对分块传输编码有效。



### 6.4 请求首部字段

#### Accept

> 通知服务器，客户端可处理的媒体类型及媒体类型的优先级；使用 type/subtype 形式，可指定多个媒体类型

- 文本文件

  `text/html, text/plain, application/xhtml+xml, application/xml`

- 图片文件

  `image/jpeg, image/gif, image/png...`

- 视频文件

  `video/mpeg, video/quicktime`

- 二进制文件

  `application/octet-stream, application/zip...`

给显示的媒体类型增加优先级，使用 `q=` 表示权重值。用分号分隔，返回是 0~1。

#### Accept-Charset

> 可用来通知服务器用户代理支持的字符集及 字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字 段 Accept 相同的是可用权重 q 值来表示相对优先级。

![ttBzyd.png](https://s1.ax1x.com/2020/06/02/ttBzyd.png)

#### Accept-Encoding

> 告知服务器用户代理支持的内容编码及内容编码的优先级

`Accept-Encoding: gzip, deflate`

- gzip
- compress
- deflate
- identify

#### Accept-Language

> 声明客户端能够处理的自然语言集

#### Authorization

> 认证

#### Host

> 告知服务器，请求的资源所处的互联网主机和端口号。此字段是 HTTP/1.1 规范内唯一必须被包含在请求报文；因为请求的主机可能是虚拟主机，一个物理主机上面可以分割为多个虚拟主机。
>
> 无设置主机名时，发送一个空值即可。

`Host: `

