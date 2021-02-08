const Controller = require('egg').Controller
/**
 * @Controller user
 */
class UserController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }

  async ctreat() {
    /**
     * @summary 新增用户
     * @router post /user
     * @request body config value 传入参数
     */
    //上面的注释一定要，post请求，json对象为config，post请求必须创建app/contract/type.js 文件
    const { ctx } = this
    // 从前端获取post请求发来的数据
    const param = ctx.request.body
    const result = await ctx.model.User.create({
      nickName: param.nickName,
      password: param.password,
      phoneNum: param.phoneNum,
      email: param.email,
      dataFlag: 1,
    })
    console.log('add方法', result)
    if (result) {
      ctx.body = '创建成功'
    } else {
      ctx.body = '创建失败'
    }
  }

  // 新增
  async create() {
    const { ctx, service } = this
    let validateResult = await ctx.checkValidate(
      ctx.request.body,
      'user.create'
    )
    if (!validateResult) return
    ctx.request.body['password'] = await ctx.genHash(
      ctx.request.body['password']
    )
    let query = {
      userName: ctx.request.body['userName'],
      password: ctx.request.body['password'],
      deptId: ctx.request.body['deptId'],
      nickName: ctx.request.body['nickName'],
      sex: ctx.request.body['sex'],
      avater: ctx.request.body['avater'],
      email: ctx.request.body['email'],
      mobile: ctx.request.body['mobile'],
      remark: ctx.request.body['remark'],
      createdAt: new Date(),
      createdBy: ctx.state.user.userName,
    }
    const result = await service[this.app.config.public].admin[this.modleName][
      this.serviceName
    ].create(query)
    if (result) {
      ctx.returnBody(null, 100020)
    } else {
      ctx.returnBody(null, 100021, 500)
    }
  }

  async list() {
    const { ctx, app } = this
    const param = ctx.request.body
    console.log(param.pageSize, param.pageIndex)
    let result = await ctx.model.User.findAll({
      limit: param.pageSize,
      offset: param.pageIndex - 1,
      order: [['id', 'desc']],
    })
    ctx.returnBody(result, 100010)

    //指定返回的字段
    //ctx.body = await ctx.model.User.findAll({attributes: ['id', 'name'],limit: 10,order:[["id","desc"]]});
  }
}

module.exports = UserController
