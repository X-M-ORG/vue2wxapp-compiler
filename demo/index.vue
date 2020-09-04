<json>
{
  "usingComponents": {},
  "disableScroll": true
}
</json>

<template>
  <page>
    <view class="title">这是小程序的 wxml</view>
    <view class="title">{{ title }}</view>
  </page>
</template>

<script>
// 这是小程序的 JS
Page({
  data: {
    title: '这是小程序的 wxml'
  }
})
</script>

<style lang="stylus">
.title
  color red
</style>
