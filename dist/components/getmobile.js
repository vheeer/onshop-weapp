'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _user = require('./../services/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Getmobile = function (_wepy$component) {
  _inherits(Getmobile, _wepy$component);

  function Getmobile() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Getmobile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Getmobile.__proto__ || Object.getPrototypeOf(Getmobile)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      usingComponents: {}
    }, _this.events = {}, _this.watch = {}, _this.props = {
      callback: String
    }, _this.methods = {
      getPhoneNumber: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          var _e$detail, iv, encryptedData, getmobileResult;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _e$detail = e.detail, iv = _e$detail.iv, encryptedData = _e$detail.encryptedData;
                  _context.next = 3;
                  return _user2.default.getmobile({ iv: iv, encryptedData: encryptedData });

                case 3:
                  getmobileResult = _context.sent;

                  // 使本组件所在的页面更新数据
                  if (getmobileResult.errno === 0) {
                    this.$root[this.callback](getmobileResult.data);
                  }

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getPhoneNumber(_x) {
          return _ref2.apply(this, arguments);
        }

        return getPhoneNumber;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Getmobile;
}(_wepy2.default.component);

exports.default = Getmobile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldG1vYmlsZS5qcyJdLCJuYW1lcyI6WyJHZXRtb2JpbGUiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJldmVudHMiLCJ3YXRjaCIsInByb3BzIiwiY2FsbGJhY2siLCJTdHJpbmciLCJtZXRob2RzIiwiZ2V0UGhvbmVOdW1iZXIiLCJlIiwiZGV0YWlsIiwiaXYiLCJlbmNyeXB0ZWREYXRhIiwidXNlclNlcnZpY2UiLCJnZXRtb2JpbGUiLCJnZXRtb2JpbGVSZXN1bHQiLCJlcnJubyIsIiRyb290IiwiZGF0YSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBRFYsSyxRQUlUQyxNLEdBQVMsRSxRQUVUQyxLLEdBQVEsRSxRQUVSQyxLLEdBQVE7QUFDTkMsZ0JBQVVDO0FBREosSyxRQUlSQyxPLEdBQVU7QUFDRkMsb0JBREU7QUFBQSw2RkFDYUMsQ0FEYjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBRXdCQSxFQUFFQyxNQUYxQixFQUVFQyxFQUZGLGFBRUVBLEVBRkYsRUFFTUMsYUFGTixhQUVNQSxhQUZOO0FBQUE7QUFBQSx5QkFHd0JDLGVBQVlDLFNBQVosQ0FBc0IsRUFBRUgsTUFBRixFQUFNQyw0QkFBTixFQUF0QixDQUh4Qjs7QUFBQTtBQUdBRyxpQ0FIQTs7QUFJTjtBQUNBLHNCQUFJQSxnQkFBZ0JDLEtBQWhCLEtBQTBCLENBQTlCLEVBQWlDO0FBQy9CLHlCQUFLQyxLQUFMLENBQVcsS0FBS1osUUFBaEIsRUFBMEJVLGdCQUFnQkcsSUFBMUM7QUFDRDs7QUFQSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEs7Ozs7RUFiMkJDLGVBQUtDLFM7O2tCQUF2QnJCLFMiLCJmaWxlIjoiZ2V0bW9iaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgdXNlclNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvdXNlcidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBHZXRtb2JpbGUgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge31cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7fVxyXG5cclxuICAgIHdhdGNoID0ge31cclxuXHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgY2FsbGJhY2s6IFN0cmluZ1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGFzeW5jIGdldFBob25lTnVtYmVyKGUpIHtcclxuICAgICAgICBjb25zdCB7IGl2LCBlbmNyeXB0ZWREYXRhIH0gPSBlLmRldGFpbFxyXG4gICAgICAgIGNvbnN0IGdldG1vYmlsZVJlc3VsdCA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldG1vYmlsZSh7IGl2LCBlbmNyeXB0ZWREYXRhIH0pXHJcbiAgICAgICAgLy8g5L2/5pys57uE5Lu25omA5Zyo55qE6aG16Z2i5pu05paw5pWw5o2uXHJcbiAgICAgICAgaWYgKGdldG1vYmlsZVJlc3VsdC5lcnJubyA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy4kcm9vdFt0aGlzLmNhbGxiYWNrXShnZXRtb2JpbGVSZXN1bHQuZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==