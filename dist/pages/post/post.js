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
      }, {
        image_url: 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/river/static/edit2.jpg',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImJhbm5hciIsImltYWdlX3VybCIsImxpbmsiLCJwb3N0cyIsInBhZ2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudHMiLCJfdGhpcyIsImNvbnNvbGUiLCJsb2ciLCJnZXREYXRhIiwiJGFwcGx5IiwicHVzaCIsImFwaSIsIlBvc3RMaXN0IiwicmVzdWx0IiwibWFwIiwiYWRkX3RpbWUiLCJpdGVtIiwiRGF0ZSIsImZvcm1hdCIsImUiLCJwb3N0X2lkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsIlBvc3RVcCIsInBvc3REYXRhIiwid3giLCJuYXZpZ2F0ZVRvUCIsInVybCIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLHVCQUFpQjtBQUNmLG9CQUFZLDJDQURHO0FBRWYscUJBQWE7QUFGRTtBQURWLEssU0FNVEMsVSxHQUFhLEUsU0FFYkMsTSxHQUFTLEUsU0FFVEMsSSxHQUFPO0FBQ0xDLGNBQVEsQ0FDTjtBQUNFQyxtQkFBVyx5RkFEYjtBQUVFQyxjQUFNO0FBRlIsT0FETSxFQUtOO0FBQ0VELG1CQUFXLDBGQURiO0FBRUVDLGNBQU07QUFGUixPQUxNLEVBU047QUFDRUQsbUJBQVcsMEZBRGI7QUFFRUMsY0FBTTtBQUZSLE9BVE0sQ0FESDtBQWVMQyxhQUFPLEVBZkY7QUFnQkxDLFlBQU07QUFoQkQsSyxTQW1CUEMsUSxHQUFXLEUsU0FFWEMsTyxHQUFVLEUsU0FFVkMsTSxHQUFTO0FBQ1AsaUJBQVcsbUJBQWEsQ0FFdkI7QUFITSxLOzs7Ozs2QkFNQTtBQUNQLFVBQUlDLFFBQVEsSUFBWjtBQUNBQyxjQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQkYsS0FBckI7QUFDRDs7Ozs7Ozs7OztBQUdDLHFCQUFLSixJQUFMLEdBQVksQ0FBWjs7dUJBQ29CLEtBQUtPLE9BQUwsQ0FBYSxLQUFLUCxJQUFsQixDOzs7QUFBZEQscUI7O0FBQ04scUJBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLHFCQUFLUyxNQUFMO0FBQ0FILHdCQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQlAsS0FBckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlNQyxvQixHQUFTLEksQ0FBVEEsSTs7QUFDTkE7O3VCQUNvQixLQUFLTyxPQUFMLENBQWFQLElBQWIsQzs7O0FBQWRELHFCOztBQUNOLCtCQUFLQSxLQUFMLEVBQVdVLElBQVgsa0NBQW1CVixLQUFuQjtBQUNBLHFCQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxxQkFBS1EsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFHWVIsSTs7Ozs7Ozt1QkFDUyxtQkFBUVUsY0FBSUMsUUFBWixFQUFzQixFQUFFWCxVQUFGLEVBQXRCLEVBQWdDLEtBQWhDLEM7OztBQUFmWSxzQjs7QUFDTlAsd0JBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCTSxNQUF0QjtBQUNNakIsb0IsR0FBU2lCLE0sQ0FBVGpCLEk7O0FBQ05BLHVCQUFPQSxLQUFLa0IsR0FBTCxDQUFTLGdCQUFRO0FBQUEsc0JBQ2RDLFFBRGMsR0FDREMsSUFEQyxDQUNkRCxRQURjOztBQUV0QixzQkFBSUEsYUFBYSxDQUFqQixFQUFvQjtBQUNsQkMseUJBQUtELFFBQUwsR0FBZ0IsRUFBaEI7QUFDRCxtQkFGRCxNQUVPO0FBQ0xDLHlCQUFLRCxRQUFMLEdBQWdCLElBQUlFLElBQUosQ0FBU0YsV0FBVyxJQUFwQixFQUEwQkcsTUFBMUIsQ0FBaUMsa0JBQWpDLENBQWhCO0FBQ0Q7QUFDRCx5QkFBT0YsSUFBUDtBQUNELGlCQVJNLENBQVA7a0RBU09wQixJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRGQUdBdUIsQzs7Ozs7O0FBQ0tDLHVCLEdBQVlELEVBQUVFLGFBQUYsQ0FBZ0JDLE8sQ0FBaENDLEU7O3VCQUVlLG1CQUFRWixjQUFJYSxNQUFaLEVBQW9CLEVBQUVKLGdCQUFGLEVBQXBCLEVBQWlDLEtBQWpDLEM7OztBQUFqQkssd0I7O3VCQUNjLEtBQUtqQixPQUFMLENBQWEsS0FBS1AsSUFBbEIsQzs7O0FBQWRELHFCOztBQUNOLHFCQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxxQkFBS1MsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQUdTO0FBQ1RpQixTQUFHQyxXQUFILENBQWU7QUFDYkMsYUFBSztBQURRLE9BQWY7QUFHRDs7OztFQTNGZ0NDLGVBQUs1QixJOztrQkFBbkJWLEsiLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9jb25maWcvYXBpJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICAgJ3d4Yy1yYXRlJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtcmF0ZS9kaXN0L2luZGV4JyxcclxuICAgICAgICAnd3hjLWxhYmVsJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtbGFiZWwvZGlzdC9pbmRleCcsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7fVxyXG5cclxuICAgIG1peGlucyA9IFtdXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgYmFubmFyOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW1hZ2VfdXJsOiAnaHR0cHM6Ly9uaWRlc2hvcC1hZG1pbi1kdmEtMTI1NjE3MTIzNC5jb3MuYXAtYmVpamluZy5teXFjbG91ZC5jb20vcml2ZXIvc3RhdGljL2VkaXQuanBnJyxcclxuICAgICAgICAgIGxpbms6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWFnZV91cmw6ICdodHRwczovL25pZGVzaG9wLWFkbWluLWR2YS0xMjU2MTcxMjM0LmNvcy5hcC1iZWlqaW5nLm15cWNsb3VkLmNvbS9yaXZlci9zdGF0aWMvZWRpdDEuanBnJyxcclxuICAgICAgICAgIGxpbms6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWFnZV91cmw6ICdodHRwczovL25pZGVzaG9wLWFkbWluLWR2YS0xMjU2MTcxMjM0LmNvcy5hcC1iZWlqaW5nLm15cWNsb3VkLmNvbS9yaXZlci9zdGF0aWMvZWRpdDIuanBnJyxcclxuICAgICAgICAgIGxpbms6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBwb3N0czogW10sXHJcbiAgICAgIHBhZ2U6IDFcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHt9XHJcblxyXG4gICAgbWV0aG9kcyA9IHt9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnYmluZHRhcCc6ICguLi5hcmdzKSA9PiB7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXHJcbiAgICAgIGNvbnNvbGUubG9nKCdfdGhpcycsIF90aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uU2hvdygpIHtcclxuICAgICAgdGhpcy5wYWdlID0gMVxyXG4gICAgICBjb25zdCBwb3N0cyA9IGF3YWl0IHRoaXMuZ2V0RGF0YSh0aGlzLnBhZ2UpXHJcbiAgICAgIHRoaXMucG9zdHMgPSBwb3N0c1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdwb3N0cycsIHBvc3RzKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uUmVhY2hCb3R0b20oKSB7XHJcbiAgICAgIGxldCB7IHBhZ2UgfSA9IHRoaXNcclxuICAgICAgcGFnZSsrXHJcbiAgICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgdGhpcy5nZXREYXRhKHBhZ2UpXHJcbiAgICAgIHRoaXMucG9zdHMucHVzaCguLi5wb3N0cylcclxuICAgICAgdGhpcy5wYWdlID0gcGFnZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0RGF0YShwYWdlKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RMaXN0LCB7IHBhZ2UgfSwgJ0dFVCcpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCByZXN1bHQpXHJcbiAgICAgIGxldCB7IGRhdGEgfSA9IHJlc3VsdFxyXG4gICAgICBkYXRhID0gZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBhZGRfdGltZSB9ID0gaXRlbVxyXG4gICAgICAgIGlmIChhZGRfdGltZSA9PT0gMCkge1xyXG4gICAgICAgICAgaXRlbS5hZGRfdGltZSA9ICcnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW0uYWRkX3RpbWUgPSBuZXcgRGF0ZShhZGRfdGltZSAqIDEwMDApLmZvcm1hdCgnWVnlubRNTeaciGRk5pelIGho5pe2bW3liIYnKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gZGF0YVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwKGUpIHtcclxuICAgICAgY29uc3QgeyBpZDogcG9zdF9pZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHBvc3REYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdFVwLCB7IHBvc3RfaWQgfSwgJ0dFVCcpXHJcbiAgICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgdGhpcy5nZXREYXRhKHRoaXMucGFnZSlcclxuICAgICAgdGhpcy5wb3N0cyA9IHBvc3RzXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuXHJcbiAgICBnb05vdGljZSgpIHtcclxuICAgICAgd3gubmF2aWdhdGVUb1Aoe1xyXG4gICAgICAgIHVybDogJ25vdGljZSdcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==