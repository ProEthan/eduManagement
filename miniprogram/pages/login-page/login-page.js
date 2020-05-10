// pages/login-page/login-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',
    upwd:'',
    // 控制底部弹出层是否显示
    modalShow: false,
  },

  onInputUname(e){
    //
    this.setData({
      uname:e.detail.value
    })
  },
  onInputUpwd(e){
    //
    this.setData({
      upwd:e.detail.value
    })
  },

  // 点击登录按钮触发的事件函数
  formsubmit(e){

    let inputname=this.data.uname
    let inputpwd=this.data.upwd

    if(inputname==''){
      wx.showModal({
        title: '用户名不能为空，请重新输入',
        content: '',
      })
    }
    else if(inputpwd==''){
      wx.showModal({
        title: '密码错误，请重新输入',
        content: '',
      })
    }
    else{
      // 判断用户名和密码是否正确
      // ...
      wx.cloud.callFunction({
        name: 'userLogin',
        data: {
          uname:inputname,
          $url: 'uinfo'
        }
      }).then((res) => {
        if(res.result[0]==undefined){
          wx.showModal({
            title: '查询无此用户名，请重新输入',
            content: '',
          })
        }
        else{
          //
          console.log(res.result[0])
          let userInfo_name=res.result[0].uname
          let userInfo_telephone=res.result[0].utelephone
          let userInfo_class=res.result[0].uclass
          let userInfo_position=res.result[0].uposition
          let userInfo_pwd=res.result[0].upwd
          let userInfo_hasSub=res.result[0].hasSubscribe
          // 如果密码正确
          if(inputpwd==userInfo_pwd){
            getApp().globalData.uname=userInfo_name
            getApp().globalData.uposition=userInfo_position
            getApp().globalData.uclass=userInfo_class
            getApp().globalData.utelephone=userInfo_telephone
            if(userInfo_position=='student'){
              this.setData({
                modalShow: true,
              })
            }
            else{
              wx.reLaunch({
                url: `../index/index`,
              })
            }
          }
          else{
            wx.showModal({
              title: '密码输入错误,请重新输入',
              content: '',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})