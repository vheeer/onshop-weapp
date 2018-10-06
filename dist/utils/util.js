'use strict';

var api = require('./../config/api.js');

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 封封微信的的request
 */
function request(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "GET";
  var header = arguments[3];

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: function success(res) {
        console.log("success");

        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            //需要登录后才可以操作
            console.log("401 需要登录后才可以操作");
            var code = null;
            return login().then(function (res) {
              code = res.code;
              return getUserInfo();
            }).then(function (userInfo) {
              //登录远程服务器
              request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(function (res) {
                if (res.errno === 0) {
                  //存储用户信息
                  console.log("登录完，储存信息");
                  wx.setStorageSync('userInfo', res.data.userInfo);
                  wx.setStorageSync('token', res.data.token);
                  wx.setStorageSync('others', res.data.others);

                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch(function (err) {
                reject(err);
              });
            }).catch(function (err) {
              reject(err);
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function fail(err) {
        reject(err);
        console.log("failed");
      }
    });
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function success() {
        resolve(true);
      },
      fail: function fail() {
        reject(false);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function success(res) {
        if (res.code) {
          //登录远程服务器
          console.log(res);
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function success(res) {
        console.log(res);
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  });
}

/*
本地储存的用户信息写入本页面
*/
function storage2data(_this) {
  var userInfo = wx.getStorageSync('userInfo');
  var others = wx.getStorageSync('others');
  if (userInfo && Object.getOwnPropertyNames(userInfo).length !== 0) {
    // 信息不存在或者空对象
    _this.userInfo = userInfo;
  }
  if (others && Object.getOwnPropertyNames(others).length !== 0) {
    // 信息不存在或者空对象
    _this.others = others;
  }

  _this.$apply();
}

module.exports = {
  formatTime: formatTime,
  request: request,
  redirect: redirect,
  showErrorToast: showErrorToast,
  checkSession: checkSession,
  login: login,
  getUserInfo: getUserInfo,
  storage2data: storage2data
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsImZvcm1hdFRpbWUiLCJkYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsIm1hcCIsImZvcm1hdE51bWJlciIsImpvaW4iLCJuIiwidG9TdHJpbmciLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsIm1ldGhvZCIsImhlYWRlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzQ29kZSIsImVycm5vIiwiY29kZSIsImxvZ2luIiwidGhlbiIsImdldFVzZXJJbmZvIiwidXNlckluZm8iLCJBdXRoTG9naW5CeVdlaXhpbiIsInNldFN0b3JhZ2VTeW5jIiwidG9rZW4iLCJvdGhlcnMiLCJjYXRjaCIsImVyciIsImVyck1zZyIsImZhaWwiLCJjaGVja1Nlc3Npb24iLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZWRpcmVjdCIsInJlZGlyZWN0VG8iLCJzaG93RXJyb3JUb2FzdCIsIm1zZyIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJzdG9yYWdlMmRhdGEiLCJfdGhpcyIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJsZW5ndGgiLCIkYXBwbHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU1DLFFBQVEsa0JBQVIsQ0FBVjs7QUFFQSxTQUFTQyxVQUFULENBQW9CQyxJQUFwQixFQUEwQjtBQUN4QixNQUFJQyxPQUFPRCxLQUFLRSxXQUFMLEVBQVg7QUFDQSxNQUFJQyxRQUFRSCxLQUFLSSxRQUFMLEtBQWtCLENBQTlCO0FBQ0EsTUFBSUMsTUFBTUwsS0FBS00sT0FB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LCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcGkgPSByZXF1aXJlKCcuLi9jb25maWcvYXBpLmpzJyk7XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRUaW1lKGRhdGUpIHtcclxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxyXG4gIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcclxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKClcclxuXHJcbiAgdmFyIGhvdXIgPSBkYXRlLmdldEhvdXJzKClcclxuICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKClcclxuICB2YXIgc2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKClcclxuXHJcblxyXG4gIHJldHVybiBbeWVhciwgbW9udGgsIGRheV0ubWFwKGZvcm1hdE51bWJlcikuam9pbignLScpICsgJyAnICsgW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKCc6JylcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG4pIHtcclxuICBuID0gbi50b1N0cmluZygpXHJcbiAgcmV0dXJuIG5bMV0gPyBuIDogJzAnICsgblxyXG59XHJcblxyXG4vKipcclxuICog5bCB5bCB5b6u5L+h55qE55qEcmVxdWVzdFxyXG4gKi9cclxuZnVuY3Rpb24gcmVxdWVzdCh1cmwsIGRhdGEgPSB7fSwgbWV0aG9kID0gXCJHRVRcIiwgaGVhZGVyKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHVybCxcclxuICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgJ1gtTmlkZXNob3AtVG9rZW4nOiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgICB9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xyXG5cclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm5vID09IDQwMSkge1xyXG4gICAgICAgICAgICAvL+mcgOimgeeZu+W9leWQjuaJjeWPr+S7peaTjeS9nFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIjQwMSDpnIDopoHnmbvlvZXlkI7miY3lj6/ku6Xmk43kvZxcIik7XHJcbiAgICAgICAgICAgIGxldCBjb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGxvZ2luKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29kZSA9IHJlcy5jb2RlO1xyXG4gICAgICAgICAgICAgIHJldHVybiBnZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICB9KS50aGVuKCh1c2VySW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgIC8v55m75b2V6L+c56iL5pyN5Yqh5ZmoXHJcbiAgICAgICAgICAgICAgcmVxdWVzdChhcGkuQXV0aExvZ2luQnlXZWl4aW4sIHsgY29kZTogY29kZSwgdXNlckluZm86IHVzZXJJbmZvIH0sICdQT1NUJykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJubyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAvL+WtmOWCqOeUqOaIt+S/oeaBr1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueZu+W9leWujO+8jOWCqOWtmOS/oeaBr1wiKTtcclxuICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgcmVzLmRhdGEudXNlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvdGhlcnMnLCByZXMuZGF0YS5vdGhlcnMpO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QocmVzLmVyck1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmYWlsZWRcIilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOajgOafpeW+ruS/oeS8muivneaYr+WQpui/h+acn1xyXG4gKi9cclxuZnVuY3Rpb24gY2hlY2tTZXNzaW9uKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB3eC5jaGVja1Nlc3Npb24oe1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDosIPnlKjlvq7kv6HnmbvlvZVcclxuICovXHJcbmZ1bmN0aW9uIGxvZ2luKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB3eC5sb2dpbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgIC8v55m75b2V6L+c56iL5pyN5Yqh5ZmoXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWRpcmVjdCh1cmwpIHtcclxuXHJcbiAgLy/liKTmlq3pobXpnaLmmK/lkKbpnIDopoHnmbvlvZVcclxuICBpZiAoZmFsc2UpIHtcclxuICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICB1cmw6ICcvcGFnZXMvYXV0aC9sb2dpbi9sb2dpbidcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgdXJsOiB1cmxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0Vycm9yVG9hc3QobXNnKSB7XHJcbiAgd3guc2hvd1RvYXN0KHtcclxuICAgIHRpdGxlOiBtc2csXHJcbiAgICBpbWFnZTogJy9zdGF0aWMvaW1hZ2VzL2ljb25fZXJyb3IucG5nJ1xyXG4gIH0pXHJcbn1cclxuXHJcbi8qXHJcbuacrOWcsOWCqOWtmOeahOeUqOaIt+S/oeaBr+WGmeWFpeacrOmhtemdolxyXG4qL1xyXG5mdW5jdGlvbiBzdG9yYWdlMmRhdGEoX3RoaXMpIHtcclxuICBjb25zdCB1c2VySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpXHJcbiAgY29uc3Qgb3RoZXJzID0gd3guZ2V0U3RvcmFnZVN5bmMoJ290aGVycycpXHJcbiAgaWYgKHVzZXJJbmZvICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHVzZXJJbmZvKS5sZW5ndGggIT09IDApIHtcclxuICAgIC8vIOS/oeaBr+S4jeWtmOWcqOaIluiAheepuuWvueixoVxyXG4gICAgX3RoaXMudXNlckluZm8gPSB1c2VySW5mb1xyXG4gIH1cclxuICBpZiAob3RoZXJzICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG90aGVycykubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAvLyDkv6Hmga/kuI3lrZjlnKjmiJbogIXnqbrlr7nosaFcclxuICAgIF90aGlzLm90aGVycyA9IG90aGVyc1xyXG4gIH1cclxuICBcclxuICBfdGhpcy4kYXBwbHkoKTtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGZvcm1hdFRpbWUsXHJcbiAgcmVxdWVzdCxcclxuICByZWRpcmVjdCxcclxuICBzaG93RXJyb3JUb2FzdCxcclxuICBjaGVja1Nlc3Npb24sXHJcbiAgbG9naW4sXHJcbiAgZ2V0VXNlckluZm8sXHJcbiAgc3RvcmFnZTJkYXRhXHJcbn1cclxuXHJcblxyXG4iXX0=