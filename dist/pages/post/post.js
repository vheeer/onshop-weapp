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
        image_url: 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/river/static/edit.jpg',
        link: ''
      }, {
        image_url: 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/river/static/edit1.jpg',
        link: ''
      }],
      posts: [],
      page: 1
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
                this.page = 1;
                _context.next = 3;
                return this.getData(this.page);

              case 3:
                posts = _context.sent;

                this.posts = posts;
                this.$apply();
                console.log('posts', posts);

              case 7:
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
                    item.add_time = new Date(add_time * 1000).format('YY年MM月dd日 hh时mm分');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImJhbm5hciIsImltYWdlX3VybCIsImxpbmsiLCJwb3N0cyIsInBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudHMiLCJfdGhpcyIsImNvbnNvbGUiLCJsb2ciLCJnZXREYXRhIiwiJGFwcGx5IiwicHVzaCIsImFwaSIsIlBvc3RMaXN0IiwicmVzdWx0IiwibWFwIiwiYWRkX3RpbWUiLCJpdGVtIiwiRGF0ZSIsImZvcm1hdCIsImUiLCJwb3N0X2lkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsIlBvc3RVcCIsInBvc3REYXRhIiwid3giLCJuYXZpZ2F0ZVRvUCIsInVybCIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLHVCQUFpQjtBQUNmLG9CQUFZLDJDQURHO0FBRWYscUJBQWE7QUFGRTtBQURWLEssU0FNVEMsVSxHQUFhLEUsU0FFYkMsTSxHQUFTLEUsU0FFVEMsSSxHQUFPO0FBQ0xDLGNBQVEsQ0FDTjtBQUNFQyxtQkFBVyx5RkFEYjtBQUVFQyxjQUFNO0FBRlIsT0FETSxFQUtOO0FBQ0VELG1CQUFXLDBGQURiO0FBRUVDLGNBQU07QUFGUixPQUxNLENBREg7QUFXTEMsYUFBTyxFQVhGO0FBWUxDLFlBQU07QUFaRCxLLFNBZVBDLFEsR0FBVyxFLFNBRVhDLE8sR0FBVSxFLFNBRVZDLE0sR0FBUztBQUNQLGlCQUFXLG1CQUFhLENBRXZCO0FBSE0sSzs7Ozs7NkJBTUE7QUFDUCxVQUFJQyxRQUFRLElBQVo7QUFDQUMsY0FBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJGLEtBQXJCO0FBQ0Q7Ozs7Ozs7Ozs7QUFHQyxxQkFBS0osSUFBTCxHQUFZLENBQVo7O3VCQUNvQixLQUFLTyxPQUFMLENBQWEsS0FBS1AsSUFBbEIsQzs7O0FBQWRELHFCOztBQUNOLHFCQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxxQkFBS1MsTUFBTDtBQUNBSCx3QkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJQLEtBQXJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJTUMsb0IsR0FBUyxJLENBQVRBLEk7O0FBQ05BOzt1QkFDb0IsS0FBS08sT0FBTCxDQUFhUCxJQUFiLEM7OztBQUFkRCxxQjs7QUFDTiwrQkFBS0EsS0FBTCxFQUFXVSxJQUFYLGtDQUFtQlYsS0FBbkI7QUFDQSxxQkFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EscUJBQUtRLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR1lSLEk7Ozs7Ozs7dUJBQ1MsbUJBQVFVLGNBQUlDLFFBQVosRUFBc0IsRUFBRVgsVUFBRixFQUF0QixFQUFnQyxLQUFoQyxDOzs7QUFBZlksc0I7O0FBQ05QLHdCQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQk0sTUFBdEI7QUFDTWpCLG9CLEdBQVNpQixNLENBQVRqQixJOztBQUNOQSx1QkFBT0EsS0FBS2tCLEdBQUwsQ0FBUyxnQkFBUTtBQUFBLHNCQUNkQyxRQURjLEdBQ0RDLElBREMsQ0FDZEQsUUFEYzs7QUFFdEIsc0JBQUlBLGFBQWEsQ0FBakIsRUFBb0I7QUFDbEJDLHlCQUFLRCxRQUFMLEdBQWdCLEVBQWhCO0FBQ0QsbUJBRkQsTUFFTztBQUNMQyx5QkFBS0QsUUFBTCxHQUFnQixJQUFJRSxJQUFKLENBQVNGLFdBQVcsSUFBcEIsRUFBMEJHLE1BQTFCLENBQWlDLGtCQUFqQyxDQUFoQjtBQUNEO0FBQ0QseUJBQU9GLElBQVA7QUFDRCxpQkFSTSxDQUFQO2tEQVNPcEIsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFHQXVCLEM7Ozs7OztBQUNLQyx1QixHQUFZRCxFQUFFRSxhQUFGLENBQWdCQyxPLENBQWhDQyxFOzt1QkFFZSxtQkFBUVosY0FBSWEsTUFBWixFQUFvQixFQUFFSixnQkFBRixFQUFwQixFQUFpQyxLQUFqQyxDOzs7QUFBakJLLHdCOzt1QkFDYyxLQUFLakIsT0FBTCxDQUFhLEtBQUtQLElBQWxCLEM7OztBQUFkRCxxQjs7QUFDTixxQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EscUJBQUtTLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFHUztBQUNUaUIsU0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGFBQUs7QUFEUSxPQUFmO0FBR0Q7Ozs7RUF2RmdDQyxlQUFLNUIsSTs7a0JBQW5CVixLIiwiZmlsZSI6InBvc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vY29uZmlnL2FwaSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd3eGMtcmF0ZSc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXJhdGUvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1sYWJlbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWxhYmVsL2Rpc3QvaW5kZXgnLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge31cclxuXHJcbiAgICBtaXhpbnMgPSBbXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGJhbm5hcjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGltYWdlX3VybDogJ2h0dHBzOi8vbmlkZXNob3AtYWRtaW4tZHZhLTEyNTYxNzEyMzQuY29zLmFwLWJlaWppbmcubXlxY2xvdWQuY29tL3JpdmVyL3N0YXRpYy9lZGl0LmpwZycsXHJcbiAgICAgICAgICBsaW5rOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW1hZ2VfdXJsOiAnaHR0cHM6Ly9uaWRlc2hvcC1hZG1pbi1kdmEtMTI1NjE3MTIzNC5jb3MuYXAtYmVpamluZy5teXFjbG91ZC5jb20vcml2ZXIvc3RhdGljL2VkaXQxLmpwZycsXHJcbiAgICAgICAgICBsaW5rOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgcG9zdHM6IFtdLFxyXG4gICAgICBwYWdlOiAxXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fVxyXG5cclxuICAgIG1ldGhvZHMgPSB7fVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2JpbmR0YXAnOiAoLi4uYXJncykgPT4ge1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICBjb25zb2xlLmxvZygnX3RoaXMnLCBfdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblNob3coKSB7XHJcbiAgICAgIHRoaXMucGFnZSA9IDFcclxuICAgICAgY29uc3QgcG9zdHMgPSBhd2FpdCB0aGlzLmdldERhdGEodGhpcy5wYWdlKVxyXG4gICAgICB0aGlzLnBvc3RzID0gcG9zdHNcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICBjb25zb2xlLmxvZygncG9zdHMnLCBwb3N0cylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgICBsZXQgeyBwYWdlIH0gPSB0aGlzXHJcbiAgICAgIHBhZ2UrK1xyXG4gICAgICBjb25zdCBwb3N0cyA9IGF3YWl0IHRoaXMuZ2V0RGF0YShwYWdlKVxyXG4gICAgICB0aGlzLnBvc3RzLnB1c2goLi4ucG9zdHMpXHJcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEocGFnZSkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0TGlzdCwgeyBwYWdlIH0sICdHRVQnKVxyXG4gICAgICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KVxyXG4gICAgICBsZXQgeyBkYXRhIH0gPSByZXN1bHRcclxuICAgICAgZGF0YSA9IGRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgYWRkX3RpbWUgfSA9IGl0ZW1cclxuICAgICAgICBpZiAoYWRkX3RpbWUgPT09IDApIHtcclxuICAgICAgICAgIGl0ZW0uYWRkX3RpbWUgPSAnJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtLmFkZF90aW1lID0gbmV3IERhdGUoYWRkX3RpbWUgKiAxMDAwKS5mb3JtYXQoJ1lZ5bm0TU3mnIhkZOaXpSBoaOaXtm1t5YiGJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cChlKSB7XHJcbiAgICAgIGNvbnN0IHsgaWQ6IHBvc3RfaWQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBwb3N0RGF0YSA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RVcCwgeyBwb3N0X2lkIH0sICdHRVQnKVxyXG4gICAgICBjb25zdCBwb3N0cyA9IGF3YWl0IHRoaXMuZ2V0RGF0YSh0aGlzLnBhZ2UpXHJcbiAgICAgIHRoaXMucG9zdHMgPSBwb3N0c1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgZ29Ob3RpY2UoKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG9QKHtcclxuICAgICAgICB1cmw6ICdub3RpY2UnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=