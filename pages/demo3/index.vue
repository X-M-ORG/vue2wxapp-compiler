<template lang="pug">
  page
    view.title Demo3：这是小程序的 wxml
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