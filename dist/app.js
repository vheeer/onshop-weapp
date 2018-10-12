'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _api = require('./config/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _user = require('./services/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var title = _api2.default.title;


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

var app = function (_wepy$app) {
  _inherits(app, _wepy$app);

  function app() {
    _classCallCheck(this, app);

    var _this = _possibleConstructorReturn(this, (app.__proto__ || Object.getPrototypeOf(app)).call(this));

    _this.config = {
      'pages': ['pages/auth/login/login', 'pages/post/post', 'pages/index/index', 'pages/ucenter/distribute/group/group', 'pages/ucenter/distribute/index/index', 'pages/ucenter/distribute/extension/extension', 'pages/ucenter/index/index', 'pages/ucenter/distribute/cash/cash', 'pages/ucenter/distribute/order/order', 'pages/ucenter/distribute/cash_record/cash_record', 'pages/ucenter/distribute/join/join', 'pages/catalog/catalog', 'pages/notes/notes', 'pages/newGoods/newGoods', 'pages/hotGoods/hotGoods', 'pages/ucenter/address/address', 'pages/ucenter/addressAdd/addressAdd', 'pages/ucenter/footprint/footprint', 'pages/ucenter/order/order', 'pages/ucenter/orderDetail/orderDetail', 'pages/ucenter/express/express', 'pages/ucenter/feedback/feedback', 'pages/ucenter/coupon/coupon', 'pages/ucenter/collect/collect', 'pages/auth/register/register', 'pages/auth/reset/reset', 'pages/pay/pay', 'pages/payResult/payResult', 'pages/topic/topic', 'pages/comment/comment', 'pages/commentPost/commentPost', 'pages/topicComment/topicComment', 'pages/brand/brand', 'pages/brandDetail/brandDetail', 'pages/tag/tag', 'pages/tagDetail/tagDetail', 'pages/search/search', 'pages/category/category', 'pages/cart/cart', 'pages/shopping/checkout/checkout', 'pages/shopping/address/address', 'pages/shopping/addressAdd/addressAdd', 'pages/goods/goods', 'pages/topicDetail/topicDetail', 'pages/post/notice', 'pages/post/desc', 'pages/edit/edit'],
      'window': {
        'backgroundTextStyle': 'dark',
        'navigationBarBackgroundColor': '#E92D24',
        'navigationBarTitleText': '佳选客',
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
      'promisify': ['scanCode', 'switchTab', 'navigateTo', 'showModal', 'uploadFile', 'chooseImage', 'getLocation', 'chooseLocation', 'openLocation', 'makePhoneCall'],
      'networkTimeout': {
        'request': 10000,
        'downloadFile': 10000
      },
      'debug': true
    };

    _this.use('requestfix');
    console.log('xxxxxxxx', title);
    return _this;
  }

  _createClass(app, [{
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
                return _user2.default.loginByWeixin();

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

  return app;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(app, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ0aXRsZSIsImFwaSIsIkRhdGUiLCJwcm90b3R5cGUiLCJmb3JtYXQiLCJkYXRlIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIk1hdGgiLCJmbG9vciIsImdldE1pbGxpc2Vjb25kcyIsInRlc3QiLCJyZXBsYWNlIiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsInN1YnN0ciIsImxlbmd0aCIsImsiLCJhcHAiLCJjb25maWciLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsImZvckVhY2giLCJ3eCIsIml0ZW0iLCJ3eFByb21pc2lmeSIsInJlZmVyZWVfMiIsInF1ZXJ5IiwicmVmZXJlZSIsInJlZmVyZWVfMyIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiaW5kZXhPZiIsInNwbGl0IiwicmVmZXJlZV9pbnRlciIsInNldFN0b3JhZ2VTeW5jIiwidXNlciIsImxvZ2luQnlXZWl4aW4iLCJyZXMiLCJmbiIsIm9iaiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsImZhaWwiLCJ3YXJuIiwicyIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVRQSxLLEdBQVVDLGEsQ0FBVkQsSzs7O0FBRVJFLEtBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixVQUFTQSxNQUFULEVBQWlCO0FBQ3ZDLE1BQUlDLE9BQU87QUFDVCxVQUFNLEtBQUtDLFFBQUwsS0FBa0IsQ0FEZjtBQUVULFVBQU0sS0FBS0MsT0FBTCxFQUZHO0FBR1QsVUFBTSxLQUFLQyxRQUFMLEVBSEc7QUFJVCxVQUFNLEtBQUtDLFVBQUwsRUFKRztBQUtULFVBQU0sS0FBS0MsVUFBTCxFQUxHO0FBTVQsVUFBTUMsS0FB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QUtFLEtBQUwsQ0FBVyxDQUFYLEM7OztBQUFiQyxvQjs7QUFDTi9CLHdCQUFRQyxHQUFSLENBQVk4QixJQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBckxjQyxlQUFLbkMsRzs7a0JBd0xSQSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuaW1wb3J0IGFwaSBmcm9tICcuL2NvbmZpZy9hcGkuanMnXHJcbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbHMvdXRpbC5qcydcclxuaW1wb3J0IHVzZXIgZnJvbSAnLi9zZXJ2aWNlcy91c2VyLmpzJ1xyXG5cclxuY29uc3QgeyB0aXRsZSB9ID0gYXBpXHJcblxyXG5EYXRlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQpIHtcclxuICB2YXIgZGF0ZSA9IHtcclxuICAgICdNKyc6IHRoaXMuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAnZCsnOiB0aGlzLmdldERhdGUoKSxcclxuICAgICdoKyc6IHRoaXMuZ2V0SG91cnMoKSxcclxuICAgICdtKyc6IHRoaXMuZ2V0TWludXRlcygpLFxyXG4gICAgJ3MrJzogdGhpcy5nZXRTZWNvbmRzKCksXHJcbiAgICAncSsnOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxyXG4gICAgJ1MrJzogdGhpcy5nZXRNaWxsaXNlY29uZHMoKVxyXG4gIH07XHJcbiAgaWYgKC8oeSspL2kudGVzdChmb3JtYXQpKSB7XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShSZWdFeHAuJDEsICh0aGlzLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XHJcbiAgfVxyXG4gIGZvciAodmFyIGsgaW4gZGF0ZSkge1xyXG4gICAgaWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmb3JtYXQpKSB7XHJcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSwgUmVnRXhwLiQxLmxlbmd0aCA9PT0gMSA/IGRhdGVba10gOiAoJzAwJyArIGRhdGVba10pLnN1YnN0cigoJycgKyBkYXRlW2tdKS5sZW5ndGgpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZvcm1hdDtcclxufTtcclxuXHJcbmNsYXNzIGFwcCBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICAncGFnZXMnOiBbXHJcbiAgICAgICdwYWdlcy9hdXRoL2xvZ2luL2xvZ2luJyxcclxuICAgICAgJ3BhZ2VzL3Bvc3QvcG9zdCcsXHJcbiAgICAgICdwYWdlcy9pbmRleC9pbmRleCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2Rpc3RyaWJ1dGUvZ3JvdXAvZ3JvdXAnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2luZGV4L2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZGlzdHJpYnV0ZS9leHRlbnNpb24vZXh0ZW5zaW9uJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvaW5kZXgvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2Nhc2gvY2FzaCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2Rpc3RyaWJ1dGUvb3JkZXIvb3JkZXInLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2Nhc2hfcmVjb3JkL2Nhc2hfcmVjb3JkJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZGlzdHJpYnV0ZS9qb2luL2pvaW4nLFxyXG4gICAgICAncGFnZXMvY2F0YWxvZy9jYXRhbG9nJyxcclxuICAgICAgJ3BhZ2VzL25vdGVzL25vdGVzJyxcclxuICAgICAgJ3BhZ2VzL25ld0dvb2RzL25ld0dvb2RzJyxcclxuICAgICAgJ3BhZ2VzL2hvdEdvb2RzL2hvdEdvb2RzJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvYWRkcmVzcy9hZGRyZXNzJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvYWRkcmVzc0FkZC9hZGRyZXNzQWRkJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZm9vdHByaW50L2Zvb3RwcmludCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL29yZGVyL29yZGVyJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvb3JkZXJEZXRhaWwvb3JkZXJEZXRhaWwnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9leHByZXNzL2V4cHJlc3MnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9mZWVkYmFjay9mZWVkYmFjaycsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2NvdXBvbi9jb3Vwb24nLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9jb2xsZWN0L2NvbGxlY3QnLFxyXG4gICAgICAncGFnZXMvYXV0aC9yZWdpc3Rlci9yZWdpc3RlcicsXHJcbiAgICAgICdwYWdlcy9hdXRoL3Jlc2V0L3Jlc2V0JyxcclxuICAgICAgJ3BhZ2VzL3BheS9wYXknLFxyXG4gICAgICAncGFnZXMvcGF5UmVzdWx0L3BheVJlc3VsdCcsXHJcbiAgICAgICdwYWdlcy90b3BpYy90b3BpYycsXHJcbiAgICAgICdwYWdlcy9jb21tZW50L2NvbW1lbnQnLFxyXG4gICAgICAncGFnZXMvY29tbWVudFBvc3QvY29tbWVudFBvc3QnLFxyXG4gICAgICAncGFnZXMvdG9waWNDb21tZW50L3RvcGljQ29tbWVudCcsXHJcbiAgICAgICdwYWdlcy9icmFuZC9icmFuZCcsXHJcbiAgICAgICdwYWdlcy9icmFuZERldGFpbC9icmFuZERldGFpbCcsXHJcbiAgICAgICdwYWdlcy90YWcvdGFnJyxcclxuICAgICAgJ3BhZ2VzL3RhZ0RldGFpbC90YWdEZXRhaWwnLFxyXG4gICAgICAncGFnZXMvc2VhcmNoL3NlYXJjaCcsXHJcbiAgICAgICdwYWdlcy9jYXRlZ29yeS9jYXRlZ29yeScsXHJcbiAgICAgICdwYWdlcy9jYXJ0L2NhcnQnLFxyXG4gICAgICAncGFnZXMvc2hvcHBpbmcvY2hlY2tvdXQvY2hlY2tvdXQnLFxyXG4gICAgICAncGFnZXMvc2hvcHBpbmcvYWRkcmVzcy9hZGRyZXNzJyxcclxuICAgICAgJ3BhZ2VzL3Nob3BwaW5nL2FkZHJlc3NBZGQvYWRkcmVzc0FkZCcsXHJcbiAgICAgICdwYWdlcy9nb29kcy9nb29kcycsXHJcbiAgICAgICdwYWdlcy90b3BpY0RldGFpbC90b3BpY0RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9wb3N0L25vdGljZScsXHJcbiAgICAgICdwYWdlcy9wb3N0L2Rlc2MnLFxyXG4gICAgICAncGFnZXMvZWRpdC9lZGl0J1xyXG4gICAgXSxcclxuICAgICd3aW5kb3cnOiB7XHJcbiAgICAgICdiYWNrZ3JvdW5kVGV4dFN0eWxlJzogJ2RhcmsnLFxyXG4gICAgICAnbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcic6ICcjRTkyRDI0JyxcclxuICAgICAgJ25hdmlnYXRpb25CYXJUaXRsZVRleHQnOiAn5L2z6YCJ5a6iJyxcclxuICAgICAgJ25hdmlnYXRpb25CYXJUZXh0U3R5bGUnOiAnYmxhY2snLFxyXG4gICAgICAnZW5hYmxlUHVsbERvd25SZWZyZXNoJzogZmFsc2VcclxuICAgIH0sXHJcbiAgICAndGFiQmFyJzoge1xyXG4gICAgICAnYmFja2dyb3VuZENvbG9yJzogJyNmYWZhZmEnLFxyXG4gICAgICAnYm9yZGVyU3R5bGUnOiAnd2hpdGUnLFxyXG4gICAgICAnc2VsZWN0ZWRDb2xvcic6ICcjYjQyODJkJyxcclxuICAgICAgJ2NvbG9yJzogJyM2NjYnLFxyXG4gICAgICAnbGlzdCc6IFtcclxuICAgICAge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9wb3N0L3Bvc3QnLFxyXG4gICAgICAgICdpY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL3Bvc3RfYmVmb3JlLnBuZycsXHJcbiAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy9wb3N0X2FmdGVyLnBuZycsXHJcbiAgICAgICAgJ3RleHQnOiAn5L+h5oGvJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2luZGV4L2luZGV4JyxcclxuICAgICAgICAnaWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy9zaG9wX2JlZm9yZS5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvc2hvcF9hZnRlci5wbmcnLFxyXG4gICAgICAgICd0ZXh0JzogJ+WVhuWfjidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9lZGl0L2VkaXQnLFxyXG4gICAgICAgICdpY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL2VkaXQucG5nJyxcclxuICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL2VkaXQucG5nJyxcclxuICAgICAgICAndGV4dCc6ICfkv6Hmga/lj5HluIMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvY2FydC9jYXJ0JyxcclxuICAgICAgICAnaWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy9jYXJ0X2JlZm9yZS5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvY2FydF9hZnRlci5wbmcnLFxyXG4gICAgICAgICd0ZXh0JzogJ+i0reeJqei9pidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy91Y2VudGVyL2luZGV4L2luZGV4JyxcclxuICAgICAgICAnaWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy91Y2VudGVyX2JlZm9yZS5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvdWNlbnRlcl9hZnRlci5wbmcnLFxyXG4gICAgICAgICd0ZXh0JzogJ+aIkeeahCdcclxuICAgICAgfV1cclxuICAgIH0sXHJcbiAgICAvLyDpnIDopoHkv67mlLnkuLpQcm9taXNl5b2i5byP55qEd3hBUElcclxuICAgICdwcm9taXNpZnknOiBbXHJcbiAgICAgICdzY2FuQ29kZScsXHJcbiAgICAgICdzd2l0Y2hUYWInLFxyXG4gICAgICAnbmF2aWdhdGVUbycsXHJcbiAgICAgICdzaG93TW9kYWwnLFxyXG4gICAgICAndXBsb2FkRmlsZScsXHJcbiAgICAgICdjaG9vc2VJbWFnZScsXHJcbiAgICAgICdnZXRMb2NhdGlvbicsXHJcbiAgICAgICdjaG9vc2VMb2NhdGlvbicsXHJcbiAgICAgICdvcGVuTG9jYXRpb24nLFxyXG4gICAgICAnbWFrZVBob25lQ2FsbCdcclxuICAgIF0sXHJcbiAgICAnbmV0d29ya1RpbWVvdXQnOiB7XHJcbiAgICAgICdyZXF1ZXN0JzogMTAwMDAsXHJcbiAgICAgICdkb3dubG9hZEZpbGUnOiAxMDAwMFxyXG4gICAgfSxcclxuICAgICdkZWJ1Zyc6IHRydWVcclxuICB9XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKTtcclxuICAgIGNvbnNvbGUubG9nKCd4eHh4eHh4eCcsIHRpdGxlKVxyXG4gIH1cclxuICBhc3luYyBvbkxhdW5jaChvcHRpb25zKSB7XHJcbiAgICBjb25zb2xlLmxvZygnQXBwIG9uTGF1bmNoIG9wdGlvbnMnLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ1sncHJvbWlzaWZ5J10uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgd3hbaXRlbSArICdQJ10gPSB0aGlzLnd4UHJvbWlzaWZ5KHd4W2l0ZW1dKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCB7IHJlZmVyZWU6IHJlZmVyZWVfMiB9ID0gb3B0aW9ucy5xdWVyeTsgLy8g5YiG5Lqr5aW95Y+L55qE5o6o6I2Q5Lq6XHJcbiAgICBsZXQgcmVmZXJlZV8zID0gb3B0aW9ucy5xdWVyeS5zY2VuZTsgLy8g5Y+R5YiG5Lqr56CB55qE5o6o6I2Q5Lq6XHJcbiAgICBjb25zb2xlLmxvZygnZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuc2NlbmUpJywgZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuc2NlbmUpKTtcclxuICAgIGlmIChyZWZlcmVlXzMgJiYgcmVmZXJlZV8zLmluZGV4T2YoJ3ZoZWVlcicpID4gLTEpIHtcclxuICAgICAgcmVmZXJlZV8zID0gcmVmZXJlZV8zLnNwbGl0KCdfJylbMV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWZlcmVlXzMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlZmVyZWVfaW50ZXIgPSByZWZlcmVlXzIgfHwgcmVmZXJlZV8zIHx8IDA7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ3JlZmVyZWVfMicsIHJlZmVyZWVfMik7XHJcbiAgICBjb25zb2xlLmxvZygncmVmZXJlZV8zJywgcmVmZXJlZV8zKTtcclxuICAgIGNvbnNvbGUubG9nKCdmaW5hbGx5IHJlZmVyZWVfaW50ZXInLCByZWZlcmVlX2ludGVyKTtcclxuXHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygncmVmZXJlZV9pbnRlcicsIHJlZmVyZWVfaW50ZXIpO1xyXG5cclxuICAgIC8vIHd4LmNsZWFyU3RvcmFnZSgpXHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdXNlci5sb2dpbkJ5V2VpeGluKClcclxuICAgICAgY29uc29sZS5sb2coJ2xvZ2luUmVzdWx0JywgcmVzKVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dpbkJ5V2VpeGluIGVycicsIGVycilcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB3eFByb21pc2lmeShmbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1Byb21pc2Ugc3VjY2VzcyDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1Byb21pc2UgZmFpbCDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmbihvYmopIC8vIOaJp+ihjOWHveaVsO+8jG9iauS4uuS8oOWFpeWHveaVsOeahOWPguaVsFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2xlZXAocykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpO1xyXG4gICAgICB9LFxyXG4gICAgICBzICogMTAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHRlc3RBc3luYygpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpO1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGFwcDtcclxuIl19