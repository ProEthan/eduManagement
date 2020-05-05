// pages/register/register.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'student', value: '学生', checked: 'true' },
      { name: 'teacher', value: '教职工' },
    ],
    uposition: 'student',
    uname:'',
    utelephone:'',
    uclass:'',
    upwd:'',
    upwd2:'',
  },
  
  radioChange: function (e) {
    this.setData({
      uposition: e.detail.value,
    })
  },

  formsubmit(e){
    //
    let uname=e.detail.value.uname
    let utelephone=e.detail.value.utelephone
    let uclass=e.detail.value.uclass
    let upwd=e.detail.value.upwd
    let upwd2=e.detail.value.upwd2
    let uposition=this.data.uposition
    
    // 如果有空项
    if(uname==='' || utelephone==='' || uclass==='' || upwd==='' || upwd2 ===''){
      wx.showModal({
        title: '请输入完整',
        content: '',
      })
    }
    else if(upwd != upwd2){
      wx.showModal({
        title: '密码确认错误，请重新确认',
        content: '',
      })
    }
    else{
      // 判断此用户名是否已经注册过
      //
      wx.cloud.callFunction({
        name:'userLogin',
        data:{
          uname:uname,
          $url:'uinfo'
        }
      }).then((res)=>{
        if(res.result[0]==undefined){
          // 存入数据库
          console.log('注册成功')
          db.collection('user-info').add({
            data: {
              uname,
              utelephone,
              uclass,
              upwd,
              uposition,
            }
          }).then((res) => {
            wx.showToast({
              title: '注册成功',
            })

            // 返回Login页面，并且刷新
            wx.navigateBack()
            const pages = getCurrentPages()
            // console.log(pages)
            // 取到上一个页面
            const prevPage = pages[pages.length - 2]
            prevPage.onPullDownRefresh()
          })
        }
        else{
          wx.showModal({
            title: '此用户名已注册过,请重新输入',
            content: '',
          })
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