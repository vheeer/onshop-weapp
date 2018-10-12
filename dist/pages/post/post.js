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
      posts: [],
      page: 1,
      bannar: [],
      userInfo: {},
      others: {}
    }, _this2.computed = {}, _this2.methods = {}, _this2.events = {
      'bindtap': function bindtap() {}
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this, result, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this = this;

                console.log('_this', _this);
                _context.next = 4;
                return (0, _util.request)(_api2.default.BannarGet, {}, 'GET');

              case 4:
                result = _context.sent;
                data = result.data;

                this.bannar = data;

                this.$apply();

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShow',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var posts;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _util.storage2data)(this);
                this.page = 1;
                _context2.next = 4;
                return this.getData(this.page);

              case 4:
                posts = _context2.sent;

                this.posts = posts;
                this.$apply();
                console.log('posts', posts);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onShow() {
        return _ref3.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _posts;

        var page, posts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                page = this.page;

                page++;
                _context3.next = 4;
                return this.getData(page);

              case 4:
                posts = _context3.sent;

                (_posts = this.posts).push.apply(_posts, _toConsumableArray(posts));
                this.page = page;
                this.$apply();

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onReachBottom() {
        return _ref4.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }, {
    key: 'getData',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(page) {
        var result, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _util.request)(_api2.default.PostList, { page: page }, 'GET');

              case 2:
                result = _context4.sent;

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
                return _context4.abrupt('return', data);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getData(_x) {
        return _ref5.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: 'up',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        var post_id, postData, posts;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                post_id = e.currentTarget.dataset.id;
                _context5.next = 3;
                return (0, _util.request)(_api2.default.PostUp, { post_id: post_id }, 'GET');

              case 3:
                postData = _context5.sent;
                _context5.next = 6;
                return this.getData(this.page);

              case 6:
                posts = _context5.sent;

                this.posts = posts;
                this.$apply();

              case 9:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function up(_x2) {
        return _ref6.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: 'call',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
        var number, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                number = e.currentTarget.dataset.number;
                _context6.next = 3;
                return wx.makePhoneCallP({
                  phoneNumber: number
                });

              case 3:
                result = _context6.sent;

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function call(_x3) {
        return _ref7.apply(this, arguments);
      }

      return call;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInBvc3RzIiwicGFnZSIsImJhbm5hciIsInVzZXJJbmZvIiwib3RoZXJzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiX3RoaXMiLCJjb25zb2xlIiwibG9nIiwiYXBpIiwiQmFubmFyR2V0IiwicmVzdWx0IiwiJGFwcGx5IiwiZ2V0RGF0YSIsInB1c2giLCJQb3N0TGlzdCIsIm1hcCIsImFkZF90aW1lIiwiaXRlbSIsIkRhdGUiLCJmb3JtYXQiLCJlIiwicG9zdF9pZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJQb3N0VXAiLCJwb3N0RGF0YSIsIm51bWJlciIsInd4IiwibWFrZVBob25lQ2FsbFAiLCJwaG9uZU51bWJlciIsIm5hdmlnYXRlVG9QIiwidXJsIiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7dUxBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBQ2Ysb0JBQVksMkNBREc7QUFFZixxQkFBYTtBQUZFO0FBRFYsSyxTQU1UQyxVLEdBQWEsRSxTQUViQyxNLEdBQVMsRSxTQUVUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFlBQU0sQ0FGRDtBQUdMQyxjQUFRLEVBSEg7QUFJTEMsZ0JBQVUsRUFKTDtBQUtMQyxjQUFRO0FBTEgsSyxTQVFQQyxRLEdBQVcsRSxTQUVYQyxPLEdBQVUsRSxTQUVWQyxNLEdBQVM7QUFDUCxpQkFBVyxtQkFBYSxDQUV2QjtBQUhNLEs7Ozs7Ozs7Ozs7Ozs7QUFPSEMscUIsR0FBUSxJOztBQUNaQyx3QkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJGLEtBQXJCOzt1QkFDcUIsbUJBQVFHLGNBQUlDLFNBQVosRUFBdUIsRUFBdkIsRUFBMkIsS0FBM0IsQzs7O0FBQWZDLHNCO0FBQ0VkLG9CLEdBQVNjLE0sQ0FBVGQsSTs7QUFDUixxQkFBS0csTUFBTCxHQUFjSCxJQUFkOztBQUVBLHFCQUFLZSxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsd0NBQWEsSUFBYjtBQUNBLHFCQUFLYixJQUFMLEdBQVksQ0FBWjs7dUJBQ29CLEtBQUtjLE9BQUwsQ0FBYSxLQUFLZCxJQUFsQixDOzs7QUFBZEQscUI7O0FBQ04scUJBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLHFCQUFLYyxNQUFMO0FBQ0FMLHdCQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQlYsS0FBckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlNQyxvQixHQUFTLEksQ0FBVEEsSTs7QUFDTkE7O3VCQUNvQixLQUFLYyxPQUFMLENBQWFkLElBQWIsQzs7O0FBQWRELHFCOztBQUNOLCtCQUFLQSxLQUFMLEVBQVdnQixJQUFYLGtDQUFtQmhCLEtBQW5CO0FBQ0EscUJBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLHFCQUFLYSxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRGQUdZYixJOzs7Ozs7O3VCQUNTLG1CQUFRVSxjQUFJTSxRQUFaLEVBQXNCLEVBQUVoQixVQUFGLEVBQXRCLEVBQWdDLEtBQWhDLEM7OztBQUFmWSxzQjs7QUFDTkosd0JBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCRyxNQUF0QjtBQUNNZCxvQixHQUFTYyxNLENBQVRkLEk7O0FBQ05BLHVCQUFPQSxLQUFLbUIsR0FBTCxDQUFTLGdCQUFRO0FBQUEsc0JBQ2RDLFFBRGMsR0FDREMsSUFEQyxDQUNkRCxRQURjOztBQUV0QixzQkFBSUEsYUFBYSxDQUFqQixFQUFvQjtBQUNsQkMseUJBQUtELFFBQUwsR0FBZ0IsRUFBaEI7QUFDRCxtQkFGRCxNQUVPO0FBQ0xDLHlCQUFLRCxRQUFMLEdBQWdCLElBQUlFLElBQUosQ0FBU0YsV0FBVyxJQUFwQixFQUEwQkcsTUFBMUIsQ0FBaUMsbUJBQWpDLENBQWhCO0FBQ0Q7QUFDRCx5QkFBT0YsSUFBUDtBQUNELGlCQVJNLENBQVA7a0RBU09yQixJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRGQUdBd0IsQzs7Ozs7O0FBQ0tDLHVCLEdBQVlELEVBQUVFLGFBQUYsQ0FBZ0JDLE8sQ0FBaENDLEU7O3VCQUVlLG1CQUFRaEIsY0FBSWlCLE1BQVosRUFBb0IsRUFBRUosZ0JBQUYsRUFBcEIsRUFBaUMsS0FBakMsQzs7O0FBQWpCSyx3Qjs7dUJBQ2MsS0FBS2QsT0FBTCxDQUFhLEtBQUtkLElBQWxCLEM7OztBQUFkRCxxQjs7QUFDTixxQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EscUJBQUtjLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR1NTLEM7Ozs7OztBQUNETyxzQixHQUFXUCxFQUFFRSxhQUFGLENBQWdCQyxPLENBQTNCSSxNOzt1QkFDYUMsR0FBR0MsY0FBSCxDQUFrQjtBQUNyQ0MsK0JBQWFIO0FBRHdCLGlCQUFsQixDOzs7QUFBZmpCLHNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBS0c7QUFDVGtCLFNBQUdHLFdBQUgsQ0FBZTtBQUNiQyxhQUFLO0FBRFEsT0FBZjtBQUdEOzs7O0VBN0ZnQ0MsZUFBS25DLEk7O2tCQUFuQlAsSyIsImZpbGUiOiJwb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgeyByZXF1ZXN0LCBzdG9yYWdlMmRhdGEgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vY29uZmlnL2FwaSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd3eGMtcmF0ZSc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXJhdGUvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1sYWJlbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWxhYmVsL2Rpc3QvaW5kZXgnLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge31cclxuXHJcbiAgICBtaXhpbnMgPSBbXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIHBvc3RzOiBbXSxcclxuICAgICAgcGFnZTogMSxcclxuICAgICAgYmFubmFyOiBbXSxcclxuICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICBvdGhlcnM6IHt9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fVxyXG5cclxuICAgIG1ldGhvZHMgPSB7fVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2JpbmR0YXAnOiAoLi4uYXJncykgPT4ge1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICBjb25zb2xlLmxvZygnX3RoaXMnLCBfdGhpcylcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxdWVzdChhcGkuQmFubmFyR2V0LCB7fSwgJ0dFVCcpXHJcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XHJcbiAgICAgIHRoaXMuYmFubmFyID0gZGF0YVxyXG5cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uU2hvdygpIHtcclxuICAgICAgc3RvcmFnZTJkYXRhKHRoaXMpXHJcbiAgICAgIHRoaXMucGFnZSA9IDFcclxuICAgICAgY29uc3QgcG9zdHMgPSBhd2FpdCB0aGlzLmdldERhdGEodGhpcy5wYWdlKVxyXG4gICAgICB0aGlzLnBvc3RzID0gcG9zdHNcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICBjb25zb2xlLmxvZygncG9zdHMnLCBwb3N0cylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgICBsZXQgeyBwYWdlIH0gPSB0aGlzXHJcbiAgICAgIHBhZ2UrK1xyXG4gICAgICBjb25zdCBwb3N0cyA9IGF3YWl0IHRoaXMuZ2V0RGF0YShwYWdlKVxyXG4gICAgICB0aGlzLnBvc3RzLnB1c2goLi4ucG9zdHMpXHJcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEocGFnZSkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0TGlzdCwgeyBwYWdlIH0sICdHRVQnKVxyXG4gICAgICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KVxyXG4gICAgICBsZXQgeyBkYXRhIH0gPSByZXN1bHRcclxuICAgICAgZGF0YSA9IGRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgYWRkX3RpbWUgfSA9IGl0ZW1cclxuICAgICAgICBpZiAoYWRkX3RpbWUgPT09IDApIHtcclxuICAgICAgICAgIGl0ZW0uYWRkX3RpbWUgPSAnJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtLmFkZF90aW1lID0gbmV3IERhdGUoYWRkX3RpbWUgKiAxMDAwKS5mb3JtYXQoJ1lZWVktTU0tZGTml6UgaGg6bW0nKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gZGF0YVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwKGUpIHtcclxuICAgICAgY29uc3QgeyBpZDogcG9zdF9pZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHBvc3REYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdFVwLCB7IHBvc3RfaWQgfSwgJ0dFVCcpXHJcbiAgICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgdGhpcy5nZXREYXRhKHRoaXMucGFnZSlcclxuICAgICAgdGhpcy5wb3N0cyA9IHBvc3RzXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjYWxsKGUpIHtcclxuICAgICAgY29uc3QgeyBudW1iZXIgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHd4Lm1ha2VQaG9uZUNhbGxQKHtcclxuICAgICAgICBwaG9uZU51bWJlcjogbnVtYmVyXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29Ob3RpY2UoKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG9QKHtcclxuICAgICAgICB1cmw6ICdub3RpY2UnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=