module.exports = {
  // 小程序文件输出路径
  outputPath: 'pages',

  // vue 文件路径
  codePath: 'src',

  // 是否将静态资源上传至 CDN
  assets2cdn: true,

  // CDN 的目录
  cdnDirname: 'drawing',

  // 使用的 CDN，值为 build/push 下的文件名
  cdnType: 'aliOss',

  // 本地 CDN 的映射文件
  cdnMapFile: 'build/cdn.js',

  // 阿里云OSS配置
  aliOss: {
    accessKeyId: '',
    accessKeySecret: '',
    region: '',
    bucket: ''
  }
}
