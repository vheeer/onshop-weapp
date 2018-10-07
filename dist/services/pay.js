'use strict';

/**
 * 支付相关服务
 */

var util = require('./../utils/util.js');
var api = require('./../config/api.js');

/**
 * 判断用户是否登录
 */
function payOrder(orderId) {
  return new Promise(function (resolve, reject) {
    util.request(api.PayPrepayId, {
      orderId: orderId
    }).then(function (res) {
      console.log("PayPrepayId", res);
      if (res.errno === 0) {
        var payParam = res.data;
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.package,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function success(res) {
            console.log("success to prepay and res is: ", res);
            resolve(res);
          },
          'fail': function fail(res) {
            console.log("fail to prepay and res is: ", res);
            reject(res);
          },
          'complete': function complete(res) {
            reject(res);
          }
        });
      } else {
        reject(res);
      }
    });
  });
}

module.exports = {
  payOrder: payOrder
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheS5qcyJdLCJuYW1lcyI6WyJ1dGlsIiwicmVxdWlyZSIsImFwaSIsInBheU9yZGVyIiwib3JkZXJJZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsIlBheVByZXBheUlkIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJubyIsInBheVBhcmFtIiwiZGF0YSIsInd4IiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJzaWduVHlwZSIsInBheVNpZ24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBSUEsSUFBTUEsT0FBT0MsUUFBUSxrQkFBUixDQUFiO0FBQ0EsSUFBTUMsTUFBTUQsUUFBUSxrQkFBUixDQUFaOztBQUVBOzs7QUFHQSxTQUFTRSxRQUFULENBQWtCQyxPQUFsQixFQUEyQjtBQUN6QixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1Q1AsU0FBS1EsT0FBTCxDQUFhTixJQUFJTyxXQUFqQixFQUE4QjtBQUM1QkwsZUFBU0E7QUFEbUIsS0FBOUIsRUFFR00sSUFGSCxDQUVRLFVBQUNDLEdBQUQsRUFBUztBQUNmQyxjQUFRQyxHQUFSLENBQVksYUFBWixFQUEyQkYsR0FBM0I7QUFDQSxVQUFJQSxJQUFJRyxLQUFKLEtBQWMsQ0FBbEIsRUFBcUI7QUFDbkIsWUFBTUMsV0FBV0osSUFBSUssSUFBckI7QUFDQUMsV0FBR0MsY0FBSCxDQUFrQjtBQUNoQix1QkFBYUgsU0FBU0ksU0FETjtBQUVoQixzQkFBWUosU0FBU0ssUUFGTDtBQUdoQixxQkFBV0wsU0FBU00sT0FISjtBQUloQixzQkFBWU4sU0FBU08sUUFKTDtBQUtoQixxQkFBV1AsU0FBU1EsT0FMSjtBQU1oQixxQkFBVyxpQkFBVVosR0FBVixFQUFlO0FBQ3hCQyxvQkFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDRixHQUE5QztBQUNBTCxvQkFBUUssR0FBUjtBQUNELFdBVGU7QUFVaEIsa0JBQVEsY0FBVUEsR0FBVixFQUFlO0FBQ3JCQyxvQkFBUUMsR0FBUixDQUFZLDZCQUFaLEVBQTJDRixHQUEzQztBQUNBSixtQkFBT0ksR0FBUDtBQUNELFdBYmU7QUFjaEIsc0JBQVksa0JBQVVBLEdBQVYsRUFBZTtBQUN6QkosbUJBQU9JLEdBQVA7QUFDRDtBQWhCZSxTQUFsQjtBQWtCRCxPQXBCRCxNQW9CTztBQUNMSixlQUFPSSxHQUFQO0FBQ0Q7QUFDRixLQTNCRDtBQTRCRCxHQTdCTSxDQUFQO0FBOEJEOztBQUdEYSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2Z0QjtBQURlLENBQWpCIiwiZmlsZSI6InBheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDmlK/ku5jnm7jlhbPmnI3liqFcclxuICovXHJcblxyXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbHMvdXRpbC5qcycpO1xyXG5jb25zdCBhcGkgPSByZXF1aXJlKCcuLi9jb25maWcvYXBpLmpzJyk7XHJcblxyXG4vKipcclxuICog5Yik5pat55So5oi35piv5ZCm55m75b2VXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXlPcmRlcihvcmRlcklkKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHV0aWwucmVxdWVzdChhcGkuUGF5UHJlcGF5SWQsIHtcclxuICAgICAgb3JkZXJJZDogb3JkZXJJZFxyXG4gICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUGF5UHJlcGF5SWRcIiwgcmVzKVxyXG4gICAgICBpZiAocmVzLmVycm5vID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgcGF5UGFyYW0gPSByZXMuZGF0YTtcclxuICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAndGltZVN0YW1wJzogcGF5UGFyYW0udGltZVN0YW1wLFxyXG4gICAgICAgICAgJ25vbmNlU3RyJzogcGF5UGFyYW0ubm9uY2VTdHIsXHJcbiAgICAgICAgICAncGFja2FnZSc6IHBheVBhcmFtLnBhY2thZ2UsXHJcbiAgICAgICAgICAnc2lnblR5cGUnOiBwYXlQYXJhbS5zaWduVHlwZSxcclxuICAgICAgICAgICdwYXlTaWduJzogcGF5UGFyYW0ucGF5U2lnbixcclxuICAgICAgICAgICdzdWNjZXNzJzogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgdG8gcHJlcGF5IGFuZCByZXMgaXM6IFwiLCByZXMpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ2ZhaWwnOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbCB0byBwcmVwYXkgYW5kIHJlcyBpczogXCIsIHJlcyk7XHJcbiAgICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICdjb21wbGV0ZSc6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcGF5T3JkZXIsXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19