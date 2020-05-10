// components/sub-bottom/sub-bottom.js
Component({
  /**
   * 组件的属性列表 
   */
  properties: {
    modalShow:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSubscribe(e){
      // 请求订阅消息
      const tmplIds= [
        "xlkCKe95W5X8cVP1mFH_SB708TKU4dH097RcvG9IhkQ"
      ]
      wx.requestSubscribeMessage({
        tmplIds:tmplIds,
        success:(res) => {
          console.log('is student')
          // 如果学生同意订阅消息
          if(res[tmplIds] === 'accept'){
            console.log('yes')
            getApp().globalData.hasSubscribe=true
            // 修改学生的订阅消息状态
            wx.cloud.callFunction({
              name: 'updataInfo',
              data: {
                uname:getApp().globalData.uname,
              },
              success:(res)=>{
                console.log('success')
              },
              fail:(res)=>{
                console.log(res)
              }
            })
          }
        },
        fail:(res)=>{
          console.log(res)
        },
        complete:(res)=>{
          // 隐藏底部弹出框
          this.setData({
            modalShow: false,
          })
          wx.reLaunch({
            url: `../index/index`,
          })
        }
      })
    }
  }
})
