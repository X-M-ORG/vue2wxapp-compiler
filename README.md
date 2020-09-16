# 小程序开发辅助工具

写惯了 vue，然后写小程序，痛点比较多，所以针对下面痛点写了这个小工具，可以辅助的功能：

- 使用 vue 文件的格式去开发小程序
- 可以使用 pug、stylus、sass 进行开发
- 自动上传 wxml、wxss 中 src、url 的图片资源并替换引用
- 上传的文件以 hash 值匹配，可以避免重复引入

## 目录

此项目为微信小程序 demo 的目录，新增了以下文件或目录

- build 目录：编译工具的目录
- src 目录：目录结构与 pages 相似，vue 文件所在目录
- gulpfile.js 文件：gulp 配置文件

## 功能

如次，可以在页面中使用 .vue 文件开发：

**index.vue**

```vue
<template lang="pug">
  page
    view.title 这是小程序的 wxml
    view.title {{ title }}
    image(src="/assets/index/bg.png")
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

> 可以在 build/config.js 指定 outputPath 和 codePath ，指定 vue 的目录和输出目录，这样就可以分离 vue 文件和小程序文件了，如 demo 1、2

相应内容如下：

**index.wxml**

```
<view class="title">这是小程序的 wxml</view>
<view class="title">{{ title }}</view>
<image src="https://cdn.com"></image>
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

## 使用

1. 拷贝此项目根目录下的 build 文件夹和 gulpfile.js 至你的项目中
2. npm i gulp gulp-watch stylus sass pug ali-oss -D （可以根据项目需求进行拷贝使用）
3. node node_modules/gulp/bin/gulp.js

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
        "type": "folder",
        "value": "build"
      },
      {
        "type": "suffix",
        "value": ".vue"
      }
    ]
  }
}
```

## 配置

build/config.js 下可配置一些参数

| name       | type    | default      | desc                                   |
| ---------- | ------- | ------------ | -------------------------------------- |
| outputPath | String  | pages        | 小程序文件输出路径                     |
| codePath   | String  | src          | vue 文件路径                           |
| assets2cdn | Boolean | false        | 是否将静态资源上传至 CDN               |
| cdnDirname | String  |              | 上传至此 CDN 的目录                    |
| cdnType    | String  | aliOss       | 使用的 CDN，值为 build/push 下的文件名 |
| cdnMapFile | String  | build/cdn.js | 本地 CDN 的映射文件                    |
| aliOss     | Object  |              | 阿里云 OSS 配置                        |

## 缺陷 or 限制

小工具，总有些不完善，够用就行，有些问题列一下：

1. wxml 部分，为了能够适应 vetur 文件的一些规则，需要将内容放在 template - page 里
2. 工具只能 watch ，所以正常开发流程是先 watch，再创建 .vue 文件进行开发
