/**
 * 用户相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * 调用微信登录
 */
function loginByWeixin() {

  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code;
      return util.getUserInfo();
    }).then((userInfo) => {
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
        if (res.errno === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('others', res.data.others);
          
            console.log("loginByWeixin", res.data.userInfo);
            const { id, referee: referee_old } = res.data.userInfo;
            console.log("referee_old", referee_old);
            // 如果是第一次登陆（referee是null）
            if (referee_old === null){
              util.request(api.SetReferee, {
                referee: wx.getStorageSync('referee_inter')
              }, "POST")
              .then(function (res) {
                console.log("设置第一次登录的referee res: ", res);
              });

              
              // wx.showToast({
              //   title: "第一次登陆"
              // })
            }else{

            }


          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {

      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}
/**
 * 调用微信登录
 */
function getmobile({ iv, encryptedData }) {
  return new Promise((resolve, reject) => {
    return util.request(api.Mobile, { iv, encryptedData }, 'POST')
    .then(res => {
      if (res.errno === 0) {
        //存储用户信息
        const userInfo = wx.getStorageSync('userInfo');
        userInfo.mobile = res.data;
        wx.setStorageSync('userInfo', userInfo);

        resolve(res);
      } else {
        reject(res);
      }
    })
  })
}


module.exports = {
  loginByWeixin,
  checkLogin,
  getmobile
};











