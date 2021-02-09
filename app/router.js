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

  //
  // router.resources(
  //   'menu',
  //   `/menu`,
  //   {
  //     get: 'menu:list',
  //     post: 'menu:add',
  //     put: 'menu:update',
  //     delete: 'menu:delete',
  //   },
  //   controller.menu
  // ) // 菜单路由

  app.router.resources('menu', '/api/menu', controller.menu)

  router.post('/user/list', controller.user.list)
  router.post('/user', controller.user.ctreat)
  router.post('/api/login', controller.common.login)
  router.get('/api/captcha', controller.common.captcha)
}
