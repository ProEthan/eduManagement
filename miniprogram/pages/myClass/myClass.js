// pages/myClass/myClass.js
let uclass=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachers:[],
    students:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uclass=getApp().globalData.uclass,
    wx.showLoading({
      title: '拼命加载中',
    })
    wx.cloud.callFunction({
      name: 'userLogin',
      data: {
        uclass,
        $url: 'classInfo',
      }
    }).then((res) => {
      console.log(res.result)
      //
      let num=res.result.length;
      let _teachers=[]
      let _students=[]
      for(let i=0;i<num;i++){
        let people=res.result[i]
        if(people.uposition=='teacher'){
          _teachers.push(people)
        }
        else{
          _students.push(people)
        }
      }
      this.setData({
        teachers:_teachers,
        students:_students
      })

      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
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