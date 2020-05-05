// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'new-blog-3oerd',
  traceUser: true,
})

// 云函数入口函数
exports.main = async(event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()

  const result = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
    data: {
      thing4: {
        value: '评价完成'
      },
      thing1: {
        value: event.content
      }
    },
    template_id: 'xlkCKe95W5X8cVP1mFH_SB708TKU4dH097RcvG9IhkQ',
    formId: event.formId
  })
  return result
}