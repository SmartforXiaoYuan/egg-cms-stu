'use strict'

const Service = require('egg').Service

class SpiderService extends Service {
  async getNewsList() {
    //通过抓包接口返回数据

    //curl方法获取远程的数据

    var api = this.config.api + `appapi.php?a=getPortalList&catid=20&page=1`
    var response = await this.ctx.curl(api) //返回是Buffer

    var data = JSON.parse(response.data) //把Buffer 转换成对象， 也可以把字符串转换成对接
    console.log(data)
  }
}

module.exports = SpiderService
