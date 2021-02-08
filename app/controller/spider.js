'use strict'

const Controller = require('egg').Controller

class SpiderController extends Controller {
  async index() {
    this.ctx.body = 'spider'
    console.log('开始')
    console.log(await this.service)
    var list = await this.service['role'].findOne(1)
    // var list = await this.service.spider.getNewsList()
    console.log(list)
  }
}

module.exports = SpiderController
