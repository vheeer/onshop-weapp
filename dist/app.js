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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ1dGlsIiwicmVxdWlyZSIsImFwaSIsInVzZXIiLCJEYXRlIiwicHJvdG90eXBlIiwiZm9ybWF0IiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJNYXRoIiwiZmxvb3IiLCJnZXRNaWxsaXNlY29uZHMiLCJ0ZXN0IiwicmVwbGFjZSIsIlJlZ0V4cCIsIiQxIiwiZ2V0RnVsbFllYXIiLCJzdWJzdHIiLCJsZW5ndGgiLCJrIiwiY29uZmlnIiwidXNlIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJmb3JFYWNoIiwid3giLCJpdGVtIiwid3hQcm9taXNpZnkiLCJyZWZlcmVlXzIiLCJxdWVyeSIsInJlZmVyZWUiLCJyZWZlcmVlXzMiLCJzY2VuZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImluZGV4T2YiLCJzcGxpdCIsInJlZmVyZWVfaW50ZXIiLCJzZXRTdG9yYWdlU3luYyIsImxvZ2luQnlXZWl4aW4iLCJyZXMiLCJmbiIsIm9iaiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsImZhaWwiLCJ3YXJuIiwicyIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFPQyxRQUFRLGlCQUFSLENBQWI7QUFDQSxJQUFNQyxNQUFNRCxRQUFRLGlCQUFSLENBQVo7QUFDQSxJQUFNRSxPQUFPRixRQUFRLG9CQUFSLENBQWI7O0FBR0lHLEtBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixVQUFTQSxNQUFULEVBQWlCO0FBQ3ZDLE1BQUlDLE9BQU87QUFDVCxVQUFNLEtBQUtDLFFBQUwsS0FBa0IsQ0FEZjtBQUVULFVBQU0sS0FBS0MsT0FBTCxFQUZHO0FBR1QsVUFBTSxLQUFLQyxRQUFMLEVBSEc7QUFJVCxV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S0FBS0UsS0FBTCxDQUFXLENBQVgsQzs7O0FBQWJDLG9COztBQUNON0Isd0JBQVFDLEdBQVIsQ0FBWTRCLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFuTHlCQyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbHMvdXRpbC5qcycpO1xuY29uc3QgYXBpID0gcmVxdWlyZSgnLi9jb25maWcvYXBpLmpzJyk7XG5jb25zdCB1c2VyID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy91c2VyLmpzJyk7XG5cblxuICAgIERhdGUucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgdmFyIGRhdGUgPSB7XG4gICAgICAgICdNKyc6IHRoaXMuZ2V0TW9udGgoKSArIDEsXG4gICAgICAgICdkKyc6IHRoaXMuZ2V0RGF0ZSgpLFxuICAgICAgICAnaCsnOiB0aGlzLmdldEhvdXJzKCksXG4gICAgICAgICdtKyc6IHRoaXMuZ2V0TWludXRlcygpLFxuICAgICAgICAncysnOiB0aGlzLmdldFNlY29uZHMoKSxcbiAgICAgICAgJ3ErJzogTWF0aC5mbG9vcigodGhpcy5nZXRNb250aCgpICsgMykgLyAzKSxcbiAgICAgICAgJ1MrJzogdGhpcy5nZXRNaWxsaXNlY29uZHMoKVxuICAgICAgfTtcbiAgICAgIGlmICgvKHkrKS9pLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShSZWdFeHAuJDEsICh0aGlzLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrIGluIGRhdGUpIHtcbiAgICAgICAgaWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmb3JtYXQpKSB7XG4gICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoUmVnRXhwLiQxLCBSZWdFeHAuJDEubGVuZ3RoID09PSAxID8gZGF0ZVtrXSA6ICgnMDAnICsgZGF0ZVtrXSkuc3Vic3RyKCgnJyArIGRhdGVba10pLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgJ3BhZ2VzJzogW1xuICAgICAgJ3BhZ2VzL2F1dGgvbG9naW4vbG9naW4nLFxuICAgICAgJ3BhZ2VzL3Bvc3QvcG9zdCcsXG4gICAgICAncGFnZXMvaW5kZXgvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZGlzdHJpYnV0ZS9ncm91cC9ncm91cCcsXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2luZGV4L2luZGV4JyxcbiAgICAgICdwYWdlcy91Y2VudGVyL2Rpc3RyaWJ1dGUvZXh0ZW5zaW9uL2V4dGVuc2lvbicsXG4gICAgICAncGFnZXMvdWNlbnRlci9pbmRleC9pbmRleCcsXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL2Nhc2gvY2FzaCcsXG4gICAgICAncGFnZXMvdWNlbnRlci9kaXN0cmlidXRlL29yZGVyL29yZGVyJyxcbiAgICAgICdwYWdlcy91Y2VudGVyL2Rpc3RyaWJ1dGUvY2FzaF9yZWNvcmQvY2FzaF9yZWNvcmQnLFxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZGlzdHJpYnV0ZS9qb2luL2pvaW4nLFxuICAgICAgJ3BhZ2VzL2NhdGFsb2cvY2F0YWxvZycsXG4gICAgICAncGFnZXMvbm90ZXMvbm90ZXMnLFxuICAgICAgJ3BhZ2VzL25ld0dvb2RzL25ld0dvb2RzJyxcbiAgICAgICdwYWdlcy9ob3RHb29kcy9ob3RHb29kcycsXG4gICAgICAncGFnZXMvdWNlbnRlci9hZGRyZXNzL2FkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvYWRkcmVzc0FkZC9hZGRyZXNzQWRkJyxcbiAgICAgICdwYWdlcy91Y2VudGVyL2Zvb3RwcmludC9mb290cHJpbnQnLFxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvb3JkZXIvb3JkZXInLFxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvb3JkZXJEZXRhaWwvb3JkZXJEZXRhaWwnLFxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZXhwcmVzcy9leHByZXNzJyxcbiAgICAgICdwYWdlcy91Y2VudGVyL2ZlZWRiYWNrL2ZlZWRiYWNrJyxcbiAgICAgICdwYWdlcy91Y2VudGVyL2NvdXBvbi9jb3Vwb24nLFxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvY29sbGVjdC9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9hdXRoL3JlZ2lzdGVyL3JlZ2lzdGVyJyxcbiAgICAgICdwYWdlcy9hdXRoL3Jlc2V0L3Jlc2V0JyxcbiAgICAgICdwYWdlcy9wYXkvcGF5JyxcbiAgICAgICdwYWdlcy9wYXlSZXN1bHQvcGF5UmVzdWx0JyxcbiAgICAgICdwYWdlcy90b3BpYy90b3BpYycsXG4gICAgICAncGFnZXMvY29tbWVudC9jb21tZW50JyxcbiAgICAgICdwYWdlcy9jb21tZW50UG9zdC9jb21tZW50UG9zdCcsXG4gICAgICAncGFnZXMvdG9waWNDb21tZW50L3RvcGljQ29tbWVudCcsXG4gICAgICAncGFnZXMvYnJhbmQvYnJhbmQnLFxuICAgICAgJ3BhZ2VzL2JyYW5kRGV0YWlsL2JyYW5kRGV0YWlsJyxcbiAgICAgICdwYWdlcy90YWcvdGFnJyxcbiAgICAgICdwYWdlcy90YWdEZXRhaWwvdGFnRGV0YWlsJyxcbiAgICAgICdwYWdlcy9zZWFyY2gvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeS9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvY2FydC9jYXJ0JyxcbiAgICAgICdwYWdlcy9zaG9wcGluZy9jaGVja291dC9jaGVja291dCcsXG4gICAgICAncGFnZXMvc2hvcHBpbmcvYWRkcmVzcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9zaG9wcGluZy9hZGRyZXNzQWRkL2FkZHJlc3NBZGQnLFxuICAgICAgJ3BhZ2VzL2dvb2RzL2dvb2RzJyxcbiAgICAgICdwYWdlcy90b3BpY0RldGFpbC90b3BpY0RldGFpbCcsXG4gICAgICAncGFnZXMvcG9zdC9ub3RpY2UnLFxuICAgICAgJ3BhZ2VzL3Bvc3QvZGVzYycsXG4gICAgICAncGFnZXMvZWRpdC9lZGl0J1xuICAgIF0sXG4gICAgJ3dpbmRvdyc6IHtcbiAgICAgICdiYWNrZ3JvdW5kVGV4dFN0eWxlJzogJ2RhcmsnLFxuICAgICAgJ25hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3InOiAnI0U5MkQyNCcsXG4gICAgICAnbmF2aWdhdGlvbkJhclRpdGxlVGV4dCc6ICfkvJjpgInlrqLogZTnm58nLFxuICAgICAgJ25hdmlnYXRpb25CYXJUZXh0U3R5bGUnOiAnYmxhY2snLFxuICAgICAgJ2VuYWJsZVB1bGxEb3duUmVmcmVzaCc6IGZhbHNlXG4gICAgfSxcbiAgICAndGFiQmFyJzoge1xuICAgICAgJ2JhY2tncm91bmRDb2xvcic6ICcjZmFmYWZhJyxcbiAgICAgICdib3JkZXJTdHlsZSc6ICd3aGl0ZScsXG4gICAgICAnc2VsZWN0ZWRDb2xvcic6ICcjYjQyODJkJyxcbiAgICAgICdjb2xvcic6ICcjNjY2JyxcbiAgICAgICdsaXN0JzogW1xuICAgICAge1xuICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvcG9zdC9wb3N0JyxcbiAgICAgICAgJ2ljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvcG9zdF9iZWZvcmUucG5nJyxcbiAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnc3RhdGljL2ltYWdlcy9wb3N0X2FmdGVyLnBuZycsXG4gICAgICAgICd0ZXh0JzogJ+S/oeaBrydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9pbmRleC9pbmRleCcsXG4gICAgICAgICdpY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL3Nob3BfYmVmb3JlLnBuZycsXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvc2hvcF9hZnRlci5wbmcnLFxuICAgICAgICAndGV4dCc6ICfllYbln44nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvZWRpdC9lZGl0JyxcbiAgICAgICAgJ2ljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvZWRpdC5wbmcnLFxuICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL2VkaXQucG5nJyxcbiAgICAgICAgJ3RleHQnOiAn5L+h5oGv5Y+R5biDJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2NhcnQvY2FydCcsXG4gICAgICAgICdpY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL2NhcnRfYmVmb3JlLnBuZycsXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvY2FydF9hZnRlci5wbmcnLFxuICAgICAgICAndGV4dCc6ICfotK3nianovaYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvdWNlbnRlci9pbmRleC9pbmRleCcsXG4gICAgICAgICdpY29uUGF0aCc6ICdzdGF0aWMvaW1hZ2VzL3VjZW50ZXJfYmVmb3JlLnBuZycsXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3N0YXRpYy9pbWFnZXMvdWNlbnRlcl9hZnRlci5wbmcnLFxuICAgICAgICAndGV4dCc6ICfmiJHnmoQnXG4gICAgICB9XVxuICAgIH0sXG4gICAgLy8g6ZyA6KaB5L+u5pS55Li6UHJvbWlzZeW9ouW8j+eahHd4QVBJXG4gICAgJ3Byb21pc2lmeSc6IFtcbiAgICAgICdzY2FuQ29kZScsXG4gICAgICAnc3dpdGNoVGFiJyxcbiAgICAgICduYXZpZ2F0ZVRvJyxcbiAgICAgICdzaG93TW9kYWwnLFxuICAgICAgJ3VwbG9hZEZpbGUnLFxuICAgICAgJ2Nob29zZUltYWdlJyxcbiAgICAgICdnZXRMb2NhdGlvbicsXG4gICAgICAnY2hvb3NlTG9jYXRpb24nLFxuICAgICAgJ29wZW5Mb2NhdGlvbicsXG4gICAgXSxcbiAgICAnbmV0d29ya1RpbWVvdXQnOiB7XG4gICAgICAncmVxdWVzdCc6IDEwMDAwLFxuICAgICAgJ2Rvd25sb2FkRmlsZSc6IDEwMDAwXG4gICAgfSxcbiAgICAnZGVidWcnOiB0cnVlXG4gIH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpO1xuICB9XG4gIGFzeW5jIG9uTGF1bmNoKG9wdGlvbnMpIHtcbiAgICBjb25zb2xlLmxvZygnQXBwIG9uTGF1bmNoIG9wdGlvbnMnLCBvcHRpb25zKTtcblxuICAgIHRoaXMuY29uZmlnWydwcm9taXNpZnknXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgd3hbaXRlbSArICdQJ10gPSB0aGlzLnd4UHJvbWlzaWZ5KHd4W2l0ZW1dKVxuICAgIH0pXG5cbiAgICBjb25zdCB7IHJlZmVyZWU6IHJlZmVyZWVfMiB9ID0gb3B0aW9ucy5xdWVyeTsgLy8g5YiG5Lqr5aW95Y+L55qE5o6o6I2Q5Lq6XG4gICAgbGV0IHJlZmVyZWVfMyA9IG9wdGlvbnMucXVlcnkuc2NlbmU7IC8vIOWPkeWIhuS6q+eggeeahOaOqOiNkOS6ulxuICAgIGNvbnNvbGUubG9nKCdkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5zY2VuZSknLCBkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5zY2VuZSkpO1xuICAgIGlmIChyZWZlcmVlXzMgJiYgcmVmZXJlZV8zLmluZGV4T2YoJ3ZoZWVlcicpID4gLTEpIHtcbiAgICAgIHJlZmVyZWVfMyA9IHJlZmVyZWVfMy5zcGxpdCgnXycpWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWZlcmVlXzMgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZmVyZWVfaW50ZXIgPSByZWZlcmVlXzIgfHwgcmVmZXJlZV8zIHx8IDA7XG5cbiAgICBjb25zb2xlLmxvZygncmVmZXJlZV8yJywgcmVmZXJlZV8yKTtcbiAgICBjb25zb2xlLmxvZygncmVmZXJlZV8zJywgcmVmZXJlZV8zKTtcbiAgICBjb25zb2xlLmxvZygnZmluYWxseSByZWZlcmVlX2ludGVyJywgcmVmZXJlZV9pbnRlcik7XG5cbiAgICB3eC5zZXRTdG9yYWdlU3luYygncmVmZXJlZV9pbnRlcicsIHJlZmVyZWVfaW50ZXIpO1xuXG4gICAgLy8gd3guY2xlYXJTdG9yYWdlKClcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB1c2VyLmxvZ2luQnlXZWl4aW4oKVxuICAgICAgY29uc29sZS5sb2coJ2xvZ2luUmVzdWx0JywgcmVzKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ2xvZ2luQnlXZWl4aW4gZXJyJywgZXJyKVxuICAgIH1cblxuICB9XG5cbiAgd3hQcm9taXNpZnkoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9KSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBvYmouc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnUHJvbWlzZSBzdWNjZXNzIOi/lOWbnuWPguaVsO+8micsIHJlcylcbiAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgfVxuICAgICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1Byb21pc2UgZmFpbCDov5Tlm57lj4LmlbDvvJonLCByZXMpXG4gICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgfVxuICAgICAgICBmbihvYmopIC8vIOaJp+ihjOWHveaVsO+8jG9iauS4uuS8oOWFpeWHveaVsOeahOWPguaVsFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzbGVlcChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJyk7XG4gICAgICB9LFxuICAgICAgcyAqIDEwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jKCkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9XG59XG5cbiJdfQ==