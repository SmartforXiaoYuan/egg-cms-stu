// app.js 或 agent.js 文件：
class AppBootHook {
  constructor(app) {
    this.app = app
    console.log('我是 app.js')
  }
  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    // 例如：从数据库加载数据到内存缓存
    // All plugins have started, can do some thing before app ready
    await this.app.model.sync({ alter: true }) //force  false 为不覆盖 true会删除再创建; alter true可以 添加或删除字段;
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    // 应用已经启动完毕
  }

  async serverDidReady() {
    // Server is listening.
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
module.exports = AppBootHook
