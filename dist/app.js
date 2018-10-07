'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

Date.prototype.format = function (format) {
  var date = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
    }
  }
  return format;
};

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      'pages': ['pages/auth/login/login', 'pages/post/post', 'pages/index/index', 'pages/ucenter/distribute/group/group', 'pages/ucenter/distribute/index/index', 'pages/ucenter/distribute/extension/extension', 'pages/ucenter/index/index', 'pages/ucenter/distribute/cash/cash', 'pages/ucenter/distribute/order/order', 'pages/ucenter/distribute/cash_record/cash_record', 'pages/ucenter/distribute/join/join', 'pages/catalog/catalog', 'pages/notes/notes', 'pages/newGoods/newGoods', 'pages/hotGoods/hotGoods', 'pages/ucenter/address/address', 'pages/ucenter/addressAdd/addressAdd', 'pages/ucenter/footprint/footprint', 'pages/ucenter/order/order', 'pages/ucenter/orderDetail/orderDetail', 'pages/ucenter/express/express', 'pages/ucenter/feedback/feedback', 'pages/ucenter/coupon/coupon', 'pages/ucenter/collect/collect', 'pages/auth/register/register', 'pages/auth/reset/reset', 'pages/pay/pay', 'pages/payResult/payResult', 'pages/topic/topic', 'pages/comment/comment', 'pages/commentPost/commentPost', 'pages/topicComment/topicComment', 'pages/brand/brand', 'pages/brandDetail/brandDetail', 'pages/tag/tag', 'pages/tagDetail/tagDetail', 'pages/search/search', 'pages/category/category', 'pages/cart/cart', 'pages/shopping/checkout/checkout', 'pages/shopping/address/address', 'pages/shopping/addressAdd/addressAdd', 'pages/goods/goods', 'pages/topicDetail/topicDetail', 'pages/post/notice', 'pages/post/desc', 'pages/edit/edit'],
      'window': {
        'backgroundTextStyle': 'dark',
        'navigationBarBackgroundColor': '#E92D24',
        'navigationBarTitleText': '优选客联盟',
        'navigationBarTextStyle': 'black',
        'enablePullDownRefresh': false
      },
      'tabBar': {
        'backgroundColor': '#fafafa',
        'borderStyle': 'white',
        'selectedColor': '#b4282d',
        'color': '#666',
        'list': [{
          'pagePath': 'pages/post/post',
          'iconPath': 'static/images/post_before.png',
          'selectedIconPath': 'static/images/post_after.png',
          'text': '信息'
        }, {
          'pagePath': 'pages/index/index',
          'iconPath': 'static/images/shop_before.png',
          'selectedIconPath': 'static/images/shop_after.png',
          'text': '商城'
        }, {
          'pagePath': 'pages/edit/edit',
          'iconPath': 'static/images/edit.png',
          'selectedIconPath': 'static/images/edit.png',
          'text': '信息发布'
        }, {
          'pagePath': 'pages/cart/cart',
          'iconPath': 'static/images/cart_before.png',
          'selectedIconPath': 'static/images/cart_after.png',
          'text': '购物车'
        }, {
          'pagePath': 'pages/ucenter/index/index',
          'iconPath': 'static/images/ucenter_before.png',
          'selectedIconPath': 'static/images/ucenter_after.png',
          'text': '我的'
        }]
      },
      // 需要修改为Promise形式的wxAPI
      'promisify': ['scanCode', 'switchTab', 'navigateTo', 'showModal', 'uploadFile', 'chooseImage', 'getLocation', 'chooseLocation', 'openLocation'],
      'networkTimeout': {
        'request': 10000,
        'downloadFile': 10000
      },
      'debug': true
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var _this2 = this;

        var referee_2, referee_3, referee_inter, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('App onLaunch options', options);

                this.config['promisify'].forEach(function (item) {
                  wx[item + 'P'] = _this2.wxPromisify(wx[item]);
                });

                referee_2 = options.query.referee; // 分享好友的推荐人

                referee_3 = options.query.scene; // 发分享码的推荐人

                console.log('decodeURIComponent(options.scene)', decodeURIComponent(options.scene));
                if (referee_3 && referee_3.indexOf('vheeer') > -1) {
                  referee_3 = referee_3.split('_')[1];
                } else {
                  referee_3 = null;
                }

                referee_inter = referee_2 || referee_3 || 0;


                console.log('referee_2', referee_2);
                console.log('referee_3', referee_3);
                console.log('finally referee_inter', referee_inter);

                wx.setStorageSync('referee_inter', referee_inter);

                // wx.clearStorage()

                _context.prev = 11;
                _context.next = 14;
                return user.loginByWeixin();

              case 14:
                res = _context.sent;

                console.log('loginResult', res);
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](11);

                console.log('loginByWeixin err', _context.t0);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[11, 18]]);
      }));

      function onLaunch(_x) {
        return _ref.apply(this, arguments);
      }

      return onLaunch;
    }()
  }, {
    key: 'wxPromisify',
    value: function wxPromisify(fn) {
      return function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return new Promise(function (resolve, reject) {
          obj.success = function (res) {
            console.log('Promise success 返回参数：', res);
            resolve(res);
          };
          obj.fail = function (res) {
            console.warn('Promise fail 返回参数：', res);
            reject(res);
          };
          fn(obj); // 执行函数，obj为传入函数的参数
        });
      };
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.sleep(3);

              case 2:
                data = _context2.sent;

                console.log(data);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function testAsync() {
        return _ref2.apply(this, arguments);
      }

      return testAsync;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ1dGlsIiwicmVxdWlyZSIsImFwaSIsInVzZXIiLCJEYXRlIiwicHJvdG90eXBlIiwiZm9ybWF0IiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJNYXRoIiwiZmxvb3IiLCJnZXRNaWxsaXNlY29uZHMiLCJ0ZXN0IiwicmVwbGFjZSIsIlJlZ0V4cCIsIiQxIiwiZ2V0RnVsbFllYXIiLCJzdWJzdHIiLCJsZW5ndGgiLCJrIiwiY29uZmlnIiwidXNlIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJmb3JFYWNoIiwid3giLCJpdGVtIiwid3hQcm9taXNpZnkiLCJyZWZlcmVlXzIiLCJxdWVyeSIsInJlZmVyZWUiLCJyZWZlcmVlXzMiLCJzY2VuZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImluZGV4T2YiLCJzcGxpdCIsInJlZmVyZWVfaW50ZXIiLCJzZXRTdG9yYWdlU3luYyIsImxvZ2luQnlXZWl4aW4iLCJyZXMiLCJmbiIsIm9iaiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsImZhaWwiLCJ3YXJuIiwicyIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFPQyxRQUFRLGlCQUFSLENBQWI7QUFDQSxJQUFNQyxNQUFNRCxRQUFRLGlCQUFSLENBQVo7QUFDQSxJQUFNRSxPQUFPRixRQUFRLG9CQUFSLENBQWI7O0FBR0lHLEtBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixVQUFTQSxNQUFULEVBQWlCO0FBQ3ZDLE1BQUlDLE9BQU87QUFDVCxVQUFNLEtBQUtDLFFBQUwsS0FBa0IsQ0FEZjtBQUVULFVBQU0sS0FBS0MsT0FBTCxFQUZHO0FBR1QsVUFBTSxLQUFLQyxRQUFMLEVBSEc7QUFJVCxV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S0FBS0UsS0FBTCxDQUFXLENBQVgsQzs7O0FBQWJDLG9COztBQUNON0Isd0JBQVFDLEdBQVIsQ0FBWTRCLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFuTHlCQyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbHMvdXRpbC5qcycpO1xyXG5jb25zdCBhcGkgPSByZXF1aXJlKCcuL2NvbmZpZy9hcGkuanMnKTtcclxuY29uc3QgdXNlciA9IHJlcXVpcmUoJy4vc2VydmljZXMvdXNlci5qcycpO1xyXG5cclxuXHJcbiAgICBEYXRlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQpIHtcclxuICAgICAgdmFyIGRhdGUgPSB7XHJcbiAgICAgICAgJ00rJzogdGhpcy5nZXRNb250aCgpICsgMSxcclxuICAgICAgICAnZCsnOiB0aGlzLmdldERhdGUoKSxcclxuICAgICAgICAnaCsnOiB0aGlzLmdldEhvdXJzKCksXHJcbiAgICAgICAgJ20rJzogdGhpcy5nZXRNaW51dGVzKCksXHJcbiAgICAgICAgJ3MrJzogdGhpcy5nZXRTZWNvbmRzKCksXHJcbiAgICAgICAgJ3ErJzogTWF0aC5mbG9vcigodGhpcy5nZXRNb250aCgpICsgMykgLyAzKSxcclxuICAgICAgICAnUysnOiB0aGlzLmdldE1pbGxpc2Vjb25kcygpXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICgvKHkrKS9pLnRlc3QoZm9ybWF0KSkge1xyXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKHZhciBrIGluIGRhdGUpIHtcclxuICAgICAgICBpZiAobmV3IFJlZ0V4cCgnKCcgKyBrICsgJyknKS50ZXN0KGZvcm1hdCkpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSwgUmVnRXhwLiQxLmxlbmd0aCA9PT0gMSA/IGRhdGVba10gOiAoJzAwJyArIGRhdGVba10pLnN1YnN0cigoJycgKyBkYXRlW2tdKS5sZW5ndGgpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgIH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICAncGFnZXMnOiBbXHJcbiAgICAgICdwYWdlcy9hdXRoL2xvZ2luL2xvZ2luJyxcclxuICAgICAgJ3BhZ2VzL3Bvc3QvcG9zdCcsXHJcbiAgICAgICdwYWdlcy9pbmRleC9pbmRleCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2Rpc3RyaWJ1dGUvZ3JvdXAvZ3JvdXAnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2luZGV4L2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZGlzdHJpYnV0ZS9leHRlbnNpb24vZXh0ZW5zaW9uJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvaW5kZXgvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2Nhc2gvY2FzaCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2Rpc3RyaWJ1dGUvb3JkZXIvb3JkZXInLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2Nhc2hfcmVjb3JkL2Nhc2hfcmVjb3JkJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZGlzdHJpYnV0ZS9qb2luL2pvaW4nLFxyXG4gICAgICAncGFnZXMvY2F0YWxvZy9jYXRhbG9nJyxcclxuICAgICAgJ3BhZ2VzL25vdGVzL25vdGVzJyxcclxuICAgICAgJ3BhZ2VzL25ld0dvb2RzL25ld0dvb2RzJyxcclxuICAgICAgJ3BhZ2VzL2hvdEdvb2RzL2hvdEdvb2RzJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvYWRkcmVzcy9hZGRyZXNzJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvYWRkcmVzc0FkZC9hZGRyZXNzQWRkJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZm9vdHByaW50L2Zvb3RwcmludCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL29yZGVyL29yZGVyJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvb3JkZXJEZXRhaWwvb3JkZXJEZXRhaWwnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9leHByZXNzL2V4cHJlc3MnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9mZWVkYmFjay9mZWVkYmFjaycsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2NvdXBvbi9jb3Vwb24nLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9jb2xsZWN0L2NvbGxlY3QnLFxyXG4gICAgICAncGFnZXMvYXV0aC9yZWdpc3Rlci9yZWdpc3RlcicsXHJcbiAgICAgICdwYWdlcy9hdXRoL3Jlc2V0L3Jlc2V0JyxcclxuICAgICAgJ3BhZ2VzL3BheS9wYXknLFxyXG4gICAgICAncGFnZXMvcGF5UmVzdWx0L3BheVJlc3VsdCcsXHJcbiAgICAgICdwYWdlcy90b3BpYy90b3BpYycsXHJcbiAgICAgICdwYWdlcy9jb21tZW50L2NvbW1lbnQnLFxyXG4gICAgICAncGFnZXMvY29tbWVudFBvc3QvY29tbWVudFBvc3QnLFxyXG4gICAgICAncGFnZXMvdG9waWNDb21tZW50L3RvcGljQ29tbWVudCcsXHJcbiAgICAgICdwYWdlcy9icmFuZC9icmFuZCcsXHJcbiAgICAgICdwYWdlcy9icmFuZERldGFpbC9icmFuZERldGFpbCcsXHJcbiAgICAgICdwYWdlcy90YWcvdGFnJyxcclxuICAgICAgJ3BhZ2VzL3RhZ0RldGFpbC90YWdEZXRhaWwnLFxyXG4gICAgICAncGFnZXMvc2VhcmNoL3NlYXJjaCcsXHJcbiAgICAgICdwYWdlcy9jYXRlZ29yeS9jYXRlZ29yeScsXHJcbiAgICAgICdwYWdlcy9jYXJ0L2NhcnQnLFxyXG4gICAgICAncGFnZXMvc2hvcHBpbmcvY2hlY2tvdXQvY2hlY2tvdXQnLFxyXG4gICAgICAncGFnZXMvc2hvcHBpbmcvYWRkcmVzcy9hZGRyZXNzJyxcclxuICAgICAgJ3BhZ2VzL3Nob3BwaW5nL2FkZHJlc3NBZGQvYWRkcmVzc0FkZCcsXHJcbiAgICAgICdwYWdlcy9nb29kcy9nb29kcycsXHJcbiAgICAgICdwYWdlcy90b3BpY0RldGFpbC90b3BpY0RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9wb3N0L25vdGljZScsXHJcbiAgICAgICdwYWdlcy9wb3N0L2Rlc2MnLFxyXG4gICAgICAncGFnZXMvZWRpdC9lZGl0J1xyXG4gICAgXSxcclxuICAgICd3aW5kb3cnOiB7XHJcbiAgICAgICdiYWNrZ3JvdW5kVGV4dFN0eWxlJzogJ2RhcmsnLFxyXG4gICAgICAnbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcic6ICcjRTkyRDI0JyxcclxuICAgICAgJ25hdmlnYXRpb25CYXJUaXRsZVRleHQnOiAn5LyY6YCJ5a6i6IGU55ufJyxcclxuICAgICAgJ25hdmlnYXRpb25CYXJUZXh0U3R5bGUnOiAnYmxhY2snLFxyXG4gICAgICAnZW5hYmxlUHVsbERvd25SZWZyZXNoJzogZmFsc2VcclxuICAgIH0sXHJcbiAgICAndGFiQmFyJzoge1xyXG4gICAgICAnYmFja2dyb3VuZENvbG9yJzogJyNmYWZhZmEnLFxyXG4gICAgICAnYm9yZGVyU3R5bGUnOiAnd2hpdGUnLFxyXG4gICAgICAnc2VsZWN0ZWRDb2xvcic6ICcjYjQyODJkJyxcclxuICAgICAgJ2NvbG9yJzogJyM2NjYnLFxyXG4gICAgICAnbGlzdCc6IFtcclxuICAgICAge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9wb3N0L3Bvc3QnLFxyXG4gICAgICAgICdpY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL3Bvc3RfYmVmb3JlLnBuZycsXHJcbiAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy9wb3N0X2FmdGVyLnBuZycsXHJcbiAgICAgICAgJ3RleHQnOiAn5L+h5oGvJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2luZGV4L2luZGV4JyxcclxuICAgICAgICAnaWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy9zaG9wX2JlZm9yZS5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvc2hvcF9hZnRlci5wbmcnLFxyXG4gICAgICAgICd0ZXh0JzogJ+WVhuWfjidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9lZGl0L2VkaXQnLFxyXG4gICAgICAgICdpY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL2VkaXQucG5nJyxcclxuICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL2VkaXQucG5nJyxcclxuICAgICAgICAndGV4dCc6ICfkv6Hmga/lj5HluIMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvY2FydC9jYXJ0JyxcclxuICAgICAgICAnaWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy9jYXJ0X2JlZm9yZS5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvY2FydF9hZnRlci5wbmcnLFxyXG4gICAgICAgICd0ZXh0JzogJ+i0reeJqei9pidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy91Y2VudGVyL2luZGV4L2luZGV4JyxcclxuICAgICAgICAnaWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy91Y2VudGVyX2JlZm9yZS5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvdWNlbnRlcl9hZnRlci5wbmcnLFxyXG4gICAgICAgICd0ZXh0JzogJ+aIkeeahCdcclxuICAgICAgfV1cclxuICAgIH0sXHJcbiAgICAvLyDpnIDopoHkv67mlLnkuLpQcm9taXNl5b2i5byP55qEd3hBUElcclxuICAgICdwcm9taXNpZnknOiBbXHJcbiAgICAgICdzY2FuQ29kZScsXHJcbiAgICAgICdzd2l0Y2hUYWInLFxyXG4gICAgICAnbmF2aWdhdGVUbycsXHJcbiAgICAgICdzaG93TW9kYWwnLFxyXG4gICAgICAndXBsb2FkRmlsZScsXHJcbiAgICAgICdjaG9vc2VJbWFnZScsXHJcbiAgICAgICdnZXRMb2NhdGlvbicsXHJcbiAgICAgICdjaG9vc2VMb2NhdGlvbicsXHJcbiAgICAgICdvcGVuTG9jYXRpb24nLFxyXG4gICAgXSxcclxuICAgICduZXR3b3JrVGltZW91dCc6IHtcclxuICAgICAgJ3JlcXVlc3QnOiAxMDAwMCxcclxuICAgICAgJ2Rvd25sb2FkRmlsZSc6IDEwMDAwXHJcbiAgICB9LFxyXG4gICAgJ2RlYnVnJzogdHJ1ZVxyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpO1xyXG4gIH1cclxuICBhc3luYyBvbkxhdW5jaChvcHRpb25zKSB7XHJcbiAgICBjb25zb2xlLmxvZygnQXBwIG9uTGF1bmNoIG9wdGlvbnMnLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ1sncHJvbWlzaWZ5J10uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgd3hbaXRlbSArICdQJ10gPSB0aGlzLnd4UHJvbWlzaWZ5KHd4W2l0ZW1dKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCB7IHJlZmVyZWU6IHJlZmVyZWVfMiB9ID0gb3B0aW9ucy5xdWVyeTsgLy8g5YiG5Lqr5aW95Y+L55qE5o6o6I2Q5Lq6XHJcbiAgICBsZXQgcmVmZXJlZV8zID0gb3B0aW9ucy5xdWVyeS5zY2VuZTsgLy8g5Y+R5YiG5Lqr56CB55qE5o6o6I2Q5Lq6XHJcbiAgICBjb25zb2xlLmxvZygnZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuc2NlbmUpJywgZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuc2NlbmUpKTtcclxuICAgIGlmIChyZWZlcmVlXzMgJiYgcmVmZXJlZV8zLmluZGV4T2YoJ3ZoZWVlcicpID4gLTEpIHtcclxuICAgICAgcmVmZXJlZV8zID0gcmVmZXJlZV8zLnNwbGl0KCdfJylbMV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWZlcmVlXzMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlZmVyZWVfaW50ZXIgPSByZWZlcmVlXzIgfHwgcmVmZXJlZV8zIHx8IDA7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ3JlZmVyZWVfMicsIHJlZmVyZWVfMik7XHJcbiAgICBjb25zb2xlLmxvZygncmVmZXJlZV8zJywgcmVmZXJlZV8zKTtcclxuICAgIGNvbnNvbGUubG9nKCdmaW5hbGx5IHJlZmVyZWVfaW50ZXInLCByZWZlcmVlX2ludGVyKTtcclxuXHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygncmVmZXJlZV9pbnRlcicsIHJlZmVyZWVfaW50ZXIpO1xyXG5cclxuICAgIC8vIHd4LmNsZWFyU3RvcmFnZSgpXHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdXNlci5sb2dpbkJ5V2VpeGluKClcclxuICAgICAgY29uc29sZS5sb2coJ2xvZ2luUmVzdWx0JywgcmVzKVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dpbkJ5V2VpeGluIGVycicsIGVycilcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB3eFByb21pc2lmeShmbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1Byb21pc2Ugc3VjY2VzcyDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1Byb21pc2UgZmFpbCDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmbihvYmopIC8vIOaJp+ihjOWHveaVsO+8jG9iauS4uuS8oOWFpeWHveaVsOeahOWPguaVsFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2xlZXAocykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpO1xyXG4gICAgICB9LFxyXG4gICAgICBzICogMTAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHRlc3RBc3luYygpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpO1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=