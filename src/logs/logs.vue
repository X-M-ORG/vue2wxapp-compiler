<template lang="pug">
  page
    view.container.log-list
      block(wx:for="{{logs}}" wx:for-item="log")
        text.log-item {{index + 1}}. {{log}}
</template>

<script>
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log) => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
</script>

<style lang="stylus">
.log-list
  display flex
  flex-direction column
  padding 40rpx

  .log-item
    margin 10rpx
</style>

<json>
{
  "navigationBarTitleText": "查看启动日志",
  "usingComponents": {}
}
</json>