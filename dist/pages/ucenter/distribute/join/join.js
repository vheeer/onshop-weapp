var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var user = require('../../../../services/user.js');
const app = getApp();
Page({
  data: {
    partner: [{
        id: 0,
        name: '梦想合伙人',
        original_price: 300,
        price: 8,
        first_commision: 20,
        second_commision: 10
      },
      {
        id: 1,
        name: '天使合伙人',
        original_price: 1000,
        price: 18,
        first_commision: 40,
        second_commision: 20
      }
    ],
    partnerList: ['梦想合伙人', '天使合伙人'],
    selectedPartnerIndex: 1,
    agree: false
  },
  onLoad: function (options) {
    const that = this;
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.getDistributeDetail()
    .then(function (res) {
      if (res.errno === 0) {
        that.setData(res.data);
        if (!res.data.is_distributor) {

        }
      }
    })
    .then(res => {
      
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  agree: function(e) {
    console.log('agree e', e);
    this.setData({
      agree: !this.data.agree
    })
  },
  showAgreement: function(e) {
    this.setData({});
    wx.showModal({
      title: '《合伙人须知》',
      content: ''
    })
  },
  changePartner: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectedPartnerIndex: e.detail.value
    })
  },
  getPhoneNumber(e){
    const that = this;
    const app = getApp();
    console.log("e.detail.errMsg", e.detail.errMsg);
    console.log("e.detail.iv", e.detail.iv);
    console.log("e.detail.encryptedData", e.detail.encryptedData);

    const { iv, encryptedData } = e.detail;
    if(iv && encryptedData)
    {
      util.request(api.Mobile, {
        iv, 
        encryptedData
      }, "POST")
      .then(function (res) {
        if (res.errno === 0) {
            console.log('获取手机', res.data);
            const userInfo = wx.getStorageSync("userInfo");
            const new_userInfo = Object.assign(userInfo, { mobile: res.data });
            wx.setStorageSync("userInfo", new_userInfo);
            that.setData({ mobile: res.data });
        }
      });
    }
  },
  getDistributeDetail() {
    let that = this;
    util.request(api.DistributeList, {}, "GET")
    .then(res => {
      console.log("获取我的分销订单res ", res)
    });
    return util.request(api.DistributeDetail, {
      
    })
  },
  formSubmit: function (e) {

    util.request(api.ApplyJoin, { distributor_level: 1 }, "POST")
    .then(function (res) {
      console.log("申请分销商 res: ", res);
      if(res.errno === 1){
        wx.showToast({ title: "申请中.." });
      }else{
        console.log("payPrepayId res: ", res);
        if (res.errno === 0) {
          let payParam = res.data;
          wx.requestPayment({
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function (res) {
              console.log("success to requestPayment and res is: ", res);
              wx.showModal({ 
                title: '提示', 
                content: '支付成功', 
                showCancel: false, 
                success: function(res) {
                  let userInfo = wx.getStorageSync('userInfo');
                  userInfo.is_distributor = 1
                  wx.setStorageSync('userInfo', userInfo)
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/ucenter/index/index'
                    })
                  }
                }
              })
            },
            'fail': function (res) {
              console.log("fail to requestPayment and res is: ", res);
            }
          })
        } else {
          wx.showModal({ 
            title: '提示', 
            content: '支付错误', 
            showCancel: false
          })
        }
      }
    });
  },
})