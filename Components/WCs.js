// Components/WCs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    line:String,
    cubicles:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    building: Number,
    floor: Number,
    side: String,
    gender: String,
    sideArray: ["","LW", "SW"],
    genderArray: ["Both", "Male", "Female"],
  },
  attached:function(){
    var list = []
    var myThis = this
    for (var i = 0; i < myThis.data.line.length; i++) {
      list.push(parseInt(myThis.data.line[i]))
    }
    var myThis = this
    myThis.setData({
      building: list[0],
      floor: list[1],
      gender: myThis.data.genderArray[list[3]],
      side: myThis.data.sideArray[list[2] - 1],
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
  } 
})
