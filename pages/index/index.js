// pages/WCAvailable/WCAvailable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderIndex:0,
    floorIndex:0,
    cubicles: {},
    allCubiclesInfo:{},
    filteredCubiclesInfo:{},
    genderArray:["Both","Male","Female"],
    floorArray: ["All","1", "2", "3","4","5"],
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      floorIndex:val[0],
      genderIndex: val[1]
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
    var finalCubicleMap ={}
    for(var cubicle in myThis.data.cubicles){
      var line = cubicle.substring(0,4)
      if(finalCubicleMap[line]==undefined){
        finalCubicleMap[line]={} 
      }
      finalCubicleMap[line][cubicle[4]]=myThis.data.cubicles[cubicle]
    }
    console.log(finalCubicleMap)
    myThis.setData({
      allCubiclesInfo:finalCubicleMap,
      filteredCubiclesInfo:finalCubicleMap
    })

  },
  onLoad: function (options) {
      var myThis = this;
      wx.request({
        url: 'https://wca-server.azurewebsites.net/getCubicles',
        success: function(response){ 
          myThis.updateInfo(response)
        }
      })
  },
  filterWC:function(){
    var myThis = this
    var newArray ={}
    for(var c in myThis.data.allCubiclesInfo){
      if(myThis.data.floorIndex!=0){
        if(myThis.data.floorIndex.toString()!=c[1])
          continue
      }
      if (myThis.data.genderIndex!=0){
        if (myThis.data.genderIndex.toString() != c[3])
          continue 
      }
      newArray[c] = myThis.data.allCubiclesInfo[c]
    }
    myThis.setData({
      filteredCubiclesInfo:newArray
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