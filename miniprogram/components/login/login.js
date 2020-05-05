// components/login/login.js
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
    onGotUserInfo(e){
      // 获取授权状态
      const userInfo=e.detail.userInfo
      // 授权成功
      if(userInfo){
        // 隐藏底部弹出框
        this.setData({
          modalShow: false,
        })
        // 传参userInfo到index中
        this.triggerEvent('loginsuccess',userInfo)
      }
      // 没有获取到权限，传失败状态到index中
      else{
        this.triggerEvent('loginfail')
      }
    }
  }
})
