'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../../utils/util.js');

var _api = require('./../../config/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this2, _ret;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, Index);

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      usingComponents: {
        'wxc-rate': '../../packages/@minui/wxc-rate/dist/index',
        'wxc-label': '../../packages/@minui/wxc-label/dist/index'
      }
    }, _this2.components = {}, _this2.mixins = [], _this2.data = {
      bannar: [{
        image_url: 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/youxuanke/upload/images/health.png',
        link: ''
      }],
      posts: [],
      page: 1,
      userInfo: {},
      others: {}
    }, _this2.computed = {}, _this2.methods = {}, _this2.events = {
      'bindtap': function bindtap() {}
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var _this = this;
      console.log('_this', _this);
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var posts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _util.storage2data)(this);
                this.page = 1;
                _context.next = 4;
                return this.getData(this.page);

              case 4:
                posts = _context.sent;

                this.posts = posts;
                this.$apply();
                console.log('posts', posts);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onShow() {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _posts;

        var page, posts;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                page = this.page;

                page++;
                _context2.next = 4;
                return this.getData(page);

              case 4:
                posts = _context2.sent;

                (_posts = this.posts).push.apply(_posts, _toConsumableArray(posts));
                this.page = page;
                this.$apply();

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onReachBottom() {
        return _ref3.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }, {
    key: 'getData',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page) {
        var result, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _util.request)(_api2.default.PostList, { page: page }, 'GET');

              case 2:
                result = _context3.sent;

                console.log('result', result);
                data = result.data;

                data = data.map(function (item) {
                  var add_time = item.add_time;

                  if (add_time === 0) {
                    item.add_time = '';
                  } else {
                    item.add_time = new Date(add_time * 1000).format('YYYY-MM-dd日 hh:mm');
                  }
                  return item;
                });
                return _context3.abrupt('return', data);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getData(_x) {
        return _ref4.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: 'up',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
        var post_id, postData, posts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                post_id = e.currentTarget.dataset.id;
                _context4.next = 3;
                return (0, _util.request)(_api2.default.PostUp, { post_id: post_id }, 'GET');

              case 3:
                postData = _context4.sent;
                _context4.next = 6;
                return this.getData(this.page);

              case 6:
                posts = _context4.sent;

                this.posts = posts;
                this.$apply();

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function up(_x2) {
        return _ref5.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: 'goNotice',
    value: function goNotice() {
      wx.navigateToP({
        url: 'notice'
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/post/post'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImJhbm5hciIsImltYWdlX3VybCIsImxpbmsiLCJwb3N0cyIsInBhZ2UiLCJ1c2VySW5mbyIsIm90aGVycyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIl90aGlzIiwiY29uc29sZSIsImxvZyIsImdldERhdGEiLCIkYXBwbHkiLCJwdXNoIiwiYXBpIiwiUG9zdExpc3QiLCJyZXN1bHQiLCJtYXAiLCJhZGRfdGltZSIsIml0ZW0iLCJEYXRlIiwiZm9ybWF0IiwiZSIsInBvc3RfaWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiUG9zdFVwIiwicG9zdERhdGEiLCJ3eCIsIm5hdmlnYXRlVG9QIiwidXJsIiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7dUxBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBQ2Ysb0JBQVksMkNBREc7QUFFZixxQkFBYTtBQUZFO0FBRFYsSyxTQU1UQyxVLEdBQWEsRSxTQUViQyxNLEdBQVMsRSxTQUVUQyxJLEdBQU87QUFDTEMsY0FBUSxDQUNOO0FBQ0VDLG1CQUFXLHNHQURiO0FBRUVDLGNBQU07QUFGUixPQURNLENBREg7QUFPTEMsYUFBTyxFQVBGO0FBUUxDLFlBQU0sQ0FSRDtBQVNMQyxnQkFBVSxFQVRMO0FBVUxDLGNBQVE7QUFWSCxLLFNBYVBDLFEsR0FBVyxFLFNBRVhDLE8sR0FBVSxFLFNBRVZDLE0sR0FBUztBQUNQLGlCQUFXLG1CQUFhLENBRXZCO0FBSE0sSzs7Ozs7NkJBTUE7QUFDUCxVQUFJQyxRQUFRLElBQVo7QUFDQUMsY0FBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJGLEtBQXJCO0FBQ0Q7Ozs7Ozs7Ozs7QUFHQyx3Q0FBYSxJQUFiO0FBQ0EscUJBQUtOLElBQUwsR0FBWSxDQUFaOzt1QkFDb0IsS0FBS1MsT0FBTCxDQUFhLEtBQUtULElBQWxCLEM7OztBQUFkRCxxQjs7QUFDTixxQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EscUJBQUtXLE1BQUw7QUFDQUgsd0JBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCVCxLQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSU1DLG9CLEdBQVMsSSxDQUFUQSxJOztBQUNOQTs7dUJBQ29CLEtBQUtTLE9BQUwsQ0FBYVQsSUFBYixDOzs7QUFBZEQscUI7O0FBQ04sK0JBQUtBLEtBQUwsRUFBV1ksSUFBWCxrQ0FBbUJaLEtBQW5CO0FBQ0EscUJBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLHFCQUFLVSxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRGQUdZVixJOzs7Ozs7O3VCQUNTLG1CQUFRWSxjQUFJQyxRQUFaLEVBQXNCLEVBQUViLFVBQUYsRUFBdEIsRUFBZ0MsS0FBaEMsQzs7O0FBQWZjLHNCOztBQUNOUCx3QkFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JNLE1BQXRCO0FBQ01uQixvQixHQUFTbUIsTSxDQUFUbkIsSTs7QUFDTkEsdUJBQU9BLEtBQUtvQixHQUFMLENBQVMsZ0JBQVE7QUFBQSxzQkFDZEMsUUFEYyxHQUNEQyxJQURDLENBQ2RELFFBRGM7O0FBRXRCLHNCQUFJQSxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCQyx5QkFBS0QsUUFBTCxHQUFnQixFQUFoQjtBQUNELG1CQUZELE1BRU87QUFDTEMseUJBQUtELFFBQUwsR0FBZ0IsSUFBSUUsSUFBSixDQUFTRixXQUFXLElBQXBCLEVBQTBCRyxNQUExQixDQUFpQyxtQkFBakMsQ0FBaEI7QUFDRDtBQUNELHlCQUFPRixJQUFQO0FBQ0QsaUJBUk0sQ0FBUDtrREFTT3RCLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR0F5QixDOzs7Ozs7QUFDS0MsdUIsR0FBWUQsRUFBRUUsYUFBRixDQUFnQkMsTyxDQUFoQ0MsRTs7dUJBRWUsbUJBQVFaLGNBQUlhLE1BQVosRUFBb0IsRUFBRUosZ0JBQUYsRUFBcEIsRUFBaUMsS0FBakMsQzs7O0FBQWpCSyx3Qjs7dUJBQ2MsS0FBS2pCLE9BQUwsQ0FBYSxLQUFLVCxJQUFsQixDOzs7QUFBZEQscUI7O0FBQ04scUJBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLHFCQUFLVyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBR1M7QUFDVGlCLFNBQUdDLFdBQUgsQ0FBZTtBQUNiQyxhQUFLO0FBRFEsT0FBZjtBQUdEOzs7O0VBdEZnQ0MsZUFBSzlCLEk7O2tCQUFuQlYsSyIsImZpbGUiOiJwb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgeyByZXF1ZXN0LCBzdG9yYWdlMmRhdGEgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vY29uZmlnL2FwaSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd3eGMtcmF0ZSc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXJhdGUvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1sYWJlbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWxhYmVsL2Rpc3QvaW5kZXgnLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge31cclxuXHJcbiAgICBtaXhpbnMgPSBbXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGJhbm5hcjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGltYWdlX3VybDogJ2h0dHBzOi8vbmlkZXNob3AtYWRtaW4tZHZhLTEyNTYxNzEyMzQuY29zLmFwLWJlaWppbmcubXlxY2xvdWQuY29tL3lvdXh1YW5rZS91cGxvYWQvaW1hZ2VzL2hlYWx0aC5wbmcnLFxyXG4gICAgICAgICAgbGluazogJydcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHBvc3RzOiBbXSxcclxuICAgICAgcGFnZTogMSxcclxuICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICBvdGhlcnM6IHt9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fVxyXG5cclxuICAgIG1ldGhvZHMgPSB7fVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2JpbmR0YXAnOiAoLi4uYXJncykgPT4ge1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICBjb25zb2xlLmxvZygnX3RoaXMnLCBfdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblNob3coKSB7XHJcbiAgICAgIHN0b3JhZ2UyZGF0YSh0aGlzKVxyXG4gICAgICB0aGlzLnBhZ2UgPSAxXHJcbiAgICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgdGhpcy5nZXREYXRhKHRoaXMucGFnZSlcclxuICAgICAgdGhpcy5wb3N0cyA9IHBvc3RzXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgY29uc29sZS5sb2coJ3Bvc3RzJywgcG9zdHMpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgICAgbGV0IHsgcGFnZSB9ID0gdGhpc1xyXG4gICAgICBwYWdlKytcclxuICAgICAgY29uc3QgcG9zdHMgPSBhd2FpdCB0aGlzLmdldERhdGEocGFnZSlcclxuICAgICAgdGhpcy5wb3N0cy5wdXNoKC4uLnBvc3RzKVxyXG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXREYXRhKHBhZ2UpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdExpc3QsIHsgcGFnZSB9LCAnR0VUJylcclxuICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHJlc3VsdClcclxuICAgICAgbGV0IHsgZGF0YSB9ID0gcmVzdWx0XHJcbiAgICAgIGRhdGEgPSBkYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCB7IGFkZF90aW1lIH0gPSBpdGVtXHJcbiAgICAgICAgaWYgKGFkZF90aW1lID09PSAwKSB7XHJcbiAgICAgICAgICBpdGVtLmFkZF90aW1lID0gJydcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbS5hZGRfdGltZSA9IG5ldyBEYXRlKGFkZF90aW1lICogMTAwMCkuZm9ybWF0KCdZWVlZLU1NLWRk5pelIGhoOm1tJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cChlKSB7XHJcbiAgICAgIGNvbnN0IHsgaWQ6IHBvc3RfaWQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBwb3N0RGF0YSA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RVcCwgeyBwb3N0X2lkIH0sICdHRVQnKVxyXG4gICAgICBjb25zdCBwb3N0cyA9IGF3YWl0IHRoaXMuZ2V0RGF0YSh0aGlzLnBhZ2UpXHJcbiAgICAgIHRoaXMucG9zdHMgPSBwb3N0c1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgZ29Ob3RpY2UoKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG9QKHtcclxuICAgICAgICB1cmw6ICdub3RpY2UnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=