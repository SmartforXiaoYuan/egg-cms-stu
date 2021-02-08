module.exports = (app) => {
  const { router, controller } = app
  /**
   * 后台管理系统模块
   */
  // 特殊处理
  router.post(`/api/login`, controller[app.config.public].common.login) // 登录
  router.post(`/api/logout`, controller[app.config.public].common.logout) // 登出
  router.get(`/api/captcha`, controller[app.config.public].common.captcha) // 验证码

  /**
   * 系统模块
   */
  router.resources(
    'user',
    `/api/admin/system/user`,
    app.middleware.auth({
      get: 'system:user:list',
      post: 'system:user:add',
      put: 'system:user:update',
      delete: 'system:user:delete',
    }),
    controller[app.config.public].admin.system.user
  ) // 用户路由
}
