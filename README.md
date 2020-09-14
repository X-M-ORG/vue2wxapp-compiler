# 小程序开发辅助工具

写惯了 vue，再写小程序，多个文件切换 + 原生 css 写得确实不习惯，但是原有项目不可能变动。

使用 uniapp 和 mpvue 这种编译性的框架限制和效率太低，所以写了个小工具来辅助一下开发。

## 功能

如 demo3，可以在页面中使用 .vue 文件开发：

**index.vue**

```vue
<template lang="pug">
  page
    view.title 这是小程序的 wxml
    view.title {{ title }}
</template>

<script>
// 这是小程序的 JS
Page({
  data: {
    title: '这是小程序的 wxml'
  }
})
</script>

<style lang="sass">
.title
  color: red
  font-size: 14px
</style>

<json>
{
  "usingComponents": {},
  "disableScroll": true
}
</json>
```

编译后，在 index.vue 的同级目录会生成：

- index.json
- index.js
- index.wxml
- index.wxss

> 可以在 gulpfile.js 指定 outputPath 和 codePath ，指定 vue 的目录和输出目录，这样就可以分离 vue 文件和小程序文件了，如 demo 1、2

相应内容如下：

**index.wxml**

```
<view class="title">这是小程序的 wxml</view>
<view class="title">{{ title }}</view>
```

**index.js**

```js
// 这是小程序的 JS
Page({
  data: {
    title: '这是小程序的 wxml'
  }
})
```

**index.wxss**

```css
.title {
  color: red;
  font-size: 14px;
}
```

**index.json**

```json
{
  "usingComponents": {},
  "disableScroll": true
}
```

## 支持

- template: html、pug
- style: css、sass、stylus

## 使用

1. 拷贝此项目根目录下的 gulpfile.js 至你的项目中
2. npm i gulp gulp-watch stylus sass -D （可以根据项目需求进行拷贝使用）
3. node node_modules/gulp/bin/gulp.js
4. 创建 .vue 文件

为避免小程序上传 .vue 文件，可以给小程序的 project.config.json 添加配置，忽略 .vue 文件和 node_modules 上传

```json
{
  "description": "项目配置文件",
  "packOptions": {
    "ignore": [
      {
        "type": "file",
        "value": "package.json"
      },
      {
        "type": "file",
        "value": "package-lock.json"
      },
      {
        "type": "folder",
        "value": "node_modules"
      },
      {
        "type": "suffix",
        "value": ".vue"
      }
    ]
  }
}
```

## 缺陷 or 限制

小工具，总有些不完善，够用就行，有些问题列一下：

1. wxml 部分，为了能够适应 vetur 文件的一些规则，需要将内容放在 template - page 里
2. 工具只能 watch ，所以正常开发流程是先 watch，再创建 .vue 文件进行开发
