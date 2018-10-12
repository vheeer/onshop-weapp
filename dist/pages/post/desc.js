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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var title = _api2.default.title;

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
      ups: 0,
      title: ''
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
      this.title = title;

      this.$apply();
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

                _context3.next = 8;
                return (0, _util.request)(_api2.default.UserGet, { user_id: post.user_id }, 'GET');

              case 8:
                userData = _context3.sent;
                user = userData.data;

                this.user = user;

                _context3.next = 13;
                return (0, _util.request)(_api2.default.PostImgGet, { post_id: post.id }, 'GET');

              case 13:
                imgData = _context3.sent;
                imgs = imgData.data.data;

                this.imgs = imgs;

                _context3.next = 18;
                return (0, _util.request)(_api2.default.PostUpList, { post_id: post.id }, 'GET');

              case 18:
                upData = _context3.sent;
                ups = upData.data.data;

                this.ups = ups.length;

                this.$apply();

              case 22:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2MuanMiXSwibmFtZXMiOlsidGl0bGUiLCJhcGkiLCJJbmRleCIsImNvbmZpZyIsInVzaW5nQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwicG9zdCIsInVzZXIiLCJpbWdzIiwidXBzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwib3B0aW9uIiwicG9zdF9pZCIsIlBvc3RWaWV3IiwicG9zdERhdGEiLCJnZXRQb3N0IiwiJGFwcGx5IiwiUG9zdFVwIiwiUG9zdERldGFpbCIsImlkIiwiYWRkX3RpbWUiLCJEYXRlIiwiZm9ybWF0IiwiVXNlckdldCIsInVzZXJfaWQiLCJ1c2VyRGF0YSIsIlBvc3RJbWdHZXQiLCJpbWdEYXRhIiwiUG9zdFVwTGlzdCIsInVwRGF0YSIsImxlbmd0aCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNRQSxLLEdBQVVDLGEsQ0FBVkQsSzs7SUFDYUUsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixxQkFBYSw0Q0FGRTtBQUdmLHFCQUFhO0FBSEU7QUFEVixLLFFBT1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsWUFBTSxFQUZEO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxXQUFLLENBSkE7QUFLTFgsYUFBTztBQUxGLEssUUFRUFksUSxHQUFXLEUsUUFFWEMsTyxHQUFVLEUsUUFFVkMsTSxHQUFTLEU7Ozs7OzsyRkFFSUMsTTs7Ozs7O0FBQ0hDLHVCLEdBQVlELE0sQ0FBWkMsTzs7QUFDUixxQkFBS0EsT0FBTCxHQUFlQSxPQUFmOzs7dUJBRXVCLG1CQUFRZixjQUFJZ0IsUUFBWixFQUFzQixFQUFFRCxnQkFBRixFQUF0QixFQUFtQyxLQUFuQyxDOzs7QUFBakJFLHdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBR0M7QUFDUCxXQUFLQyxPQUFMO0FBQ0EsV0FBS25CLEtBQUwsR0FBYUEsS0FBYjs7QUFFQSxXQUFLb0IsTUFBTDtBQUNEOzs7Ozs7Ozs7O0FBR1NKLHVCLEdBQVksSSxDQUFaQSxPOzt1QkFFZSxtQkFBUWYsY0FBSW9CLE1BQVosRUFBb0IsRUFBRUwsZ0JBQUYsRUFBcEIsRUFBaUMsS0FBakMsQzs7O0FBQWpCRSx3Qjs7dUJBQ0EsS0FBS0MsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFJaUIsbUJBQVFsQixjQUFJcUIsVUFBWixFQUF3QixFQUFFQyxJQUFJLEtBQUtQLE9BQVgsRUFBeEIsRUFBOEMsS0FBOUMsQzs7O0FBQWpCRSx3QjtBQUNNVixvQixHQUFTVSxRLENBQWZYLEk7O0FBQ04scUJBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLHFCQUFLQSxJQUFMLENBQVVnQixRQUFWLEdBQXFCLElBQUlDLElBQUosQ0FBUyxLQUFLakIsSUFBTCxDQUFVZ0IsUUFBVixHQUFxQixJQUE5QixFQUFvQ0UsTUFBcEMsQ0FBMkMsZUFBM0MsQ0FBckI7Ozt1QkFFdUIsbUJBQVF6QixjQUFJMEIsT0FBWixFQUFxQixFQUFFQyxTQUFTcEIsS0FBS29CLE9BQWhCLEVBQXJCLEVBQWdELEtBQWhELEM7OztBQUFqQkMsd0I7QUFDUXBCLG9CLEdBQVNvQixRLENBQWZ0QixJOztBQUNSLHFCQUFLRSxJQUFMLEdBQVlBLElBQVo7Ozt1QkFFc0IsbUJBQVFSLGNBQUk2QixVQUFaLEVBQXdCLEVBQUVkLFNBQVNSLEtBQUtlLEVBQWhCLEVBQXhCLEVBQThDLEtBQTlDLEM7OztBQUFoQlEsdUI7QUFDUXJCLG9CLEdBQVNxQixRQUFReEIsSSxDQUF2QkEsSTs7QUFDUixxQkFBS0csSUFBTCxHQUFZQSxJQUFaOzs7dUJBRXFCLG1CQUFRVCxjQUFJK0IsVUFBWixFQUF3QixFQUFFaEIsU0FBU1IsS0FBS2UsRUFBaEIsRUFBeEIsRUFBOEMsS0FBOUMsQzs7O0FBQWZVLHNCO0FBQ1F0QixtQixHQUFRc0IsT0FBTzFCLEksQ0FBckJBLEk7O0FBQ1IscUJBQUtJLEdBQUwsR0FBV0EsSUFBSXVCLE1BQWY7O0FBRUEscUJBQUtkLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFqRStCZSxlQUFLQyxJOztrQkFBbkJsQyxLIiwiZmlsZSI6ImRlc2MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vY29uZmlnL2FwaSdcclxuICBjb25zdCB7IHRpdGxlIH0gPSBhcGlcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd3eGMtbGFiZWwnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1sYWJlbC9kaXN0L2luZGV4JyxcclxuICAgICAgICAnd3hjLXBhbmVsJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtcGFuZWwvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1pbnB1dCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWlucHV0L2Rpc3QvaW5kZXgnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7fVxyXG5cclxuICAgIG1peGlucyA9IFtdXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgcG9zdDoge30sXHJcbiAgICAgIHVzZXI6IHt9LFxyXG4gICAgICBpbWdzOiBbXSxcclxuICAgICAgdXBzOiAwLFxyXG4gICAgICB0aXRsZTogJydcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHt9XHJcblxyXG4gICAgbWV0aG9kcyA9IHt9XHJcblxyXG4gICAgZXZlbnRzID0ge31cclxuXHJcbiAgICBhc3luYyBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHsgcG9zdF9pZCB9ID0gb3B0aW9uXHJcbiAgICAgIHRoaXMucG9zdF9pZCA9IHBvc3RfaWRcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHBvc3REYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdFZpZXcsIHsgcG9zdF9pZCB9LCAnR0VUJylcclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgIHRoaXMuZ2V0UG9zdCgpXHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG5cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwKCkge1xyXG4gICAgICBjb25zdCB7IHBvc3RfaWQgfSA9IHRoaXNcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHBvc3REYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdFVwLCB7IHBvc3RfaWQgfSwgJ0dFVCcpXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UG9zdCgpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0UG9zdCgpIHtcclxuICAgICAgY29uc3QgcG9zdERhdGEgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0RGV0YWlsLCB7IGlkOiB0aGlzLnBvc3RfaWQgfSwgJ0dFVCcpXHJcbiAgICAgIGxldCB7IGRhdGE6IHBvc3QgfSA9IHBvc3REYXRhXHJcbiAgICAgIHRoaXMucG9zdCA9IHBvc3RcclxuICAgICAgdGhpcy5wb3N0LmFkZF90aW1lID0gbmV3IERhdGUodGhpcy5wb3N0LmFkZF90aW1lICogMTAwMCkuZm9ybWF0KCdNTeaciGRk5pelIGho5pe2bW3liIYnKVxyXG5cclxuICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCByZXF1ZXN0KGFwaS5Vc2VyR2V0LCB7IHVzZXJfaWQ6IHBvc3QudXNlcl9pZCB9LCAnR0VUJylcclxuICAgICAgY29uc3QgeyBkYXRhOiB1c2VyIH0gPSB1c2VyRGF0YVxyXG4gICAgICB0aGlzLnVzZXIgPSB1c2VyXHJcblxyXG4gICAgICBjb25zdCBpbWdEYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdEltZ0dldCwgeyBwb3N0X2lkOiBwb3N0LmlkIH0sICdHRVQnKVxyXG4gICAgICBjb25zdCB7IGRhdGE6IGltZ3MgfSA9IGltZ0RhdGEuZGF0YVxyXG4gICAgICB0aGlzLmltZ3MgPSBpbWdzXHJcblxyXG4gICAgICBjb25zdCB1cERhdGEgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0VXBMaXN0LCB7IHBvc3RfaWQ6IHBvc3QuaWQgfSwgJ0dFVCcpXHJcbiAgICAgIGNvbnN0IHsgZGF0YTogdXBzIH0gPSB1cERhdGEuZGF0YVxyXG4gICAgICB0aGlzLnVwcyA9IHVwcy5sZW5ndGhcclxuXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuICB9XHJcbiJdfQ==