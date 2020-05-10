// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'new-blog-3oerd',
  traceUser: true,
})

const db = cloud.database()

const userCollection = db.collection('user-info')

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return userCollection.where({
      uname:event.uname
    }).update({
      data: {
        hasSubscribe: true
      },
    })
  } catch(e) {
    console.error(e)
  }
}