// pages/WCAvailable/WCAvailable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:"Male",
    building:"01",
    cubicles: {},
    cubiclesInfo:[],
    genderArray:["Male","Female"],
    sideArray:["LW","SW"],
    buildingArray: ["01", "05", "06"],
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      building: this.data.building[val[0]],
      gender: this.data.gender[val[1]]
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  updateInfo: function(response){
    var myThis = this
    myThis.setData({
      cubicles: response.data["cubicles"]
    })

    var previous = 0
    var lineInfo = {}
    var finalCubicleInfo = []
    for (var cubicle in myThis.data.cubicles) {
      var line = parseInt(cubicle.substring(0, 4))
      var list = []
      for (var i = 0; i < cubicle.length; i++) {
        list.push(parseInt(cubicle[i]))
      }
      if (line != previous) {
        previous = line;
        lineInfo = {
          building: list[0],
          floor: list[1],
          gender: myThis.data.genderArray[list[3] - 1],
          side: myThis.data.sideArray[list[2] - 1],
          numbers: [myThis.data.cubicles[cubicle]]
        }
        finalCubicleInfo.push(lineInfo)
      }
      else {
        lineInfo.numbers.push(myThis.data.cubicles[cubicle])
      }
    }
    myThis.setData({
      cubiclesInfo: finalCubicleInfo
    })
  },
  onLoad: function (options) {
      this.setData({
        gender:options.gender,
        building:options.building,
      })
      var myThis = this;
      wx.request({
        url: 'https://wca-server.azurewebsites.net/getCubicles',
        success: function(response){ 
          myThis.updateInfo(response)
        }
      })

  },

  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index' + users.id,
      success: function (res) { }
    }
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