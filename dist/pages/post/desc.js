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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInBvc3QiLCJ1c2VyIiwiaW1ncyIsInVwcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIm9wdGlvbiIsInBvc3RfaWQiLCJhcGkiLCJQb3N0VmlldyIsInBvc3REYXRhIiwiZ2V0UG9zdCIsIlBvc3RVcCIsIlBvc3REZXRhaWwiLCJpZCIsImFkZF90aW1lIiwiRGF0ZSIsImZvcm1hdCIsIlVzZXJHZXQiLCJ1c2VyX2lkIiwidXNlckRhdGEiLCJQb3N0SW1nR2V0IiwiaW1nRGF0YSIsIlBvc3RVcExpc3QiLCJ1cERhdGEiLCJsZW5ndGgiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLHVCQUFpQjtBQUNmLHFCQUFhLDRDQURFO0FBRWYscUJBQWEsNENBRkU7QUFHZixxQkFBYTtBQUhFO0FBRFYsSyxRQU9UQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsWUFBTSxFQUREO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxZQUFNLEVBSEQ7QUFJTEMsV0FBSztBQUpBLEssUUFPUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVLEUsUUFFVkMsTSxHQUFTLEU7Ozs7OzsyRkFFSUMsTTs7Ozs7O0FBQ0hDLHVCLEdBQVlELE0sQ0FBWkMsTzs7QUFDUixxQkFBS0EsT0FBTCxHQUFlQSxPQUFmOzs7dUJBRXVCLG1CQUFRQyxjQUFJQyxRQUFaLEVBQXNCLEVBQUVGLGdCQUFGLEVBQXRCLEVBQW1DLEtBQW5DLEM7OztBQUFqQkcsd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFHQztBQUNQLFdBQUtDLE9BQUw7QUFDRDs7Ozs7Ozs7OztBQUdTSix1QixHQUFZLEksQ0FBWkEsTzs7dUJBRWUsbUJBQVFDLGNBQUlJLE1BQVosRUFBb0IsRUFBRUwsZ0JBQUYsRUFBcEIsRUFBaUMsS0FBakMsQzs7O0FBQWpCRyx3Qjs7dUJBQ0EsS0FBS0MsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFJaUIsbUJBQVFILGNBQUlLLFVBQVosRUFBd0IsRUFBRUMsSUFBSSxLQUFLUCxPQUFYLEVBQXhCLEVBQThDLEtBQTlDLEM7OztBQUFqQkcsd0I7QUFDTVgsb0IsR0FBU1csUSxDQUFmWixJOztBQUNOLHFCQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxxQkFBS0EsSUFBTCxDQUFVZ0IsUUFBVixHQUFxQixJQUFJQyxJQUFKLENBQVMsS0FBS2pCLElBQUwsQ0FBVWdCLFFBQVYsR0FBcUIsSUFBOUIsRUFBb0NFLE1BQXBDLENBQTJDLGVBQTNDLENBQXJCOzs7dUJBRXVCLG1CQUFRVCxjQUFJVSxPQUFaLEVBQXFCLEVBQUVDLFNBQVNwQixLQUFLb0IsT0FBaEIsRUFBckIsRUFBZ0QsS0FBaEQsQzs7O0FBQWpCQyx3QjtBQUNRcEIsb0IsR0FBU29CLFEsQ0FBZnRCLEk7O0FBQ1IscUJBQUtFLElBQUwsR0FBWUEsSUFBWjs7O3VCQUVzQixtQkFBUVEsY0FBSWEsVUFBWixFQUF3QixFQUFFZCxTQUFTUixLQUFLZSxFQUFoQixFQUF4QixFQUE4QyxLQUE5QyxDOzs7QUFBaEJRLHVCO0FBQ1FyQixvQixHQUFTcUIsUUFBUXhCLEksQ0FBdkJBLEk7O0FBQ1IscUJBQUtHLElBQUwsR0FBWUEsSUFBWjs7O3VCQUVxQixtQkFBUU8sY0FBSWUsVUFBWixFQUF3QixFQUFFaEIsU0FBU1IsS0FBS2UsRUFBaEIsRUFBeEIsRUFBOEMsS0FBOUMsQzs7O0FBQWZVLHNCO0FBQ1F0QixtQixHQUFRc0IsT0FBTzFCLEksQ0FBckJBLEk7O0FBQ1IscUJBQUtJLEdBQUwsR0FBV0EsSUFBSXVCLE1BQWY7O0FBRUEscUJBQUtDLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE3RCtCQyxlQUFLQyxJOztrQkFBbkJuQyxLIiwiZmlsZSI6ImRlc2MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vY29uZmlnL2FwaSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd3eGMtbGFiZWwnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1sYWJlbC9kaXN0L2luZGV4JyxcclxuICAgICAgICAnd3hjLXBhbmVsJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtcGFuZWwvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1pbnB1dCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWlucHV0L2Rpc3QvaW5kZXgnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7fVxyXG5cclxuICAgIG1peGlucyA9IFtdXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgcG9zdDoge30sXHJcbiAgICAgIHVzZXI6IHt9LFxyXG4gICAgICBpbWdzOiBbXSxcclxuICAgICAgdXBzOiAwLFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge31cclxuXHJcbiAgICBtZXRob2RzID0ge31cclxuXHJcbiAgICBldmVudHMgPSB7fVxyXG5cclxuICAgIGFzeW5jIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgY29uc3QgeyBwb3N0X2lkIH0gPSBvcHRpb25cclxuICAgICAgdGhpcy5wb3N0X2lkID0gcG9zdF9pZFxyXG4gICAgICBcclxuICAgICAgY29uc3QgcG9zdERhdGEgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0VmlldywgeyBwb3N0X2lkIH0sICdHRVQnKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgdGhpcy5nZXRQb3N0KClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cCgpIHtcclxuICAgICAgY29uc3QgeyBwb3N0X2lkIH0gPSB0aGlzXHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBwb3N0RGF0YSA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RVcCwgeyBwb3N0X2lkIH0sICdHRVQnKVxyXG4gICAgICBhd2FpdCB0aGlzLmdldFBvc3QoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldFBvc3QoKSB7XHJcbiAgICAgIGNvbnN0IHBvc3REYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdERldGFpbCwgeyBpZDogdGhpcy5wb3N0X2lkIH0sICdHRVQnKVxyXG4gICAgICBsZXQgeyBkYXRhOiBwb3N0IH0gPSBwb3N0RGF0YVxyXG4gICAgICB0aGlzLnBvc3QgPSBwb3N0XHJcbiAgICAgIHRoaXMucG9zdC5hZGRfdGltZSA9IG5ldyBEYXRlKHRoaXMucG9zdC5hZGRfdGltZSAqIDEwMDApLmZvcm1hdCgnTU3mnIhkZOaXpSBoaOaXtm1t5YiGJylcclxuXHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuVXNlckdldCwgeyB1c2VyX2lkOiBwb3N0LnVzZXJfaWQgfSwgJ0dFVCcpXHJcbiAgICAgIGNvbnN0IHsgZGF0YTogdXNlciB9ID0gdXNlckRhdGFcclxuICAgICAgdGhpcy51c2VyID0gdXNlclxyXG5cclxuICAgICAgY29uc3QgaW1nRGF0YSA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RJbWdHZXQsIHsgcG9zdF9pZDogcG9zdC5pZCB9LCAnR0VUJylcclxuICAgICAgY29uc3QgeyBkYXRhOiBpbWdzIH0gPSBpbWdEYXRhLmRhdGFcclxuICAgICAgdGhpcy5pbWdzID0gaW1nc1xyXG5cclxuICAgICAgY29uc3QgdXBEYXRhID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdFVwTGlzdCwgeyBwb3N0X2lkOiBwb3N0LmlkIH0sICdHRVQnKVxyXG4gICAgICBjb25zdCB7IGRhdGE6IHVwcyB9ID0gdXBEYXRhLmRhdGFcclxuICAgICAgdGhpcy51cHMgPSB1cHMubGVuZ3RoXHJcblxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=