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

var _wxParse = require('./../../lib/wxParse/wxParse.js');

var _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      usingComponents: {
        'wxc-label': '../../packages/@minui/wxc-label/dist/index',
        'wxc-panel': '../../packages/@minui/wxc-panel/dist/index',
        'wxc-input': '../../packages/@minui/wxc-input/dist/index'
      }
    }, _this.components = {}, _this.mixins = [], _this.data = {
      post: {},
      user: {},
      imgs: [],
      ups: 0
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option) {
        var post_id, postData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                post_id = option.post_id;

                this.post_id = post_id;

                _context.next = 4;
                return (0, _util.request)(_api2.default.PostView, { post_id: post_id }, 'GET');

              case 4:
                postData = _context.sent;

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad(_x) {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShow',
    value: function onShow() {
      this.getPost();
    }
  }, {
    key: 'up',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var post_id, postData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                post_id = this.post_id;
                _context2.next = 3;
                return (0, _util.request)(_api2.default.PostUp, { post_id: post_id }, 'GET');

              case 3:
                postData = _context2.sent;
                _context2.next = 6;
                return this.getPost();

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function up() {
        return _ref3.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: 'getPost',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var postData, post, userData, user, imgData, imgs, upData, ups;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _util.request)(_api2.default.PostDetail, { id: this.post_id }, 'GET');

              case 2:
                postData = _context3.sent;
                post = postData.data;

                this.post = post;
                this.post.add_time = new Date(this.post.add_time * 1000).format('MM月dd日 hh时mm分');
                if (post.content) {
                  _wxParse2.default.wxParse('detail', 'html', post.content, this);
                }

                _context3.next = 9;
                return (0, _util.request)(_api2.default.UserGet, { user_id: post.user_id }, 'GET');

              case 9:
                userData = _context3.sent;
                user = userData.data;

                this.user = user;

                _context3.next = 14;
                return (0, _util.request)(_api2.default.PostImgGet, { post_id: post.id }, 'GET');

              case 14:
                imgData = _context3.sent;
                imgs = imgData.data.data;

                this.imgs = imgs;

                _context3.next = 19;
                return (0, _util.request)(_api2.default.PostUpList, { post_id: post.id }, 'GET');

              case 19:
                upData = _context3.sent;
                ups = upData.data.data;

                this.ups = ups.length;

                this.$apply();

              case 23:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPost() {
        return _ref4.apply(this, arguments);
      }

      return getPost;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/post/desc'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInBvc3QiLCJ1c2VyIiwiaW1ncyIsInVwcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIm9wdGlvbiIsInBvc3RfaWQiLCJhcGkiLCJQb3N0VmlldyIsInBvc3REYXRhIiwiZ2V0UG9zdCIsIlBvc3RVcCIsIlBvc3REZXRhaWwiLCJpZCIsImFkZF90aW1lIiwiRGF0ZSIsImZvcm1hdCIsImNvbnRlbnQiLCJXeFBhcnNlIiwid3hQYXJzZSIsIlVzZXJHZXQiLCJ1c2VyX2lkIiwidXNlckRhdGEiLCJQb3N0SW1nR2V0IiwiaW1nRGF0YSIsIlBvc3RVcExpc3QiLCJ1cERhdGEiLCJsZW5ndGgiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixxQkFBYSw0Q0FGRTtBQUdmLHFCQUFhO0FBSEU7QUFEVixLLFFBT1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsWUFBTSxFQUZEO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxXQUFLO0FBSkEsSyxRQU9QQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVUsRSxRQUVWQyxNLEdBQVMsRTs7Ozs7OzJGQUVJQyxNOzs7Ozs7QUFDSEMsdUIsR0FBWUQsTSxDQUFaQyxPOztBQUNSLHFCQUFLQSxPQUFMLEdBQWVBLE9BQWY7Ozt1QkFFdUIsbUJBQVFDLGNBQUlDLFFBQVosRUFBc0IsRUFBRUYsZ0JBQUYsRUFBdEIsRUFBbUMsS0FBbkMsQzs7O0FBQWpCRyx3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQUdDO0FBQ1AsV0FBS0MsT0FBTDtBQUNEOzs7Ozs7Ozs7O0FBR1NKLHVCLEdBQVksSSxDQUFaQSxPOzt1QkFFZSxtQkFBUUMsY0FBSUksTUFBWixFQUFvQixFQUFFTCxnQkFBRixFQUFwQixFQUFpQyxLQUFqQyxDOzs7QUFBakJHLHdCOzt1QkFDQSxLQUFLQyxPQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUlpQixtQkFBUUgsY0FBSUssVUFBWixFQUF3QixFQUFFQyxJQUFJLEtBQUtQLE9BQVgsRUFBeEIsRUFBOEMsS0FBOUMsQzs7O0FBQWpCRyx3QjtBQUNNWCxvQixHQUFTVyxRLENBQWZaLEk7O0FBQ04scUJBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLHFCQUFLQSxJQUFMLENBQVVnQixRQUFWLEdBQXFCLElBQUlDLElBQUosQ0FBUyxLQUFLakIsSUFBTCxDQUFVZ0IsUUFBVixHQUFxQixJQUE5QixFQUFvQ0UsTUFBcEMsQ0FBMkMsZUFBM0MsQ0FBckI7QUFDQSxvQkFBSWxCLEtBQUttQixPQUFULEVBQWtCO0FBQ2hCQyxvQ0FBUUMsT0FBUixDQUFnQixRQUFoQixFQUEwQixNQUExQixFQUFrQ3JCLEtBQUttQixPQUF2QyxFQUFnRCxJQUFoRDtBQUNEOzs7dUJBRXNCLG1CQUFRVixjQUFJYSxPQUFaLEVBQXFCLEVBQUVDLFNBQVN2QixLQUFLdUIsT0FBaEIsRUFBckIsRUFBZ0QsS0FBaEQsQzs7O0FBQWpCQyx3QjtBQUNRdkIsb0IsR0FBU3VCLFEsQ0FBZnpCLEk7O0FBQ1IscUJBQUtFLElBQUwsR0FBWUEsSUFBWjs7O3VCQUVzQixtQkFBUVEsY0FBSWdCLFVBQVosRUFBd0IsRUFBRWpCLFNBQVNSLEtBQUtlLEVBQWhCLEVBQXhCLEVBQThDLEtBQTlDLEM7OztBQUFoQlcsdUI7QUFDUXhCLG9CLEdBQVN3QixRQUFRM0IsSSxDQUF2QkEsSTs7QUFDUixxQkFBS0csSUFBTCxHQUFZQSxJQUFaOzs7dUJBRXFCLG1CQUFRTyxjQUFJa0IsVUFBWixFQUF3QixFQUFFbkIsU0FBU1IsS0FBS2UsRUFBaEIsRUFBeEIsRUFBOEMsS0FBOUMsQzs7O0FBQWZhLHNCO0FBQ1F6QixtQixHQUFReUIsT0FBTzdCLEksQ0FBckJBLEk7O0FBQ1IscUJBQUtJLEdBQUwsR0FBV0EsSUFBSTBCLE1BQWY7O0FBRUEscUJBQUtDLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFoRStCQyxlQUFLQyxJOztrQkFBbkJ0QyxLIiwiZmlsZSI6ImRlc2MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vY29uZmlnL2FwaSdcclxuICBpbXBvcnQgV3hQYXJzZSBmcm9tICcuLi8uLi9saWIvd3hQYXJzZS93eFBhcnNlLmpzJztcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgICAnd3hjLWxhYmVsJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtbGFiZWwvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1wYW5lbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXBhbmVsL2Rpc3QvaW5kZXgnLFxyXG4gICAgICAgICd3eGMtaW5wdXQnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1pbnB1dC9kaXN0L2luZGV4J1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge31cclxuXHJcbiAgICBtaXhpbnMgPSBbXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIHBvc3Q6IHt9LFxyXG4gICAgICB1c2VyOiB7fSxcclxuICAgICAgaW1nczogW10sXHJcbiAgICAgIHVwczogMCxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHt9XHJcblxyXG4gICAgbWV0aG9kcyA9IHt9XHJcblxyXG4gICAgZXZlbnRzID0ge31cclxuXHJcbiAgICBhc3luYyBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHsgcG9zdF9pZCB9ID0gb3B0aW9uXHJcbiAgICAgIHRoaXMucG9zdF9pZCA9IHBvc3RfaWRcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHBvc3REYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdFZpZXcsIHsgcG9zdF9pZCB9LCAnR0VUJylcclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgIHRoaXMuZ2V0UG9zdCgpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdXAoKSB7XHJcbiAgICAgIGNvbnN0IHsgcG9zdF9pZCB9ID0gdGhpc1xyXG4gICAgICBcclxuICAgICAgY29uc3QgcG9zdERhdGEgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0VXAsIHsgcG9zdF9pZCB9LCAnR0VUJylcclxuICAgICAgYXdhaXQgdGhpcy5nZXRQb3N0KClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRQb3N0KCkge1xyXG4gICAgICBjb25zdCBwb3N0RGF0YSA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3REZXRhaWwsIHsgaWQ6IHRoaXMucG9zdF9pZCB9LCAnR0VUJylcclxuICAgICAgbGV0IHsgZGF0YTogcG9zdCB9ID0gcG9zdERhdGFcclxuICAgICAgdGhpcy5wb3N0ID0gcG9zdFxyXG4gICAgICB0aGlzLnBvc3QuYWRkX3RpbWUgPSBuZXcgRGF0ZSh0aGlzLnBvc3QuYWRkX3RpbWUgKiAxMDAwKS5mb3JtYXQoJ01N5pyIZGTml6UgaGjml7ZtbeWIhicpXHJcbiAgICAgIGlmIChwb3N0LmNvbnRlbnQpIHtcclxuICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2RldGFpbCcsICdodG1sJywgcG9zdC5jb250ZW50LCB0aGlzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCByZXF1ZXN0KGFwaS5Vc2VyR2V0LCB7IHVzZXJfaWQ6IHBvc3QudXNlcl9pZCB9LCAnR0VUJylcclxuICAgICAgY29uc3QgeyBkYXRhOiB1c2VyIH0gPSB1c2VyRGF0YVxyXG4gICAgICB0aGlzLnVzZXIgPSB1c2VyXHJcblxyXG4gICAgICBjb25zdCBpbWdEYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdEltZ0dldCwgeyBwb3N0X2lkOiBwb3N0LmlkIH0sICdHRVQnKVxyXG4gICAgICBjb25zdCB7IGRhdGE6IGltZ3MgfSA9IGltZ0RhdGEuZGF0YVxyXG4gICAgICB0aGlzLmltZ3MgPSBpbWdzXHJcblxyXG4gICAgICBjb25zdCB1cERhdGEgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0VXBMaXN0LCB7IHBvc3RfaWQ6IHBvc3QuaWQgfSwgJ0dFVCcpXHJcbiAgICAgIGNvbnN0IHsgZGF0YTogdXBzIH0gPSB1cERhdGEuZGF0YVxyXG4gICAgICB0aGlzLnVwcyA9IHVwcy5sZW5ndGhcclxuXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuICB9XHJcbiJdfQ==