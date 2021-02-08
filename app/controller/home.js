'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }

  async index2() {
    console.log(this)
    const { ctx } = this
    ctx.body = '用户管理'
  }
}

module.exports = HomeController
