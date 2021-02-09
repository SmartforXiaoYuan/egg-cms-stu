'use strict'

const Controller = require('egg').Controller

class MenuController extends Controller {
  constructor(...arg) {
    super(...arg)
    this.serviceName = 'menu'
  }
  // 查询单个
  async show() {
    console.log(this.serviceName + '.create')
    const { ctx, service } = this
    let validateResult = await ctx.checkValidate(ctx.params, 'base.show')
    if (!validateResult) return
    let id = ctx.helper.parseInt(ctx.params.id)
    const result = await service.menu.findByPk(id)
    ctx.returnBody(result, 100010)
  }

  // {
  //   "parentId": 0,
  //   "title": "undefined",
  //   "icon": "undefined",
  //   "menuType": "M",
  //   "orderNum": 1,
  //   "isFrame": "1",
  //   "visible": "1",
  //   "status": "1"
  // }

  // 新增
  async create() {
    const { ctx, service } = this
    let validateResult = await ctx.checkValidate(
      ctx.request.body,
      this.serviceName + '.create'
    )
    if (!validateResult) return
    let query = ctx.request.body
    query.createdAt = new Date()
    query.createdBy = ctx.state.user.userName
    const result = await service.menu.create(query)
    if (result) {
      ctx.returnBody(null, 100020)
    } else {
      ctx.returnBody(null, 100021, 500)
    }
  }

  // 修改
  async update() {
    const { ctx, service } = this
    let validateResult = await ctx.checkValidate(
      ctx.request.body,
      this.serviceName + '.update'
    )
    if (!validateResult) return
    let query = ctx.request.body
    query.updatedAt = new Date()
    query.updatedBy = ctx.state.user.userName
    const id = this.ctx.helper.parseInt(ctx.params.id)
    const result = await service.menu.update(query, {
      id,
    })
    if (result) {
      ctx.returnBody(null, 100030)
    } else {
      ctx.returnBody(null, 100031, 500)
    }
  }

  // 删除
  async destroy() {
    const { ctx, service } = this;
    let validateResult = await ctx.checkValidate(ctx.params, 'base.destroy')
    if (!validateResult) return
    const ids = ctx.params.id.split(',');
    const result = await service.menu.destroy(ids);

    if (result) {
      ctx.returnBody(null, 100040);
    } else {
      ctx.returnBody(null, 100041, 500);
    }
  }
}

module.exports = MenuController
