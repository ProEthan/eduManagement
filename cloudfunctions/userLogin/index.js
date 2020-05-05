// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'new-blog-3oerd',
  traceUser: true,
})

const TcbRouter = require('tcb-router')

const db = cloud.database()

const userCollection = db.collection('user-info')

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  app.router('uinfo', async(ctx, next) => {
    const name = event.uname
    let w = {}
    w = {
      uname: name
    }

    let userInfomation = await userCollection.where(w).get().then((res) => {
        return res.data
    })
    ctx.body = userInfomation
  })

  app.router('classInfo', async(ctx, next) => {
    const className = event.uclass
    let w = {}
    w = {
      uclass: className
    }

    let userInfomation = await userCollection.where(w).get().then((res) => {
        return res.data
    })
    ctx.body = userInfomation
  })

  return app.serve()
}