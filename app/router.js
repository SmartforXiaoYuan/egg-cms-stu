'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  console.log('我是 router.js')

  //废弃
  // app.beforeStart(async () => {
  //   await app.model.sync({ alter: true }) //force  false 为不覆盖 true会删除再创建; alter true可以 添加或删除字段;
  // })
  app.router.redirect('/', '/swagger-ui.html', 302) //重定向到swagger-ui.html
  const { router, controller } = app
  // router.get('/', controller.home.index)
  router.get('/index2', controller.home.index2)
  router.get('/spider', controller.spider.index)

  app.router.resources('menu', '/api/menu', controller.menu)
  //http://localhost:7001/api/menu/1
  app.router.resources('dictType', '/api/dictType', controller.dictType)
  app.router.resources('dictData', '/api/dictData', controller.dictData)
  app.router.resources('department', '/api/department', controller.department)
  app.router.resources('role', '/api/role', controller.role)

  router.get(`/api/system/getInfo`, controller.user.getInfo) // 获取用户信息
  app.router.resources('user', '/api/user', controller.user)

  // router.post('/user/list', controller.user.list)
  router.post('/user/cre2', controller.user.ctreat2) //测试swagger的
  router.post('/api/login', controller.common.login)
  router.get('/api/captcha', controller.common.captcha)
}
