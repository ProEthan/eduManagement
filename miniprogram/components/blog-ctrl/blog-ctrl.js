// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
const db = wx.cloud.database()
// 最大上传图片数量
const MAX_IMG_NUM = 4
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object,
  },
  externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang', 'icon-shanchu', 'icon-jiahao'],

  /**
   * 组件的初始数据
   */
  data: {
    // 登录组件是否显示
    loginShow: false,
    // 底部弹出层是否显示
    modalShow: false,
    // 输入内容
    content: '',
    // 图片
    images: [],
    // 是否显示加号
    selectPhoto: true, // 添加图片元素是否显示
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
      // 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true,
                })
              }
            })
          } else {
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },

    onLoginsuccess(event) {
      userInfo = event.detail
      // 授权框消失，评论框显示
      this.setData({
        loginShow: false,
      }, () => {
        this.setData({
          modalShow: true,
        })
      })
    },

    onLoginfail() {
      wx.showModal({
        title: '授权用户才能进行评价',
        content: '',
      })
    },

    onChooseImage() {
      // 还能再选几张图片
      let max = MAX_IMG_NUM - this.data.images.length
      wx.chooseImage({
        count: max,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log(res)
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
          // 还能再选几张图片
          max = MAX_IMG_NUM - this.data.images.length
          this.setData({
            selectPhoto: max <= 0 ? false : true
          })
        },
      })
    },
    onDelImage(event) {
      this.data.images.splice(event.target.dataset.index, 1)
      this.setData({
        images: this.data.images
      })
      if (this.data.images.length == MAX_IMG_NUM - 1) {
        this.setData({
          selectPhoto: true,
        })
      }
    },
    onPreviewImage(event) {
      // 6/9
      wx.previewImage({
        urls: this.data.images,
        current: event.target.dataset.imgsrc,
      })
    },


    onSend(event) {
      // 插入数据库
      let formId = event.detail.formId
      let content = event.detail.value.content
      if (content.trim() == '') {
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title: '评论中',
        mask: true,
      })

      let promiseArr = []
      let fileIds = []
      // 图片上传
      for (let i = 0, len = this.data.images.length; i < len; i++) {
        let p = new Promise((resolve, reject) => {
          let item = this.data.images[i]
          // 文件扩展名
          let suffix = /\.\w+$/.exec(item)[0]
          wx.cloud.uploadFile({
            cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 1000000 + suffix,
            filePath: item,
            success: (res) => {
              console.log(res.fileID)
              fileIds = fileIds.concat(res.fileID)
              resolve()
            },
            fail: (err) => {
              console.error(err)
              reject()
            }
          })
        })
        promiseArr.push(p)
      }
      // 存入到云数据库
      Promise.all(promiseArr).then((res) => {
        db.collection('blog-comment').add({
          data: {
            content,
            createTime: db.serverDate(),
            blogId: this.properties.blogId,
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            img: fileIds,
            uname: getApp().globalData.uname,
          }
        }).then((res) => {
          wx.hideLoading()
          wx.showToast({
            title: '评论成功',
          })
          this.setData({
            modalShow: false,
            content: '',
          })
  
          // 父元素刷新评论页面
          this.triggerEvent('refreshCommentList')
        })
      })





      // db.collection('blog-comment').add({
      //   data: {
      //     content,
      //     createTime: db.serverDate(),
      //     blogId: this.properties.blogId,
      //     nickName: userInfo.nickName,
      //     avatarUrl: userInfo.avatarUrl
      //   }
      // }).then((res) => {
      //   if(this.properties.blog.hasSubscribe == true){
      //     // 推送模板消息
      //     wx.cloud.callFunction({
      //       name: 'sendMessage',
      //       data: {
      //         content,
      //         formId,
      //         blogId: this.properties.blogId
      //       }
      //     }).then((res) => {
      //       console.log(res)
      //     })
      //   }

      //   wx.hideLoading()
      //   wx.showToast({
      //     title: '评论成功',
      //   })
      //   this.setData({
      //     modalShow: false,
      //     content: '',
      //   })

      //   // 父元素刷新评论页面
      //   this.triggerEvent('refreshCommentList')
      // })
    },

  }
})