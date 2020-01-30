### 记录在开发过程中遇到的问题、如何解决、想法思考、计划迭代

### 起源
10月初，规划以一个完整的项目结束一个周期的学习计划。计划不用任何脚手架搭建开发一个全栈项目，前端技术栈为react+typescript+dva+antd, 后端使用原生node.js, 数据库使用xxxx

产品思路：最初在网易云笔记记录每日日志，日志内容有当日todo list、饮食运动记录、生活随笔、反思对标、英语日记等模块，运用一段时间后，发现想要统计完成次数或概览内容非常困难，于是在11月初萌生了自己开发满足自己需求的产品的想法。

有了这个想法之后，在11月15日开始艰难的搭建项目，沿用原始的方法，确定文件目录结构，新建webpack.config文件，先使用最小的架构让项目运行起来，再一步一步添加新的工具与架子。在这个过程中尝试只通过查看官方文档去搭建。

### 搭建时
* webpack官方文档很难啃，很难整理出，当前项目必须使用的loader集合，已经loader与loader之间的关联，得到的信息都是片段化的。

### 分支：version/12.27-01.10
#### 迭代目标：
* 完成前端框架完整配置，以确保下一个迭代开发页面功能时能够不受阻碍
* 具体内容为
  * 接入antd和dva，完成路由配置和页面布局
  * 接入typescript和eslint
  * 接入jest

#### 2020.01.03
此文档于2020.01.03建立，因此问题记录也从当天开始。

* 接入dva报错
```
Can't resolve '@babel/runtime/core-js/get-iterator'
```
1. 通过npm search @babel/runtime得到搜索结果有@babel/runtime @babel/runtime-corejs2 @babel/runtime-corejs3
2. npm i @babel/runtime @babel/runtime-corejs2 @babel/runtime-corejs3 --save 后依然报错
3. rm -rf node_modules > npm i > npm start 删除node_modules文件夹，再重新下载包，再启动项目，就不再报错了。

*  接入typescript
1. 将 .js 文件重命名为 .ts
```
find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} ;
```
2. 将typescript添加到babel中
```
npm install --save @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread
```
3. 配置.babellrc文件
```
{
  "presets": [
    "@babel/typescript"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
```
4. 添加 “check-types” 命令
```
"scripts": {
  "check-types": "tsc"
}
```
#### 2020.01.06 接入typescript时loader问题
接入typescript配置webpack时被卡住，webpack+bable+typescript的组合使得这三个官方文档都有配置说明，但每个地方的配置说明都并不详尽。（最后证明了是我没有找对地方。。。）并且不太清楚babel options中preset-env\env, preset-typescript\typtscript的区别，都一一试过，最终的.babelrc文件长这样
```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
```
此时出现报错，如下
```
You may need an additional loader to handle the result of these loaders.
| import React from 'react';
| import Layout from './layout';
```
在这个地方被卡住了很久，四处找解决方式，开始搜索别人的分享和教程，并没有意识到缺失的loader与react有关。最后在typescript官方文档[实例](https://www.tslang.cn/samples/index.html)中找到了解决方法，引入"@babel/preset-react"一行，问题解决。最终.babelrc文件如下
```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
```

#### 2020.01.06 接入typescript后出现样式消失
解决思路：查看antd文档，查看“在typescript使用”， 按照指引新建index.less，引入'~antd/dist/antd.css'文件，问题解决。

#### 2020.01.06 接入数据请求库的选择
在fetch和request库中抉择， fetch API是简单标准化的API，可以直接使用不需要引库；request是使用比较广泛的极简至上的库，也是公司项目使用的库，使用上比较熟悉。最终决定使用fetch，原因是作为一个标准的api却没有在项目中用过，这次刚好是个机会。

使用fetch-mock作为mock库

#### version/12.27-01.10 迭代总结
1. 该迭代的目标是搭建完整的框架，保证页面开发时能够顺畅一些
2. 目前最初的设想到的库已经接入完毕，目标已经达到
3. 但不可否认的是，现在的实现方案还需要很多优化，多个工具并没有很好的融合，刚刚接触TS，写法上还有很多问题。
4. 但刚刚开始要求尽善尽美是不现实的，现在的目标是让迭代计划顺利进行，尽快完成一个可用的功能，在可用的基础上再不断参考、积累、吸收优秀方案，优化我的产品。

#### version/01.09-01.23 迭代计划
1. 完成日志列表和日志详情的开发
2. 完成模板配置页面开发